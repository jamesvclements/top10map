"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-surface rounded-2xl flex items-center justify-center min-h-[300px]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-muted text-sm">Loading map...</span>
      </div>
    </div>
  ),
});

export default Map;
