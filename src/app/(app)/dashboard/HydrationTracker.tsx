"use client";

import { useEffect, useState } from "react";
import { Droplets, Minus, Plus } from "lucide-react";

const TARGET = 8;
const storageKey = (iso: string) => `hydration:${iso}`;

export default function HydrationTracker() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const today = new Date().toISOString().split("T")[0];
    const stored = localStorage.getItem(storageKey(today));
    if (stored) setCount(parseInt(stored, 10) || 0);
  }, []);

  const update = (next: number) => {
    const clamped = Math.max(0, Math.min(12, next));
    setCount(clamped);
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(storageKey(today), String(clamped));
  };

  const pct = Math.min(1, count / TARGET);

  return (
    <div className="bg-white rounded-card p-6 shadow-card h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center">
            <Droplets size={20} className="text-sky-500" />
          </div>
          <div>
            <h3 className="font-bold text-navy text-sm">Hydratation</h3>
            <p className="text-xs text-navy/50">Objectif 2L</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-navy">
            {mounted ? count : 0}
            <span className="text-sm font-normal text-navy/40">/{TARGET}</span>
          </div>
          <div className="text-xs text-navy/50">verres</div>
        </div>
      </div>

      {/* Water glasses */}
      <div className="grid grid-cols-8 gap-1.5 mb-5">
        {Array.from({ length: TARGET }).map((_, i) => {
          const filled = mounted && i < count;
          return (
            <button
              key={i}
              onClick={() => update(i + 1 === count ? i : i + 1)}
              className={`aspect-[3/4] rounded-md transition-all ${
                filled
                  ? "bg-gradient-to-b from-sky-300 to-sky-500 shadow-[inset_0_-4px_6px_rgba(0,0,0,0.1)]"
                  : "bg-sky-50 border border-sky-100 hover:bg-sky-100"
              }`}
              aria-label={`Glass ${i + 1}`}
            />
          );
        })}
      </div>

      <div className="mt-auto flex items-center gap-2">
        <button
          onClick={() => update(count - 1)}
          className="w-9 h-9 rounded-lg bg-navy/5 hover:bg-navy/10 text-navy flex items-center justify-center transition-colors"
          aria-label="Retirer"
        >
          <Minus size={16} />
        </button>
        <div className="flex-1 h-2 rounded-full bg-sky-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-300 to-sky-500 transition-all duration-500"
            style={{ width: `${pct * 100}%` }}
          />
        </div>
        <button
          onClick={() => update(count + 1)}
          className="w-9 h-9 rounded-lg bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-colors"
          aria-label="Ajouter"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
