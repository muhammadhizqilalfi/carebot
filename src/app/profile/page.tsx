'use client';

import React from 'react';
import Link from 'next/link';
import DashboardLayout from '../../components/DashboardLayout';
import {
  ArrowRight,
  ShieldCheck,
  Activity,
  Clock,
  TrendingUp,
  Sparkles,
  Thermometer,
} from 'lucide-react';

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto w-full pb-12 pt-6 px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-[32px] font-extrabold text-slate-900 tracking-tight mb-1.5 leading-tight">
              Risk Profile Dashboard
            </h1>
            <p className="text-slate-500 font-medium text-[14px] max-w-2xl">
              Advanced glycemic stability analysis based on your recent activity and clinical symptoms.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-slate-100">
            <Clock size={16} className="text-slate-400" />
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">
                Current Status
              </span>
              <span className="text-[12px] font-bold text-slate-700 leading-none">
                Updated 2 hours ago
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.7fr_1fr] gap-6 mb-6">
          <div className="rounded-[32px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.04)] border border-slate-100 overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Current Risk
                </span>
                <h2 className="mt-6 text-[28px] md:text-[34px] font-black text-slate-900 tracking-tight">
                  Moderate Risk
                </h2>
                <p className="mt-3 text-slate-500 max-w-xl">
                  Your levels show high volatility during evening hours. We recommend a focused review of your late-day nutrition patterns.
                </p>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-slate-50 px-6 py-5 text-center min-w-[180px]">
                <p className="text-[12px] uppercase text-slate-500 tracking-[0.24em] mb-2">Stability Index</p>
                <p className="text-[52px] font-black text-[#0B7A7D]">75</p>
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">Optimal range</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-[28px] border border-slate-100 bg-[#F8FBFB] p-5">
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400 mb-2">Average Glucose</p>
                <p className="text-[28px] font-black text-slate-900">114</p>
                <span className="text-[12px] text-slate-500">mg/dL</span>
              </div>
              <div className="rounded-[28px] border border-slate-100 bg-[#F8FBFB] p-5">
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400 mb-2">Risk Trend</p>
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-[#0B7A7D]" />
                  <p className="text-[28px] font-black text-slate-900">+12%</p>
                </div>
              </div>
              <div className="rounded-[28px] border border-slate-100 bg-[#F8FBFB] p-5">
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400 mb-2">Next Review</p>
                <p className="text-[20px] font-bold text-slate-900">7 days</p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] bg-[#0B7A7D] p-8 text-white shadow-[0_18px_40px_rgba(11,122,125,0.18)]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[13px] uppercase tracking-[0.3em] font-bold text-cyan-200">Recommended Next Steps</p>
                <h3 className="mt-4 text-[26px] font-black leading-tight">Take proactive action</h3>
              </div>
              <Sparkles size={26} className="text-cyan-100" />
            </div>

            <div className="space-y-4">
              {[
                { title: 'Schedule HbA1c Test', desc: 'Required for quarterly baseline tracking.' },
                { title: 'Update Meal Log', desc: 'Missing dinner data for the last 3 days.' },
                { title: 'Consultation', desc: 'Connect with Dr. Aris about trend shifts.' },
              ].map((item) => (
                <div key={item.title} className="rounded-[24px] border border-cyan-400/20 bg-cyan-950/10 p-4">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm text-cyan-100/80">{item.desc}</p>
                </div>
              ))}
            </div>

            <Link href="/consultation/new" className="mt-8 inline-flex items-center justify-between w-full rounded-3xl bg-white px-6 py-3 text-sm font-bold text-[#0B7A7D] shadow-lg transition hover:bg-slate-100">
              <span>Schedule Appointment</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[2.2fr_1.2fr] gap-6 mb-6">
          <div className="rounded-[32px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.05)] border border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <p className="text-[13px] uppercase tracking-[0.3em] text-slate-400 font-bold">Health Status Trends</p>
                <h3 className="mt-3 text-[22px] font-extrabold text-slate-900">Risk level variance over the past 30 days</h3>
              </div>
              <div className="rounded-full bg-slate-100 px-4 py-2 text-[12px] font-semibold text-slate-600 inline-flex items-center gap-2">
                <span className="px-2 py-1 rounded-full bg-slate-200 text-slate-700">Weekly</span>
                <span className="px-2 py-1 rounded-full bg-transparent text-slate-500">Monthly</span>
              </div>
            </div>

            <div className="h-[320px] rounded-[28px] bg-slate-50 border border-slate-100 p-6 flex flex-col justify-between">
              <div className="h-full bg-[radial-gradient(circle_at_top_left,_rgba(11,122,125,0.18),_transparent_30%)] rounded-[28px] p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-500 text-sm mb-6">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
                <div className="relative h-full">
                  <div className="absolute bottom-0 left-[22%] w-10 h-10 bg-[#0B7A7D] rounded-full opacity-90"></div>
                  <div className="absolute bottom-10 left-[42%] w-14 h-14 bg-cyan-400 rounded-full opacity-90"></div>
                  <div className="absolute bottom-20 left-[62%] w-12 h-12 bg-[#0B7A7D]/80 rounded-full opacity-90"></div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-slate-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.05)] border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[13px] uppercase tracking-[0.3em] text-slate-400 font-bold">Key Symptoms</p>
                  <h3 className="mt-3 text-[18px] font-extrabold text-slate-900">What matters most</h3>
                </div>
                <ShieldCheck size={24} className="text-[#0B7A7D]" />
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Fatigue', value: 82, badge: 'HIGH', badgeClass: 'bg-[#FEE2E2] text-[#B91C1C]' },
                  { label: 'Polydipsia', value: 42, badge: 'STABLE', badgeClass: 'bg-[#DBEAFE] text-[#1E40AF]' },
                  { label: 'Blurred Vision', value: 15, badge: 'TRACE', badgeClass: 'bg-[#ECFCCB] text-[#166534]' },
                ].map((item) => (
                  <div key={item.label} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-800">{item.label}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${item.badgeClass}`}>
                        {item.badge}
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                      <div style={{ width: `${item.value}%` }} className="h-full rounded-full bg-gradient-to-r from-[#0B7A7D] to-cyan-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-[28px] border border-slate-100 bg-slate-50 p-5">
              <div className="flex items-center gap-3 mb-4">
                <Thermometer size={18} className="text-[#0B7A7D]" />
                <p className="text-sm font-semibold text-slate-700">Understanding Glycemic Variability</p>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Learn how small shifts in daily activity can dramatically stabilize your metabolic profile.
              </p>
              <Link href="/help" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0B7A7D] hover:text-[#085a5d]">
                Read Professional Guide <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
