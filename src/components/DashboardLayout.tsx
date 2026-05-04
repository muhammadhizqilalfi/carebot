"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageCircle,
  History,
  BookOpen,
  Activity,
  PlusSquare,
  Settings,
  HelpCircle,
  LogOut,
  CheckCircle2,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [user, setUser] = useState<{ fullName?: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) return;

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Consultation", path: "/consultation/chat", icon: MessageCircle },
    { name: "Chat History", path: "/chat-history", icon: History },
    { name: "Health Hub", path: "/health-hub", icon: BookOpen },
    { name: "Risk Profile", path: "/profile", icon: Activity },
    { name: "Facilities", path: "/facilities", icon: PlusSquare },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen bg-[#F8FAFB] font-sans overflow-hidden">
      {/* ================= SIDEBAR GLOBAL ================= */}
      <aside className="w-70 bg-white border-r border-gray-100 flex flex-col justify-between shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col h-full">
          {/* Header Sidebar */}
          <div className="p-8 pb-6">
            <Link href="/dashboard" className="block w-fit">
              <h1 className="text-2xl font-extrabold text-[#0B7A7D] hover:opacity-80 transition-opacity">
                CareBot
              </h1>
            </Link>
            <p className="text-[10px] text-gray-400 font-bold tracking-[0.2em] mt-1 uppercase">
              Your Health Expert
            </p>
          </div>

          {/* User Profile */}
          <div className="px-8 flex items-center gap-3 mb-8">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=c0aede"
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="text-[15px] font-bold text-gray-800">
                {user?.fullName || "Health Profile"}
              </p>
              <p className="text-[12px] text-[#5C8D8E] font-medium flex items-center gap-1">
                <CheckCircle2
                  size={12}
                  className="text-blue-500 fill-blue-50"
                />
                Verified Member
              </p>
            </div>
          </div>

          {/* Navigation Dinamis */}
          <nav className="px-5 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive =
                pathname === item.path || pathname?.startsWith(`${item.path}/`);

              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center gap-4 px-4 py-3.5 text-[14px] rounded-xl transition-all duration-200 ${
                    isActive
                      ? "font-bold text-[#0B7A7D] bg-[#F0F7F7] shadow-sm"
                      : "font-semibold text-slate-500 hover:text-[#0B7A7D] hover:bg-slate-50"
                  }`}
                >
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Sidebar Actions */}
          <div className="mt-auto p-6 space-y-6">
            <Link
              href="/consultation/chat"
              className="flex items-center justify-center w-full bg-[#0B7A7D] text-white rounded-full py-3.5 text-[14px] font-bold shadow-[0_8px_20px_rgba(11,122,125,0.2)] hover:bg-[#086163] hover:shadow-md transition-all active:scale-95"
            >
              Start New Assessment
            </Link>
            <div className="space-y-4 px-2 pb-2 border-t border-slate-100 pt-6">
              <Link
                href="/help"
                className="flex items-center gap-3 text-[14px] font-semibold text-slate-500 hover:text-slate-800 transition"
              >
                <HelpCircle size={20} strokeWidth={2.5} /> Help Center
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-[14px] font-semibold text-slate-500 hover:text-slate-800 transition"
              >
                <LogOut size={20} strokeWidth={2.5} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      {/* 
        PERBAIKAN DI SINI: 
        Mengganti `overflow-hidden` menjadi `overflow-y-auto overflow-x-hidden px-8`
        agar halaman yang isinya panjang bisa di-scroll dengan mulus.
      */}
      <main className="flex-1 flex flex-col relative h-full min-h-0 overflow-y-auto overflow-x-hidden px-8">
        {children}
      </main>
    </div>
  );
}
