'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Link from 'next/link';
// Import tipe data dari prisma (pastikan sudah generate prisma client)
import { ChatArchive, Message } from '@prisma/client';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Clock,
  ShieldCheck,
  CalendarDays,
  Activity,
  ArrowUpRight,
  Loader2
} from 'lucide-react';
import router from 'next/router';

// Tipe data gabungan
type ChatWithMessages = ChatArchive & {
  messages: Message[];
};

export default function MainDashboardPage() {
  const [recentChats, setRecentChats] = useState<ChatWithMessages[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch('/api/chat/history');
        const data = await res.json();
        if (data.chatArchives) {
          // Ambil 2-3 chat terakhir saja untuk dashboard
          setRecentChats(data.chatArchives.slice(0, 3));
        }
      } catch (error) {
        console.error("Gagal memuat data dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Ambil profil risiko dari chat terbaru (jika ada properti 'risk' di model Prisma kamu)
  const latestRisk = recentChats[0]?.risk || "Belum Ada Data";
  const riskColor = latestRisk === 'Tinggi' ? 'text-[#D63E3E]' : 'text-[#0B7A7D]';
  const riskBg = latestRisk === 'Tinggi' ? 'bg-[#FFF5F5]' : 'bg-[#EAF5F5]';

  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto w-full pb-12 pt-6 px-6 lg:px-8 animate-[fadeIn_0.5s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-[32px] font-extrabold text-slate-900 tracking-tight mb-1.5 leading-tight">
              Selamat Datang, <span className="text-[#0B7A7D]">CareSob!</span>
            </h1>
            <p className="text-slate-500 font-medium text-[14px]">
              Pantau metrik kesehatan dan mulai sesi konsultasi Anda.
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-slate-100">
             <CalendarDays size={16} className="text-slate-400" />
             <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">Hari Ini</span>
                <span className="text-[12px] font-bold text-slate-700 leading-none">
                  {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
             </div>
          </div>
        </div>

        {/* ================= PREMIUM BENTO GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 1. HERO CARD */}
          <div className="lg:col-span-8 bg-[#043B3D] rounded-4xl p-10 md:p-12 text-white shadow-xl relative overflow-hidden group flex flex-col justify-between min-h-80">
            <div className="absolute top-0 right-0 w-125 h-125 bg-[#0B7A7D]/40 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 opacity-50 group-hover:opacity-70 transition-opacity duration-700"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2.5 mb-8">
                <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/5 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  AI Assistant
                </div>
              </div>
              <h2 className="text-[36px] md:text-[42px] font-black leading-[1.1] mb-4 tracking-tight max-w-lg">
                Ada keluhan kesehatan hari ini?
              </h2>
              <p className="text-[#A5D2D3] text-[15px] font-medium leading-relaxed max-w-md mb-8">
                Sistem kami siap menganalisis gejala Anda secara instan berdasarkan data medis terkini.
              </p>
            </div>

            <div className="relative z-10">
              <Link href="/consultation/new" className="inline-flex items-center gap-3 bg-white text-[#043B3D] px-7 py-3.5 rounded-full font-bold text-[14px] shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 group/btn">
                <Sparkles size={16} className="text-[#0B7A7D]" />
                Mulai Chat
                <ArrowRight size={16} strokeWidth={2.5} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* 2. RISK PROFILE (Dinamis dari Chat Terbaru) */}
          <div className="lg:col-span-4 bg-white rounded-4xl p-8 border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.04)] transition-all flex flex-col justify-between group min-h-80">
            <div>
              <div className="flex justify-between items-center mb-8">
                <div className="w-10 h-10 rounded-full bg-[#F0F7F7] flex items-center justify-center text-[#0B7A7D] shrink-0">
                  <Activity size={18} strokeWidth={2.5} />
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  {recentChats[0] ? `Update ${new Date(recentChats[0].createdAt).getHours()}j Lalu` : 'No Data'}
                </span>
              </div>
              
              <h3 className="text-[18px] font-extrabold text-slate-900 mb-2 tracking-tight">Profil Risiko</h3>
              <p className="text-slate-500 text-[13px] font-medium mb-6 leading-relaxed">
                {recentChats[0] ? `Berdasarkan analisis sesi "${recentChats[0].title}"` : 'Mulai chat untuk melihat analisis risiko.'}
              </p>
              
              <div className={`${latestRisk === 'Tinggi' ? 'bg-[#FFF5F5] border-[#FFEBEB]' : 'bg-[#EAF5F5] border-[#D9EFEF]'} border rounded-2xl p-4 flex items-center justify-between transition-colors`}>
                <span className={`text-[18px] font-black ${riskColor} tracking-tight`}>
                  {latestRisk}
                </span>
                <TrendingUp size={18} className={riskColor} strokeWidth={2.5} />
              </div>
            </div>
            
            <Link href="/consultation" className="text-[#0B7A7D] text-[13px] font-bold flex items-center gap-1.5 w-fit hover:text-[#085a5d] transition-colors group/link mt-6">
              Cek Detail <ArrowUpRight size={14} strokeWidth={2.5} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* 3. REKAM MEDIS (Riwayat Chat Asli dari Database) */}
          <div className="lg:col-span-5 bg-[#F8FAFB] rounded-4xl p-8 border border-slate-100/50 shadow-inner">
            <div className="flex items-center gap-2.5 mb-8">
              <Clock size={16} className="text-slate-400" />
              <h3 className="text-[16px] font-extrabold text-slate-900 tracking-tight">Riwayat Terakhir</h3>
            </div>
            
            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-10"><Loader2 className="animate-spin text-slate-300" /></div>
              ) : recentChats.length === 0 ? (
                <p className="text-center text-slate-400 text-sm py-10 italic">Belum ada riwayat chat.</p>
              ) : (
                recentChats.map((chat) => (
                  <div 
                    key={chat.id} 
                    onClick={() => router.push(`/consultation/${chat.id}`)}
                    className="flex items-center justify-between p-4 bg-white rounded-[20px] border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:border-[#0B7A7D] transition-all cursor-pointer"
                  >
                    <div className="overflow-hidden pr-4">
                      <p className="text-[14px] font-bold text-slate-800 mb-1 truncate">{chat.title || "Health Check"}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {new Date(chat.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                    <span className={`text-[11px] font-extrabold px-3 py-1.5 rounded-lg shrink-0 ${chat.risk === 'Tinggi' ? 'text-[#D63E3E] bg-[#FFF5F5]' : 'text-[#0B7A7D] bg-[#EAF5F5]'}`}>
                      {chat.risk || "Stabil"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 4. PRIVACY */}
          <div className="lg:col-span-7 bg-white rounded-4xl p-8 md:p-10 border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center gap-8 group hover:shadow-[0_8px_40px_rgba(0,0,0,0.04)] transition-all">
            <div className="w-16 h-16 rounded-[20px] bg-[#F8FAFB] border border-slate-100 flex items-center justify-center text-[#0B7A7D] shrink-0 group-hover:scale-105 transition-transform duration-500">
              <ShieldCheck size={28} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h3 className="text-[18px] font-extrabold text-slate-900 mb-2.5 tracking-tight">Enkripsi Tingkat Medis</h3>
              <p className="text-slate-500 text-[14px] font-medium leading-relaxed mb-6 max-w-md">
                Data klinis Anda dienkripsi secara end-to-end. Kami memastikan informasi kesehatan Anda tetap menjadi milik Anda.
              </p>
              <button className="text-[#0B7A7D] text-[12px] font-black uppercase tracking-widest flex items-center gap-1.5 hover:text-[#085a5d] transition-colors group/sec">
                Baca Protokol <ArrowRight size={14} strokeWidth={2.5} className="group-hover/sec:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}