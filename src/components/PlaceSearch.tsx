"use client";

import { useState, useEffect, useRef } from "react";
import { searchPlaces } from "@/lib/search";
import { SearchResult } from "@/lib/types";

interface PlaceSearchProps {
  onSelectPlace: (result: SearchResult) => void;
  disabled?: boolean;
}

export default function PlaceSearch({ onSelectPlace, disabled }: PlaceSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      setShowResults(false);
      return;
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      const data = await searchPlaces(query);
      setResults(data);
      setIsLoading(false);
      setShowResults(true);
    }, 400);

    return () => clearTimeout(timeoutRef.current);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (result: SearchResult) => {
    onSelectPlace(result);
    setQuery("");
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a place..."
          disabled={disabled}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-xl overflow-hidden z-50 max-h-[280px] overflow-y-auto">
          {results.map((result) => (
            <button
              key={result.place_id}
              onClick={() => handleSelect(result)}
              className="w-full text-left px-4 py-3 hover:bg-surface transition-colors border-b border-border last:border-b-0"
            >
              <div className="font-medium text-sm text-foreground">
                {result.display_name.split(",")[0]}
              </div>
              <div className="text-xs text-muted truncate mt-0.5">{result.display_name}</div>
            </button>
          ))}
        </div>
      )}
      {showResults && results.length === 0 && !isLoading && query.length >= 3 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-xl p-4 z-50">
          <p className="text-sm text-muted text-center">No results found</p>
        </div>
      )}
    </div>
  );
}
