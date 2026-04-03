"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import { Toilet } from "../types/toilet";

// ✅ Fix default marker icons (Next.js issue)
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function Map({
  toilets,
  coords,
  onSelect,
}: {
  toilets: Toilet[];
  coords?: { lat: number; lon: number } | null;
  onSelect: (t: Toilet) => void;
}) {
  return (
    <MapContainer
      center={[coords?.lat || 20.2961, coords?.lon || 85.8245]} // Bhubaneswar default
      zoom={15}
      className="h-screen w-full"
    >
      {/* 🗺️ Map tiles */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* ✅ ADD TEST MARKER HERE */}
        <Marker position={[19.076, 72.8777]}>
          <Popup>Test Marker</Popup>
        </Marker>

      {/* 📍 User location */}
      {coords && (
        <Marker position={[coords.lat, coords.lon]}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {/* 🚽 Toilet markers */}
      {toilets.map((t) => (
        <Marker
          key={t.id}
          position={[t.lat, t.lon]}
          eventHandlers={{
            click: () => onSelect(t),
          }}
        >
          <Popup>
            <div className="space-y-2">
              <p className="font-semibold">
                {t.name || "Public Toilet"}
              </p>

              {t.distance && (
                <p className="text-sm text-gray-500">
                  {t.distance.toFixed(2)} km away
                </p>
              )}

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lon}`}
                target="_blank"
                className="text-blue-500 underline"
              >
                Get Directions
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}