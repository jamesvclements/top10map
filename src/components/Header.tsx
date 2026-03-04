"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-2xl">📍</span>
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Top 10 Map
          </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/explore"
            className="text-sm text-muted hover:text-foreground transition-colors px-3 py-2"
          >
            Explore
          </Link>
          <Link
            href="/create"
            className="text-sm bg-primary text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity font-medium"
          >
            Create Map
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-surface transition-colors text-lg"
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </nav>
      </div>
    </header>
  );
}
