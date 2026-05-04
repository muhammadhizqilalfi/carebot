'use client';

import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

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
}

export default function MapComponent({ facilities }: MapComponentProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  const center: [number, number] = facilities.length > 0
    ? [facilities[0].lat, facilities[0].lng]
    : [5.5483, 95.3238];

  return (
    <div className="h-full w-full z-0">
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {facilities.map((facility) => (
          <Marker key={facility.id} position={[facility.lat, facility.lng]}>
            <Popup>
              <div className="space-y-2 text-sm">
                <p className="font-bold text-slate-900">{facility.name}</p>
                <p className="text-slate-600">{facility.address}</p>
                <p className="text-xs uppercase tracking-[0.24em] text-[#0B7A7D]">{facility.type}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
