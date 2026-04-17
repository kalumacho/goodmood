"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import { Check, X, Target } from "lucide-react";

type Props = {
  currentGoals: string[];
  currentSessions: number;
  userId: string;
};

const GOALS = [
  { value: "weight_loss", label: "Perte de poids", emoji: "🔥" },
  { value: "muscle_gain", label: "Prise de masse", emoji: "💪" },
  { value: "general_wellness", label: "Bien-être général", emoji: "✨" },
  { value: "maintenance", label: "Maintien", emoji: "⚖️" },
];

const SESSIONS = [
  { value: 2, label: "2x / semaine", desc: "Débutant" },
  { value: 3, label: "3x / semaine", desc: "Équilibré" },
  { value: 4, label: "4x / semaine", desc: "Progressif" },
  { value: 5, label: "5x / semaine", desc: "Intensif" },
  { value: 6, label: "6x / semaine", desc: "Avancé" },
];

export default function GoalsEditor({ currentGoals, currentSessions, userId }: Props) {
  const [open, setOpen] = useState(false);
  const [goals, setGoals] = useState<string[]>(currentGoals);
  const [sessions, setSessions] = useState(currentSessions);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const toggleGoal = (value: string) => {
    setGoals((prev) =>
      prev.includes(value) ? prev.filter((g) => g !== value) : [...prev, value]
    );
  };

  const handleSave = async () => {
    if (goals.length === 0) return;
    setLoading(true);
    await supabase
      .from("user_profiles")
      .update({ goal: goals, sessions_per_week: sessions })
      .eq("user_id", userId);
    setLoading(false);
    setOpen(false);
    router.refresh();
  };

  const goalLabels: Record<string, string> = {
    weight_loss: "Perte de poids",
    muscle_gain: "Prise de masse",
    general_wellness: "Bien-être général",
    maintenance: "Maintien",
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-sm font-medium text-coral hover:text-coral-dark bg-coral/10 hover:bg-coral/20 px-4 py-2 rounded-xl transition-all"
      >
        <Target size={15} />
        Modifier mes objectifs
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-navy/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-card shadow-2xl w-full max-w-md p-6 animate-fade-in">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-navy">Mes objectifs</h2>
              <button onClick={() => setOpen(false)} className="p-1.5 text-navy/40 hover:text-navy rounded-lg hover:bg-navy/5 transition-all">
                <X size={20} />
              </button>
            </div>

            {/* Goals */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-navy mb-3">Objectif(s)</p>
              <div className="space-y-2">
                {GOALS.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => toggleGoal(g.value)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                      goals.includes(g.value)
                        ? "border-coral bg-coral/5"
                        : "border-navy/10 hover:border-navy/20"
                    }`}
                  >
                    <span className="text-xl">{g.emoji}</span>
                    <span className={`flex-1 font-medium text-sm ${goals.includes(g.value) ? "text-coral" : "text-navy"}`}>
                      {g.label}
                    </span>
                    {goals.includes(g.value) && <Check size={16} className="text-coral" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sessions per week */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-navy mb-3">Séances par semaine</p>
              <div className="grid grid-cols-5 gap-2">
                {SESSIONS.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSessions(s.value)}
                    className={`flex flex-col items-center py-3 rounded-xl border-2 transition-all ${
                      sessions === s.value
                        ? "border-coral bg-coral/5"
                        : "border-navy/10 hover:border-navy/20"
                    }`}
                  >
                    <span className={`text-lg font-black ${sessions === s.value ? "text-coral" : "text-navy"}`}>
                      {s.value}x
                    </span>
                    <span className="text-xs text-navy/40 mt-0.5">{s.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            {goals.length > 0 && (
              <div className="bg-cream rounded-xl px-4 py-3 mb-5 text-sm text-navy/60">
                <span className="font-medium text-navy">Résumé : </span>
                {goals.map((g) => goalLabels[g]).join(", ")} · {sessions}x/semaine
              </div>
            )}

            <Button
              onClick={handleSave}
              loading={loading}
              disabled={goals.length === 0}
              className="w-full"
            >
              Sauvegarder
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
