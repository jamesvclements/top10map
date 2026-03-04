"use client";

import { Pin } from "@/lib/types";
import { STICKER_COLORS } from "@/lib/constants";

interface PinCardProps {
  pin: Pin;
  onNoteChange?: (note: string) => void;
  onRemove?: () => void;
  editable?: boolean;
}

export default function PinCard({ pin, onNoteChange, onRemove, editable }: PinCardProps) {
  const color = STICKER_COLORS[pin.rank - 1] || STICKER_COLORS[0];

  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-surface hover:bg-surface-hover transition-colors group">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm"
        style={{ backgroundColor: color }}
      >
        {pin.rank}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate text-foreground">{pin.name}</div>
        {editable ? (
          <input
            type="text"
            value={pin.note}
            onChange={(e) => onNoteChange?.(e.target.value)}
            placeholder="Add a note..."
            className="w-full text-xs text-muted mt-1 bg-transparent outline-none placeholder:text-muted/50"
          />
        ) : (
          pin.note && <div className="text-xs text-muted mt-1">{pin.note}</div>
        )}
      </div>
      {editable && onRemove && (
        <button
          onClick={onRemove}
          className="text-muted hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 text-lg leading-none"
          aria-label="Remove pin"
        >
          &times;
        </button>
      )}
    </div>
  );
}
