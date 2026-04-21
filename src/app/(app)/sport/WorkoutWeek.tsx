"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Check, ChevronDown, ChevronUp, Moon, Info } from "lucide-react";
import { awardXP, checkAndAwardBadge, XP_EVENTS } from "@/lib/gamification";

type Exercise = {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  instructions: string;
};

type DaySession = {
  day: string;
  title: string;
  exercises: Exercise[];
  isRest: boolean;
};

export default function WorkoutWeek({
  plan,
  userId,
  completedDays,
  totalSessionsAll,
}: {
  plan: DaySession[];
  userId: string;
  completedDays: string[];
  totalSessionsAll: number;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [done, setDone] = useState<Set<string>>(() => new Set(completedDays.map((d) => d.toLowerCase())));
  const [loading, setLoading] = useState<string | null>(null);
  const supabase = createClient();

  const today = new Date()
    .toLocaleDateString("fr-FR", { weekday: "long" })
    .toLowerCase();

  const toggleDone = async (day: string) => {
    setLoading(day);
    const dayLower = day.toLowerCase();
    if (done.has(dayLower)) {
      const { error } = await supabase
        .from("completed_sessions")
        .delete()
        .eq("user_id", userId)
        .eq("session_id", day);
      if (!error) {
        setDone((prev) => { const next = new Set(Array.from(prev)); next.delete(dayLower); return next; });
      }
    } else {
      const { error } = await supabase.from("completed_sessions").insert({
        user_id: userId,
        session_id: day,
      });
      if (!error) {
        setDone((prev) => { const next = new Set(Array.from(prev)); next.add(dayLower); return next; });

        // Award XP for session completion (once per day)
        await awardXP(supabase, userId, "session_complete", XP_EVENTS.session_complete);

        // Check session-based badges
        const newTotal = totalSessionsAll + done.size + 1;
        if (newTotal >= 1) await checkAndAwardBadge(supabase, userId, "first_session");
        if (newTotal >= 10) await checkAndAwardBadge(supabase, userId, "sessions_10");
        if (newTotal >= 50) await checkAndAwardBadge(supabase, userId, "sessions_50");
      }
    }
    setLoading(null);
  };

  return (
    <div className="space-y-4">
      {plan.map((session) => {
        const dayLower = session.day.toLowerCase();
        const isToday = dayLower === today;
        const isDone = done.has(dayLower);
        const isOpen = expanded === session.day;

        return (
          <Card
            key={session.day}
            className={`transition-all ${isToday ? "ring-2 ring-coral" : ""}`}
          >
            <button
              className="w-full flex items-center gap-4 text-left"
              onClick={() => !session.isRest && setExpanded(isOpen ? null : session.day)}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
                isDone ? "bg-sage/20 text-sage-dark" : isToday ? "bg-coral/20 text-coral" : "bg-navy/5 text-navy/40"
              }`}>
                {isDone ? <Check size={20} /> : session.day.slice(0, 3)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`font-bold ${isToday ? "text-coral" : "text-navy"}`}>{session.day}</span>
                  {isToday && <span className="text-xs bg-coral text-white px-2 py-0.5 rounded-full">Aujourd&apos;hui</span>}
                  {isDone && (
                    <span className="text-xs bg-sage/20 text-sage-dark px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check size={10} /> Complété
                    </span>
                  )}
                </div>
                <p className="text-navy/50 text-sm">{session.isRest ? "Repos" : `${session.title} · ${session.exercises.length} exercices`}</p>
              </div>
              {!session.isRest && (
                isOpen ? <ChevronUp size={18} className="text-navy/30" /> : <ChevronDown size={18} className="text-navy/30" />
              )}
              {session.isRest && <Moon size={18} className="text-navy/20" />}
            </button>

            {isOpen && !session.isRest && (
              <div className="mt-6 space-y-4 border-t border-navy/5 pt-6">
                {session.exercises.map((ex, i) => (
                  <div key={i} className="bg-cream rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-navy">{ex.name}</h4>
                      <span className="text-xs text-navy/40 bg-white px-2 py-1 rounded-lg">{ex.rest} repos</span>
                    </div>
                    <div className="flex gap-4 text-sm text-navy/70 mb-2">
                      <span><strong className="text-navy">{ex.sets}</strong> séries</span>
                      <span><strong className="text-navy">{ex.reps}</strong> reps</span>
                    </div>
                    <div className="flex items-start gap-2 mt-2">
                      <Info size={13} className="text-navy/30 mt-0.5 shrink-0" />
                      <p className="text-xs text-navy/50 italic">{ex.instructions}</p>
                    </div>
                  </div>
                ))}

                <Button
                  onClick={() => toggleDone(session.day)}
                  loading={loading === session.day}
                  variant={isDone ? "outline" : "primary"}
                  className="w-full mt-2"
                >
                  <Check size={16} className="mr-2" />
                  {isDone ? "Annuler la complétion" : "Marquer comme complétée · +50 XP"}
                </Button>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
