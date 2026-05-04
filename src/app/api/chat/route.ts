export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Groq from "groq-sdk";
import { getUserFromToken } from "@/lib/auth";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { content, chatArchiveId } = await req.json();

    // ✅ 1. Ambil user
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ 2. Tentukan chatId
    let chatId = chatArchiveId;

    if (!chatId) {
      const newChat = await prisma.chatArchive.create({
        data: {
          userId: user.id,
          title: "Chat Baru",
        },
      });

      chatId = newChat.id;
    }

    // ✅ 3. Simpan pesan user
    await prisma.message.create({
      data: {
        content,
        isFromUser: true,
        chatArchiveId: chatId,
      },
    });

    // ✅ 4. Ambil history
    const history = await prisma.message.findMany({
      where: { chatArchiveId: chatId },
      orderBy: { createdAt: "asc" },
      take: 10,
    });

    const messagesForAI = history.map((msg) => ({
      role: msg.isFromUser ? "user" : "assistant",
      content: msg.content,
    }));

    // ✅ 5. Call AI (FIXED PROMPT)
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
Anda adalah CareBot, asisten kesehatan yang berfokus pada diabetes.

Tugas Anda:
- Memberikan jawaban yang jelas, empatik, dan mudah dipahami
- Tetap dalam konteks kesehatan, khususnya diabetes
- Menyesuaikan jawaban dengan pertanyaan user (tidak selalu panjang)

Panduan format:
- Gunakan paragraf pendek agar mudah dibaca
- Gunakan bullet point jika menjelaskan daftar
- Gunakan **bold** untuk menekankan poin penting (opsional)
- Jika jawaban panjang, boleh dibagi menjadi beberapa bagian
- Jangan terlalu kaku seperti artikel kecuali diminta

Gaya komunikasi:
- Natural seperti berbicara dengan pasien
- Tidak terlalu formal, tapi tetap profesional
- Boleh singkat jika pertanyaan sederhana
- Boleh panjang jika butuh penjelasan

Batasan:
- Tetap fokus pada topik kesehatan/diabetes
- Jika pertanyaan di luar konteks, arahkan kembali secara halus

Penutup:
- Jika relevan, ingatkan untuk konsultasi ke dokter
          `,
        },
        ...(messagesForAI as any),
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 400
    });

    const aiResponse = completion.choices[0]?.message?.content || "";

    // ✅ 6. Simpan respon AI
    const botMessage = await prisma.message.create({
      data: {
        content: aiResponse,
        isFromUser: false,
        chatArchiveId: chatId,
      },
    });

    // ✅ 7. RETURN chatId + message
    return NextResponse.json({
      message: botMessage,
      chatId: chatId,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}