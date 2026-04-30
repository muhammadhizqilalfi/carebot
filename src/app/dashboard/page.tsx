'use client';

import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Link from 'next/link';
import { 
  MessageSquarePlus, 
  Activity, 
  Calendar, 
  ArrowRight, 
  User, 
  Sparkles, 
  TrendingUp, 
  Clock,
  ShieldCheck
} from 'lucide-react';

export default function MainDashboardPage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto w-full pb-12 pt-4 px-6 lg:px-8 animate-[fadeIn_0.5s_ease-out]">
        
        {/* ================= WELCOME SECTION ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-[34px] font-black text-slate-900 tracking-tight mb-2">
              Selamat Datang, <span className="text-[#0B7A7D]">CareSob!</span>
            </h1>
            <p className="text-slate-500 font-medium text-[15px]">
              Pantau kesehatan diabetes Anda dan konsultasikan keluhan Anda hari ini.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
             <div className="w-10 h-10 rounded-xl bg-[#F0F7F7] flex items-center justify-center text-[#0B7A7D]">
                <Calendar size={20} />
             </div>
             <div className="pr-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hari Ini</p>
                <p className="text-sm font-bold text-slate-800">30 April, 2026</p>
             </div>
          </div>
        </div>

        {/* ================= MAIN BENTO GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-7">
          
          {/* 1. HERO CALL TO ACTION (Lebar 8/12) */}
          <div className="md:col-span-8 bg-gradient-to-br from-[#0B7A7D] to-[#075355] rounded-[32px] p-10 md:p-12 text-white shadow-[0_20px_50px_rgba(11,122,125,0.2)] relative overflow-hidden group">
            {/* Dekorasi Background */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-700"></div>
            
            <div className="relative z-10 max-w-lg">
              <div className="flex items-center gap-2 mb-6">
                <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest">
                  AI Assistant
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              </div>
              
              <h2 className="text-[38px] md:text-[46px] font-black leading-[1.1] mb-6 tracking-tight">
                Ada keluhan kesehatan hari ini?
              </h2>
              <p className="text-[#D4EDED] text-lg font-medium mb-10 leading-relaxed">
                Ceritakan gejala yang Anda rasakan pada CareBot. Kami akan membantu menganalisis risiko awal secara instan.
              </p>
              
              <Link href="/consultation/chat" className="inline-flex items-center gap-3 bg-white text-[#0B7A7D] px-8 py-4 rounded-full font-black text-[15px] shadow-xl hover:bg-[#F0F7F7] hover:-translate-y-1 transition-all active:scale-95 group">
                <MessageSquarePlus size={20} strokeWidth={2.5} />
                Mulai Konsultasi
                <ArrowRight size={18} strokeWidth={3} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>

            {/* Ilustrasi Dekoratif Sederhana */}
            <div className="absolute bottom-10 right-10 opacity-20 hidden lg:block">
               <Sparkles size={120} strokeWidth={1} />
            </div>
          </div>

          {/* 2. RINGKASAN RISIKO (Lebar 4/12) */}
          <div className="md:col-span-4 bg-white rounded-[32px] p-8 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col justify-between group hover:shadow-lg transition-all">
            <div>
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#F0F7F7] flex items-center justify-center text-[#0B7A7D] group-hover:scale-110 transition-transform">
                  <Activity size={24} strokeWidth={2.5} />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Update 2j Lalu</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">Profil Risiko Anda</h3>
              <p className="text-slate-500 text-sm font-medium mb-6">Terakhir dianalisis berdasarkan gejala lelah.</p>
              
              <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-4 mb-4">
                <div className="text-2xl font-black text-red-600">Tinggi</div>
                <TrendingUp size={20} className="text-red-500" />
              </div>
            </div>
            
            <Link href="/Profile" className="text-[#0B7A7D] text-sm font-bold flex items-center gap-1.5 hover:underline">
              Lihat Detail Analisis <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>

          {/* 3. REKAM MEDIS TERBARU (Lebar 5/12) */}
          <div className="md:col-span-5 bg-white rounded-[32px] p-8 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all">
            <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <Clock size={20} className="text-slate-400" /> Riwayat Terakhir
            </h3>
            
            <div className="space-y-4">
              {[
                { label: 'Evening Check-in', date: '28 Apr', status: 'Risiko Tinggi' },
                { label: 'Weekly Follow-up', date: '21 Apr', status: 'Risiko Rendah' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.label}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{item.date}</p>
                  </div>
                  <span className="text-[10px] font-black text-[#0B7A7D] bg-white px-3 py-1 rounded-lg shadow-sm">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. PRIVACY & SECURITY (Lebar 7/12) */}
          <div className="md:col-span-7 bg-[#F4F9F9] rounded-[32px] p-8 md:p-10 border border-[#E0EDED] flex flex-col md:flex-row items-center gap-8 group">
            <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-[#0B7A7D] shadow-sm shrink-0 group-hover:rotate-6 transition-transform">
              <ShieldCheck size={40} strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">Data Anda Aman & Terenkripsi</h3>
              <p className="text-slate-600 text-sm font-medium leading-relaxed mb-4">
                Kami menggunakan standar enkripsi AES-256 untuk menjaga privasi riwayat medis Anda. Hanya Anda dan tenaga medis terverifikasi yang dapat mengakses data ini.
              </p>
              <button className="text-[#0B7A7D] text-xs font-black uppercase tracking-widest hover:underline">
                Pelajari Protokol Keamanan
              </button>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}