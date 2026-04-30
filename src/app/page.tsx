import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Lock, Award, ArrowRight } from 'lucide-react'; // Menggunakan Lucide untuk icon

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F4F9FB] flex items-center justify-center p-6 font-sans">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Kolom Kiri: Visual & Gambar */}
        <div className="relative flex justify-center">
          {/* Bingkai Putih dengan Shadow */}
          <div className="relative bg-white p-4 rounded-[40px] shadow-2xl shadow-blue-100 overflow-visible max-w-sm md:max-w-md">
            <div className="rounded-[30px] overflow-hidden">
              {/* Ganti src dengan path gambar Anda */}
              <img 
                src="./dokter.jpg" 
                alt="Doctor Illustration" 
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Floating Card: Status Kesehatan */}
            <div className="absolute -bottom-6 -left-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white flex items-center space-x-4">
              <div className="bg-cyan-100 p-2 rounded-lg">
                <div className="w-6 h-6 bg-cyan-600 rounded-sm flex items-center justify-center text-[10px] text-white">
                  📊
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Status Kesehatan</p>
                <p className="text-cyan-900 font-bold text-sm">Akurat & Personal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Konten Teks */}
        <div className="space-y-8">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
              Sistem Kesehatan AI Aktif
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight">
              Halo, saya <span className="text-[#136E77]">CareBot.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-md">
              Teman deteksi dini diabetes Anda. Mari jaga kesehatan masa depan Anda mulai hari ini.
            </p>
          </div>

          <Link href="/dashboard" className="inline-flex items-center space-x-3 bg-[#136E77] hover:bg-[#0e565d] text-white px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-cyan-900/20 group">
            <span className="font-semibold">Mulai Konsultasi</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Fitur / Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
            <div className="flex items-center space-x-2 text-slate-500">
              <ShieldCheck size={18} className="text-cyan-600" />
              <span className="text-xs font-medium">Verified health info</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-500">
              <Lock size={18} className="text-cyan-600" />
              <span className="text-xs font-medium">Data terenkripsi</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-500">
              <Award size={18} className="text-cyan-600" />
              <span className="text-xs font-medium">AI Medis Terpercaya</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Copyright */}
      <footer className="absolute bottom-8 w-full text-center">
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">
          Kelompok 2 &copy; 2026
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;