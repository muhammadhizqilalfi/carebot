export const runtime = "nodejs";

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import Groq from "groq-sdk";

import { getUserFromToken } from "@/lib/auth";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const TITLE_MODEL = "llama-3.1-8b-instant";
const BACKUP_MODEL = "llama-3.1-8b-instant";
const CHAT_MODEL = "llama-3.3-70b-versatile";

export async function GET(req: Request) {
  try {
    const userFromToken = await getUserFromToken();

    if (!userFromToken)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);

    const chatId = searchParams.get("chatId");

    if (!chatId)
      return NextResponse.json({ error: "Chat ID required" }, { status: 400 });

    const history = await prisma.message.findMany({
      where: {
        chatArchiveId: chatId,

        chatArchive: { userId: userFromToken.id }, // Validasi kepemilikan
      },

      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ history });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { content, chatArchiveId, contextTags } = await req.json();

    // ✅ 1. Ambil user dari token

    const userFromToken = await getUserFromToken();

    if (!userFromToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Tambahan: Ambil data detail profil dari database

    const dbUser = await prisma.user.findUnique({
      where: { id: userFromToken.id },

      select: {
        fullName: true,

        age: true,

        weight: true,

        height: true,
      },
    });

    // ✅ 2. Tentukan chatId (Logika Anda sudah benar)

    let chatId = chatArchiveId;

    if (!chatId) {
      const titleCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",

            content:
              "Buat judul 3 kata tanpa tanda kutip. Contoh: Konsultasi Diabetes Akut. Berikan hanya teks judul.",
          },

          { role: "user", content: content },
        ],

        model: TITLE_MODEL,

        temperature: 0.5,
      });

      const generatedTitle =
        titleCompletion.choices[0]?.message?.content ||
        content.substring(0, 30);

      const newChat = await prisma.chatArchive.create({
        data: { userId: userFromToken.id, title: generatedTitle },
      });

      chatId = newChat.id;
    }

    // ✅ 3. Simpan pesan user

    await prisma.message.create({
      data: { content, isFromUser: true, chatArchiveId: chatId },
    });

    // ✅ 4. Ambil history (Ambil lebih banyak untuk konteks yang lebih baik)

    const history = await prisma.message.findMany({
      where: { chatArchiveId: chatId },

      orderBy: { createdAt: "asc" },

      take: 20,
    });

    const messagesForAI = history.map((msg) => ({
      role: msg.isFromUser ? "user" : "assistant",

      content: msg.content,
    }));

    // ✅ 5. Call AI dengan PERSONALIZED SYSTEM PROMPT

    const userContext = `

Data Profil Pasien saat ini:

- Nama: ${dbUser?.fullName || "Pasien"}

- Usia: ${dbUser?.age ? dbUser.age + " tahun" : "Belum diisi"}

- Berat Badan: ${dbUser?.weight ? dbUser.weight + " kg" : "Belum diisi"}

- Tinggi Badan: ${dbUser?.height ? dbUser.height + " cm" : "Belum diisi"}

    `;

    // Hitung jumlah pesan dalam history (dibagi 2 karena 1 pasang = user + assistant)

    const isInitialConversation = messagesForAI.length <= 2;

    const pinnedInstruction =
      contextTags?.length > 0
        ? `\nKONTEKS TAMBAHAN (User menyematkan kondisi ini): ${contextTags.join(", ")}.

       Fokuskan saran Anda juga pada poin-poin tersebut.`
        : "";

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",

          content: `

Anda adalah CareBot, asisten kesehatan pribadi yang cerdas.

Konteks Pasien saat ini:

${userContext}

${contextTags?.length > 0 ? `Kondisi yang disematkan user: ${contextTags.join(", ")}` : ""}





ATURAN UTAMA:

1. PRIBADI & AKURAT: Gunakan nama, usia, berat, dan tinggi badan user untuk memberikan dosis atau saran kesehatan yang spesifik.

2. ATURAN MENYAPA:

   ${
     isInitialConversation
       ? `Sapa user dengan ramah menggunakan nama: ${dbUser?.fullName || "Pasien"}.`
       : "Jangan sebutkan nama user lagi. Langsung jawab intinya dengan efisien."
   }

3. KONTEKS DISEMATKAN: Jika ada 'Kondisi yang disematkan', prioritaskan jawaban Anda untuk membahas poin-poin tersebut dalam hubungannya dengan pertanyaan user.

4. EDUKASI DATA: Jika profil (usia/berat/tinggi) kosong, ingatkan user secara halus untuk melengkapinya di menu Settings.

5. GAYA BAHASA: Empatik, profesional, gunakan Markdown dengan paragraf pendek dan bullet points.



Tugas Anda:

- Sapa user dengan namanya jika tersedia.

- Jika user bertanya tentang dosis atau saran kesehatan, pertimbangkan usia dan berat badan mereka.

- Berikan jawaban empatik dan fokus pada diabetes/kesehatan umum.

- Jika data profil kosong, sarankan user untuk melengkapinya di menu Settings agar saran lebih personal.

- Identifikasi potensi kondisi kesehatan dari pesan user.

- Berikan saran singkat yang praktis untuk setiap kondisi.



FORMAT RESPON: Jawablah dengan format JSON sebagai berikut:

      {

        "answer": "Tulis jawaban chat Anda di sini menggunakan format Markdown...",

        "analysisList": [

          {

            "condition": "Kondisi 1",

            "suggestion": "Saran Singkat 1"

          },

          {

            "condition": "Kondisi 2",

            "suggestion": "Saran Singkat 2"

          },

          {

            "condition": "Kondisi 3",

            "suggestion": "Saran Singkat 3"

          }

        ]

      }

          `,
        },

        ...(messagesForAI as any),
      ],

      response_format: { type: "json_object" },

      model: CHAT_MODEL,

      temperature: 0.4,

      max_tokens: 400,
    });

    const rawContent = completion.choices[0]?.message?.content || "{}";

    const parsedRes = JSON.parse(rawContent);

    // ✅ 6. Simpan respon AI

    const botMessage = await prisma.message.create({
      data: {
        content: parsedRes.answer,

        isFromUser: false,

        chatArchiveId: chatId,
      },
    });

    return NextResponse.json({
      message: botMessage,

      chatId: chatId,

      analysisList: parsedRes.analysisList,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
