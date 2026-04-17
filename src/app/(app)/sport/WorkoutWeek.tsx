"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import Ryoku from "@/components/mascot/Ryoku";
import { Check, ChevronDown, ChevronUp, Moon, Sword, Star } from "lucide-react";

type Exercise = { name: string; sets: number; reps: string; rest: string; instructions: string };
type DaySession = { day: string; title: string; exercises: Exercise[]; isRest: boolean };

export default function WorkoutWeek({ plan, userId, completedDays }: {
  plan: DaySession[]; userId: string; completedDays: string[];
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [done, setDone] = useState<Set<string>>(() => new Set(completedDays.map((d) => d.toLowerCase())));
  const [loading, setLoading] = useState<string | null>(null);
  const [celebration, setCelebration] = useState<string | null>(null);
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
      if (!error) {
        setDone((prev) => { const next = new Set(Array.from(prev)); next.add(dayLower); return next; });
        setCelebration(day);
        setTimeout(() => setCelebration(null), 2500);
      }
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
        const isCelebrating = celebration === session.day;

        return (
          <div key={session.day}
            className={`bg-white rounded-2xl border-2 transition-all duration-200 ${
              isToday
                ? "border-coral shadow-[4px_4px_0px_#E8724A]"
                : isDone
                  ? "border-sage shadow-[4px_4px_0px_#8BAF8B]"
                  : "border-navy/15 shadow-[3px_3px_0px_rgba(13,27,42,0.08)]"
            }`}>

            {/* Celebration overlay */}
            {isCelebrating && (
              <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden rounded-2xl">
                <div className="flex flex-col items-center animate-bounce-in">
                  <Ryoku pose="fistpump" size={100} />
                  <div className="onomatopoeia text-3xl mt-1">MISSION ACCOMPLIE!</div>
                </div>
                {/* Stars */}
                <Star className="absolute top-2 right-4 text-coral animate-impact-pop" size={20} fill="currentColor" />
                <Star className="absolute top-4 right-12 text-coral animate-impact-pop" size={14} fill="currentColor" style={{ animationDelay: "0.1s" }} />
                <Star className="absolute top-2 left-8 text-coral animate-impact-pop" size={16} fill="currentColor" style={{ animationDelay: "0.2s" }} />
              </div>
            )}

            <button className="w-full flex items-center gap-3 sm:gap-4 p-4 text-left"
              onClick={() => !session.isRest && setExpanded(isOpen ? null : session.day)}>
              {/* Day indicator */}
              <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 font-black text-xs border-2 ${
                isDone
                  ? "bg-sage text-white border-navy shadow-[2px_2px_0px_#0D1B2A]"
                  : isToday
                    ? "bg-coral text-white border-navy shadow-[2px_2px_0px_#0D1B2A]"
                    : "bg-navy/5 border-navy/15 text-navy/30"
              }`}>
                {isDone ? <Check size={18} /> : session.day.slice(0, 3).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`font-black uppercase text-sm tracking-wide ${isToday ? "text-coral" : "text-navy"}`}>
                    {session.day}
                  </span>
                  {isToday && (
                    <span className="text-xs bg-coral text-white font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border-2 border-navy shadow-[1px_1px_0px_#0D1B2A]">
                      Aujourd&apos;hui
                    </span>
                  )}
                  {isDone && (
                    <span className="text-xs bg-sage text-white font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border-2 border-navy shadow-[1px_1px_0px_#0D1B2A]">
                      ✓ Accomplie
                    </span>
                  )}
                </div>
                <p className="text-navy/40 text-xs font-bold uppercase tracking-widest mt-0.5">
                  {session.isRest ? "Repos — récupération" : `${session.title} · ${session.exercises.length} exercices`}
                </p>
              </div>

              {!session.isRest && (
                isOpen
                  ? <ChevronUp size={16} className="text-coral shrink-0" />
                  : <ChevronDown size={16} className="text-navy/20 shrink-0" />
              )}
              {session.isRest && <Moon size={16} className="text-navy/15 shrink-0" />}
            </button>

            {isOpen && !session.isRest && (
              <div className="px-4 pb-4 space-y-3 border-t-2 border-navy/10 pt-4">
                {/* Speech bubble tip */}
                <div className="speech-bubble px-4 py-3 mb-1 inline-block max-w-sm">
                  <p className="text-xs text-navy/60 font-bold">
                    💪 <span className="text-coral font-black">{session.title}</span> — Concentre-toi sur la forme !
                  </p>
                </div>

                {session.exercises.map((ex, i) => (
                  <div key={i} className="bg-paper border-2 border-navy/10 rounded-xl p-3 sm:p-4 screen-tone">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-coral font-black text-xs border-2 border-coral rounded-lg w-7 h-7 flex items-center justify-center bg-coral/10">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h4 className="font-black uppercase text-xs sm:text-sm tracking-wide text-navy">{ex.name}</h4>
                      </div>
                      <span className="text-xs text-navy/40 bg-white border-2 border-navy/10 px-2 py-1 rounded-lg font-bold">{ex.rest} repos</span>
                    </div>
                    <div className="flex gap-4 text-xs font-black uppercase tracking-widest text-navy/50 mb-2">
                      <span><span className="text-coral">{ex.sets}</span> séries</span>
                      <span><span className="text-coral">{ex.reps}</span> reps</span>
                    </div>
                    <p className="text-xs text-navy/50 border-l-4 border-coral/40 pl-2 italic">{ex.instructions}</p>
                  </div>
                ))}

                <Button
                  onClick={() => toggleDone(session.day)}
                  loading={loading === session.day}
                  variant={isDone ? "outline" : "primary"}
                  className="w-full mt-2"
                >
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
