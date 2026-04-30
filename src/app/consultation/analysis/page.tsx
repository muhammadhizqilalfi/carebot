'use client'; // Tetap gunakan client component untuk interaktivitas

import React from 'react';
import Link from 'next/link';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Lightbulb, 
  Droplet, 
  BriefcaseMedical, 
  Navigation, 
  ArrowRight, 
  Info,
  Download
} from 'lucide-react';

// ============================================================================
// DATA DINAMIS (SIAP UNTUK INTEGRASI BACKEND/AI)
// Tim Backend/AI cukup menyuplai object JSON dengan struktur seperti ini:
// ============================================================================
const analysisData = {
  statusLevel: 'tinggi', // 'rendah' | 'sedang' | 'tinggi'
  title: 'Risiko Terdeteksi:\nTinggi',
  highlightedKeywords: ['sering haus', 'lelah'], // Kata yang akan di-highlight
  message: "Berdasarkan gejala sering haus dan lelah yang Anda sampaikan, ada indikasi risiko diabetes yang memerlukan perhatian segera.",
  symptoms: [
    "Polidipsia (Haus Berlebih)",
    "Letargi (Kelelahan Kronis)",
    "Penglihatan Kabur"
  ],
  insights: "Pendeteksian dini dapat membantu mengelola kadar gula darah secara efektif sebelum komplikasi berkembang lebih jauh.",
  nextSteps: [
    {
      id: 1,
      icon: Droplet,
      title: "Segera periksa gula darah",
      desc: "Lakukan tes glukosa puasa untuk hasil yang akurat."
    },
    {
      id: 2,
      icon: BriefcaseMedical,
      title: "Konsultasi dengan dokter",
      desc: "Bicarakan hasil analisis ini dengan dokter spesialis dalam."
    }
  ],
  article: {
    title: "Mengenal Gejala Diabetes Sejak Dini",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop"
  }
};

export default function AnalysisPage() {
  
  // Fungsi kecil untuk meng-highlight kata kunci dari AI secara dinamis
  const renderMessageWithHighlights = (text: string, keywords: string[]) => {
    let parts = text.split(new RegExp(`(${keywords.join('|')})`, 'gi'));
    return (
      <p className="text-[#9B1C1C] text-[15px] leading-relaxed font-medium">
        {parts.map((part, i) => 
          keywords.some(k => k.toLowerCase() === part.toLowerCase()) ? (
            <strong key={i} className="font-extrabold text-[#771D1D] bg-red-100/80 px-1.5 py-0.5 rounded-md mx-0.5 shadow-sm transition-colors hover:bg-red-200">
              {part}
            </strong>
          ) : (
            part
          )
        )}
      </p>
    );
  };

  return (
    // PERHATIKAN: Tidak ada lagi <DashboardLayout> di sini. 
    // Langsung membungkus konten dengan animasi masuk (fade-in) yang mulus.
    <div className="max-w-[1100px] mx-auto w-full pb-12 pt-8 px-6 lg:px-8 animate-[fadeIn_0.4s_ease-out]">
      
      {/* ================= HEADER ================= */}
      <div className="mb-10">
        <h1 className="text-[34px] font-extrabold text-slate-900 mb-2.5 tracking-tight">Analisis Kesehatan</h1>
        <p className="text-slate-500 text-[15px] font-medium leading-relaxed max-w-2xl">
          Laporan detail berdasarkan percakapan terakhir Anda dengan CareBot Assistant.
        </p>
      </div>

      {/* ================= BENTO GRID MAIN ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-7">
        
        {/* ---------------- KOLOM KIRI (Lebar 8/12) ---------------- */}
        <div className="xl:col-span-8 flex flex-col gap-7">
          
          {/* 1. Risk Alert Card (Dynamic Styling) */}
          <div className="bg-gradient-to-br from-[#FFF5F5] to-[#FFEDED] rounded-[32px] p-8 md:p-12 flex flex-col justify-center border border-red-100 shadow-[0_8px_30px_rgba(220,38,38,0.06)] relative overflow-hidden group">
            {/* Efek Glow Dekoratif di background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

            <div className="flex items-center gap-2.5 text-red-600 mb-6 relative z-10">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shadow-sm">
                {/* Efek Pulse lambat pada icon peringatan */}
                <AlertTriangle size={16} strokeWidth={3} className="text-red-600 animate-pulse" />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em]">Status Peringatan</span>
            </div>
            
            <h2 className="text-[40px] md:text-[52px] font-black text-[#9B1C1C] leading-[1.05] mb-10 tracking-tight whitespace-pre-line relative z-10">
              {analysisData.title}
            </h2>
            
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-red-100/50 shadow-sm relative z-10">
              {renderMessageWithHighlights(analysisData.message, analysisData.highlightedKeywords)}
            </div>
          </div>

          {/* 2. Bottom Row (Gejala & Info Penting) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            
            {/* Gejala Card */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
              <h3 className="font-extrabold text-slate-900 text-[18px] mb-6 tracking-tight">Gejala Dilaporkan</h3>
              <ul className="space-y-4">
                {analysisData.symptoms.map((symptom, idx) => (
                  <li key={idx} className="flex items-center gap-3.5 group cursor-default">
                    <div className="w-6 h-6 rounded-full bg-[#EAF5F5] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#0B7A7D] transition-all shadow-sm">
                       <CheckCircle2 size={14} className="text-[#0B7A7D] group-hover:text-white transition-colors" strokeWidth={3} /> 
                    </div>
                    <span className="text-slate-700 font-bold text-[14px] group-hover:text-slate-900 transition-colors">{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info Penting Card (Solid Teal) */}
            <div className="bg-gradient-to-br from-[#0B7A7D] to-[#085a5d] rounded-[32px] p-8 text-white shadow-[0_12px_30px_rgba(11,122,125,0.25)] relative overflow-hidden group">
              {/* Aksen bulatan transparan di pojok */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>

              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/10 shadow-inner">
                <Lightbulb size={22} className="text-white" strokeWidth={2.5} />
              </div>
              <h3 className="font-extrabold text-[18px] mb-3 tracking-tight">Informasi Penting</h3>
              <p className="text-white/80 text-[14px] leading-relaxed font-medium relative z-10">
                {analysisData.insights}
              </p>
            </div>

          </div>
        </div>

        {/* ---------------- KOLOM KANAN (Lebar 4/12) ---------------- */}
        <div className="xl:col-span-4 flex flex-col h-full gap-7">
          
          {/* 3. Langkah Selanjutnya Card */}
          <div className="bg-[#F8FAFB] rounded-[32px] p-8 flex flex-col border border-slate-100 shadow-inner">
            <h3 className="font-extrabold text-slate-900 text-[18px] mb-6 tracking-tight">Langkah Selanjutnya</h3>
            
            <div className="space-y-4 flex-1">
              {/* Looping Langkah Selanjutnya */}
              {analysisData.nextSteps.map((step) => (
                <div key={step.id} className="bg-white rounded-[24px] p-5 flex gap-4 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] hover:border-[#0B7A7D]/20 transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-[#F0F7F7] flex items-center justify-center shrink-0 group-hover:bg-[#0B7A7D] group-hover:scale-105 transition-all duration-300 shadow-sm">
                    <step.icon size={20} className="text-[#0B7A7D] group-hover:text-white transition-colors" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-[14px] group-hover:text-[#0B7A7D] transition-colors leading-tight mb-1">{step.title}</h4>
                    <p className="text-slate-500 text-[12px] font-medium leading-relaxed pr-2">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-4">
              <Link href="/facilities" className="w-full bg-[#0B7A7D] text-white rounded-full py-4 flex items-center justify-center gap-2.5 text-[14px] font-bold shadow-[0_8px_20px_rgba(11,122,125,0.25)] hover:bg-[#086163] hover:shadow-[0_4px_12px_rgba(11,122,125,0.3)] hover:-translate-y-0.5 transition-all active:scale-95">
                <Navigation size={18} strokeWidth={2.5} /> Cari Fasilitas Terdekat
              </Link>
              <button className="flex items-center justify-center gap-2 text-[#0B7A7D] font-bold text-[13px] hover:bg-[#EAF3F3] py-3 rounded-full transition-colors active:scale-95">
                <Download size={16} strokeWidth={2.5} /> Simpan Laporan (PDF)
              </button>
            </div>
          </div>

          {/* 4. Article Promo Banner */}
          <div className="relative h-[180px] rounded-[32px] overflow-hidden group cursor-pointer shrink-0 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100">
            <img 
              src={analysisData.article.img} 
              alt="Health check" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#022A2E] via-[#022A2E]/50 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white font-extrabold text-[15px] mb-2 leading-snug tracking-tight">
                {analysisData.article.title}
              </h3>
              <span className="text-[#A5D2D3] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 group-hover:text-white transition-colors">
                Pelajari <ArrowRight size={14} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ================= DISCLAIMER FOOTER ================= */}
      <div className="mt-10 flex justify-center pb-8">
        <div className="bg-[#F8FAFB] rounded-full py-3 px-6 flex items-center gap-2.5 border border-slate-200">
          <Info size={16} className="text-slate-400 shrink-0" strokeWidth={2.5} />
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 text-center">
            HASIL INI BUKAN DIAGNOSIS MEDIS FINAL. SEGERA HUBUNGI TENAGA PROFESIONAL MEDIS.
          </span>
        </div>
      </div>

    </div>
  );
}