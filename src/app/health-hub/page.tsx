'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Search, Info, AlertTriangle, Shield, Utensils, ArrowRight, X, Calendar, Tag } from 'lucide-react';

// --- DATA DUMMY ARTIKEL ---
const articlesData: Record<string, any> = {
  diabetes: {
    title: "Apa itu Diabetes?",
    category: "Dasar Kesehatan",
    date: "12 Mei 2026",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1200&auto=format&fit=crop",
    content: (
      <div className="space-y-4 text-[15px] text-slate-600 leading-relaxed">
        <p>
          Diabetes adalah kondisi medis kronis yang terjadi ketika kadar gula darah (glukosa) terlalu tinggi. Glukosa adalah sumber energi utama tubuh yang didapatkan dari makanan, dan pengaturannya dikendalikan oleh hormon insulin yang diproduksi pankreas.
        </p>
        <h4 className="text-[18px] font-extrabold text-slate-900 mt-6 mb-2">Tipe Utama Diabetes:</h4>
        <ul className="list-disc pl-5 space-y-3">
          <li><strong>Diabetes Tipe 1:</strong> Penyakit autoimun di mana sistem kekebalan tubuh menyerang sel penghasil insulin di pankreas. Biasanya didiagnosis pada anak-anak atau dewasa muda.</li>
          <li><strong>Diabetes Tipe 2:</strong> Kondisi di mana tubuh menjadi resisten terhadap insulin atau pankreas tidak menghasilkan cukup insulin. Ini menyumbang sekitar 90% dari semua kasus diabetes dan sangat berkaitan dengan gaya hidup.</li>
          <li><strong>Diabetes Gestasional:</strong> Terjadi selama masa kehamilan pada wanita yang sebelumnya tidak memiliki riwayat diabetes.</li>
        </ul>
        <div className="bg-blue-50 p-4 rounded-xl mt-6 border border-blue-100">
          <p className="text-blue-800 text-sm font-medium">
            💡 <strong>Penting:</strong> Memahami tipe diabetes adalah langkah pertama yang paling krusial untuk menentukan jenis perawatan dan manajemen gaya hidup yang tepat.
          </p>
        </div>
      </div>
    )
  },
  penyebab: {
    title: "Penyebab Utama & Faktor Risiko",
    category: "Faktor Risiko",
    date: "10 Mei 2026",
    image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=1200&auto=format&fit=crop",
    content: (
      <div className="space-y-4 text-[15px] text-slate-600 leading-relaxed">
        <p>
          Penyebab diabetes sangat bergantung pada tipenya. Namun, ada benang merah terkait faktor genetik dan lingkungan yang memicu kondisi ini.
        </p>
        <h4 className="text-[18px] font-extrabold text-slate-900 mt-6 mb-2">Faktor Risiko Terbesar (Tipe 2):</h4>
        <ul className="list-disc pl-5 space-y-3">
          <li><strong>Kelebihan Berat Badan (Obesitas):</strong> Semakin banyak jaringan lemak yang Anda miliki, semakin resisten sel tubuh Anda terhadap insulin.</li>
          <li><strong>Gaya Hidup Sedenter:</strong> Kurangnya aktivitas fisik membuat tubuh tidak membakar glukosa menjadi energi, sehingga menumpuk dalam darah.</li>
          <li><strong>Riwayat Keluarga:</strong> Risiko meningkat drastis jika orang tua atau saudara kandung memiliki diabetes.</li>
          <li><strong>Usia:</strong> Risiko diabetes tipe 2 meningkat seiring bertambahnya usia, terutama setelah usia 45 tahun.</li>
        </ul>
      </div>
    )
  },
  pencegahan: {
    title: "Cara Pencegahan Dini",
    category: "Tindakan Preventif",
    date: "08 Mei 2026",
    image: null,
    content: (
      <div className="space-y-4 text-[15px] text-slate-600 leading-relaxed">
        <p>
          Meskipun diabetes Tipe 1 belum bisa dicegah, mayoritas kasus diabetes Tipe 2 dapat dicegah atau ditunda secara signifikan dengan perubahan gaya hidup sederhana.
        </p>
        <h4 className="text-[18px] font-extrabold text-slate-900 mt-6 mb-2">Langkah Pencegahan Efektif:</h4>
        <ul className="list-disc pl-5 space-y-3">
          <li><strong>Olahraga Rutin:</strong> Lakukan aktivitas aerobik sedang (seperti jalan cepat, bersepeda, atau berenang) minimal 150 menit per minggu.</li>
          <li><strong>Turunkan Berat Badan Ekstra:</strong> Menurunkan 5% hingga 7% dari berat badan total Anda dapat mengurangi risiko diabetes secara drastis.</li>
          <li><strong>Cek Gula Darah Berkala:</strong> Lakukan skrining medis setidaknya setahun sekali, terutama jika Anda memiliki garis keturunan penderita diabetes.</li>
        </ul>
      </div>
    )
  },
  diet: {
    title: "Panduan Pola Makan Sehat",
    category: "Nutrisi & Diet",
    date: "05 Mei 2026",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop",
    content: (
      <div className="space-y-4 text-[15px] text-slate-600 leading-relaxed">
        <p>
          Manajemen nutrisi bukan berarti Anda tidak boleh makan enak. Fokus utamanya adalah mengontrol porsi dan memilih makanan yang tidak menyebabkan lonjakan gula darah secara tiba-tiba.
        </p>
        <h4 className="text-[18px] font-extrabold text-slate-900 mt-6 mb-2">Prinsip Piring Makanku:</h4>
        <ul className="list-disc pl-5 space-y-3">
          <li><strong>50% Sayuran Non-Pati:</strong> Penuhi setengah piring dengan bayam, brokoli, tomat, atau sayuran hijau lainnya. Kaya serat dan rendah kalori.</li>
          <li><strong>25% Protein Tanpa Lemak:</strong> Pilih ayam tanpa kulit, ikan, telur, tahu, atau tempe.</li>
          <li><strong>25% Karbohidrat Kompleks:</strong> Gunakan beras merah, gandum utuh, oat, atau ubi jalar. Hindari karbohidrat olahan seperti roti putih dan nasi putih berlebih.</li>
        </ul>
      </div>
    )
  }
};

export default function HealthHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  // Logika Filter Pencarian
  const isVisible = (keywords: string) => {
    if (!searchQuery) return true;
    return keywords.toLowerCase().includes(searchQuery.toLowerCase());
  };

  // Pengecekan jika semua card terfilter/hilang
  const hasVisibleCards = 
    isVisible("apa itu diabetes dasar kondisi metabolisme tipe 1 tipe 2") ||
    isVisible("penyebab utama faktor genetik gaya hidup sedenter pola makan") ||
    isVisible("cara pencegahan dini aktivitas fisik pemantauan") ||
    isVisible("pola makan sehat menu seimbang indeks glikemik");

  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto w-full pb-12 pt-2 relative">
        
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari topik kesehatan..." 
              className="w-full pl-11 pr-4 py-3.5 bg-slate-100 border-none rounded-2xl text-[14px] font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B7A7D]/20 shadow-sm transition-all"
            />
          </div>
        </div>

        {/* ================= EMPTY STATE (JIKA PENCARIAN TIDAK KETEMU) ================= */}
        {!hasVisibleCards && (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[32px] border border-slate-100 border-dashed">
            <Search size={48} className="text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-700 mb-1">Topik Tidak Ditemukan</h3>
            <p className="text-slate-500 text-sm">Coba gunakan kata kunci lain untuk mencari artikel.</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-6 px-6 py-2 bg-white text-[#0B7A7D] font-bold text-sm rounded-full shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Reset Pencarian
            </button>
          </div>
        )}

        {/* ================= BENTO GRID SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Apa itu Diabetes? */}
          {isVisible("apa itu diabetes dasar kondisi metabolisme tipe 1 tipe 2") && (
            <div 
              onClick={() => setSelectedArticle(articlesData.diabetes)}
              className="lg:col-span-2 bg-white rounded-[32px] p-2 flex flex-col sm:flex-row border border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.02)] group hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer"
            >
              <div className="w-full sm:w-1/2 h-[250px] sm:h-auto rounded-[24px] overflow-hidden bg-slate-800 relative shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop" 
                  alt="Molecule" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
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
          )}

          {/* Card 2: Penyebab Utama */}
          {isVisible("penyebab utama faktor genetik gaya hidup sedenter pola makan") && (
            <div 
              onClick={() => setSelectedArticle(articlesData.penyebab)}
              className="lg:col-span-1 bg-[#F5F9F9] rounded-[32px] p-8 border border-slate-100 flex flex-col group hover:bg-[#EFF6F6] transition-colors cursor-pointer relative overflow-hidden h-[380px]"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-6 shrink-0 group-hover:scale-110 transition-transform">
                <AlertTriangle size={20} className="text-blue-600" strokeWidth={2.5} />
              </div>
              <h3 className="text-[20px] font-extrabold text-slate-900 mb-3 tracking-tight">Penyebab Utama</h3>
              <p className="text-slate-500 text-[14px] leading-relaxed font-medium mb-6 relative z-10">
                Faktor genetik, gaya hidup sedenter, dan pola makan tidak teratur menjadi pemicu utama risiko kesehatan.
              </p>
              <div className="mt-auto h-32 w-full rounded-[20px] overflow-hidden relative">
                 <img 
                  src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=800&auto=format&fit=crop" 
                  alt="Heartbeat" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply"></div>
              </div>
            </div>
          )}

          {/* Card 3: Cara Pencegahan Dini */}
          {isVisible("cara pencegahan dini aktivitas fisik pemantauan") && (
            <div 
              onClick={() => setSelectedArticle(articlesData.pencegahan)}
              className="lg:col-span-1 bg-white rounded-[32px] p-8 border border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.02)] flex flex-col group hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer h-[380px]"
            >
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
          )}

          {/* Card 4: Pola Makan Sehat */}
          {isVisible("pola makan sehat menu seimbang indeks glikemik") && (
            <div 
              onClick={() => setSelectedArticle(articlesData.diet)}
              className="lg:col-span-2 bg-[#0A6C74] rounded-[32px] p-2 flex flex-col sm:flex-row shadow-[0_8px_30px_rgba(10,108,116,0.2)] group hover:shadow-[0_12px_40px_rgba(10,108,116,0.3)] transition-all duration-300 h-auto sm:h-[380px] overflow-hidden cursor-pointer relative"
            >
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
              <div className="w-full sm:w-1/2 h-[200px] sm:h-full rounded-[24px] overflow-hidden bg-slate-800 relative shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop" 
                  alt="Healthy Food" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0A6C74]/50 hidden sm:block"></div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ================= MODAL OVERLAY (POPUP ARTIKEL) ================= */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedArticle(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white shadow-sm transition-all"
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            {/* Header Image (If Exists) */}
            {selectedArticle.image && (
              <div className="w-full h-64 shrink-0 bg-slate-100 relative">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-8 right-8">
                  <div className="flex gap-3 mb-3">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-white bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                      <Tag size={12} /> {selectedArticle.category}
                    </span>
                  </div>
                  <h2 className="text-[28px] sm:text-[32px] font-extrabold text-white leading-tight">
                    {selectedArticle.title}
                  </h2>
                </div>
              </div>
            )}

            {/* Content Body */}
            <div className="p-8 sm:p-10 overflow-y-auto">
              {/* Header Texts (If no image) */}
              {!selectedArticle.image && (
                <div className="mb-8">
                  <div className="flex gap-3 mb-4">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-[#0B7A7D] bg-[#EAF3F3] px-3 py-1.5 rounded-full">
                      <Tag size={12} /> {selectedArticle.category}
                    </span>
                  </div>
                  <h2 className="text-[28px] sm:text-[32px] font-extrabold text-slate-900 leading-tight">
                    {selectedArticle.title}
                  </h2>
                </div>
              )}

              {/* Meta Date */}
              <div className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-8 pb-6 border-b border-slate-100">
                <Calendar size={16} />
                Dipublikasikan: {selectedArticle.date}
              </div>

              {/* Article Text Component */}
              <div className="prose prose-slate max-w-none">
                {selectedArticle.content}
              </div>

            </div>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}