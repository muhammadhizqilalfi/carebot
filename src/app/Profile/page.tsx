import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Droplet, Utensils, Calendar, ArrowRight, Sparkles, Zap, Eye } from 'lucide-react';

export default function RiskProfilePage() {
  return (
    <DashboardLayout>
      {/* Wrapper utama dengan max-width yang pas untuk Bento-grid */}
      <div className="max-w-[1200px] mx-auto w-full pb-12 pt-2">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <h1 className="text-[32px] font-extrabold text-slate-900 mb-2 tracking-tight">Risk Profile Dashboard</h1>
            <p className="text-slate-500 text-[15px] font-medium leading-relaxed">
              Advanced glycemic stability analysis based on your recent activity and clinical symptoms.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="px-6 py-2.5 rounded-full bg-slate-100 text-slate-700 text-sm font-bold border border-slate-200 hover:bg-slate-200 hover:text-slate-900 transition-all duration-200 active:scale-95">
              Export Report
            </button>
            <button className="px-6 py-2.5 rounded-full bg-[#0B7A7D] text-white text-sm font-bold shadow-[0_8px_20px_rgba(11,122,125,0.25)] hover:bg-[#086163] hover:shadow-[0_4px_12px_rgba(11,122,125,0.3)] transition-all duration-200 active:scale-95">
              Update Metrics
            </button>
          </div>
        </div>

        {/* ================= MAIN BENTO GRID ================= */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* KOLOM KIRI (Lebar 8/12) */}
          <div className="xl:col-span-8 flex flex-col gap-8">
            
            {/* 1. Current Status Card */}
            <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.03)] border border-slate-100 group transition-all duration-300 hover:shadow-[0_8px_50px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-center mb-8">
                <span className="bg-[#EAF3F3] text-[#0B7A7D] text-[11px] font-extrabold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full">
                  CURRENT STATUS
                </span>
                <span className="text-xs text-slate-400 font-semibold tracking-wide">Last updated 2 hours ago</span>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-14">
                
                {/* Fixed SVG Donut Chart */}
                <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 120 120">
                    {/* Background Track */}
                    <circle cx="60" cy="60" r="50" stroke="#F1F5F9" strokeWidth="12" fill="none" />
                    {/* Progress Fill (75% dari keliling 314) */}
                    <circle 
                      cx="60" cy="60" r="50" 
                      stroke="#0B7A7D" strokeWidth="12" fill="none" 
                      strokeDasharray="235.5 314" 
                      strokeLinecap="round" 
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  {/* Teks di tengah (Absolute Center) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <span className="text-5xl font-black text-slate-900 tracking-tight mt-1">75</span>
                    <span className="text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-1">Stability Index</span>
                  </div>
                </div>

                {/* Status Info & Metrics */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Moderate Risk</h2>
                  <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-md">
                    Your levels show high volatility during evening hours. We recommend a focused review of your late-day nutrition patterns.
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    {/* Metric Box 1 */}
                    <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 min-w-[160px] cursor-pointer hover:bg-slate-100 transition-colors">
                      <p className="text-[10px] font-extrabold text-slate-400 tracking-[0.15em] uppercase mb-1.5">AVERAGE GLUCOSE</p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-slate-900">114</span>
                        <span className="text-xs font-bold text-slate-400">MG/DL</span>
                      </div>
                    </div>
                    {/* Metric Box 2 */}
                    <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 min-w-[160px] cursor-pointer hover:bg-slate-100 transition-colors">
                      <p className="text-[10px] font-extrabold text-slate-400 tracking-[0.15em] uppercase mb-1.5">RISK TREND</p>
                      <div className="flex items-center gap-2 text-[#0B7A7D]">
                        <TrendingDownIcon />
                        <span className="text-2xl font-black">-12%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Health Status Trends Chart */}
            <div className="bg-[#F8FAFB] rounded-[32px] p-8 md:p-10 shadow-inner border border-slate-100 h-[300px] flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-[20px] mb-1">Health Status Trends</h3>
                  <p className="text-[13px] text-slate-500 font-medium">Risk level variance over the past 30 days</p>
                </div>
                {/* Interactive Toggle Pill */}
                <div className="bg-slate-200/60 rounded-full p-1.5 flex shrink-0">
                  <button className="bg-white px-6 py-2 rounded-full text-xs font-bold text-slate-800 shadow-sm transition-all">Weekly</button>
                  <button className="text-slate-500 px-6 py-2 rounded-full text-xs font-bold hover:text-slate-800 transition-all">Monthly</button>
                </div>
              </div>
              
              {/* Chart Axes (Placeholder) */}
              <div className="flex justify-between items-end mt-auto pt-10 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest px-2">
                <span className="cursor-pointer hover:text-slate-600 transition-colors">Mon</span>
                <span className="cursor-pointer hover:text-slate-600 transition-colors">Tue</span>
                <span className="cursor-pointer hover:text-slate-600 transition-colors">Wed</span>
                <span className="text-[#0B7A7D] cursor-pointer relative">
                  Thu
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#0B7A7D] rounded-full"></span>
                </span>
                <span className="cursor-pointer hover:text-slate-600 transition-colors">Fri</span>
                <span className="cursor-pointer hover:text-slate-600 transition-colors">Sat</span>
                <span className="cursor-pointer hover:text-slate-600 transition-colors">Sun</span>
              </div>
            </div>

          </div>

          {/* KOLOM KANAN (Lebar 4/12) */}
          <div className="xl:col-span-4 flex flex-col gap-8">
            
            {/* 3. Recommended Next Steps Card */}
            <div className="bg-[#0A6C74] rounded-[32px] p-8 md:p-10 text-white shadow-[0_12px_40px_rgba(10,108,116,0.3)] relative overflow-hidden flex flex-col h-[400px]">
              <Sparkles className="absolute top-8 right-8 text-[#5EC7C9]/40" size={36} strokeWidth={1.5} />
              
              <h3 className="text-2xl font-extrabold mb-8 leading-tight tracking-tight">Recommended<br/>Next Steps</h3>
              
              <div className="space-y-6 flex-1">
                {/* Step 1 */}
                <div className="flex gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                    <Droplet size={20} className="text-[#A5D2D3]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[15px] group-hover:text-[#D4F0F0] transition-colors">Schedule HbA1c Test</h4>
                    <p className="text-[12px] text-[#A5D2D3] mt-1 leading-relaxed pr-4">Required for quarterly baseline tracking.</p>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="flex gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                    <Utensils size={20} className="text-[#A5D2D3]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[15px] group-hover:text-[#D4F0F0] transition-colors">Update Meal Log</h4>
                    <p className="text-[12px] text-[#A5D2D3] mt-1 leading-relaxed pr-4">Missing dinner data for the last 3 days.</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-white text-[#0A6C74] rounded-full py-4 text-sm font-extrabold shadow-lg hover:bg-slate-50 hover:shadow-xl transition-all duration-300 active:scale-95">
                Schedule Appointment
              </button>
            </div>

            {/* 4. Key Symptoms Card */}
            <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.03)] border border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-xl mb-8 tracking-tight">Key Symptoms</h3>
              
              <div className="space-y-7">
                {/* Symptom 1 */}
                <div className="group cursor-pointer">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3 text-[14px] font-bold text-slate-800">
                       <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Zap size={14} className="text-red-500 fill-red-500" />
                       </div>
                       Fatigue
                    </div>
                    <span className="bg-red-100 text-red-600 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-[0.1em]">High</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                  </div>
                </div>
                
                {/* Symptom 2 */}
                <div className="group cursor-pointer">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3 text-[14px] font-bold text-slate-800">
                       <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Droplet size={14} className="text-[#0B7A7D] fill-[#0B7A7D]" />
                       </div>
                       Polydipsia
                    </div>
                    <span className="bg-blue-50 text-[#0B7A7D] text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-[0.1em]">Stable</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0B7A7D] w-[40%] rounded-full"></div>
                  </div>
                </div>

                {/* Symptom 3 */}
                <div className="group cursor-pointer">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3 text-[14px] font-bold text-slate-800">
                       <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Eye size={14} className="text-slate-500" />
                       </div>
                       Blurred Vision
                    </div>
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-[0.1em]">Trace</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 w-[15%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ================= BOTTOM BANNER ================= */}
          <div className="xl:col-span-12 mt-2">
            <div className="bg-gradient-to-r from-[#EBF5F5] to-[#F8FBFC] rounded-[32px] p-8 md:p-10 border border-[#DFF0F0] flex flex-col md:flex-row items-center justify-between gap-8 group cursor-pointer hover:shadow-md transition-shadow">
              <div className="max-w-3xl">
                <h3 className="text-[22px] font-extrabold text-slate-900 mb-3 tracking-tight group-hover:text-[#0B7A7D] transition-colors">Understanding Glycemic Variability</h3>
                <p className="text-[15px] text-slate-600 leading-relaxed font-medium">
                  Learn how small shifts in daily activity can dramatically stabilize your metabolic profile. Click to read the comprehensive guide.
                </p>
              </div>
              <button className="flex items-center gap-2.5 bg-white px-6 py-3 rounded-full text-[#0B7A7D] font-bold text-sm shadow-sm border border-slate-100 whitespace-nowrap group-hover:bg-[#0B7A7D] group-hover:text-white transition-all duration-300">
                Read Professional Guide 
                <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

// Icon komponen
function TrendingDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
      <polyline points="16 17 22 17 22 11"></polyline>
    </svg>
  );
}