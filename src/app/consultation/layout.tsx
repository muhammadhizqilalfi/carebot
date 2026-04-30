'use client';

import React from 'react';
import DashboardLayout from '../../components/DashboardLayout'; // Pastikan path benar
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from 'lucide-react';

export default function ConsultationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <DashboardLayout>
      {/* 
        TOP NAVBAR KONSULTASI 
        Bagian ini akan terus menempel (sticky) saat user pindah 
        antara Chat, Analysis, dan Files 
      */}
      <header className="px-10 py-8 flex justify-between items-center z-10 bg-[#F8FAFB] shrink-0 border-b border-slate-100">
        <h2 className="text-xl font-bold text-[#0B7A7D]">Consultation Session</h2>
        
        <div className="flex items-center gap-8 text-[15px] font-semibold">
          {/* Active Chat Link */}
          <Link 
            href="/consultation/chat" 
            className={`transition-all duration-200 ${
              pathname === '/consultation/chat' 
                ? 'text-[#0B7A7D] border-b-2 border-[#0B7A7D] pb-1' 
                : 'text-slate-400 hover:text-[#0B7A7D]'
            }`}
          >
            Active Chat
          </Link>
          
          {/* Analysis Link */}
          <Link 
            href="/consultation/analysis" 
            className={`transition-all duration-200 ${
              pathname.includes('/analysis') 
                ? 'text-[#0B7A7D] border-b-2 border-[#0B7A7D] pb-1' 
                : 'text-slate-400 hover:text-[#0B7A7D]'
            }`}
          >
            Analysis
          </Link>
          
          {/* Files Link */}
          <Link 
            href="/consultation/files" 
            className={`transition-all duration-200 ${
              pathname.includes('/files') 
                ? 'text-[#0B7A7D] border-b-2 border-[#0B7A7D] pb-1' 
                : 'text-slate-400 hover:text-[#0B7A7D]'
            }`}
          >
            Files
          </Link>
          
          {/* User Icon */}
          <div className="w-9 h-9 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-500 ml-2 cursor-pointer hover:border-[#0B7A7D] hover:text-[#0B7A7D] transition-colors">
            <User size={18} />
          </div>
        </div>
      </header>

      {/* 
        AREA KONTEN DINAMIS 
        Isi dari /chat, /analysis, atau /files akan muncul di dalam sini
      */}
      <div className="flex-1 flex flex-col relative h-full overflow-y-auto">
        {children}
      </div>
    </DashboardLayout>
  );
}