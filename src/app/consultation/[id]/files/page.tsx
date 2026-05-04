'use client';

import React, { useEffect } from 'react';
import { 
  FileText, Download, Trash2, FileUp, Clock, FilePieChart, MoreVertical, Search
} from 'lucide-react';
import { useParams, useRouter } from "next/navigation";

const medicalFiles = [
  { id: 1, name: "Hasil_Lab_Gula_Darah.pdf", size: "1.2 MB", date: "28 Apr 2026", type: "PDF", category: "Lab Result" },
  { id: 2, name: "Resep_Metformin_V1.png", size: "850 KB", date: "25 Apr 2026", type: "Image", category: "Prescription" },
  { id: 3, name: "Catatan_Diet_Mingguan.docx", size: "2.4 MB", date: "20 Apr 2026", type: "Doc", category: "Notes" }
];

export default function ConsultationFilesPage() {
  const params = useParams();
  const router = useRouter();
  const activeId = params.id as string;

  useEffect(() => {
    if (activeId === "new") {
      router.replace("/consultation/new");
    }
  }, [activeId, router]);

  if (activeId === "new") return null;

  return (
    <div className="max-w-[1100px] mx-auto w-full pb-12 pt-8 px-6 lg:px-8 animate-[fadeIn_0.4s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[34px] font-extrabold text-slate-900 mb-2.5 tracking-tight">Medical Files</h1>
          <p className="text-slate-500 text-[15px] font-medium leading-relaxed max-w-2xl">
            Berkas untuk Sesi: <span className="font-bold text-[#0B7A7D]">{activeId.slice(0,8)}</span>
          </p>
        </div>
        <div className="relative group shrink-0">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400 group-focus-within:text-[#0B7A7D] transition-colors" />
          </div>
          <input type="text" placeholder="Cari nama file..." className="w-full md:w-72 pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[14px] font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B7A7D]/10 focus:border-[#0B7A7D]/30 shadow-sm transition-all" />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white rounded-[32px] p-8 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center group hover:border-[#0B7A7D] hover:bg-[#F0F7F7]/30 transition-all cursor-pointer">
            <div className="w-16 h-16 rounded-3xl bg-[#F0F7F7] flex items-center justify-center text-[#0B7A7D] mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <FileUp size={28} strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-2">Unggah Dokumen</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed px-4">Tarik file ke sini atau klik untuk memilih dokumen (PDF, JPG, PNG).</p>
            <div className="mt-8 px-6 py-2.5 bg-[#0B7A7D] text-white text-xs font-black uppercase tracking-widest rounded-full shadow-md group-hover:bg-[#086163] transition-colors">Pilih File</div>
          </div>
          <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-3 mb-6 text-slate-900">
               <FilePieChart size={20} className="text-[#0B7A7D]" /><h4 className="font-extrabold text-sm uppercase tracking-widest">Penyimpanan Akun</h4>
            </div>
            <div className="space-y-4">
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-[#0B7A7D] w-[45%] rounded-full"></div></div>
              <div className="flex justify-between text-xs font-bold"><span className="text-slate-500">Terpakai: 450 MB</span><span className="text-slate-900">Kapasitas: 1 GB</span></div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-8">
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_4px_25_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-lg">Semua Berkas</h3>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><Clock size={14} /> Terakhir diperbarui: Hari ini</div>
            </div>
            <div className="divide-y divide-slate-50">
              {medicalFiles.map((file) => (
                <div key={file.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#F8FAFB] flex items-center justify-center text-slate-400 group-hover:bg-[#EAF3F3] group-hover:text-[#0B7A7D] transition-all"><FileText size={24} /></div>
                    <div>
                      <h4 className="text-[15px] font-bold text-slate-900 group-hover:text-[#0B7A7D] transition-colors">{file.name}</h4>
                      <p className="text-[12px] text-slate-400 font-bold uppercase mt-1">{file.category} • {file.size} • {file.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-2.5 text-slate-400 hover:text-[#0B7A7D] hover:bg-white rounded-xl transition-all shadow-sm active:scale-95"><Download size={18} /></button>
                    <button className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl transition-all shadow-sm active:scale-95"><Trash2 size={18} /></button>
                    <button className="p-2.5 text-slate-400 hover:text-slate-900 transition-colors"><MoreVertical size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-8 bg-slate-50/50 text-center"><p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Menampilkan 3 dari 3 Berkas Medis</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}