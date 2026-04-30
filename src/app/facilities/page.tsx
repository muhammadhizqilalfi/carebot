'use client'; // Wajib karena kita sekarang menggunakan state untuk hover map

import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  Search, 
  Bell, 
  User, 
  Filter, 
  Star, 
  CheckCircle2, 
  Info, 
  Crosshair, 
  Plus, 
  Minus, 
  Asterisk,
  BriefcaseMedical,
  Microscope,
  Building2,
  Map as MapIcon
} from 'lucide-react';

// --- DATA DUMMY KLINIK (SIAP UNTUK INTEGRASI BACKEND API) ---
// Backend tim Anda tinggal mengirimkan JSON dengan struktur seperti ini
const clinicsData = [
  {
    id: 1,
    name: "City Health Center",
    distance: "0.8 mi",
    statusText: "OPEN NOW",
    statusColor: "text-[#0B7A7D]",
    statusDot: "bg-[#0B7A7D]",
    nextAvail: "Next at 2:00 PM",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=300&auto=format&fit=crop",
    // Map Marker specific data:
    mapPos: { top: '35%', left: '25%' }, // Posisi koordinat di map (Placeholder persentase)
    icon: Building2,
    isTopRated: true,
    specialist: "A1C & Glucose Specialist",
    rating: 4.8,
    reviews: "1,248",
    desc: "Full-service laboratory offering non-fasting glucose testing and endocrinology consultations."
  },
  {
    id: 2,
    name: "Rapid Diagnostics Lab",
    distance: "1.4 mi",
    statusText: "WALK-INS OK",
    statusColor: "text-slate-600",
    statusDot: "bg-slate-400",
    nextAvail: "15 min wait",
    img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=300&auto=format&fit=crop",
    // Map Marker specific data:
    mapPos: { top: '55%', left: '65%' },
    icon: BriefcaseMedical,
    isTopRated: false,
    specialist: "Clinical Pathology",
    rating: 4.5,
    reviews: "856",
    desc: "Fast and accurate blood screening facility equipped with modern auto-analyzers."
  },
  {
    id: 3,
    name: "Pacific Endo Clinic",
    distance: "2.1 mi",
    statusText: "BUSY",
    statusColor: "text-red-600",
    statusDot: "bg-red-500",
    nextAvail: "Appt Only",
    img: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=300&auto=format&fit=crop",
    // Map Marker specific data:
    mapPos: { top: '75%', left: '50%' },
    icon: Microscope,
    isTopRated: false,
    specialist: "Endocrinology Specialist",
    rating: 4.9,
    reviews: "2,104",
    desc: "Specialized clinic focusing on hormonal imbalances and advanced diabetes management."
  }
];

export default function FacilitiesPage() {
  // State untuk melacak ID klinik mana yang sedang di-hover pada peta
  const [hoveredClinicId, setHoveredClinicId] = useState<number | null>(null);

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-2rem)] w-full max-w-[1600px] mx-auto pt-4 pb-6">
        
        {/* ================= HEADER SECTION ================= */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
          <h1 className="text-[28px] font-extrabold text-[#0B7A7D] tracking-tight">Nearby Facilities</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative w-full md:w-80 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400 group-focus-within:text-[#0B7A7D] transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Search clinics by name..." 
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0B7A7D] focus:ring-1 focus:ring-[#0B7A7D] shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all"
              />
            </div>
            <button className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-[#0B7A7D] hover:bg-slate-50 transition-colors shadow-sm active:scale-95">
              <Bell size={18} />
            </button>
            <button className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-[#0B7A7D] hover:bg-slate-50 transition-colors shadow-sm active:scale-95">
              <User size={18} />
            </button>
          </div>
        </header>

        {/* ================= MAIN CONTENT SPLIT ================= */}
        <div className="flex flex-col lg:flex-row flex-1 gap-6 min-h-0">
          
          {/* ---------------- KIRI: MAP AREA ---------------- */}
          <div className="flex-1 relative bg-[#708A8B] rounded-[32px] overflow-hidden shadow-inner group flex flex-col">
            
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                 style={{ 
                   backgroundImage: 'linear-gradient(#ffffff 1.5px, transparent 1.5px), linear-gradient(90deg, #ffffff 1.5px, transparent 1.5px)', 
                   backgroundSize: '40px 40px' 
                 }}>
            </div>
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0%" y1="0%" x2="100%" y2="100%" stroke="white" strokeWidth="2" />
              <line x1="100%" y1="20%" x2="20%" y2="100%" stroke="white" strokeWidth="3" />
              <line x1="40%" y1="0%" x2="80%" y2="100%" stroke="white" strokeWidth="1.5" />
            </svg>

            {/* --- DYNAMIC MAP MARKERS --- 
                Di sinilah data di-mapping. Nanti mapbox/leaflet tinggal dirender di bawah ini 
            */}
            {clinicsData.map((clinic) => (
              <div 
                key={clinic.id} 
                className="absolute z-10 flex flex-col items-center"
                style={{ top: clinic.mapPos.top, left: clinic.mapPos.left }}
                onMouseEnter={() => setHoveredClinicId(clinic.id)}
                onMouseLeave={() => setHoveredClinicId(null)}
              >
                
                {/* 1. Detail Popup Card (Hanya muncul jika di-hover) */}
                <div className={`absolute bottom-full mb-4 w-[320px] bg-white rounded-[24px] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all duration-200 origin-bottom pointer-events-none ${
                  hoveredClinicId === clinic.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 translate-y-2'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    {clinic.isTopRated ? (
                      <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">TOP RATED</span>
                    ) : (
                      <span></span> // Spacer jika tidak ada badge
                    )}
                    <span className="bg-[#EAF5F5] text-[#0B7A7D] text-[11px] font-extrabold px-3 py-1 rounded-md">{clinic.distance}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-1.5 leading-tight">{clinic.name}</h3>
                  <div className="flex items-center gap-1.5 text-[13px] font-bold text-slate-700 mb-3">
                    <CheckCircle2 size={16} className="text-[#0B7A7D]" strokeWidth={2.5} /> {clinic.specialist}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.floor(clinic.rating) ? "fill-yellow-400 text-yellow-400" : "fill-slate-200 text-slate-200"} />
                    ))}
                    <span className="text-xs text-slate-500 font-bold ml-1.5">({clinic.reviews} reviews)</span>
                  </div>
                  
                  <p className="text-[13px] text-slate-500 leading-relaxed font-medium mb-5">
                    {clinic.desc}
                  </p>
                  
                  {/* Tombol Book (Pointer events diaktifkan kembali khusus untuk tombol jika user mau klik cepat) */}
                  <button className="w-full py-3 bg-[#0B7A7D] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#086163] transition-colors active:scale-95 pointer-events-auto">
                    Book Appointment
                  </button>
                  
                  {/* Panah bawah (Tail) dari Popup */}
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 bg-white transform rotate-45 shadow-[4px_4px_10px_rgba(0,0,0,0.05)] rounded-sm"></div>
                </div>

                {/* 2. Map Marker Icon (Bulat) */}
                <div className={`w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg border-[3px] border-[#0B7A7D] cursor-pointer transition-transform duration-300 ${
                  hoveredClinicId === clinic.id ? 'scale-110 shadow-xl z-20' : ''
                }`}>
                  <clinic.icon size={18} className="text-[#0B7A7D]" strokeWidth={2.5} />
                </div>

                {/* 3. Map Marker Label (Pill nama klinik) */}
                <div className={`bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-extrabold text-slate-800 shadow-sm mt-2 whitespace-nowrap transition-colors ${
                  hoveredClinicId === clinic.id ? 'bg-[#0B7A7D] text-white shadow-md' : ''
                }`}>
                  {clinic.name}
                </div>
              </div>
            ))}

            {/* --- MAP CONTROLS (Static Overlay) --- */}
            <div className="absolute bottom-6 left-6 flex flex-col gap-3 z-30">
              <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-700 shadow-lg hover:text-[#0B7A7D] hover:bg-slate-50 transition-colors active:scale-95">
                <Crosshair size={20} strokeWidth={2.5} />
              </button>
              <div className="bg-white rounded-[20px] shadow-lg flex flex-col overflow-hidden">
                <button className="w-12 h-12 flex items-center justify-center text-slate-700 hover:text-[#0B7A7D] hover:bg-slate-50 transition-colors border-b border-slate-100 active:bg-slate-100">
                  <Plus size={20} strokeWidth={2.5} />
                </button>
                <button className="w-12 h-12 flex items-center justify-center text-slate-700 hover:text-[#0B7A7D] hover:bg-slate-50 transition-colors active:bg-slate-100">
                  <Minus size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <button className="absolute bottom-6 right-6 w-14 h-14 bg-[#0A6C74] rounded-full flex items-center justify-center text-white shadow-[0_8px_20px_rgba(10,108,116,0.3)] hover:scale-105 transition-transform z-30">
              <Asterisk size={24} strokeWidth={3} />
            </button>
          </div>

          {/* ---------------- KANAN: CLINICS LIST & DETAILS ---------------- */}
          <div className="w-full lg:w-[400px] xl:w-[420px] bg-white rounded-[32px] border border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.02)] flex flex-col h-full shrink-0">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center shrink-0">
              <h2 className="text-[20px] font-extrabold text-slate-900 tracking-tight">Clinics Near You</h2>
              <button className="flex items-center gap-1.5 text-[#0B7A7D] text-sm font-bold hover:bg-[#EAF5F5] px-3 py-1.5 rounded-lg transition-colors active:scale-95">
                <Filter size={16} strokeWidth={2.5} /> Filter
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Me-loop data yang sama untuk List view */}
              {clinicsData.map((clinic) => (
                <div 
                  key={`list-${clinic.id}`} 
                  // Effect ketika list dihover, akan men-trigger marker di map juga (Opsional UX yang bagus)
                  onMouseEnter={() => setHoveredClinicId(clinic.id)}
                  onMouseLeave={() => setHoveredClinicId(null)}
                  className={`bg-white border rounded-3xl p-4 transition-all duration-300 group cursor-pointer ${
                    hoveredClinicId === clinic.id ? 'border-[#0B7A7D] shadow-[0_8px_30px_rgba(11,122,125,0.1)]' : 'border-slate-100 hover:shadow-lg'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                      <img src={clinic.img} alt={clinic.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`font-extrabold text-[15px] transition-colors leading-tight ${hoveredClinicId === clinic.id ? 'text-[#0B7A7D]' : 'text-slate-900 group-hover:text-[#0B7A7D]'}`}>
                          {clinic.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap ml-2">{clinic.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                         <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${clinic.statusDot}`}></span>
                            <span className={`text-[9px] font-black uppercase tracking-wider ${clinic.statusColor}`}>
                              {clinic.statusText}
                            </span>
                         </div>
                         <span className="text-[11px] text-slate-500 font-medium">• {clinic.nextAvail}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-5">
                    <button className="flex-1 py-2.5 bg-slate-50 text-slate-700 text-xs font-extrabold rounded-xl hover:bg-slate-100 transition-colors active:scale-95">
                      View Details
                    </button>
                    <button className="flex-1 py-2.5 bg-[#EAF5F5] text-[#0B7A7D] text-xs font-extrabold rounded-xl hover:bg-[#DDF0F0] transition-colors active:scale-95">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}

              {/* Pro Tip Card */}
              <div className="bg-[#F0F7F7] rounded-3xl p-6 border border-[#E0EDED] mt-4">
                <div className="flex items-center gap-2 text-[#0B7A7D] mb-2.5">
                  <Info size={18} strokeWidth={2.5} />
                  <span className="text-xs font-black uppercase tracking-widest">PRO TIP</span>
                </div>
                <p className="text-slate-600 text-[13px] leading-relaxed font-medium">
                  Fasting for 8-12 hours is usually required for an accurate glucose test. Check with the clinic before your visit.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 shrink-0 bg-white rounded-b-[32px] z-10">
              <button className="w-full flex justify-center items-center gap-2 py-3.5 bg-white border border-slate-200 text-slate-800 text-sm font-extrabold rounded-full shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95">
                <MapIcon size={18} strokeWidth={2.5} /> View List as Fullscreen
              </button>
            </div>

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}