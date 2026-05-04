import { prisma } from './prismaClient';

// Contoh fungsi Model MVC
export async function getUserProfile(userId: string) {
  try {
    // Nanti tim Backend tinggal uncomment dan isi query database di sini
    // return await prisma.user.findUnique({ where: { id: userId } });
    return { status: "success", message: "Model is ready!" };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch user");
  }
}