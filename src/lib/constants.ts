import { Category, MapData } from "./types";

export const CATEGORIES: Category[] = [
  { id: "coffee", name: "Coffee Shops", emoji: "\u2615", color: "#8B4513" },
  { id: "restaurants", name: "Restaurants", emoji: "\uD83C\uDF55", color: "#FF6B6B" },
  { id: "bars", name: "Bars & Pubs", emoji: "\uD83C\uDF7A", color: "#FFA94D" },
  { id: "date-spots", name: "Date Spots", emoji: "\uD83D\uDC95", color: "#E84393" },
  { id: "parks", name: "Parks & Nature", emoji: "\uD83C\uDF33", color: "#6BCB77" },
  { id: "custom", name: "Custom", emoji: "\u2B50", color: "#4D96FF" },
];

export const STICKER_COLORS = [
  "#FF6B6B",
  "#FF8E53",
  "#FFC93C",
  "#6BCB77",
  "#4D96FF",
  "#9B59B6",
  "#E84393",
  "#00B894",
  "#FDA085",
  "#636E72",
];

export const DEMO_MAPS: MapData[] = [
  {
    id: "demo-coffee-nyc",
    title: "Best Coffee in NYC",
    category: "coffee",
    emoji: "\u2615",
    pins: [
      { id: "c1", rank: 1, name: "Blue Bottle Coffee", lat: 40.7388, lng: -73.9896, note: "The pour-over is incredible" },
      { id: "c2", rank: 2, name: "Stumptown Coffee Roasters", lat: 40.7467, lng: -73.9887, note: "Best cold brew in the city" },
      { id: "c3", rank: 3, name: "Devoci\u00F3n", lat: 40.7118, lng: -73.9614, note: "Beautiful space, great latte" },
      { id: "c4", rank: 4, name: "Abra\u00E7o", lat: 40.7266, lng: -73.9846, note: "Tiny gem in East Village" },
      { id: "c5", rank: 5, name: "Joe Coffee", lat: 40.7407, lng: -73.9984, note: "Reliable and cozy" },
    ],
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "demo-pizza-chicago",
    title: "Top Pizza in Chicago",
    category: "restaurants",
    emoji: "\uD83C\uDF55",
    pins: [
      { id: "p1", rank: 1, name: "Lou Malnati's", lat: 41.8904, lng: -87.6278, note: "The buttercrust is legendary" },
      { id: "p2", rank: 2, name: "Giordano's", lat: 41.8781, lng: -87.6298, note: "Classic deep dish" },
      { id: "p3", rank: 3, name: "Pequod's Pizza", lat: 41.9219, lng: -87.6645, note: "Caramelized crust perfection" },
      { id: "p4", rank: 4, name: "Art of Pizza", lat: 41.9398, lng: -87.6689, note: "Best by-the-slice" },
      { id: "p5", rank: 5, name: "Pat's Pizza", lat: 41.9306, lng: -87.6752, note: "Neighborhood favorite" },
    ],
    createdAt: "2024-02-20T00:00:00Z",
  },
  {
    id: "demo-parks-sf",
    title: "Best Parks in SF",
    category: "parks",
    emoji: "\uD83C\uDF33",
    pins: [
      { id: "k1", rank: 1, name: "Golden Gate Park", lat: 37.7694, lng: -122.4862, note: "Endless trails and gardens" },
      { id: "k2", rank: 2, name: "Dolores Park", lat: 37.7596, lng: -122.4269, note: "Best city views + vibes" },
      { id: "k3", rank: 3, name: "Twin Peaks", lat: 37.7544, lng: -122.4477, note: "360 panoramic views" },
      { id: "k4", rank: 4, name: "Lands End", lat: 37.7879, lng: -122.5054, note: "Stunning coastal trail" },
      { id: "k5", rank: 5, name: "Crissy Field", lat: 37.8039, lng: -122.4697, note: "Golden Gate Bridge views" },
    ],
    createdAt: "2024-03-10T00:00:00Z",
  },
];
