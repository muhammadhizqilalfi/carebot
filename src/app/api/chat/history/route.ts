import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Pastikan path ke prisma client kamu benar

export async function GET() {
  try {
    // Untuk sementara kita ambil semua, nanti kamu bisa filter berdasarkan 
    // user yang sedang login menggunakan NextAuth atau session.
    const chatArchives = await prisma.chatArchive.findMany({
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc' // Yang terbaru muncul di atas
      }
    });

    return NextResponse.json({ chatArchives });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return NextResponse.json(
      { error: "Gagal mengambil riwayat chat" },
      { status: 500 }
    );
  }
}