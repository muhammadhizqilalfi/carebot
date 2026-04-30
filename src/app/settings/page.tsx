'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  User, 
  Shield, 
  Bell, 
  HelpCircle, 
  ExternalLink, 
  Download,
  Save,
  RotateCcw
} from 'lucide-react';

export default function SettingsPage() {
  // State sederhana untuk toggle (siap dihubungkan ke backend)
  const [settings, setStatus] = useState({
    encryption: true,
    dataSharing: false,
    reminders: true,
    alerts: true,
    insights: false
  });

  return (
    <DashboardLayout>
      <div className="max-w-[1100px] mx-auto w-full pb-20 pt-4 px-6 lg:px-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <div className="mb-10">
          <h1 className="text-[34px] font-black text-slate-900 mb-2.5 tracking-tight">Settings</h1>
          <p className="text-slate-500 text-[15px] font-medium leading-relaxed">
            Manage your health data, security preferences, and account details.
          </p>
        </div>

        {/* ================= MAIN BENTO GRID ================= */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-7 items-start">
          
          {/* ---------------- LEFT COLUMN: PROFILE (8/12) ---------------- */}
          <div className="xl:col-span-8 space-y-7">
            
            {/* PROFILE SECTION */}
            <div className="bg-white rounded-[32px] p-8 md:p-10 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF5F5] flex items-center justify-center text-[#0B7A7D]">
                  <User size={24} strokeWidth={2.5} />
                </div>
                <h2 className="text-[22px] font-extrabold text-slate-900 tracking-tight">Profile</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue="Sarah Jenkins"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-[#0B7A7D]/10 focus:border-[#0B7A7D] outline-none transition-all"
                  />
                </div>
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="sarah.j@health.com"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-[#0B7A7D]/10 focus:border-[#0B7A7D] outline-none transition-all"
                  />
                </div>

                {/* Sub Grid for Stats */}
                <div className="md:col-span-2 grid grid-cols-3 gap-4 mt-2">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Age</label>
                    <div className="relative">
                      <input type="number" defaultValue="34" className="w-full pl-5 pr-12 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:bg-white outline-none transition-all" />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase">YRS</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Weight</label>
                    <div className="relative">
                      <input type="number" defaultValue="68" className="w-full pl-5 pr-12 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:bg-white outline-none transition-all" />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase">KG</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Height</label>
                    <div className="relative">
                      <input type="number" defaultValue="172" className="w-full pl-5 pr-12 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:bg-white outline-none transition-all" />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase">CM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* LOWER ROW: PRIVACY & NOTIFICATIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              
              {/* PRIVACY BOX */}
              <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                    <Shield size={20} />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Privacy</h3>
                </div>

                <div className="space-y-5 flex-1">
                  {/* Item 1 */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                    <div className="pr-4">
                      <p className="text-[14px] font-bold text-slate-800">End-to-End Encryption</p>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">Protect your medical transcripts</p>
                    </div>
                    <button 
                      onClick={() => setStatus({...settings, encryption: !settings.encryption})}
                      className={`w-11 h-6 rounded-full transition-colors relative ${settings.encryption ? 'bg-[#0B7A7D]' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.encryption ? 'left-6' : 'left-1'}`}></div>
                    </button>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                    <div className="pr-4">
                      <p className="text-[14px] font-bold text-slate-800">Anonymous Data Sharing</p>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">Help improve clinical detection</p>
                    </div>
                    <button 
                      onClick={() => setStatus({...settings, dataSharing: !settings.dataSharing})}
                      className={`w-11 h-6 rounded-full transition-colors relative ${settings.dataSharing ? 'bg-[#0B7A7D]' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.dataSharing ? 'left-6' : 'left-1'}`}></div>
                    </button>
                  </div>
                </div>

                <button className="mt-8 flex items-center gap-2 text-[#0B7A7D] text-xs font-black uppercase tracking-widest hover:underline w-fit group">
                  <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" /> Download My Medical Data (JSON)
                </button>
              </div>

              {/* NOTIFICATIONS BOX */}
              <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF5F5] flex items-center justify-center text-[#0B7A7D]">
                    <Bell size={20} />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Notifications</h3>
                </div>

                <div className="space-y-4">
                  {/* Reminder Toggle */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                    <div>
                      <p className="text-[14px] font-bold text-slate-800">Check-in Reminders</p>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">Weekly glucose and diet logs</p>
                    </div>
                    <button 
                      onClick={() => setStatus({...settings, reminders: !settings.reminders})}
                      className={`w-11 h-6 rounded-full transition-colors relative ${settings.reminders ? 'bg-[#0B7A7D]' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.reminders ? 'left-6' : 'left-1'}`}></div>
                    </button>
                  </div>

                  {/* Emergency Toggle */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                    <div>
                      <p className="text-[14px] font-bold text-slate-800">Emergency Alerts</p>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">High risk factor detection calls</p>
                    </div>
                    <button 
                      onClick={() => setStatus({...settings, alerts: !settings.alerts})}
                      className={`w-11 h-6 rounded-full transition-colors relative ${settings.alerts ? 'bg-[#0B7A7D]' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.alerts ? 'left-6' : 'left-1'}`}></div>
                    </button>
                  </div>

                  {/* Insights Toggle */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50 opacity-60">
                    <div>
                      <p className="text-[14px] font-bold text-slate-800">Educational Insights</p>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">Monthly wellness digest</p>
                    </div>
                    <button 
                      onClick={() => setStatus({...settings, insights: !settings.insights})}
                      className={`w-11 h-6 rounded-full transition-colors relative ${settings.insights ? 'bg-[#0B7A7D]' : 'bg-slate-200'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.insights ? 'left-6' : 'left-1'}`}></div>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ---------------- RIGHT COLUMN: HELP (4/12) ---------------- */}
          <div className="xl:col-span-4 h-full">
            <div className="bg-[#0A6C74] rounded-[32px] p-8 md:p-10 text-white shadow-[0_20px_50px_rgba(11,122,125,0.2)] relative overflow-hidden flex flex-col">
               {/* Dekoratif Background */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

               <h3 className="text-2xl font-black mb-4 tracking-tight leading-tight">Help</h3>
               <p className="text-[#D4EDED] text-sm font-medium mb-10 leading-relaxed">
                 Need medical assistance or technical help?
               </p>

               <div className="space-y-4 flex-1">
                 <button className="w-full flex items-center justify-between px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl transition-all group">
                   <span className="text-sm font-bold">FAQ Database</span>
                   <ExternalLink size={16} className="text-white/60 group-hover:text-white transition-colors" />
                 </button>
                 <button className="w-full bg-white text-[#0B7A7D] px-6 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-[#F0F7F7] transition-all active:scale-95">
                   Contact Support
                 </button>
               </div>
            </div>
          </div>

        </div>

        {/* ================= BOTTOM ACTION BAR ================= */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-100 pt-10">
          <p className="text-[11px] font-bold text-slate-400 tracking-wide">
            Last saved: 14 Oct 2023 at 11:20 AM
          </p>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 text-slate-500 font-bold text-sm hover:text-slate-800 transition-colors">
              <RotateCcw size={16} /> Discard Changes
            </button>
            <button className="flex items-center gap-2.5 px-8 py-3.5 bg-[#0B7A7D] text-white rounded-full font-black text-sm shadow-[0_8px_25px_rgba(11,122,125,0.25)] hover:bg-[#086163] hover:-translate-y-0.5 transition-all active:scale-95">
              <Save size={18} strokeWidth={2.5} /> Save Settings
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}