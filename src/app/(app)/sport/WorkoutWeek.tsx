"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import { Check, ChevronDown, ChevronUp, Moon, Sword } from "lucide-react";

type Exercise = { name: string; sets: number; reps: string; rest: string; instructions: string };
type DaySession = { day: string; title: string; exercises: Exercise[]; isRest: boolean };

export default function WorkoutWeek({ plan, userId, completedDays }: {
  plan: DaySession[]; userId: string; completedDays: string[];
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [done, setDone] = useState<Set<string>>(() => new Set(completedDays.map((d) => d.toLowerCase())));
  const [loading, setLoading] = useState<string | null>(null);
  const supabase = createClient();

  const today = new Date().toLocaleDateString("fr-FR", { weekday: "long" }).toLowerCase();

  const toggleDone = async (day: string) => {
    setLoading(day);
    const dayLower = day.toLowerCase();
    if (done.has(dayLower)) {
      const { error } = await supabase.from("completed_sessions").delete().eq("user_id", userId).eq("session_id", day);
      if (!error) setDone((prev) => { const next = new Set(Array.from(prev)); next.delete(dayLower); return next; });
    } else {
      const { error } = await supabase.from("completed_sessions").insert({ user_id: userId, session_id: day });
      if (!error) setDone((prev) => { const next = new Set(Array.from(prev)); next.add(dayLower); return next; });
    }
    setLoading(null);
  };

  return (
    <div className="space-y-3">
      {plan.map((session) => {
        const dayLower = session.day.toLowerCase();
        const isToday = dayLower === today;
        const isDone = done.has(dayLower);
        const isOpen = expanded === session.day;

        return (
          <div key={session.day}
            className={`bg-shadow border rounded transition-all ${
              isToday ? "border-orange/50 shadow-orange" : isDone ? "border-orange/20" : "border-white/5"
            }`}>
            <button className="w-full flex items-center gap-3 sm:gap-4 p-4 text-left"
              onClick={() => !session.isRest && setExpanded(isOpen ? null : session.day)}>
              {/* Day indicator */}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded flex items-center justify-center shrink-0 font-black text-xs border ${
                isDone ? "bg-orange/20 border-orange/40 text-orange" :
                isToday ? "bg-orange text-void border-orange" :
                "bg-void border-white/10 text-white/30"
              }`}>
                {isDone ? <Check size={18} /> : session.day.slice(0, 3).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`font-black uppercase text-sm tracking-wide ${isToday ? "text-orange" : "text-white"}`}>
                    {session.day}
                  </span>
                  {isToday && <span className="text-xs bg-orange text-void font-black uppercase tracking-widest px-2 py-0.5 rounded">Aujourd&apos;hui</span>}
                  {isDone && <span className="text-xs border border-orange/30 text-orange font-black uppercase tracking-widest px-2 py-0.5 rounded">✓ Accomplie</span>}
                </div>
                <p className="text-white/30 text-xs font-bold uppercase tracking-widest mt-0.5">
                  {session.isRest ? "Repos — récupération" : `${session.title} · ${session.exercises.length} exercices`}
                </p>
              </div>

              {!session.isRest && (
                isOpen ? <ChevronUp size={16} className="text-orange shrink-0" /> : <ChevronDown size={16} className="text-white/20 shrink-0" />
              )}
              {session.isRest && <Moon size={16} className="text-white/10 shrink-0" />}
            </button>

            {isOpen && !session.isRest && (
              <div className="px-4 pb-4 space-y-3 border-t border-orange/10 pt-4">
                {session.exercises.map((ex, i) => (
                  <div key={i} className="bg-shadow-light border border-white/5 rounded p-3 sm:p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-orange font-black text-xs">{String(i + 1).padStart(2, "0")}</span>
                        <h4 className="font-black uppercase text-xs sm:text-sm tracking-wide text-white">{ex.name}</h4>
                      </div>
                      <span className="text-xs text-white/30 bg-void border border-white/5 px-2 py-1 rounded font-bold">{ex.rest} repos</span>
                    </div>
                    <div className="flex gap-4 text-xs font-black uppercase tracking-widest text-white/50 mb-2">
                      <span><span className="text-orange">{ex.sets}</span> séries</span>
                      <span><span className="text-orange">{ex.reps}</span> reps</span>
                    </div>
                    <p className="text-xs text-white/30 border-l-2 border-orange/30 pl-2">{ex.instructions}</p>
                  </div>
                ))}
                <Button onClick={() => toggleDone(session.day)} loading={loading === session.day}
                  variant={isDone ? "outline" : "primary"} className="w-full mt-2">
                  <Sword size={14} className="mr-2" />
                  {isDone ? "Annuler la mission" : "Mission accomplie !"}
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
