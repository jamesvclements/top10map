"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapData } from "@/lib/types";
import { getAllMaps } from "@/lib/storage";
import { DEMO_MAPS, STICKER_COLORS } from "@/lib/constants";
import Map from "@/components/Map";

function MapCard({ map }: { map: MapData }) {
  return (
    <Link
      href={`/map/${map.id}`}
      className="group block rounded-2xl border border-border bg-background overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="h-48 relative">
        <Map pins={map.pins} fitAllPins className="rounded-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{map.emoji}</span>
          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
            {map.title}
          </h3>
        </div>
        <div className="flex items-center gap-1 mt-2">
          {map.pins.slice(0, 5).map((pin, i) => (
            <div
              key={pin.id}
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: STICKER_COLORS[i] }}
            >
              {pin.rank}
            </div>
          ))}
          <span className="text-xs text-muted ml-1">
            {map.pins.length} places
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ExplorePage() {
  const [userMaps, setUserMaps] = useState<MapData[]>([]);

  useEffect(() => {
    setUserMaps(getAllMaps());
  }, []);

  const allMaps = [...userMaps, ...DEMO_MAPS];

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Explore Maps
            </h1>
            <p className="text-muted mt-1">
              Discover top 10 maps from the community
            </p>
          </div>
          <Link
            href="/create"
            className="bg-primary text-white px-6 py-2.5 rounded-full font-medium hover:opacity-90 transition-opacity text-sm"
          >
            + Create Map
          </Link>
        </div>

        {userMaps.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-foreground mb-4">
              Your Maps
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {userMaps.map((map) => (
                <MapCard key={map.id} map={map} />
              ))}
            </div>
          </>
        )}

        <h2 className="text-xl font-bold text-foreground mb-4">
          Featured Maps
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_MAPS.map((map) => (
            <MapCard key={map.id} map={map} />
          ))}
        </div>

        {allMaps.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🗺️</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              No maps yet
            </h2>
            <p className="text-muted mb-6">
              Be the first to create a top 10 map!
            </p>
            <Link
              href="/create"
              className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Create Your First Map
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
