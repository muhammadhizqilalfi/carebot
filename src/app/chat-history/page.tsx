"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// Import tipe data langsung dari prisma client
import { ChatArchive, Message } from "@prisma/client";
import DashboardLayout from "../../components/DashboardLayout";
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
  ChevronRight,
  Trash2,
  MessageSquare,
} from "lucide-react";

// Gabungkan tipe ChatArchive dengan array Messages agar properti .messages terbaca
type ChatWithMessages = ChatArchive & {
  messages: Message[];
  risk?: string; // Tambahkan ini jika belum ada di schema prisma tapi ada di logic UI
};

export default function ChatHistoryPage() {
  // Set tipe data state menjadi array dari ChatWithMessages
  const [chatArchives, setChatArchives] = useState<ChatWithMessages[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/chat/history");
        const data = await res.json();
        if (data.chatArchives) {
          setChatArchives(data.chatArchives);
        }
      } catch (error) {
        console.error("Gagal memuat riwayat:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm("Apakah Anda yakin ingin menghapus percakapan ini?")) return;

    try {
      const res = await fetch(`/api/chat/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Update state secara lokal agar UI langsung berubah
        setChatArchives((prev) => prev.filter((chat) => chat.id !== id));
      } else {
        alert("Gagal menghapus dari database");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const filteredHistory = chatArchives.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="max-w-[1100px] mx-auto w-full pb-12 pt-2">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <h1 className="text-[32px] font-extrabold text-slate-900 mb-2 tracking-tight">
              Conversation Archive
            </h1>
            <p className="text-slate-500 text-[15px] font-medium leading-relaxed">
              Review your past health assessments and clinical dialogues.
            </p>
          </div>
          <button
            onClick={() => router.push("/consultation/new")}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B7A7D] text-white text-sm font-bold shadow-[0_8px_20px_rgba(11,122,125,0.25)] hover:bg-[#086163] transition-all active:scale-95 shrink-0"
          >
            <Plus size={18} strokeWidth={2.5} /> Start New Assessment
          </button>
        </div>

        {/* ================= SEARCH & FILTERS ================= */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="relative flex-1 w-full group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search
                size={18}
                className="text-slate-400 group-focus-within:text-[#0B7A7D]"
              />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by symptoms or date..."
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-full text-sm font-medium focus:outline-none focus:border-[#0B7A7D]"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex items-center gap-2 bg-slate-100 px-5 py-3.5 rounded-full text-sm font-bold transition-colors">
              <CalendarIcon size={16} /> Last 30 Days
            </button>
          </div>
        </div>

        {/* ================= HISTORY LIST ================= */}
        <div className="space-y-4 mb-8">
          {loading ? (
            <div className="text-center py-10 text-slate-400">
              Loading history...
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              No conversations found.
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(`/consultation/${item.id}`)}
                className="bg-white rounded-3xl p-6 flex flex-col md:flex-row md:items-center gap-6 border border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all cursor-pointer group"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${item.risk === "HIGH RISK" ? "bg-red-50" : "bg-[#EAF5F5]"}`}
                >
                  {item.risk === "HIGH RISK" ? (
                    <AlertTriangle
                      size={24}
                      className="text-red-500"
                      strokeWidth={2.5}
                    />
                  ) : (
                    <MessageSquare
                      size={24}
                      className="text-[#0B7A7D]"
                      strokeWidth={2.5}
                    />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <h3 className="text-md font-medium text-slate-900 group-hover:text-[#0B7A7D]">
                      {item.title || "Health Assessment"}
                    </h3>
                    {item.risk && (
                      <span
                        className={`text-[9px] font-black uppercase tracking-[0.1em] px-2.5 py-1 rounded-md ${item.risk === "HIGH RISK" ? "bg-red-100 text-red-600" : "bg-[#EAF5F5] text-[#0B7A7D]"}`}
                      >
                        {item.risk}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm mb-3 line-clamp-1">
                    {item.messages && item.messages.length > 0
                      ? item.messages[0].content
                      : "Review clinical dialogue history."}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays size={14} />{" "}
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />{" "}
                      {new Date(item.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 md:mt-0 shrink-0">
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                  <button className="px-6 py-2.5 rounded-full bg-white text-[#0B7A7D] border border-slate-200 text-sm font-bold shadow-sm hover:border-[#0B7A7D] transition-all">
                    Review Report
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ... Rest of your UI (Bento cards, etc.) ... */}
      </div>
    </DashboardLayout>
  );
}
