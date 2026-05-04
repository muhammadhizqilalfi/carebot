"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { User } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useEffect, useState } from "react";

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const params = useParams();

  // params.id diambil dari folder [id]
  const activeId = params.id as string;
  const isNewChat = !activeId || activeId === "new";

  return (
    <DashboardLayout>
      <header className="px-10 py-8 flex justify-between items-center z-10 bg-[#F8FAFB] shrink-0 border-b border-slate-100">
        <h2 className="text-xl font-bold text-[#0B7A7D]">
          Consultation Session
        </h2>

        <div className="flex items-center gap-8 text-[15px] font-semibold">
          {/* Active Chat Link */}
          <Link
            href={`/consultation/${activeId || "new"}`}
            className={`transition-all duration-200 ${
              pathname === `/consultation/${activeId}`
                ? "text-[#0B7A7D] border-b-2 border-[#0B7A7D] pb-1"
                : "text-slate-400 hover:text-[#0B7A7D]"
            }`}
          >
            Active Chat
          </Link>

          {/* Analysis Link */}
          {isNewChat ? (
            <span className="text-slate-300 cursor-not-allowed opacity-50">
              Analysis
            </span>
          ) : (
            <Link
              href={`/consultation/${activeId}/analysis`}
              className={`transition-all duration-200 ${
                pathname.includes("/analysis")
                  ? "text-[#0B7A7D] border-b-2 border-[#0B7A7D] pb-1"
                  : "text-slate-400 hover:text-[#0B7A7D]"
              }`}
            >
              Analysis
            </Link>
          )}

          {/* Files Link */}
          {isNewChat ? (
            <span className="text-slate-300 cursor-not-allowed opacity-50">
              Files
            </span>
          ) : (
            <Link
              href={`/consultation/${activeId}/files`}
              className={`transition-all duration-200 ${
                pathname.includes("/files")
                  ? "text-[#0B7A7D] border-b-2 border-[#0B7A7D] pb-1"
                  : "text-slate-400 hover:text-[#0B7A7D]"
              }`}
            >
              Files
            </Link>
          )}

          <div className="w-9 h-9 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-500 ml-2 cursor-pointer hover:border-[#0B7A7D] transition-colors">
            <User size={18} />
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col relative h-full overflow-y-auto">
        {children}
      </div>
    </DashboardLayout>
  );
}
