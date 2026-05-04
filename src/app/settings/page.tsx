"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  User,
  Shield,
  Bell,
  HelpCircle,
  ExternalLink,
  Download,
  Save,
  RotateCcw,
} from "lucide-react";
import Toast from "@/components/Toast";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    age: "",
    weight: "",
    height: "",
  });

  const [settings, setSettings] = useState({
    encryption: true,
    dataSharing: false,
    reminders: true,
    alerts: true,
    insights: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        setProfile({
          fullName: data.fullName || "",
          email: data.email || "",
          age: data.age?.toString() || "",
          weight: data.weight?.toString() || "",
          height: data.height?.toString() || "",
        });

        setSettings({
          encryption: data.encryption ?? true,
          dataSharing: data.dataSharing ?? false,
          reminders: data.reminders ?? true,
          alerts: data.alerts ?? true,
          insights: data.insights ?? false,
        });
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/auth/me/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profile, ...settings }),
      });

      if (res.ok) {
        setShowToast(true);
      } else {
        setShowToast(false);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadData = () => {
    const dataToDownload = {
      profile,
      settings,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(dataToDownload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `medical_data_${profile.fullName.replace(/\s+/g, "_")}.json`;
    link.click();
  };

  return (
    <DashboardLayout>
      <div className="max-w-275 mx-auto w-full pb-20 pt-4 px-6 lg:px-8 animate-[fadeIn_0.4s_ease-out]">
        {/* ================= HEADER ================= */}
        <div className="mb-10">
          <h1 className="text-[34px] font-black text-slate-900 mb-2.5 tracking-tight">
            Settings
          </h1>
          <p className="text-slate-500 text-[15px] font-medium leading-relaxed">
            Manage your health data, security preferences, and account details.
          </p>
        </div>

        {showToast && (
          <Toast
            message="Settings updated successfully!"
            onClose={() => setShowToast(false)}
          />
        )}

        {/* Cek loading hanya untuk bagian konten yang membutuhkan data */}
        {loading ? (
          <div className="flex items-center justify-center min-h-100">
             {/* Spinner kecil agar user tahu data sedang diproses tanpa menutupi seluruh layar */}
             <div className="w-8 h-8 border-4 border-slate-200 border-t-[#0B7A7D] rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* ================= MAIN BENTO GRID ================= */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-7 items-start">
              {/* ---------------- LEFT COLUMN: PROFILE & PREFERENCES (8/12) ---------------- */}
              <div className="xl:col-span-8 space-y-7">
                {/* PROFILE SECTION */}
                <div className="bg-white rounded-4xl p-8 md:p-10 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-[#EAF5F5] flex items-center justify-center text-[#0B7A7D]">
                      <User size={24} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-[22px] font-extrabold text-slate-900 tracking-tight">
                      Profile
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile.fullName}
                        onChange={(e) =>
                          setProfile({ ...profile, fullName: e.target.value })
                        }
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:bg-white focus:ring-2 focus:ring-[#0B7A7D]/10 focus:border-[#0B7A7D] outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        Email (Read Only)
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        disabled
                        className="w-full px-5 py-3.5 bg-slate-100 border border-slate-100 rounded-2xl text-sm font-bold text-slate-400 cursor-not-allowed outline-none"
                      />
                    </div>

                    <div className="md:col-span-2 grid grid-cols-3 gap-4 mt-2">
                      <StatInput
                        label="Age"
                        unit="YRS"
                        value={profile.age}
                        onChange={(val: any) =>
                          setProfile({ ...profile, age: val })
                        }
                      />
                      <StatInput
                        label="Weight"
                        unit="KG"
                        value={profile.weight}
                        onChange={(val: any) =>
                          setProfile({ ...profile, weight: val })
                        }
                      />
                      <StatInput
                        label="Height"
                        unit="CM"
                        value={profile.height}
                        onChange={(val: any) =>
                          setProfile({ ...profile, height: val })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  {/* PRIVACY BOX */}
                  <div className="bg-white rounded-4xl p-8 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                        <Shield size={20} />
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                        Privacy
                      </h3>
                    </div>
                    <div className="space-y-5 flex-1">
                      <ToggleButton
                        label="Encryption"
                        sub="Protect transcripts"
                        active={settings.encryption}
                        onClick={() =>
                          setSettings({
                            ...settings,
                            encryption: !settings.encryption,
                          })
                        }
                      />
                      <ToggleButton
                        label="Data Sharing"
                        sub="Improve detection"
                        active={settings.dataSharing}
                        onClick={() =>
                          setSettings({
                            ...settings,
                            dataSharing: !settings.dataSharing,
                          })
                        }
                      />
                    </div>

                    <button
                      onClick={handleDownloadData}
                      className="mt-8 flex items-center gap-2 text-[#0B7A7D] text-xs font-black uppercase tracking-widest hover:underline w-fit group"
                    >
                      <Download
                        size={14}
                        className="group-hover:-translate-y-0.5 transition-transform"
                      />
                      Download My Medical Data (JSON)
                    </button>
                  </div>

                  {/* NOTIFICATIONS BOX */}
                  <div className="bg-white rounded-4xl p-8 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-[#EAF5F5] flex items-center justify-center text-[#0B7A7D]">
                        <Bell size={20} />
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                        Notifications
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <ToggleButton
                        label="Reminders"
                        sub="Weekly logs"
                        active={settings.reminders}
                        onClick={() =>
                          setSettings({
                            ...settings,
                            reminders: !settings.reminders,
                          })
                        }
                      />
                      <ToggleButton
                        label="Alerts"
                        sub="High risk detection"
                        active={settings.alerts}
                        onClick={() =>
                          setSettings({ ...settings, alerts: !settings.alerts })
                        }
                      />
                      <ToggleButton
                        label="Insights"
                        sub="Monthly wellness"
                        active={settings.insights}
                        onClick={() =>
                          setSettings({ ...settings, insights: !settings.insights })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ---------------- RIGHT COLUMN: HELP (4/12) ---------------- */}
              <div className="xl:col-span-4 h-full">
                <div className="bg-[#0A6C74] rounded-4xl p-8 md:p-10 text-white shadow-[0_20px_50px_rgba(11,122,125,0.25)] relative overflow-hidden flex flex-col min-h-100">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight leading-tight">
                    Help
                  </h3>
                  <p className="text-[#D4EDED] text-sm font-medium mb-10 leading-relaxed">
                    Need medical assistance or technical help? Our team is available
                    24/7.
                  </p>
                  <div className="space-y-4 flex-1">
                    <button className="w-full flex items-center justify-between px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl transition-all group">
                      <span className="text-sm font-bold">FAQ Database</span>
                      <ExternalLink
                        size={16}
                        className="text-white/60 group-hover:text-white transition-colors"
                      />
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
                {isSaving
                  ? "Saving changes..."
                  : "Ensure all data is correct before saving."}
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center gap-2 px-6 py-3 text-slate-500 font-bold text-sm hover:text-slate-800"
                >
                  <RotateCcw size={16} /> Discard
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2.5 px-8 py-3.5 bg-[#0B7A7D] text-white rounded-full font-black text-sm shadow-[0_8px_25px_rgba(11,122,125,0.25)] hover:bg-[#086163] transition-all disabled:opacity-50"
                >
                  <Save size={18} strokeWidth={2.5} />{" "}
                  {isSaving ? "Saving..." : "Save Settings"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

// --- REUSABLE COMPONENTS ---
function StatInput({ label, unit, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-5 pr-12 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:bg-white outline-none transition-all"
        />
        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase">
          {unit}
        </span>
      </div>
    </div>
  );
}

function ToggleButton({ label, sub, active, onClick }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
      <div>
        <p className="text-[14px] font-bold text-slate-800">{label}</p>
        <p className="text-[11px] text-slate-400 font-medium mt-0.5">{sub}</p>
      </div>
      <button
        onClick={onClick}
        className={`w-11 h-6 rounded-full transition-colors relative ${active ? "bg-[#0B7A7D]" : "bg-slate-200"}`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? "left-6" : "left-1"}`}
        ></div>
      </button>
    </div>
  );
}