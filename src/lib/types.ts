export interface Pin {
  id: string;
  rank: number;
  name: string;
  lat: number;
  lng: number;
  note: string;
}

export interface MapData {
  id: string;
  title: string;
  category: string;
  emoji: string;
  pins: Pin[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
  place_id: number;
}
