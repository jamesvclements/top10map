import { MapData } from "./types";

const STORAGE_KEY = "top10map_maps";

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function saveMap(map: MapData): void {
  const maps = getAllMaps();
  const existing = maps.findIndex((m) => m.id === map.id);
  if (existing >= 0) {
    maps[existing] = map;
  } else {
    maps.push(map);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(maps));
}

export function getMap(id: string): MapData | null {
  const maps = getAllMaps();
  return maps.find((m) => m.id === id) ?? null;
}

export function getAllMaps(): MapData[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function deleteMap(id: string): void {
  const maps = getAllMaps().filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(maps));
}

export function encodeMapData(data: MapData): string {
  const json = JSON.stringify(data);
  const bytes = new TextEncoder().encode(json);
  return btoa(Array.from(bytes, (b) => String.fromCharCode(b)).join(""));
}

export function decodeMapData(encoded: string): MapData | null {
  try {
    const bytes = Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json);
  } catch {
    return null;
  }
}
