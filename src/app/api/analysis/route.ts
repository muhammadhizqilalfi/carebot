import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function GET() {
  try {
    const user = await getUserFromToken();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // 1. Ambil chat terakhir user
    const lastChat = await prisma.chatArchive.findFirst({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      include: { messages: { orderBy: { createdAt: 'asc' }, take: 20 } }
    });

    if (!lastChat) return NextResponse.json({ error: "No chat history found" }, { status: 404 });

    const chatContext = lastChat.messages.map(m => `${m.isFromUser ? 'User' : 'Bot'}: ${m.content}`).join("\n");

    // 2. Minta AI menganalisis riwayat tersebut
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Analisis percakapan medis berikut dan berikan ringkasan dalam JSON.
          Format: {
            "statusLevel": "rendah" | "sedang" | "tinggi",
            "title": "Judul Risiko",
            "highlightedKeywords": ["kata1", "kata2"],
            "message": "Pesan ringkasan",
            "symptoms": ["gejala1", "gejala2"],
            "insights": "Informasi penting",
            "nextSteps": [{"title": "Langkah", "desc": "Penjelasan"}]
          }`
        },
        { role: "user", content: `Berikut riwayat chatnya:\n${chatContext}` }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(completion.choices[0].message.content || "{}");
    return NextResponse.json(analysis);

  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}