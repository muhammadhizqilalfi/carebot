import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // 1. Ubah tipe menjadi Promise
) {
  try {
    // 2. Gunakan await untuk mengambil data dari params
    const { id } = await params;

    await prisma.chatArchive.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete chat archive" },
      { status: 500 }
    );
  }
}