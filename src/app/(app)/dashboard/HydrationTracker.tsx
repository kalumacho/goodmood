"use client";

import { useEffect, useState } from "react";
import { Droplet } from "lucide-react";

const TARGET = 8;

function storageKey(iso: string) {
  return `hydration:${iso}`;
}

export default function HydrationTracker() {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);
  const [lastAdd, setLastAdd] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const today = new Date().toISOString().split("T")[0];
    const stored = localStorage.getItem(storageKey(today));
    if (stored) {
      const n = parseInt(stored, 10);
      if (!isNaN(n)) setCount(Math.min(TARGET, Math.max(0, n)));
    }
  }, []);

  const persist = (value: number) => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(storageKey(today), String(value));
  };

  const add = (idx: number) => {
    const newCount = idx < count ? idx : idx + 1;
    setCount(newCount);
    persist(newCount);
    if (newCount > count) {
      setLastAdd(idx);
      setTimeout(() => setLastAdd(null), 900);
    }
  };

  const pct = mounted ? (count / TARGET) * 100 : 0;
  const complete = mounted && count >= TARGET;

  return (
    <div className="relative bg-white border-2 border-navy rounded-2xl shadow-[4px_4px_0px_#0D1B2A] p-5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sunset-gold to-sunset-amber border-2 border-navy shadow-[2px_2px_0px_#0D1B2A] flex items-center justify-center">
            <Droplet size={14} className="text-white" fill="currentColor" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-navy">
              Hydratation
            </h3>
            <p className="text-[10px] text-navy/40 font-bold uppercase tracking-wider">
              Objectif : 2L · 8 verres
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-black text-navy leading-none">
            {mounted ? count : 0}
            <span className="text-xs text-navy/30 font-bold">/{TARGET}</span>
          </div>
          <div
            className={`text-[10px] font-black uppercase tracking-wider mt-0.5 ${
              complete ? "text-coral" : "text-navy/40"
            }`}
          >
            {complete ? "Objectif atteint" : `${Math.round(pct)}%`}
          </div>
        </div>
      </div>

      {/* Progress bar with water fill */}
      <div className="h-2 bg-navy/5 rounded-full overflow-hidden mb-4 border border-navy/10">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background:
              "linear-gradient(90deg, #F9C74F 0%, #F4A259 50%, #E8724A 100%)",
          }}
        />
      </div>

      {/* 8 glasses grid */}
      <div className="grid grid-cols-8 gap-1.5">
        {Array.from({ length: TARGET }).map((_, i) => {
          const filled = mounted && i < count;
          const popping = lastAdd === i;
          return (
            <button
              key={i}
              onClick={() => add(i)}
              className={`relative aspect-[3/4] rounded-md border-2 transition-all duration-200 flex items-end justify-center overflow-hidden ${
                filled
                  ? "border-navy bg-gradient-to-b from-sunset-gold/30 via-sunset-amber/50 to-coral shadow-[1px_1px_0px_#0D1B2A]"
                  : "border-navy/30 bg-white hover:border-navy/60"
              } ${popping ? "animate-bounce-in" : ""}`}
              aria-label={`Verre ${i + 1}`}
            >
              {filled && (
                <>
                  <span className="absolute inset-x-0 bottom-0 h-[85%] bg-gradient-to-b from-sunset-amber/40 to-coral/80" />
                  <span className="absolute top-0.5 left-1 w-1 h-2 bg-white/50 rounded-full" />
                </>
              )}
              {popping && (
                <span className="xp-pop absolute left-1/2 -translate-x-1/2 top-0 text-[11px]">
                  +1
                </span>
              )}
            </button>
          );
        })}
      </div>

      {complete && (
        <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-sunset-gold to-coral text-white border-2 border-navy shadow-[3px_3px_0px_#0D1B2A] text-center">
          <div className="text-xs font-black uppercase tracking-widest">
            Hydratation maîtrisée !
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider mt-0.5 opacity-90">
            Le ninja reste affûté · +60 XP quête
          </div>
        </div>
      )}
    </div>
  );
}
