'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  PlusCircle, 
  Mic, 
  Send, 
  Info, 
  Stethoscope, 
  ClipboardList, 
  BriefcaseMedical,
  MoreHorizontal
} from 'lucide-react';

// Tipe data untuk pesan
type Message = {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  time: string;
};

export default function ConsultationChatPage() {
  // State untuk menyimpan riwayat percakapan (dimulai dengan pesan sapaan bot)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Halo! Ceritakan keluhan kesehatan Anda hari ini. Misalnya: "Saya sering merasa haus akhir-akhir ini."',
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false); // Untuk memunculkan kartu analisis secara dinamis
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fungsi untuk scroll otomatis ke bawah setiap ada pesan baru
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Fungsi untuk menangani pengiriman pesan
  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;

    // 1. Tambahkan pesan user ke layar
    const newUserMsg: Message = {
      id: Date.now(),
      text: text,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true); // Tampilkan animasi bot sedang mengetik

    // 2. SIMULASI BACKEND (Jeda 2 detik sebelum bot membalas)
    setTimeout(() => {
      setIsTyping(false);
      
      const newBotMsg: Message = {
        id: Date.now() + 1,
        text: 'Terima kasih atas informasinya. Saya mendeteksi beberapa gejala yang perlu diperhatikan. Saya telah membuat ringkasan analisis awal untuk Anda.',
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, newBotMsg]);
      setShowAnalysis(true); // Memunculkan kartu analisis setelah bot membalas
      
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Fungsi saat tombol saran (pills) diklik
  const handleSuggestionClick = (text: string) => {
    setInputValue(text); // Memasukkan teks ke input
    // Bisa langsung dipanggil handleSendMessage(text) kalau mau langsung terkirim
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden animate-[fadeIn_0.3s_ease-out]">
      
      {/* ================= AREA CHAT MENGGULUNG ================= */}
      <div className="flex-1 overflow-y-auto px-6 lg:px-10 pb-40">
        <div className="max-w-4xl mx-auto space-y-8 pt-8">
          
          {/* Date Badge */}
          <div className="flex justify-center">
            <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest uppercase">
              Hari Ini
            </span>
          </div>

          {/* Mapping Pesan Chat */}
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'flex-col items-end' : ''}`}>
              
              {msg.sender === 'bot' && (
                <div className="w-10 h-10 rounded-full bg-[#0B7A7D] flex items-center justify-center text-white shrink-0 mt-1 shadow-[0_4px_15px_rgba(11,122,125,0.2)]">
                  <Bot size={22} />
                </div>
              )}

              <div className={`relative px-6 py-4 rounded-[28px] text-[15px] font-medium leading-relaxed max-w-[85%] md:max-w-2xl shadow-sm ${
                msg.sender === 'bot' 
                  ? 'bg-[#EAF3F3] text-slate-800 rounded-tl-sm border border-[#DDF0F0]' 
                  : 'bg-[#0B7A7D] text-white rounded-br-sm shadow-[0_8px_25px_rgba(11,122,125,0.2)]'
              }`}>
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <span className="text-[11px] font-bold text-slate-400 mt-1 mr-2">{msg.time} • Terkirim</span>
              )}
            </div>
          ))}

          {/* Animasi Bot Sedang Mengetik (Typing Indicator) */}
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

          {/* Kartu Analisis Dinamis (Hanya muncul setelah bot membalas) */}
          {showAnalysis && (
            <div className="ml-14 bg-[#F8FAFB] rounded-[32px] p-6 relative overflow-hidden border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] animate-[fadeIn_0.5s_ease-out]">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[#0B7A7D] to-[#0A6C74] rounded-l-3xl"></div>
              
              <div className="flex items-center gap-4 mb-6 pl-2">
                <div className="bg-[#EAF5F5] p-3 rounded-2xl text-[#0B7A7D]">
                  <BriefcaseMedical size={24} strokeWidth={2.5} />
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">Preliminary Observations</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2">
                <div className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-100 group hover:border-[#0B7A7D]/30 transition-colors">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Potential Marker</p>
                  <p className="font-bold text-slate-900 text-[15px] group-hover:text-[#0B7A7D] transition-colors">Polyuria (Nocturnal)</p>
                </div>
                <div className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-100 group hover:border-[#0B7A7D]/30 transition-colors">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Energy State</p>
                  <p className="font-bold text-slate-900 text-[15px] group-hover:text-[#0B7A7D] transition-colors">Chronic Fatigue</p>
                </div>
              </div>
            </div>
          )}

          {/* Elemen kosong untuk target auto-scroll */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ================= AREA INPUT (STICKY BOTTOM) ================= */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#F8FAFB] via-[#F8FAFB] to-transparent pt-16 pb-6 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Suggestion Pills */}
          {!showAnalysis && (
            <div className="flex flex-wrap gap-3 mb-5 pl-2 animate-[fadeIn_0.5s_ease-out]">
              <button onClick={() => handleSuggestionClick("Apa itu diabetes?")} className="bg-white border border-slate-200 shadow-sm text-slate-600 hover:text-[#0B7A7D] text-[13px] font-bold px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#F0F7F7] hover:border-[#0B7A7D]/30 transition-all active:scale-95">
                <Info size={16} strokeWidth={2.5} /> Apa itu diabetes?
              </button>
              <button onClick={() => handleSuggestionClick("Apa saja gejala umumnya?")} className="bg-white border border-slate-200 shadow-sm text-slate-600 hover:text-[#0B7A7D] text-[13px] font-bold px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#F0F7F7] hover:border-[#0B7A7D]/30 transition-all active:scale-95">
                <Stethoscope size={16} strokeWidth={2.5} /> Gejala umum
              </button>
              <button onClick={() => handleSuggestionClick("Bagaimana cara pemeriksaannya?")} className="bg-white border border-slate-200 shadow-sm text-slate-600 hover:text-[#0B7A7D] text-[13px] font-bold px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#F0F7F7] hover:border-[#0B7A7D]/30 transition-all active:scale-95">
                <ClipboardList size={16} strokeWidth={2.5} /> Cara pemeriksaan
              </button>
            </div>
          )}

          {/* Main Input Box */}
          <div className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-full flex items-center px-3 py-2.5 border border-slate-200 focus-within:border-[#0B7A7D]/50 focus-within:ring-4 focus-within:ring-[#0B7A7D]/10 transition-all">
            <button className="p-3 text-slate-400 hover:text-[#0B7A7D] bg-slate-50 rounded-full transition-colors active:scale-95">
              <PlusCircle size={22} />
            </button>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ceritakan keluhan Anda secara detail..." 
              className="flex-1 bg-transparent px-5 text-[15px] outline-none text-slate-800 font-medium placeholder:text-slate-400 placeholder:font-normal" 
              disabled={isTyping}
            />
            <button className="p-3 text-slate-400 hover:text-[#0B7A7D] transition-colors active:scale-95 mr-1">
              <Mic size={22} />
            </button>
            <button 
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="bg-[#0B7A7D] text-white p-4 rounded-full shadow-[0_4px_15px_rgba(11,122,125,0.3)] hover:bg-[#086163] hover:shadow-lg disabled:bg-slate-300 disabled:shadow-none transition-all active:scale-95"
            >
              <Send size={18} className="ml-0.5" strokeWidth={2.5} />
            </button>
          </div>
          
          <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-5">
            CareBot memberikan informasi edukasi. Selalu konsultasikan dengan tenaga profesional medis.
          </p>
        </div>
      </div>
    </div>
  );
}