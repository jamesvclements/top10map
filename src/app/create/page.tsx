"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import CategoryPicker from "@/components/CategoryPicker";
import PlaceSearch from "@/components/PlaceSearch";
import PinCard from "@/components/PinCard";
import Map from "@/components/Map";
import { Category, Pin, SearchResult, MapData } from "@/lib/types";
import { generateId, saveMap, encodeMapData } from "@/lib/storage";

type Step = "category" | "pins" | "done";

export default function CreatePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("category");
  const [category, setCategory] = useState<Category | null>(null);
  const [title, setTitle] = useState("");
  const [pins, setPins] = useState<Pin[]>([]);
  const [flyTo, setFlyTo] = useState<[number, number] | undefined>();

  const handleCategorySelect = (cat: Category) => {
    setCategory(cat);
    if (cat.id !== "custom") {
      setTitle(`My Top 10 ${cat.name}`);
    }
    setStep("pins");
  };

  const handleAddPlace = useCallback(
    (result: SearchResult) => {
      if (pins.length >= 10) return;
      const newPin: Pin = {
        id: generateId(),
        rank: pins.length + 1,
        name: result.display_name.split(",")[0],
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        note: "",
      };
      setPins((prev) => [...prev, newPin]);
      setFlyTo([newPin.lat, newPin.lng]);
    },
    [pins.length]
  );

  const handleRemovePin = (id: string) => {
    setPins((prev) =>
      prev
        .filter((p) => p.id !== id)
        .map((p, i) => ({ ...p, rank: i + 1 }))
    );
  };

  const handleNoteChange = (id: string, note: string) => {
    setPins((prev) => prev.map((p) => (p.id === id ? { ...p, note } : p)));
  };

  const handleSave = () => {
    if (!category || pins.length === 0) return;
    const mapData: MapData = {
      id: generateId(),
      title: title || `My Top 10 ${category.name}`,
      category: category.id,
      emoji: category.emoji,
      pins,
      createdAt: new Date().toISOString(),
    };
    saveMap(mapData);
    const encoded = encodeMapData(mapData);
    router.push(`/map/${mapData.id}#${encoded}`);
  };

  return (
    <div className="min-h-screen pt-16">
      {step === "category" && (
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Create Your Map
            </h1>
            <p className="text-muted mt-2">
              Pick a category to get started
            </p>
          </div>
          <CategoryPicker selected={category} onSelect={handleCategorySelect} />
        </div>
      )}

      {step === "pins" && (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
          {/* Sidebar */}
          <div className="w-full lg:w-96 p-4 lg:p-6 overflow-y-auto border-b lg:border-b-0 lg:border-r border-border bg-background order-2 lg:order-1">
            <button
              onClick={() => setStep("category")}
              className="text-sm text-muted hover:text-foreground mb-4 flex items-center gap-1"
            >
              ← Back
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{category?.emoji}</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Map title..."
                className="text-xl font-bold bg-transparent outline-none text-foreground placeholder:text-muted/50 flex-1"
              />
            </div>

            <div className="mb-4">
              <PlaceSearch
                onSelectPlace={handleAddPlace}
                disabled={pins.length >= 10}
              />
              {pins.length >= 10 && (
                <p className="text-xs text-accent mt-2 font-medium">
                  Maximum 10 pins reached!
                </p>
              )}
            </div>

            <div className="text-xs text-muted mb-2 font-medium">
              {pins.length}/10 places added
            </div>

            <div className="space-y-2 mb-6">
              {pins.map((pin) => (
                <PinCard
                  key={pin.id}
                  pin={pin}
                  editable
                  onNoteChange={(note) => handleNoteChange(pin.id, note)}
                  onRemove={() => handleRemovePin(pin.id)}
                />
              ))}
            </div>

            {pins.length === 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-muted text-sm">
                  Search for places above to add them to your map
                </p>
              </div>
            )}

            {pins.length > 0 && (
              <button
                onClick={handleSave}
                className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/25"
              >
                Save & Share Map ({pins.length} pin
                {pins.length !== 1 ? "s" : ""})
              </button>
            )}
          </div>

          {/* Map */}
          <div className="flex-1 order-1 lg:order-2 min-h-[300px] lg:min-h-0">
            <Map
              pins={pins}
              flyToCenter={flyTo}
              fitAllPins={pins.length > 1}
              zoom={13}
              className="rounded-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
