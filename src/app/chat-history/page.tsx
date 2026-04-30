import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  Plus, 
  Search, 
  Calendar as CalendarIcon, 
  SlidersHorizontal, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Download, 
  CalendarDays, 
  Clock, 
  History, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

// Data Dummy untuk Riwayat Chat agar kode lebih bersih
const chatHistoryData = [
  {
    id: 1,
    title: "Evening Glycemic Check-in",
    risk: "HIGH RISK",
    riskBadgeClass: "bg-red-100 text-red-600",
    iconBgClass: "bg-red-50",
    iconColorClass: "text-red-500",
    Icon: AlertTriangle,
    desc: "Reported symptoms: Excessive thirst, blurred vision, and frequent urination over 48 hours.",
    date: "October 24, 2026",
    time: "14:22 PM"
  },
  {
    id: 2,
    title: "Weekly Routine Follow-up",
    risk: "LOW RISK",
    riskBadgeClass: "bg-[#EAF5F5] text-[#0B7A7D]",
    iconBgClass: "bg-[#EAF5F5]",
    iconColorClass: "text-[#0B7A7D]",
    Icon: CheckCircle2,
    desc: "Monitoring established dietary changes and activity levels. Patient reports improved energy.",
    date: "October 18, 2026",
    time: "09:05 AM"
  },
  {
    id: 3,
    title: "Pre-Consultation Screening",
    risk: "MODERATE",
    riskBadgeClass: "bg-blue-100 text-blue-600",
    iconBgClass: "bg-blue-50",
    iconColorClass: "text-blue-500",
    Icon: Info,
    desc: "Symptoms of fatigue and numbness in extremities. Referred for fasting plasma glucose test.",
    date: "October 10, 2026",
    time: "11:45 AM"
  }
];

export default function ChatHistoryPage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1100px] mx-auto w-full pb-12 pt-2">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <h1 className="text-[32px] font-extrabold text-slate-900 mb-2 tracking-tight">Conversation Archive</h1>
            <p className="text-slate-500 text-[15px] font-medium leading-relaxed">
              Review your past health assessments and clinical dialogues. Your data is encrypted and used only for personalized diabetes risk monitoring.
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B7A7D] text-white text-sm font-bold shadow-[0_8px_20px_rgba(11,122,125,0.25)] hover:bg-[#086163] hover:shadow-[0_4px_12px_rgba(11,122,125,0.3)] transition-all duration-200 active:scale-95 shrink-0">
            <Plus size={18} strokeWidth={2.5} /> Start New Assessment
          </button>
        </div>

        {/* ================= SEARCH & FILTERS ================= */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-1 w-full group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400 group-focus-within:text-[#0B7A7D] transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search by symptoms or date..." 
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-800 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-[#0B7A7D] focus:ring-1 focus:ring-[#0B7A7D] shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all"
            />
          </div>
          
          {/* Filter Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3.5 rounded-full text-sm font-bold transition-colors active:scale-95">
              <CalendarIcon size={16} /> Last 30 Days
            </button>
            <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3.5 rounded-full text-sm font-bold transition-colors active:scale-95">
              <SlidersHorizontal size={16} /> Risk Level
            </button>
          </div>
        </div>

        {/* ================= HISTORY LIST ================= */}
        <div className="space-y-4 mb-8">
          {chatHistoryData.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-3xl p-6 flex flex-col md:flex-row md:items-center gap-6 border border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 group cursor-pointer"
            >
              {/* Icon Status */}
              <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${item.iconBgClass} group-hover:scale-110 transition-transform duration-300`}>
                <item.Icon size={24} className={item.iconColorClass} strokeWidth={2.5} />
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#0B7A7D] transition-colors">{item.title}</h3>
                  <span className={`text-[9px] font-black uppercase tracking-[0.1em] px-2.5 py-1 rounded-md ${item.riskBadgeClass}`}>
                    {item.risk}
                  </span>
                </div>
                <p className="text-slate-500 text-sm font-medium mb-3 line-clamp-1">{item.desc}</p>
                
                {/* Date & Time */}
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays size={14} /> {item.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} /> {item.time}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-4 md:mt-0 shrink-0 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                <button className="p-2 text-slate-400 hover:text-[#0B7A7D] hover:bg-[#EAF3F3] rounded-full transition-colors tooltip" title="Download Record">
                  <Download size={20} strokeWidth={2} />
                </button>
                <button className="px-6 py-2.5 rounded-full bg-white text-[#0B7A7D] border border-slate-200 text-sm font-bold shadow-sm hover:border-[#0B7A7D] hover:bg-[#F4F9F9] transition-all duration-200 active:scale-95 whitespace-nowrap">
                  Review Report
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= ARCHIVE PLACEHOLDER ================= */}
        <div className="rounded-[32px] border-2 border-dashed border-slate-200 bg-[#FAFCFC] p-10 flex flex-col items-center justify-center text-center group hover:bg-slate-50 transition-colors cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-slate-200/50 flex items-center justify-center mb-4 text-slate-400 group-hover:text-[#0B7A7D] group-hover:scale-110 transition-all duration-300">
            <History size={24} strokeWidth={2} />
          </div>
          <h4 className="text-lg font-extrabold text-slate-900 mb-1">Older records are archived</h4>
          <p className="text-sm text-slate-500 font-medium mb-4">Conversations from more than 6 months ago are stored in our secure long-term vault.</p>
          <button className="flex items-center gap-1.5 text-[#0B7A7D] text-sm font-bold hover:underline">
            Access Archive <ExternalLink size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* ================= BOTTOM BENTO CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
          
          {/* Education Card (7/12 width) */}
          <div className="md:col-span-7 bg-[#0A6C74] rounded-[32px] p-8 md:p-10 text-white shadow-[0_8px_30px_rgba(10,108,116,0.2)] flex flex-col justify-between">
            <div>
              <span className="bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-6 inline-block">
                PATIENT EDUCATION
              </span>
              <h3 className="text-2xl font-extrabold mb-3 tracking-tight">Understanding Risk Levels</h3>
              <p className="text-white/80 text-[15px] leading-relaxed mb-8 font-medium max-w-lg">
                Learn how CareBot analyzes your symptoms using clinical guidelines from the ADA to categorize risk levels from 'Low' to 'Critical'.
              </p>
            </div>
            <div>
              <button className="bg-white text-[#0A6C74] px-6 py-3 rounded-full text-sm font-extrabold shadow-sm hover:bg-slate-50 hover:shadow-md transition-all active:scale-95">
                Read Guide
              </button>
            </div>
          </div>

          {/* Privacy Card (5/12 width) */}
          <div className="md:col-span-5 bg-[#F2F6F6] rounded-[32px] p-8 md:p-10 flex flex-col justify-between border border-slate-100 group">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                  <ShieldCheck size={20} className="text-[#0B7A7D]" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-lg">Privacy First</h4>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">HIPAA Compliant Protocol</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed font-medium mb-6">
                Your conversation history is encrypted with AES-256 at rest. Only you and authorized medical professionals can decrypt these records.
              </p>
            </div>
            <button className="flex items-center gap-1.5 text-[#0B7A7D] text-sm font-bold group-hover:underline w-fit">
              Manage Data Preferences <ChevronRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}