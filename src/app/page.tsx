"use client";

import Link from "next/link";
import { DEMO_MAPS, CATEGORIES } from "@/lib/constants";
import { STICKER_COLORS } from "@/lib/constants";
import Map from "@/components/Map";

function DemoMapCard({ map }: { map: (typeof DEMO_MAPS)[number] }) {
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

export default function Home() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <span
                  key={cat.id}
                  className="text-2xl animate-bounce"
                  style={{ animationDelay: `${Math.random() * 0.5}s` }}
                >
                  {cat.emoji}
                </span>
              ))}
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-foreground leading-tight">
              Pin Your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Top 10
              </span>{" "}
              Favorite Places
            </h1>
            <p className="mt-6 text-lg text-muted max-w-lg">
              Create beautiful ranked maps of your favorite spots. Share your
              coffee shops, restaurants, parks, and hidden gems with the world.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
              >
                📍 Create a Map
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 border-2 border-border px-8 py-4 rounded-full text-lg font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                Explore Maps
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative gradient */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Demo Maps */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Featured Maps
            </h2>
            <p className="text-muted mt-1">
              Get inspired by these community maps
            </p>
          </div>
          <Link
            href="/explore"
            className="text-primary font-medium hover:underline hidden sm:block"
          >
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_MAPS.map((map) => (
            <DemoMapCard key={map.id} map={map} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-12">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                emoji: "🏷️",
                title: "Pick a Category",
                desc: "Coffee shops, restaurants, parks — or create your own custom category.",
              },
              {
                step: "2",
                emoji: "📍",
                title: "Pin Your Top 10",
                desc: "Search for places and rank them. Add notes about why each spot is special.",
              },
              {
                step: "3",
                emoji: "🔗",
                title: "Share Your Map",
                desc: "Get a shareable link and show the world your favorite places.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                  {item.emoji}
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Ready to map your favorites?
        </h2>
        <p className="text-muted mb-8 max-w-md mx-auto">
          It only takes a minute to create your personalized top 10 map.
        </p>
        <Link
          href="/create"
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
        >
          📍 Get Started
        </Link>
      </section>
    </div>
  );
}
