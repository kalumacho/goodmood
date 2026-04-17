"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import { Check, X, Target } from "lucide-react";

type Props = { currentGoals: string[]; currentSessions: number; userId: string };

const GOALS = [
  { value: "weight_loss", label: "Perte de poids", emoji: "🔥", desc: "Brûle les calories" },
  { value: "muscle_gain", label: "Prise de masse", emoji: "💪", desc: "Forge ton corps" },
  { value: "general_wellness", label: "Bien-être général", emoji: "✨", desc: "Équilibre total" },
  { value: "maintenance", label: "Maintien", emoji: "⚖️", desc: "Garde ton niveau" },
];

const SESSIONS = [2, 3, 4, 5, 6];
const RANK_LABELS: Record<number, string> = { 2: "Académie", 3: "Genin", 4: "Chunin", 5: "Jonin", 6: "Kage" };

export default function GoalsEditor({ currentGoals, currentSessions, userId }: Props) {
  const [open, setOpen] = useState(false);
  const [goals, setGoals] = useState<string[]>(currentGoals);
  const [sessions, setSessions] = useState(currentSessions);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const toggleGoal = (value: string) =>
    setGoals((prev) => prev.includes(value) ? prev.filter((g) => g !== value) : [...prev, value]);

  const handleSave = async () => {
    if (!goals.length) return;
    setLoading(true);
    await supabase.from("user_profiles").update({ goal: goals, sessions_per_week: sessions }).eq("user_id", userId);
    setLoading(false);
    setOpen(false);
    router.refresh();
  };

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-coral hover:text-coral-dark bg-white border-2 border-coral rounded-xl px-3 py-2 shadow-[2px_2px_0px_#E8724A] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#E8724A] transition-all">
        <Target size={13} />
        Changer les objectifs
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-white border-2 border-navy rounded-2xl shadow-[8px_8px_0px_#0D1B2A] w-full max-w-md p-6 animate-bounce-in max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-black uppercase tracking-wider text-navy">Objectifs</h2>
                <p className="text-xs text-navy/40 uppercase tracking-widest font-bold">Redéfinir ta mission</p>
              </div>
              <button onClick={() => setOpen(false)}
                className="p-1.5 text-navy/30 hover:text-navy rounded-lg hover:bg-navy/5 border-2 border-transparent transition-all">
                <X size={18} />
              </button>
            </div>

            <div className="mb-5">
              <p className="text-xs font-black uppercase tracking-widest text-navy/40 mb-3">Objectif(s)</p>
              <div className="space-y-2">
                {GOALS.map((g) => (
                  <button key={g.value} onClick={() => toggleGoal(g.value)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                      goals.includes(g.value)
                        ? "border-coral bg-coral/5 shadow-[3px_3px_0px_#E8724A]"
                        : "border-navy/15 hover:border-coral/50 hover:bg-coral/5"
                    }`}>
                    <span className="text-xl">{g.emoji}</span>
                    <div className="flex-1">
                      <div className={`text-xs font-black uppercase tracking-wider ${goals.includes(g.value) ? "text-coral" : "text-navy/70"}`}>{g.label}</div>
                      <div className="text-xs text-navy/40">{g.desc}</div>
                    </div>
                    {goals.includes(g.value) && <Check size={14} className="text-coral" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <p className="text-xs font-black uppercase tracking-widest text-navy/40 mb-3">Séances par semaine</p>
              <div className="grid grid-cols-5 gap-2">
                {SESSIONS.map((s) => (
                  <button key={s} onClick={() => setSessions(s)}
                    className={`flex flex-col items-center py-3 rounded-xl border-2 transition-all ${
                      sessions === s
                        ? "border-coral bg-coral/5 shadow-[2px_2px_0px_#E8724A]"
                        : "border-navy/15 hover:border-coral/50"
                    }`}>
                    <span className={`text-lg font-black ${sessions === s ? "text-coral" : "text-navy/50"}`}>{s}x</span>
                    <span className="text-xs text-navy/40 font-bold">{RANK_LABELS[s]}</span>
                  </button>
                ))}
              </div>
            </div>

            {goals.length > 0 && (
              <div className="bg-coral/5 border-2 border-coral/30 rounded-xl px-4 py-3 mb-5 text-xs text-navy/60 font-bold uppercase tracking-wider">
                <span className="text-coral">Mission : </span>
                {goals.map((g) => GOALS.find(x => x.value === g)?.label).join(" + ")} · {sessions}x/sem · {RANK_LABELS[sessions]}
              </div>
            )}

            <Button onClick={handleSave} loading={loading} disabled={!goals.length} className="w-full">
              Confirmer la mission
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
