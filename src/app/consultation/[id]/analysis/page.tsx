"use client";

import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Droplet,
  BriefcaseMedical,
  Navigation,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function AnalysisPage() {
  const params = useParams();
  const router = useRouter();
  const activeId = params.id as string;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Proteksi: Jika ID 'new', lempar ke chat
    if (activeId === "new") {
      router.replace("/consultation/new");
      return;
    }

    async function fetchAnalysis() {
      try {
        // Mengirim ID ke API agar data sesuai dengan chat aktif
        const res = await fetch(`/api/analysis?chatId=${activeId}`);
        const result = await res.json();
        if (res.ok) setData(result);
      } catch (err) {
        console.error("Failed to fetch analysis");
      } finally {
        setLoading(false);
      }
    }
    fetchAnalysis();
  }, [activeId, router]);

  const getStatusStyles = (level: string) => {
    const status = level?.toLowerCase() || "rendah";
    if (status === "tinggi") {
      return {
        cardBg: "bg-[#FFF5F5] border-red-100",
        statusText: "text-red-600",
        titleText: "text-[#9B1C1C]",
        messageText: "text-[#9B1C1C]",
        highlight: "bg-red-100 text-[#771D1D]",
        pulse: true,
      };
    }
    if (status === "sedang") {
      return {
        cardBg: "bg-[#FFFBEB] border-amber-100",
        statusText: "text-amber-600",
        titleText: "text-[#92400E]",
        messageText: "text-[#92400E]",
        highlight: "bg-amber-100 text-[#78350F]",
        pulse: false,
      };
    }
    return {
      cardBg: "bg-[#F0FDF4] border-emerald-100",
      statusText: "text-emerald-600",
      titleText: "text-[#065F46]",
      messageText: "text-[#065F46]",
      highlight: "bg-emerald-100 text-[#064E3B]",
      pulse: false,
    };
  };

  const styles = getStatusStyles(data?.statusLevel);

  const getIcon = (title: string) => {
    if (title.toLowerCase().includes("darah")) return Droplet;
    return BriefcaseMedical;
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#0B7A7D]" size={40} />
        <p className="text-slate-500 font-bold animate-pulse">CareBot sedang menyusun laporan Anda...</p>
      </div>
    );
  }

  if (!data || activeId === "new") return null;

  const renderMessageWithHighlights = (text: string, keywords: string[]) => {
    if (!keywords || keywords.length === 0) return <p className={`${styles.messageText} font-medium`}>{text}</p>;
    let parts = text.split(new RegExp(`(${keywords.join("|")})`, "gi"));
    return (
      <p className={`${styles.messageText} text-[15px] leading-relaxed font-medium`}>
        {parts.map((part, i) => keywords.some((k) => k.toLowerCase() === part.toLowerCase()) ? (
          <strong key={i} className={`font-extrabold px-1.5 py-0.5 rounded-md mx-0.5 shadow-sm ${styles.highlight}`}>{part}</strong>
        ) : (part))}
      </p>
    );
  };

  return (
    <div className="max-w-[1100px] mx-auto w-full pb-20 pt-8 px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-[34px] font-extrabold text-slate-900 mb-2.5">Analisis Kesehatan</h1>
        <p className="text-slate-500 text-[15px] font-medium leading-relaxed max-w-2xl">Laporan detail berdasarkan percakapan terakhir Anda (ID: {activeId.slice(0,8)}...)</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-7">
        <div className="xl:col-span-8 flex flex-col gap-7">
          <div className={`rounded-[32px] p-8 md:p-12 flex flex-col border shadow-sm relative overflow-hidden transition-all duration-500 ${styles.cardBg}`}>
            <div className={`flex items-center gap-2.5 mb-6 relative z-10 ${styles.statusText}`}>
              <AlertTriangle size={16} strokeWidth={3} className={styles.pulse ? "animate-pulse" : ""} />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em]">Status: {data.statusLevel}</span>
            </div>
            <h2 className={`text-[40px] md:text-[52px] font-black leading-[1.05] mb-10 tracking-tight relative z-10 ${styles.titleText}`}>{data.title}</h2>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-sm relative z-10">
              {renderMessageWithHighlights(data.message, data.highlightedKeywords)}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
              <h3 className="font-extrabold text-slate-900 text-[18px] mb-6">Gejala Terdeteksi</h3>
              <ul className="space-y-4">
                {data.symptoms?.map((s: string, i: number) => (
                  <li key={i} className="flex items-center gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-[#EAF5F5] flex items-center justify-center shrink-0">
                      <CheckCircle2 size={14} className="text-[#0B7A7D]" strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 font-bold text-[14px]">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[#0B7A7D] to-[#085a5d] rounded-[32px] p-8 text-white shadow-lg">
              <Lightbulb size={22} className="mb-6 opacity-50" />
              <h3 className="font-extrabold text-[18px] mb-3">Informasi Penting</h3>
              <p className="text-white/80 text-[14px] leading-relaxed font-medium">{data.insights}</p>
            </div>
          </div>
        </div>
        <div className="xl:col-span-4 flex flex-col gap-7">
          <div className="bg-[#F8FAFB] rounded-[32px] p-8 border border-slate-100 shadow-inner">
            <h3 className="font-extrabold text-slate-900 text-[18px] mb-6">Langkah Selanjutnya</h3>
            <div className="space-y-4">
              {data.nextSteps?.map((step: any, i: number) => {
                const Icon = getIcon(step.title);
                return (
                  <div key={i} className="bg-white rounded-[24px] p-5 flex gap-4 border border-slate-100 group">
                    <div className="w-12 h-12 rounded-2xl bg-[#F0F7F7] flex items-center justify-center group-hover:bg-[#0B7A7D] transition-colors">
                      <Icon size={20} className="text-[#0B7A7D] group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-[14px] leading-tight mb-1">{step.title}</h4>
                      <p className="text-slate-500 text-[12px]">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link href="/facilities" className="mt-8 w-full bg-[#0B7A7D] text-white rounded-full py-4 flex items-center justify-center gap-2.5 text-[14px] font-bold hover:bg-[#086163] transition-all">
              <Navigation size={18} /> Cari Fasilitas Terdekat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}