'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Star } from 'lucide-react';

export interface FacilityLocation {
  id: number;
  name: string;
  type: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  status?: string;
  distance?: string;
  rating?: number;
  reviewCount?: number;
  services?: string[];
  doctors?: { name: string; specialist: string }[];
}

interface MapComponentProps {
  facilities: FacilityLocation[];
  selectedFacility: FacilityLocation | null;
}

// Komponen internal untuk menangani pergerakan kamera peta
function MapController({ selectedFacility }: { selectedFacility: FacilityLocation | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedFacility) {
      map.flyTo([selectedFacility.lat, selectedFacility.lng], 15, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [selectedFacility, map]);

  return null;
}

export default function MapComponent({ facilities, selectedFacility }: MapComponentProps) {
  // Simpan referensi ke semua marker berdasarkan ID
  const markerRefs = useRef<{ [key: number]: L.Marker | null }>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  // Buka popup marker secara otomatis saat selectedFacility berubah
  useEffect(() => {
    if (selectedFacility && markerRefs.current[selectedFacility.id]) {
      markerRefs.current[selectedFacility.id]?.openPopup();
    }
  }, [selectedFacility]);

  const center: [number, number] = [5.5483, 95.3238];

  return (
    <div className="h-full w-full z-0">
      <MapContainer center={center} zoom={13} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController selectedFacility={selectedFacility} />

        {facilities.map((facility) => (
          <Marker 
            key={facility.id} 
            position={[facility.lat, facility.lng]}
            ref={(el) => {
              markerRefs.current[facility.id] = el;
            }}
          >
            <Popup minWidth={200}>
              <div className="p-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#0B7A7D] mb-1">
                  {facility.type}
                </p>
                <h3 className="font-bold text-slate-900 text-sm leading-tight mb-1">
                  {facility.name}
                </h3>
                <p className="text-slate-500 text-xs mb-2 leading-relaxed">
                  {facility.address}
                </p>
                <div className="flex items-center gap-1 border-t border-slate-100 pt-2 mt-1">
                   <Star size={12} className="text-yellow-500 fill-yellow-500" />
                   <span className="text-xs font-bold">{facility.rating}</span>
                   <span className="text-[10px] text-slate-400">({facility.reviewCount} ulasan)</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}