"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  PlusCircle,
  Mic,
  Send,
  Info,
  Stethoscope,
  ClipboardList,
  BriefcaseMedical,
  MoreHorizontal,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

// Tipe data disesuaikan dengan skema Prisma
type Message = {
  id: string | number;
  content: string;
  isFromUser: boolean;
  time: string;
};

export default function ConsultationChatPage() {
  // Ganti dengan ID asli dari context atau URL params jika perlu
  const [chatId, setChatId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        'Halo! Ceritakan keluhan kesehatan Anda hari ini. Misalnya: "Saya sering merasa haus akhir-akhir ini."',
      isFromUser: false,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Fungsi utama memanggil API Groq via Route Handler
  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim() || isTyping) return;

    const userTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // 1. Tambahkan pesan user ke UI secara optimis
    const newUserMsg: Message = {
      id: Date.now(),
      content: text,
      isFromUser: true,
      time: userTime,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      // 2. Hit API Route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 🔥 WAJIB untuk auth
        body: JSON.stringify({
          content: text,
          chatArchiveId: chatId,
        }),
      });
      if (!response.ok) throw new Error("Gagal mendapatkan respon AI");

      const data = await response.json();

      if (!chatId && data.chatId) {
        setChatId(data.chatId);
      }

      // 3. Tambahkan respon AI ke UI
      const newBotMsg: Message = {
        id: data.id || Date.now() + 1,
        content: data.message.content,
        isFromUser: false,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, newBotMsg]);

      // Munculkan analisis jika ini adalah interaksi pertama yang cukup panjang
      if (text.length > 10) setShowAnalysis(true);
    } catch (error) {
      console.error("Chat Error:", error);
      // Fallback pesan error sederhana
      setMessages((prev) => [
        ...prev,
        {
          id: "error",
          content: "Maaf, terjadi gangguan koneksi. Mohon coba lagi.",
          isFromUser: false,
          time: userTime,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const handleSuggestionClick = (text: string) => {
    handleSendMessage(text);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden animate-[fadeIn_0.3s_ease-out]">
      {/* AREA CHAT */}
      <div className="flex-1 overflow-y-auto px-6 lg:px-10 pb-40">
        <div className="max-w-4xl mx-auto space-y-8 pt-8">
          <div className="flex justify-center">
            <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest uppercase">
              Hari Ini
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-4 ${msg.isFromUser ? "flex-col items-end" : ""}`}
            >
              {!msg.isFromUser && (
                <div className="w-10 h-10 rounded-full bg-[#0B7A7D] flex items-center justify-center text-white shrink-0 mt-1 shadow-[0_4px_15px_rgba(11,122,125,0.2)]">
                  <Bot size={22} />
                </div>
              )}

              <div
                className={`relative px-6 py-4 rounded-[28px] text-[15px] font-medium leading-relaxed max-w-[85%] md:max-w-2xl shadow-sm ${
                  !msg.isFromUser
                    ? "bg-[#EAF3F3] text-slate-800 rounded-tl-sm border border-[#DDF0F0]"
                    : "bg-[#0B7A7D] text-white rounded-br-sm shadow-[0_8px_25px_rgba(11,122,125,0.2)]"
                }`}
              >
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-2">{children}</p>,
                    ul: ({ children }) => (
                      <ul className="list-disc ml-5 mb-2">{children}</ul>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold">{children}</strong>
                    ),
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>

              {msg.isFromUser && (
                <span className="text-[11px] font-bold text-slate-400 mt-1 mr-2">
                  {msg.time} • Terkirim
                </span>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-4 animate-[fadeIn_0.3s_ease-out]">
              <div className="w-10 h-10 rounded-full bg-[#0B7A7D]/70 flex items-center justify-center text-white shrink-0 mt-1">
                <Bot size={22} />
              </div>
              <div className="bg-[#EAF3F3] text-[#0B7A7D] px-6 py-5 rounded-[28px] rounded-tl-sm border border-[#DDF0F0] flex items-center gap-1 w-24">
                <MoreHorizontal size={24} className="animate-pulse" />
              </div>
            </div>
          )}

          {/* Analysis Card */}
          {showAnalysis && (
            <div className="ml-14 bg-[#F8FAFB] rounded-4xl p-6 relative overflow-hidden border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] animate-[fadeIn_0.5s_ease-out]">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-linear-to-b from-[#0B7A7D] to-[#0A6C74] rounded-l-3xl"></div>
              <div className="flex items-center gap-4 mb-6 pl-2">
                <div className="bg-[#EAF5F5] p-3 rounded-2xl text-[#0B7A7D]">
                  <BriefcaseMedical size={24} strokeWidth={2.5} />
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">
                  Observasi Awal
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2">
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                    Kondisi Terdeteksi
                  </p>
                  <p className="font-bold text-slate-900 text-[15px]">
                    Analisis Gejala Aktif
                  </p>
                </div>
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                    Saran Prioritas
                  </p>
                  <p className="font-bold text-slate-900 text-[15px]">
                    Konsultasi Medis
                  </p>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* INPUT AREA */}
      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-[#F8FAFB] via-[#F8FAFB] to-transparent pt-16 pb-6 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          {!isTyping && messages.length < 3 && (
            <div className="flex flex-wrap gap-3 mb-5 pl-2 animate-[fadeIn_0.5s_ease-out]">
              <button
                onClick={() => handleSuggestionClick("Apa itu diabetes?")}
                className="bg-white border border-slate-200 shadow-sm text-slate-600 hover:text-[#0B7A7D] text-[13px] font-bold px-5 py-2.5 rounded-full flex items-center gap-2 transition-all active:scale-95"
              >
                <Info size={16} strokeWidth={2.5} /> Apa itu diabetes?
              </button>
              <button
                onClick={() =>
                  handleSuggestionClick("Apa saja gejala umumnya?")
                }
                className="bg-white border border-slate-200 shadow-sm text-slate-600 hover:text-[#0B7A7D] text-[13px] font-bold px-5 py-2.5 rounded-full flex items-center gap-2 transition-all active:scale-95"
              >
                <Stethoscope size={16} strokeWidth={2.5} /> Gejala umum
              </button>
            </div>
          )}

          <div className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-full flex items-center px-3 py-2.5 border border-slate-200 focus-within:border-[#0B7A7D]/50 focus-within:ring-4 focus-within:ring-[#0B7A7D]/10 transition-all">
            <button className="p-3 text-slate-400 hover:text-[#0B7A7D] bg-slate-50 rounded-full transition-colors">
              <PlusCircle size={22} />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik keluhan Anda di sini..."
              className="flex-1 bg-transparent px-5 text-[15px] outline-none text-slate-800 font-medium disabled:opacity-50"
              disabled={isTyping}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="bg-[#0B7A7D] text-white p-4 rounded-full shadow-lg hover:bg-[#086163] disabled:bg-slate-300 transition-all active:scale-95"
            >
              <Send size={18} strokeWidth={2.5} />
            </button>
          </div>

          <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-5">
            CareBot memberikan informasi edukasi. Selalu konsultasikan dengan
            tenaga profesional medis.
          </p>
        </div>
      </div>
    </div>
  );
}
