'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  Search, 
  Book, 
  Shield, 
  Activity, 
  MessageCircle, 
  ChevronDown, 
  Mail, 
  Phone,
  ArrowRight
} from 'lucide-react';

// --- DATA DUMMY FAQ ---
const faqs = [
  {
    id: 1,
    question: "Bagaimana cara kerja analisis NLP pada CareBot?",
    answer: "CareBot menggunakan algoritma Natural Language Processing (NLP) tingkat lanjut untuk memahami keluhan yang Anda ketikkan, mencocokkannya dengan basis data medis dari pedoman ADA, dan memprediksi tingkat risiko secara real-time."
  },
  {
    id: 2,
    question: "Apakah data medis saya dibagikan ke pihak ketiga?",
    answer: "Tidak. Data Anda dienkripsi secara end-to-end (AES-256) dan disimpan dalam brankas data yang mematuhi standar HIPAA. Kami tidak pernah menjual atau membagikan data pribadi Anda ke pihak ketiga."
  },
  {
    id: 3,
    question: "Seberapa akurat hasil 'Risk Profile' yang diberikan?",
    answer: "Profil Risiko adalah indikasi awal berdasarkan gejala klinis yang dilaporkan, bukan diagnosis final. Akurasinya sangat bergantung pada detail informasi yang Anda berikan. Selalu konsultasikan dengan dokter untuk diagnosis akurat."
  },
  {
    id: 4,
    question: "Bagaimana cara mencari klinik yang menerima BPJS?",
    answer: "Pada halaman 'Facilities', Anda dapat menggunakan tombol 'Filter' dan memilih opsi 'Terima BPJS' untuk melihat fasilitas kesehatan terdekat yang mendukung layanan tersebut."
  }
];

export default function HelpCenterPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(1); // FAQ pertama terbuka secara default

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1000px] mx-auto w-full pb-12 pt-8 px-6 lg:px-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HERO & SEARCH ================= */}
        <div className="bg-gradient-to-br from-[#0B7A7D] to-[#075355] rounded-[32px] p-10 md:p-14 text-white shadow-[0_20px_50px_rgba(11,122,125,0.2)] relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h1 className="text-[36px] md:text-[42px] font-black tracking-tight mb-4 leading-tight">
              Halo, ada yang bisa kami bantu?
            </h1>
            <p className="text-[#D4EDED] text-[15px] font-medium mb-8">
              Temukan jawaban, panduan penggunaan aplikasi, dan hubungi tim dukungan medis kami kapan saja.
            </p>
            
            {/* Search Bar Besar */}
            <div className="relative max-w-xl mx-auto group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search size={20} className="text-slate-400 group-focus-within:text-[#0B7A7D] transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Cari kendala (contoh: cara hapus riwayat)..." 
                className="w-full pl-14 pr-6 py-4.5 bg-white rounded-full text-[15px] font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-medium focus:outline-none focus:ring-4 focus:ring-white/20 shadow-xl transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-[#0B7A7D] hover:bg-[#086163] text-white px-6 rounded-full font-bold text-[13px] transition-colors shadow-sm active:scale-95">
                Cari
              </button>
            </div>
          </div>
        </div>

        {/* ================= QUICK CATEGORIES (BENTO) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md hover:border-[#0B7A7D]/30 transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF5F5] text-[#0B7A7D] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Book size={20} strokeWidth={2.5} />
            </div>
            <h3 className="font-extrabold text-slate-900 mb-1 group-hover:text-[#0B7A7D] transition-colors">Panduan Awal</h3>
            <p className="text-[12px] text-slate-500 font-medium">Cara menggunakan CareBot.</p>
          </div>
          
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md hover:border-[#0B7A7D]/30 transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Activity size={20} strokeWidth={2.5} />
            </div>
            <h3 className="font-extrabold text-slate-900 mb-1 group-hover:text-[#0B7A7D] transition-colors">Analisis Risiko</h3>
            <p className="text-[12px] text-slate-500 font-medium">Memahami laporan kesehatan.</p>
          </div>

          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md hover:border-[#0B7A7D]/30 transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield size={20} strokeWidth={2.5} />
            </div>
            <h3 className="font-extrabold text-slate-900 mb-1 group-hover:text-[#0B7A7D] transition-colors">Data & Privasi</h3>
            <p className="text-[12px] text-slate-500 font-medium">Kebijakan HIPAA & Enkripsi.</p>
          </div>

          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md hover:border-[#0B7A7D]/30 transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle size={20} strokeWidth={2.5} />
            </div>
            <h3 className="font-extrabold text-slate-900 mb-1 group-hover:text-[#0B7A7D] transition-colors">Troubleshooting</h3>
            <p className="text-[12px] text-slate-500 font-medium">Kendala teknis & akun.</p>
          </div>
        </div>

        {/* ================= MAIN CONTENT SPLIT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* FAQ SECTION (8/12) */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-[22px] font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Pertanyaan yang Sering Diajukan
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div 
                  key={faq.id} 
                  className={`bg-white border rounded-[20px] transition-all duration-300 overflow-hidden cursor-pointer ${openFaq === faq.id ? 'border-[#0B7A7D] shadow-[0_4px_20px_rgba(11,122,125,0.08)]' : 'border-slate-200 hover:border-slate-300'}`}
                  onClick={() => toggleFaq(faq.id)}
                >
                  <div className="p-6 flex items-center justify-between gap-4">
                    <h3 className={`font-bold text-[15px] transition-colors ${openFaq === faq.id ? 'text-[#0B7A7D]' : 'text-slate-800'}`}>
                      {faq.question}
                    </h3>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${openFaq === faq.id ? 'bg-[#EAF5F5] text-[#0B7A7D] rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                      <ChevronDown size={18} strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  {/* Konten FAQ dengan animasi Expand (menggunakan max-height) */}
                  <div 
                    className={`px-6 text-[14px] text-slate-600 font-medium leading-relaxed transition-all duration-300 ease-in-out ${openFaq === faq.id ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT SUPPORT (4/12) */}
          <div className="lg:col-span-4 h-full">
            <div className="bg-[#F8FAFB] rounded-[32px] p-8 border border-slate-100 shadow-inner flex flex-col h-full">
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">Masih butuh bantuan?</h3>
              <p className="text-sm text-slate-500 font-medium mb-8">Tim dukungan teknis dan medis kami siap membantu Anda 24/7.</p>
              
              <div className="space-y-4 flex-1">
                {/* Email Contact */}
                <div className="bg-white p-5 rounded-[20px] border border-slate-100 flex gap-4 group hover:shadow-md hover:border-[#0B7A7D]/20 transition-all cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-[#EAF5F5] group-hover:text-[#0B7A7D] transition-colors">
                    <Mail size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[13px] text-slate-900 mb-0.5">Email Support</h4>
                    <p className="text-[12px] font-bold text-[#0B7A7D]">support@carebot.ai</p>
                  </div>
                </div>

                {/* Phone Contact */}
                <div className="bg-white p-5 rounded-[20px] border border-slate-100 flex gap-4 group hover:shadow-md hover:border-[#0B7A7D]/20 transition-all cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-[#EAF5F5] group-hover:text-[#0B7A7D] transition-colors">
                    <Phone size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[13px] text-slate-900 mb-0.5">Hotline Medis</h4>
                    <p className="text-[12px] font-bold text-[#0B7A7D]">1-500-CARE (2273)</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 bg-slate-900 text-white flex justify-center items-center gap-2 py-4 rounded-[20px] text-sm font-bold shadow-lg hover:bg-slate-800 transition-colors active:scale-95 group">
                Live Chat Support <ArrowRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}