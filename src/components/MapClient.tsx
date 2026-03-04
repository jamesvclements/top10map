"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Pin } from "@/lib/types";
import { STICKER_COLORS } from "@/lib/constants";

function createStickerIcon(rank: number) {
  const color = STICKER_COLORS[rank - 1] || STICKER_COLORS[0];
  return L.divIcon({
    className: "",
    html: `<div class="sticker-marker" style="
      width: 44px; height: 44px;
      border-radius: 50%;
      background: ${color};
      border: 3px solid white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; font-weight: 800;
      color: white; text-shadow: 0 1px 2px rgba(0,0,0,0.3);
      cursor: pointer;
      transition: transform 0.15s ease;
    ">${rank}</div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -22],
  });
}

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  const prevCenter = useRef<[number, number]>(center);

  useEffect(() => {
    if (prevCenter.current[0] !== center[0] || prevCenter.current[1] !== center[1]) {
      map.flyTo(center, zoom, { duration: 0.8 });
      prevCenter.current = center;
    }
  }, [center, zoom, map]);

  return null;
}

function FitBounds({ pins }: { pins: Pin[] }) {
  const map = useMap();

  useEffect(() => {
    if (pins.length === 0) return;
    if (pins.length === 1) {
      map.setView([pins[0].lat, pins[0].lng], 14);
      return;
    }
    const bounds = L.latLngBounds(pins.map((p) => [p.lat, p.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [60, 60] });
  }, [map, pins]);

  return null;
}

interface MapClientProps {
  pins: Pin[];
  center?: [number, number];
  zoom?: number;
  flyToCenter?: [number, number];
  fitAllPins?: boolean;
  className?: string;
}

export default function MapClient({
  pins,
  center = [40.7128, -74.006],
  zoom = 12,
  flyToCenter,
  fitAllPins = false,
  className = "",
}: MapClientProps) {
  const tileUrl = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={className}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url={tileUrl}
      />
      {flyToCenter && <ChangeView center={flyToCenter} zoom={zoom} />}
      {fitAllPins && <FitBounds pins={pins} />}
      {pins.map((pin) => (
        <Marker key={pin.id} position={[pin.lat, pin.lng]} icon={createStickerIcon(pin.rank)}>
          <Popup>
            <div className="text-center p-1">
              <div className="font-bold text-base">
                {pin.rank}. {pin.name}
              </div>
              {pin.note && <div className="text-sm text-gray-500 mt-1">{pin.note}</div>}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
