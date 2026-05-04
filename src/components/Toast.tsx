"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, duration = 3000, onClose }: ToastProps) {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsedTime / duration) * 100);
      setProgress(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        setIsVisible(false);
        setTimeout(onClose, 300);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [duration, onClose]);

  return (
    /* Menggunakan pointer-events-none agar container tidak menghalangi klik di bawahnya */
    <div 
      className="fixed top-0 left-0 right-0 bottom-0 flex justify-end items-start p-10 z-9999 pointer-events-none"
    >
      <div 
        className={`w-full max-w-70 bg-white border border-slate-100 shadow-[0_20px_40px_rgba(0,0,0,0.12)] rounded-2xl overflow-hidden pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] transform ${
          isVisible ? "translate-y-0 opacity-100 scale-100" : "-translate-y-4 opacity-0 scale-95"
        }`}
      >
        <div className="p-4 flex items-center gap-3">
          <div className="text-[#0B7A7D] shrink-0">
            <CheckCircle2 size={18} strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-slate-800 leading-tight truncate">
              {message}
            </p>
          </div>
          <button 
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }} 
            className="text-slate-300 hover:text-slate-500 transition-colors shrink-0"
          >
            <X size={14} />
          </button>
        </div>
        
        <div className="h-1 w-full bg-slate-50">
          <div 
            className="h-full bg-[#0B7A7D] transition-all ease-linear"
            style={{ 
              width: `${progress}%`,
              transitionDuration: '10ms' 
            }}
          />
        </div>
      </div>
    </div>
  );
}