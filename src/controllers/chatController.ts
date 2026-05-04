'use server'; // Wajib ada agar Next.js tahu ini adalah Controller backend

import { getUserProfile } from '../models/userModel';

// Contoh fungsi Controller MVC
export async function processChatInput(message: string) {
  try {
    // 1. Panggil Model
    const userData = await getUserProfile("user-123");
    
    // 2. Proses Logika (Nanti disambung ke AI)
    console.log("Pesan diterima:", message);
    
    // 3. Kembalikan data ke View (Frontend)
    return {
      success: true,
      reply: "Ini adalah balasan dari Controller MVC!"
    };
  } catch (error) {
    return { success: false, error: "Controller gagal memproses pesan" };
  }
}