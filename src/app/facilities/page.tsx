'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import DashboardLayout from '@/components/DashboardLayout';
import type { FacilityLocation } from '@/components/MapComponent';
import { Search, ArrowRight, ShieldCheck, Star, X } from 'lucide-react';

const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false });

const mockFacilities: FacilityLocation[] = [
  {
    id: 1,
    name: 'RSUD dr. Zainoel Abidin',
    type: 'Rumah Sakit',
    address: 'Jalan Teuku Nyak Arief No.48, Banda Aceh',
    lat: 5.5645,
    lng: 95.3371,
    phone: '+62 651 345678',
    status: 'Open 24/7',
    distance: '0.6 km',
    rating: 4.8,
    reviewCount: 150,
    services: ['UGD 24 Jam', 'Farmasi', 'Rawat Inap', 'Laboratorium', 'Radiologi'],
    doctors: [
      { name: 'Dr. Andi, Sp.PD', specialist: 'Penyakit Dalam' },
      { name: 'Dr. Siti, Sp.OG', specialist: 'Obstetri & Ginekologi' },
      { name: 'Dr. Budi, Sp.A', specialist: 'Anak' },
    ],
  },
  {
    id: 2,
    name: 'Klinik BPJS Sehat Selalu',
    type: 'Klinik BPJS',
    address: 'Jalan Cut Nyak Dien No. 15, Banda Aceh',
    lat: 5.5562,
    lng: 95.3195,
    phone: '+62 651 446612',
    status: 'Open until 8 PM',
    distance: '1.1 km',
    rating: 4.6,
    reviewCount: 89,
    services: ['Konsultasi Umum', 'Pemeriksaan BPJS', 'Farmasi', 'Laboratorium'],
    doctors: [
      { name: 'Dr. Maya, Sp.KK', specialist: 'Kulit & Kelamin' },
      { name: 'Dr. Rudi, Sp.THT', specialist: 'THT' },
    ],
  },
  {
    id: 3,
    name: 'Apotek Banda Mulia',
    type: 'Apotek',
    address: 'Jalan Teuku Umar No. 102, Banda Aceh',
    lat: 5.5532,
    lng: 95.3278,
    phone: '+62 651 778899',
    status: 'Open until 10 PM',
    distance: '0.9 km',
    rating: 4.9,
    reviewCount: 67,
    services: ['Obat Resep', 'Obat Bebas', 'Konsultasi Farmasi', 'Delivery'],
    doctors: [],
  },
  {
    id: 4,
    name: 'Klinik Sehat Bersama',
    type: 'Klinik BPJS',
    address: 'Jalan Cut Nyak Meutia No. 22, Banda Aceh',
    lat: 5.5489,
    lng: 95.3301,
    phone: '+62 651 559900',
    status: 'Open until 9 PM',
    distance: '1.3 km',
    rating: 4.7,
    reviewCount: 112,
    services: ['Konsultasi Umum', 'Pemeriksaan BPJS', 'Vaksinasi', 'Farmasi'],
    doctors: [
      { name: 'Dr. Lina, Sp.KG', specialist: 'Gigi' },
      { name: 'Dr. Eko, Sp.JP', specialist: 'Jantung & Pembuluh Darah' },
    ],
  },
  {
    id: 5,
    name: 'Apotek Sejahtera',
    type: 'Apotek',
    address: 'Jalan Sultan Iskandar Muda No. 76, Banda Aceh',
    lat: 5.5680,
    lng: 95.3344,
    phone: '+62 651 662200',
    status: 'Open until 11 PM',
    distance: '1.7 km',
    rating: 4.5,
    reviewCount: 45,
    services: ['Obat Resep', 'Obat Bebas', 'Konsultasi Farmasi', 'Tes Kehamilan'],
    doctors: [],
  },
];

export default function FacilitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [selectedFacility, setSelectedFacility] = useState<FacilityLocation | null>(null);

  const facilityTypes = ['Semua', ...Array.from(new Set(mockFacilities.map((facility) => facility.type)))];

  const filteredFacilities = mockFacilities.filter((facility) => {
    const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'Semua' || facility.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto w-full pb-10 pt-6 px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[32px] font-extrabold text-slate-900 tracking-tight">
              Facilities &amp; Nearby Care
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-500 leading-7">
              Explore trusted clinics, BPJS providers, and pharmacies in Banda Aceh with a modern map view.
            </p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full bg-[#F0F7F7] px-5 py-3 text-sm font-semibold text-[#0B7A7D] shadow-sm border border-[#DDEDEE]">
            <ShieldCheck size={18} /> Trusted network
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-100px)]">
          <section className="lg:col-span-4 flex flex-col gap-6 overflow-y-auto pb-4">
            <div className="rounded-[32px] bg-white border border-slate-100 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Search</p>
                  <h2 className="mt-3 text-2xl font-black text-slate-900">Find nearby care</h2>
                </div>
                <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#0B7A7D] shadow-sm hover:bg-[#EAF5F5] transition">
                  Filter
                </button>
              </div>
              <div className="relative">
                <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search facility name"
                  className="w-full rounded-[24px] border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none focus:border-[#0B7A7D] focus:ring-2 focus:ring-[#0B7A7D]/20"
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {facilityTypes.map((type) => {
                  const isActive = activeFilter === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setActiveFilter(type)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? 'bg-[#0B7A7D] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {filteredFacilities.length === 0 ? (
              <div className="rounded-[32px] bg-white border border-slate-100 p-6 shadow-sm text-sm text-slate-600">
                Fasilitas tidak ditemukan. Coba kata kunci lain.
              </div>
            ) : (
              <div className="space-y-5">
                {filteredFacilities.map((facility) => (
                  <div key={facility.id} className="rounded-[32px] bg-white border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-400 font-bold">{facility.type}</p>
                        <h3 className="mt-3 text-xl font-bold text-slate-900 leading-tight">{facility.name}</h3>
                      </div>
                      <span className="rounded-full bg-[#EAF5F5] px-3 py-1 text-xs font-bold uppercase text-[#0B7A7D]">
                        {facility.status}
                      </span>
                    </div>

                    <div className="mt-4 space-y-3 text-sm text-slate-600">
                      <p>{facility.address}</p>
                      <p>{facility.phone}</p>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-slate-900">{facility.rating}</span>
                      <span className="text-xs text-slate-500">({facility.reviewCount} ulasan)</span>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-[#F0FAF9] px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#0B7A7D]">
                        {facility.distance}
                      </span>
                      <button
                        onClick={() => setSelectedFacility(facility)}
                        className="inline-flex items-center gap-2 rounded-full bg-[#0B7A7D] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#086163] transition"
                      >
                        Lihat Detail <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="lg:col-span-8 rounded-[32px] overflow-hidden bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)] border border-slate-100 h-full min-h-[640px]">
            <MapComponent facilities={filteredFacilities} />
          </section>
        </div>

        {selectedFacility && (
          <div className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative">
              <button
                onClick={() => setSelectedFacility(null)}
                className="absolute top-6 right-6 rounded-full bg-slate-100 p-2 hover:bg-slate-200 transition"
              >
                <X size={20} className="text-slate-600" />
              </button>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="rounded-full bg-[#F0FAF9] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#0B7A7D]">
                      {selectedFacility.type}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-slate-900">{selectedFacility.rating}</span>
                      <span className="text-xs text-slate-500">({selectedFacility.reviewCount} ulasan)</span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">{selectedFacility.name}</h2>
                  <p className="text-slate-600 mt-2">{selectedFacility.address}</p>
                  <p className="text-slate-600">{selectedFacility.phone}</p>
                </div>

                {selectedFacility.services && selectedFacility.services.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Layanan Medis</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedFacility.services.map((service, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-[#F0FAF9] px-4 py-2 text-sm font-semibold text-[#0B7A7D]"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedFacility.doctors && selectedFacility.doctors.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Tim Dokter</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedFacility.doctors.map((doctor, index) => (
                        <div key={index} className="rounded-[20px] bg-slate-50 p-4">
                          <p className="font-semibold text-slate-900">{doctor.name}</p>
                          <p className="text-sm text-slate-600">{doctor.specialist}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
