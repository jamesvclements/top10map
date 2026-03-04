"use client";

import { Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";

interface CategoryPickerProps {
  selected: Category | null;
  onSelect: (category: Category) => void;
}

export default function CategoryPicker({ selected, onSelect }: CategoryPickerProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat)}
          className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
            selected?.id === cat.id
              ? "border-primary bg-primary/10 scale-[1.02] shadow-md"
              : "border-border hover:border-primary/40 hover:bg-surface"
          }`}
        >
          <div className="text-3xl mb-2">{cat.emoji}</div>
          <div className="text-sm font-semibold text-foreground">{cat.name}</div>
        </button>
      ))}
    </div>
  );
}
