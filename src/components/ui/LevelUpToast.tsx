"use client";

import { useEffect, useState } from "react";
import { Rank } from "@/lib/gamification";
import Shuriken from "@/components/mascot/Shuriken";

interface LevelUpToastProps {
  rank: Rank;
  onClose?: () => void;
  autoHideMs?: number;
}

export default function LevelUpToast({ rank, onClose, autoHideMs = 4500 }: LevelUpToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, autoHideMs);
    return () => clearTimeout(t);
  }, [autoHideMs, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 top-6 z-50 flex justify-center pointer-events-none px-4">
      <div
        className="relative pointer-events-auto bg-white border-2 border-navy rounded-2xl shadow-[6px_6px_0px_#E8724A] px-5 py-4 flex items-center gap-4 overflow-hidden max-w-md animate-[level-up-pop_0.6s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
      >
        {/* Sparkle burst background */}
        <div className="absolute inset-0 sparkle-burst opacity-30 pointer-events-none" />

        {/* Rank kanji medallion */}
        <div className="relative shrink-0">
          <div className="absolute inset-0 -m-2">
            <Shuriken size={72} color="#F9C74F" spin />
          </div>
          <div
            className={`relative w-14 h-14 rounded-xl border-2 border-navy flex items-center justify-center shadow-[3px_3px_0px_#0D1B2A] bg-gradient-to-br ${rank.gradient}`}
          >
            <span className="text-2xl font-black text-white" style={{ textShadow: "1px 1px 0 #0D1B2A" }}>
              {rank.kanji}
            </span>
          </div>
        </div>

        <div className="relative flex-1 min-w-0">
          <div className="text-[10px] font-black uppercase tracking-widest text-coral">
            ★ Promotion ninja
          </div>
          <div className="text-lg font-black uppercase tracking-wider text-navy leading-tight">
            Rang {rank.label}
          </div>
          <div className="text-[11px] text-navy/60 font-bold mt-0.5">
            Nouvelle mission débloquée
          </div>
        </div>

        <button
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
          aria-label="Fermer"
          className="relative text-navy/40 hover:text-navy text-xl font-black shrink-0"
        >
          ×
        </button>
      </div>
    </div>
  );
}
