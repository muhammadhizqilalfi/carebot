import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";
import Groq from "groq-sdk";

// Inisialisasi Groq dengan API Key dari Environment Variable
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function GET() {
  try {
    // 1. Autentikasi User
    const user = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Ambil chat terakhir user beserta pesan-pesannya
    const lastChat = await prisma.chatArchive.findFirst({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
      include: { 
        messages: { 
          orderBy: { createdAt: "asc" }, 
          take: 20 
        } 
      },
    });

    if (!lastChat || lastChat.messages.length === 0) {
      return NextResponse.json(
        { error: "No chat history found to analyze" }, 
        { status: 404 }
      );
    }

    // 3. Susun konteks percakapan untuk dikirim ke AI
    // Perbaikan Type Error: Kita definisikan tipe 'm' secara eksplisit
    const chatContext = lastChat.messages
      .map((m: { isFromUser: boolean; content: string }) => 
        `${m.isFromUser ? "User" : "Bot"}: ${m.content}`
      )
      .join("\n");

    // 4. Minta AI menganalisis riwayat tersebut menggunakan model Llama
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Analisis percakapan medis berikut dan berikan ringkasan dalam format JSON murni.
          Format JSON harus mengikuti struktur ini:
          {
            "statusLevel": "rendah" | "sedang" | "tinggi",
            "title": "Judul Risiko",
            "highlightedKeywords": ["kata1", "kata2"],
            "message": "Pesan ringkasan",
            "symptoms": ["gejala1", "gejala2"],
            "insights": "Informasi penting",
            "nextSteps": [{"title": "Langkah", "desc": "Penjelasan"}]
          }`,
        },
        { 
          role: "user", 
          content: `Berikut adalah riwayat chat untuk dianalisis:\n${chatContext}` 
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.5, // Menjaga jawaban tetap konsisten
    });

    // 5. Ambil konten hasil AI
    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("AI failed to generate a response");
    }

    // 6. Parse JSON dan kirim kembali ke frontend
    const analysis = JSON.parse(content);
    return NextResponse.json(analysis);

  } catch (error: any) {
    // Log error di console server (Vercel Logs) untuk memudahkan debugging
    console.error("Analysis API Error:", error);

    return NextResponse.json(
      { 
        error: "Internal Server Error", 
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}