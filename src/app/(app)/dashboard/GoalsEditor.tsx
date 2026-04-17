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
        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange hover:text-orange-light border border-orange/30 hover:border-orange bg-orange/5 hover:bg-orange/10 px-3 py-2 rounded transition-all">
        <Target size={13} />
        Changer les objectifs
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-void/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-shadow border border-orange/30 rounded w-full max-w-md p-6 animate-slide_up max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-black uppercase tracking-wider text-white">Objectifs</h2>
                <p className="text-xs text-white/30 uppercase tracking-widest font-bold">Redéfinir ta mission</p>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 text-white/30 hover:text-white rounded hover:bg-white/5 transition-all">
                <X size={18} />
              </button>
            </div>

            {/* Goals */}
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-3">Objectif(s)</p>
              <div className="space-y-2">
                {GOALS.map((g) => (
                  <button key={g.value} onClick={() => toggleGoal(g.value)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded border text-left transition-all ${
                      goals.includes(g.value) ? "border-orange/60 bg-orange/10" : "border-white/5 bg-shadow-light hover:border-orange/20"
                    }`}>
                    <span className="text-xl">{g.emoji}</span>
                    <div className="flex-1">
                      <div className={`text-xs font-black uppercase tracking-wider ${goals.includes(g.value) ? "text-orange" : "text-white/70"}`}>{g.label}</div>
                      <div className="text-xs text-white/30">{g.desc}</div>
                    </div>
                    {goals.includes(g.value) && <Check size={14} className="text-orange" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sessions */}
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-3">Séances par semaine</p>
              <div className="grid grid-cols-5 gap-2">
                {SESSIONS.map((s) => (
                  <button key={s} onClick={() => setSessions(s)}
                    className={`flex flex-col items-center py-3 rounded border transition-all ${
                      sessions === s ? "border-orange/60 bg-orange/10" : "border-white/5 bg-shadow-light hover:border-orange/20"
                    }`}>
                    <span className={`text-lg font-black ${sessions === s ? "text-orange" : "text-white/50"}`}>{s}x</span>
                    <span className="text-xs text-white/30 font-bold">{RANK_LABELS[s]}</span>
                  </button>
                ))}
              </div>
            </div>

            {goals.length > 0 && (
              <div className="bg-orange/5 border border-orange/20 rounded px-4 py-3 mb-5 text-xs text-white/50 font-bold uppercase tracking-wider">
                <span className="text-orange">Mission : </span>
                {goals.map((g) => GOALS.find(x => x.value === g)?.label).join(" + ")} · {sessions}x/semaine · Rang {RANK_LABELS[sessions]}
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
