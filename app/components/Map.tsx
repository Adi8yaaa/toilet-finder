"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Toilet } from "../types/toilet";

const icon = new L.Icon({
  iconUrl: "/marker.png",
  iconSize: [25, 25],
});

export default function Map({ toilets }: { toilets: Toilet[] }) {
  return (
    <MapContainer
      center={[13.0827, 80.2707]} // Chennai default
      zoom={15}
      className="h-screen w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {toilets.map((t) => (
        <Marker key={t.id} position={[t.lat, t.lon]} icon={icon}>
          <Popup>
            <div className="space-y-2">
              <p className="font-semibold">{t.name || "Public Toilet"}</p>
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

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});