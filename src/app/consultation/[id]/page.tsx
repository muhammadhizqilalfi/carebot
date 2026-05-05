"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Bot,
  PlusCircle,
  Send,
  Info,
  Stethoscope,
  MoreHorizontal,
  Check,
  Pin,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";

type Message = {
  id: string | number;
  content: string;
  isFromUser: boolean;
  time: string;
};

export default function ConsultationChatPage() {
  const params = useParams();
  const router = useRouter();
  const urlId = params.id as string;

  // Inisialisasi ID dari URL
  const [chatId, setChatId] = useState<string | null>(
    urlId === "new" ? null : urlId,
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [pinnedContext, setPinnedContext] = useState<string[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisList, setAnalysisList] = useState<
    Array<{ condition: string; suggestion: string }>
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (urlId && urlId !== "new") {
      const fetchHistory = async () => {
        setIsTyping(true);
        try {
          const res = await fetch(`/api/chat?chatId=${urlId}`);
          const data = await res.json();
          if (data.history) {
            setMessages(
              data.history.map((m: any) => ({
                id: m.id,
                content: m.content,
                isFromUser: m.isFromUser,
                time: new Date(m.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              })),
            );
          }
        } catch (err) {
          console.error("Gagal memuat riwayat:", err);
        } finally {
          setIsTyping(false);
        }
      };
      fetchHistory();
    } else {
      // Jika "new", tampilkan pesan awal saja
      setMessages([
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
    }
  }, [urlId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim() || isTyping) return;

    const userTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newUserMsg = {
      id: Date.now(),
      content: text,
      isFromUser: true,
      time: userTime,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const isNewChat = !chatId || chatId === "new";
      const endpoint = "/api/chat";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: text,
          // ✅ Kirim ID lewat body agar Backend tahu ini chat yang mana
          chatArchiveId: chatId === "new" ? null : chatId,
          contextTags: pinnedContext,
        }),
      });

      if (!response.ok) throw new Error("Gagal mendapatkan respon AI");
      const data = await response.json();

      // Simpan data analisis ke state sebelum redirect/update
      if (data.analysisList && data.analysisList.length > 0) {
        setAnalysisList(data.analysisList);
        setShowAnalysis(true);
      }

      if (isNewChat && data.chatId) {
        setChatId(data.chatId);
        window.history.pushState({}, "", `/consultation/${data.chatId}`);
        // Lanjutkan eksekusi untuk setMessages agar UI terupdate tanpa reload
      }

      const newBotMsg = {
        id: data.message.id,
        content: data.message.content,
        isFromUser: false,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, newBotMsg]);
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden animate-[fadeIn_0.3s_ease-out]">
      {/* AREA CHAT */}
      <div className="flex-1 overflow-y-auto px-6 lg:px-10 pb-44">
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

          {/* Analysis Context Cards */}
          {showAnalysis && analysisList.length > 0 && (
            <div className="ml-14 mt-3 flex flex-wrap gap-2 animate-[fadeIn_0.5s_ease-out]">
              {analysisList.map((item, index) => {
                const isPinned = pinnedContext.includes(item.condition);
                return (
                  <div
                    key={index}
                    className={`flex items-center rounded-full text-sm font-medium transition-all shadow-sm border ${
                      isPinned
                        ? "bg-[#0B7A7D] text-white border-[#0B7A7D]"
                        : "bg-white text-slate-700 border-slate-200"
                    }`}
                  >
                    <button
                      onClick={() =>
                        setPinnedContext((prev) =>
                          isPinned
                            ? prev.filter((c) => c !== item.condition)
                            : [...prev, item.condition],
                        )
                      }
                      className="pl-4 pr-2 py-2 flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                      {isPinned ? (
                        <Check size={14} />
                      ) : (
                        <Pin size={14} className="rotate-45 text-slate-400" />
                      )}
                      <span>{item.condition}</span>
                    </button>
                    <div
                      className={`w-px h-4 ${isPinned ? "bg-white/20" : "bg-slate-200"}`}
                    />
                    <button
                      onClick={() =>
                        handleSendMessage(
                          `Bisa jelaskan lebih lanjut mengenai ${item.condition}?`,
                        )
                      }
                      className={`pl-2 pr-3 py-2 hover:bg-black/5 rounded-r-full transition-colors ${isPinned ? "text-white" : "text-[#0B7A7D]"}`}
                    >
                      <PlusCircle size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* INPUT AREA */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#F8FAFB] via-[#F8FAFB] to-transparent pt-16 pb-6 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          {!isTyping && messages.length < 3 && (
            <div className="flex flex-wrap gap-3 mb-5 pl-2 animate-[fadeIn_0.5s_ease-out]">
              <button
                onClick={() => handleSendMessage("Apa itu diabetes?")}
                className="bg-white border border-slate-200 shadow-sm text-slate-600 hover:text-[#0B7A7D] text-[13px] font-bold px-5 py-2.5 rounded-full flex items-center gap-2 transition-all active:scale-95"
              >
                <Info size={16} strokeWidth={2.5} /> Apa itu diabetes?
              </button>
              <button
                onClick={() => handleSendMessage("Apa saja gejala umumnya?")}
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
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
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
