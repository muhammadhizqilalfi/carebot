'use client';

import React from 'react';
import { 
  Bot, 
  PlusCircle, 
  Mic, 
  Send, 
  Info, 
  Stethoscope, 
  ClipboardList, 
  BriefcaseMedical 
} from 'lucide-react';

// Nama komponen saya ubah menjadi ConsultationChatPage agar lebih sesuai dengan foldernya
export default function ConsultationChatPage() {
  return (
    // Tidak perlu <DashboardLayout> atau <header> lagi karena sudah ada di consultation/layout.tsx
    <div className="flex-1 flex flex-col h-full overflow-hidden animate-[fadeIn_0.3s_ease-out]">
      
      {/* Area Chat */}
      <div className="flex-1 overflow-y-auto px-10 pb-40">
        <div className="max-w-4xl mx-auto space-y-8 pt-8">
          
          {/* Date Badge */}
          <div className="flex justify-center">
            <span className="bg-gray-200/60 text-gray-600 text-[11px] font-bold px-4 py-1.5 rounded-full tracking-wider uppercase">
              HARI INI
            </span>
          </div>

          {/* Bot Message */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#0B7A7D] flex items-center justify-center text-white shrink-0 mt-1 shadow-sm">
              <Bot size={22} />
            </div>
            <div className="bg-[#EBEFF2] text-gray-800 px-6 py-5 rounded-3xl rounded-tl-sm text-[15px] font-medium leading-relaxed max-w-2xl border border-slate-100">
              Halo! Ceritakan keluhan kesehatan Anda hari ini. Misalnya: "Saya sering merasa haus akhir-akhir ini."
            </div>
          </div>

          {/* User Message */}
          <div className="flex flex-col items-end">
            <div className="bg-[#0B7A7D] text-white px-6 py-5 rounded-3xl rounded-br-sm text-[15px] font-medium leading-relaxed max-w-2xl shadow-md">
              Saya merasa lelah dan sering buang air kecil di malam hari.
            </div>
            <span className="text-[11px] font-medium text-gray-400 mt-2 mr-2">14:02 • Dilihat</span>
          </div>

          {/* Suggestion Pills */}
          <div className="flex flex-wrap gap-3 pl-14">
            <button className="bg-white border border-slate-100 shadow-sm text-[#0B7A7D] text-[13px] font-bold px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#F0F7F7] transition-all active:scale-95">
              <Info size={16} /> Apa itu diabetes?
            </button>
            <button className="bg-white border border-slate-100 shadow-sm text-[#0B7A7D] text-[13px] font-bold px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#F0F7F7] transition-all active:scale-95">
              <Stethoscope size={16} /> Gejala umum
            </button>
            <button className="bg-white border border-slate-100 shadow-sm text-[#0B7A7D] text-[13px] font-bold px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#F0F7F7] transition-all active:scale-95">
              <ClipboardList size={16} /> Cara pemeriksaan
            </button>
          </div>

          {/* Preliminary Observations Card */}
          <div className="ml-14 bg-[#F2F6F6] rounded-3xl p-6 relative overflow-hidden border border-slate-100 shadow-sm group hover:shadow-md transition-shadow">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#0B7A7D] rounded-l-3xl"></div>
            
            <div className="flex items-center gap-4 mb-5 pl-2">
              <div className="bg-[#C8E6E8] p-2.5 rounded-xl text-[#0B7A7D]">
                <BriefcaseMedical size={24} />
              </div>
              <h3 className="font-bold text-gray-800 text-lg">Preliminary Observations</h3>
            </div>
            
            <div className="flex gap-4 pl-2">
              <div className="flex-1 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">
                  POTENTIAL MARKER
                </p>
                <p className="font-bold text-gray-900 text-[15px]">Polyuria (Nocturnal)</p>
              </div>
              <div className="flex-1 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">
                  ENERGY STATE
                </p>
                <p className="font-bold text-gray-900 text-[15px]">Chronic Fatigue</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Input Area (Sticky at Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#F8FAFB] via-[#F8FAFB] to-transparent pt-12 pb-6 px-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-full flex items-center px-3 py-2 border border-gray-100 focus-within:border-[#0B7A7D]/30 transition-all">
            <button className="p-3 text-gray-400 hover:text-[#0B7A7D] transition-colors">
              <PlusCircle size={24} />
            </button>
            <input 
              type="text" 
              placeholder="Ceritakan keluhan Anda..." 
              className="flex-1 bg-transparent px-4 text-[15px] outline-none text-gray-800 font-medium placeholder:text-gray-400 placeholder:font-normal" 
            />
            <button className="p-3 text-gray-400 hover:text-[#0B7A7D] transition-colors">
              <Mic size={22} />
            </button>
            <button className="bg-[#0B7A7D] text-white p-3.5 rounded-full ml-1 shadow-md hover:bg-[#086163] transition-all active:scale-95">
              <Send size={20} className="ml-0.5" />
            </button>
          </div>
          <p className="text-center text-[11px] text-gray-400 font-medium mt-5">
            CareBot memberikan informasi edukasi. Selalu konsultasikan dengan tenaga medis profesional untuk diagnosis akurat.
          </p>
        </div>
      </div>
    </div>
  );
}