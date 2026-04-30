import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Search, Info, AlertTriangle, Shield, Utensils, ArrowRight } from 'lucide-react';

export default function HealthHubPage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto w-full pb-12 pt-2">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <h1 className="text-[36px] font-extrabold text-slate-900 mb-2 tracking-tight">Health Education Hub</h1>
            <p className="text-slate-500 text-[15px] font-medium leading-relaxed max-w-xl">
              Eksplorasi panduan kesehatan terpercaya untuk manajemen diabetes dan gaya hidup sehat.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80 shrink-0 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400 group-focus-within:text-[#0B7A7D] transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Cari topik kesehatan..." 
              className="w-full pl-11 pr-4 py-3.5 bg-slate-100 border-none rounded-2xl text-[14px] font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B7A7D]/20 shadow-sm transition-all"
            />
          </div>
        </div>

        {/* ================= BENTO GRID SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Apa itu Diabetes? (Lebar 2 Kolom) */}
          <div className="lg:col-span-2 bg-white rounded-[32px] p-2 flex flex-col sm:flex-row border border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.02)] group hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer">
            {/* Image Section */}
            <div className="w-full sm:w-1/2 h-[250px] sm:h-auto rounded-[24px] overflow-hidden bg-slate-800 relative shrink-0">
              {/* Gunakan gambar asli Anda di sini. Ini URL placeholder yang mirip desain. */}
              <img 
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop" 
                alt="Molecule" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            {/* Content Section */}
            <div className="w-full sm:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
              <div className="w-12 h-12 rounded-full bg-[#C8F1ED] flex items-center justify-center mb-6 shrink-0 group-hover:scale-110 transition-transform">
                <Info size={20} className="text-[#0B7A7D]" strokeWidth={2.5} />
              </div>
              <h2 className="text-[24px] font-extrabold text-slate-900 mb-3 tracking-tight group-hover:text-[#0B7A7D] transition-colors">Apa itu Diabetes?</h2>
              <p className="text-slate-500 text-[14px] leading-relaxed mb-8 font-medium">
                Pahami dasar-dasar kondisi metabolisme ini, perbedaan antara Tipe 1 dan Tipe 2, serta bagaimana dampaknya pada tubuh Anda.
              </p>
              <div className="mt-auto flex items-center gap-2 text-[#0B7A7D] text-[14px] font-bold">
                Baca Selengkapnya <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Card 2: Penyebab Utama (Lebar 1 Kolom) */}
          <div className="lg:col-span-1 bg-[#F5F9F9] rounded-[32px] p-8 border border-slate-100 flex flex-col group hover:bg-[#EFF6F6] transition-colors cursor-pointer relative overflow-hidden h-[380px]">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-6 shrink-0 group-hover:scale-110 transition-transform">
              <AlertTriangle size={20} className="text-blue-600" strokeWidth={2.5} />
            </div>
            <h3 className="text-[20px] font-extrabold text-slate-900 mb-3 tracking-tight">Penyebab Utama</h3>
            <p className="text-slate-500 text-[14px] leading-relaxed font-medium mb-6 relative z-10">
              Faktor genetik, gaya hidup sedenter, dan pola makan tidak teratur menjadi pemicu utama risiko kesehatan.
            </p>
            {/* Image Background at bottom */}
            <div className="mt-auto h-32 w-full rounded-[20px] overflow-hidden relative">
               <img 
                src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=800&auto=format&fit=crop" 
                alt="Heartbeat" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply"></div>
            </div>
          </div>

          {/* Card 3: Cara Pencegahan Dini (Lebar 1 Kolom) */}
          <div className="lg:col-span-1 bg-white rounded-[32px] p-8 border border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.02)] flex flex-col group hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer h-[380px]">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Shield size={20} className="text-slate-600" strokeWidth={2.5} />
              </div>
              <span className="bg-[#EAF3F3] text-[#0B7A7D] text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
                PENTING
              </span>
            </div>
            <h3 className="text-[20px] font-extrabold text-slate-900 mb-3 tracking-tight group-hover:text-[#0B7A7D] transition-colors">Cara Pencegahan Dini</h3>
            <p className="text-slate-500 text-[14px] leading-relaxed font-medium">
              Deteksi dini adalah kunci. Pelajari langkah preventif melalui aktivitas fisik dan pemantauan kesehatan rutin.
            </p>
          </div>

          {/* Card 4: Pola Makan Sehat (Lebar 2 Kolom) */}
          <div className="lg:col-span-2 bg-[#0A6C74] rounded-[32px] p-2 flex flex-col sm:flex-row shadow-[0_8px_30px_rgba(10,108,116,0.2)] group hover:shadow-[0_12px_40px_rgba(10,108,116,0.3)] transition-all duration-300 h-auto sm:h-[380px] overflow-hidden cursor-pointer relative">
            {/* Content Section */}
            <div className="w-full sm:w-1/2 p-8 sm:p-10 flex flex-col justify-between relative z-10">
              <div>
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-6 shrink-0 group-hover:bg-white/30 transition-colors">
                  <Utensils size={20} className="text-white" strokeWidth={2.5} />
                </div>
                <h2 className="text-[26px] font-extrabold text-white mb-3 tracking-tight">Pola Makan Sehat</h2>
                <p className="text-white/80 text-[14px] leading-relaxed font-medium max-w-sm mb-8">
                  Menu seimbang dengan indeks glikemik rendah untuk menjaga kestabilan gula darah setiap hari.
                </p>
              </div>
              <button className="bg-white text-[#0A6C74] w-fit px-8 py-3.5 rounded-full text-[14px] font-extrabold shadow-sm hover:bg-slate-50 hover:shadow-md transition-all active:scale-95">
                Lihat Rekomendasi
              </button>
            </div>
            {/* Image Section */}
            <div className="w-full sm:w-1/2 h-[200px] sm:h-full rounded-[24px] overflow-hidden bg-slate-800 relative shrink-0">
               {/* Gunakan gambar asli Anda di sini. Ini URL placeholder yang mirip desain. */}
              <img 
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop" 
                alt="Healthy Food" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
               <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0A6C74]/50 hidden sm:block"></div>
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}