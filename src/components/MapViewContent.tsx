"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Map from "./Map";
import PinCard from "./PinCard";
import { MapData } from "@/lib/types";
import { getMap, encodeMapData } from "@/lib/storage";
import { DEMO_MAPS } from "@/lib/constants";

function decodeHashData(): MapData | null {
  if (typeof window === "undefined") return null;
  try {
    const hash = window.location.hash.slice(1);
    if (!hash) return null;
    const bytes = Uint8Array.from(atob(hash), (c) => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function MapViewContent({ id }: { id: string }) {
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const stored = getMap(id);
    const demo = DEMO_MAPS.find((m) => m.id === id);
    const hashData = decodeHashData();
    setMapData(stored ?? demo ?? hashData ?? null);
    setLoading(false);
  }, [id, searchParams]);

  const handleShare = async () => {
    if (!mapData) return;
    const encoded = encodeMapData(mapData);
    const url = `${window.location.origin}/map/${mapData.id}#${encoded}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!mapData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <div className="text-6xl">🗺️</div>
        <h1 className="text-2xl font-bold text-foreground">Map not found</h1>
        <p className="text-muted text-center">
          This map doesn&apos;t exist or may have been removed.
        </p>
        <a
          href="/create"
          className="mt-4 bg-primary text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Create Your Own
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-full lg:w-96 p-4 lg:p-6 overflow-y-auto border-b lg:border-b-0 lg:border-r border-border bg-background order-2 lg:order-1">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">{mapData.emoji}</span>
            <div>
              <h1 className="text-xl font-bold text-foreground">{mapData.title}</h1>
              <p className="text-sm text-muted">
                {mapData.pins.length} place{mapData.pins.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            {mapData.pins
              .sort((a, b) => a.rank - b.rank)
              .map((pin) => (
                <PinCard key={pin.id} pin={pin} />
              ))}
          </div>

          <button
            onClick={handleShare}
            className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            {copied ? (
              <>✓ Link Copied!</>
            ) : (
              <>📋 Copy Share Link</>
            )}
          </button>
        </div>

        {/* Map */}
        <div className="flex-1 order-1 lg:order-2 min-h-[300px] lg:min-h-0">
          <Map pins={mapData.pins} fitAllPins className="rounded-none" />
        </div>
      </div>
    </div>
  );
}
