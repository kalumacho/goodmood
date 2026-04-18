"use client";

import { useEffect, useState } from "react";
import { DAILY_QUESTS } from "@/lib/gamification";
import { Sword, Droplet, Wind, Scale, Target } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  sword: Sword,
  droplet: Droplet,
  wind: Wind,
  scale: Scale,
};

function storageKey(iso: string) {
  return `quests:${iso}`;
}

interface DailyQuestsProps {
  todayHasSession: boolean;
}

export default function DailyQuests({ todayHasSession }: DailyQuestsProps) {
  const [mounted, setMounted] = useState(false);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [xpBurst, setXpBurst] = useState<{ id: string; value: number } | null>(null);

  useEffect(() => {
    setMounted(true);
    const today = new Date().toISOString().split("T")[0];
    const stored = localStorage.getItem(storageKey(today));
    if (stored) {
      try {
        setCompleted(JSON.parse(stored));
      } catch {}
    }
  }, []);

  // Auto-check "workout" when session exists server-side
  useEffect(() => {
    if (todayHasSession && mounted && !completed.workout) {
      toggle("workout", true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayHasSession, mounted]);

  const toggle = (id: string, forceTrue = false) => {
    const wasDone = completed[id];
    const nextValue = forceTrue ? true : !wasDone;
    if (wasDone === nextValue) return;

    const next = { ...completed, [id]: nextValue };
    setCompleted(next);
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(storageKey(today), JSON.stringify(next));

    if (nextValue) {
      const quest = DAILY_QUESTS.find((q) => q.id === id);
      if (quest) {
        setXpBurst({ id, value: quest.xp });
        setTimeout(() => setXpBurst(null), 1200);
      }
    }
  };

  const doneCount = Object.values(completed).filter(Boolean).length;
  const totalXP = DAILY_QUESTS.reduce(
    (sum, q) => sum + (completed[q.id] ? q.xp : 0),
    0
  );
  const maxXP = DAILY_QUESTS.reduce((s, q) => s + q.xp, 0);

  return (
    <div className="relative bg-white border-2 border-navy rounded-2xl shadow-[4px_4px_0px_#0D1B2A] p-5">
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-coral border-2 border-navy shadow-[2px_2px_0px_#0D1B2A] flex items-center justify-center">
            <Target size={14} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-navy">
              Quêtes du jour
            </h3>
            <p className="text-[10px] text-navy/40 font-bold uppercase tracking-wider">
              Réinitialisées chaque matin
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-black text-navy leading-none">
            {mounted ? doneCount : 0}
            <span className="text-xs text-navy/30 font-bold">/{DAILY_QUESTS.length}</span>
          </div>
          <div className="text-[10px] font-black uppercase tracking-wider text-coral mt-0.5">
            +{mounted ? totalXP : 0} / {maxXP} XP
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="h-2 bg-navy/5 rounded-full overflow-hidden mb-4 border border-navy/10">
        <div
          className="h-full bg-sunset-fire transition-all duration-500 rounded-full"
          style={{ width: `${mounted ? (totalXP / maxXP) * 100 : 0}%` }}
        />
      </div>

      {/* Quests list */}
      <div className="space-y-2">
        {DAILY_QUESTS.map((q) => {
          const Icon = iconMap[q.icon] || Target;
          const done = mounted && !!completed[q.id];
          const burst = xpBurst?.id === q.id;

          return (
            <button
              key={q.id}
              onClick={() => toggle(q.id)}
              className={`relative w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-150 ${
                done
                  ? "border-coral bg-gradient-to-r from-coral/10 to-sunset-gold/10"
                  : "border-navy/10 hover:border-navy/30 bg-white hover:-translate-x-0.5"
              }`}
            >
              <span className={`quest-check ${done ? "done" : ""}`} />
              <div
                className={`w-9 h-9 rounded-lg border-2 border-navy shadow-[2px_2px_0px_#0D1B2A] flex items-center justify-center shrink-0 ${
                  done ? "bg-sunset-fire" : "bg-white"
                }`}
              >
                <Icon
                  size={15}
                  className={done ? "text-white" : "text-navy"}
                />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div
                  className={`text-xs font-black uppercase tracking-wider truncate ${
                    done ? "line-through text-navy/40" : "text-navy"
                  }`}
                >
                  {q.title}
                </div>
                <div className="text-[11px] text-navy/50 truncate">{q.description}</div>
              </div>
              <div
                className={`text-xs font-black uppercase tracking-widest shrink-0 px-2 py-1 rounded-md border-2 border-navy ${
                  done ? "bg-sunset-gold text-navy" : "bg-navy text-white"
                }`}
              >
                +{q.xp}
              </div>
              {burst && (
                <span className="xp-pop" style={{ right: "20px", top: "8px" }}>
                  +{q.xp} XP
                </span>
              )}
            </button>
          );
        })}
      </div>

      {doneCount === DAILY_QUESTS.length && mounted && (
        <div className="mt-4 p-3 rounded-xl bg-sunset-fire text-white border-2 border-navy shadow-[3px_3px_0px_#0D1B2A] text-center">
          <div className="text-xs font-black uppercase tracking-widest">
            Toutes les quêtes complétées !
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider mt-0.5 opacity-90">
            Reviens demain pour de nouvelles missions
          </div>
        </div>
      )}
    </div>
  );
}
