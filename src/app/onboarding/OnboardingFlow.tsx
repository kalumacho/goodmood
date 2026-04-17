"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Ryoku from "@/components/mascot/Ryoku";
import { Check } from "lucide-react";
import type { RyokuPose } from "@/components/mascot/Ryoku";

type OnboardingData = {
  age: string; gender: string; height: string; weight: string;
  goal: string[]; sessions_per_week: string; activity_level: string;
  equipment: string; diet: string; wellness_focus: string[];
};

const TOTAL_STEPS = 7;

const STEP_CONFIG: Array<{ title: string; subtitle: string; pose: RyokuPose; speech: string }> = [
  { title: "Identité du ninja", subtitle: "Ces infos calibrent ton chakra", pose: "thinking", speech: "Dis-moi qui tu es, futur ninja !" },
  { title: "Objectif de mission", subtitle: "Quelle est ta cible ?", pose: "idle", speech: "Choisis ta voie ninja ! Tu peux en combiner plusieurs." },
  { title: "Fréquence d'entraînement", subtitle: "Combien de missions par semaine ?", pose: "running", speech: "Plus tu t'entraînes, plus tu deviens fort !" },
  { title: "Niveau d'activité", subtitle: "Ta vie en dehors des missions", pose: "thinking", speech: "J'ai besoin de connaître ton niveau de base..." },
  { title: "Arsenal disponible", subtitle: "Quel équipement as-tu ?", pose: "idle", speech: "Je vais adapter ton programme à ton arsenal !" },
  { title: "Régime alimentaire", subtitle: "Pour adapter tes rations", pose: "thinking", speech: "Les rations d'un ninja sont aussi importantes que l'entraînement !" },
  { title: "Développement du chakra", subtitle: "Quels pouvoirs veux-tu développer ?", pose: "fire", speech: "Dernière étape ! Choisis tes super-pouvoirs wellness !" },
];

export default function OnboardingFlow() {
  const router = useRouter();
  const supabase = createClient();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<OnboardingData>({
    age: "", gender: "", height: "", weight: "", goal: [],
    sessions_per_week: "", activity_level: "", equipment: "", diet: "", wellness_focus: [],
  });

  const toggle = (field: "goal" | "wellness_focus", value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((v) => v !== value) : [...prev[field], value],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return data.age && data.gender && data.height && data.weight;
      case 2: return data.goal.length > 0;
      case 3: return !!data.sessions_per_week;
      case 4: return !!data.activity_level;
      case 5: return !!data.equipment;
      case 6: return !!data.diet;
      case 7: return data.wellness_focus.length > 0;
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    setError("");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth"); return; }

    const { error } = await supabase.from("user_profiles").insert({
      user_id: user.id,
      age: parseInt(data.age),
      gender: data.gender,
      height: parseFloat(data.height),
      weight: parseFloat(data.weight),
      goal: data.goal,
      sessions_per_week: parseInt(data.sessions_per_week),
      activity_level: data.activity_level,
      equipment: data.equipment,
      diet: data.diet,
      wellness_focus: data.wellness_focus,
    });

    if (error) { setError("Erreur lors de la sauvegarde. Réessaie."); setLoading(false); return; }
    router.push("/dashboard");
    router.refresh();
  };

  const config = STEP_CONFIG[step - 1];

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-coral border-2 border-navy rounded-xl shadow-[3px_3px_0px_#0D1B2A] flex items-center justify-center">
            <span className="text-white font-black text-sm">GM</span>
          </div>
          <h1 className="text-2xl font-black uppercase text-navy tracking-tight">
            Good<span className="text-coral">Mood</span>
          </h1>
        </div>
        <div className="text-xs text-navy/40 font-black uppercase tracking-widest">
          Initialisation — Phase {step}/{TOTAL_STEPS}
        </div>
      </div>

      {/* Progress bar — manga panel style */}
      <div className="flex gap-1.5 mb-8">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded-full border-2 transition-all duration-300 ${
            i + 1 < step
              ? "bg-sage border-sage"
              : i + 1 === step
                ? "bg-coral border-coral shadow-[0_0_8px_rgba(232,114,74,0.4)]"
                : "bg-white border-navy/15"
          }`} />
        ))}
      </div>

      {/* Main card — manga panel */}
      <div className="bg-white border-2 border-navy rounded-2xl shadow-[6px_6px_0px_#0D1B2A] overflow-hidden">

        {/* Mascot + speech bubble header */}
        <div className="bg-paper border-b-2 border-navy/10 px-6 pt-5 pb-2 flex items-end gap-4 screen-tone">
          <Ryoku pose={config.pose} size={80} animate />
          <div className="flex-1 pb-4">
            <div className="speech-bubble px-4 py-3 inline-block">
              <p className="text-xs font-bold text-navy/70 italic">{config.speech}</p>
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="p-6 sm:p-8 animate-fade-in" key={step}>
          <h2 className="text-xl font-black uppercase tracking-wide text-navy mb-1">{config.title}</h2>
          <p className="text-navy/40 mb-6 text-xs font-bold uppercase tracking-widest">{config.subtitle}</p>

          {step === 1 && <StepPersonalInfo data={data} onChange={(k, v) => setData((p) => ({ ...p, [k]: v }))} />}
          {step === 2 && <StepGoal goals={data.goal} toggle={(v) => toggle("goal", v)} />}
          {step === 3 && <StepSessionsPerWeek value={data.sessions_per_week} onChange={(v) => setData((p) => ({ ...p, sessions_per_week: v }))} />}
          {step === 4 && <StepActivity value={data.activity_level} onChange={(v) => setData((p) => ({ ...p, activity_level: v }))} />}
          {step === 5 && <StepEquipment value={data.equipment} onChange={(v) => setData((p) => ({ ...p, equipment: v }))} />}
          {step === 6 && <StepDiet value={data.diet} onChange={(v) => setData((p) => ({ ...p, diet: v }))} />}
          {step === 7 && <StepWellness focus={data.wellness_focus} toggle={(v) => toggle("wellness_focus", v)} />}

          {error && (
            <div className="mt-4 bg-red-50 border-2 border-red-300 text-red-600 text-xs font-black uppercase tracking-wider px-4 py-3 rounded-xl">{error}</div>
          )}

          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep((s) => s - 1)} className="flex-1">Retour</Button>
            )}
            {step < TOTAL_STEPS ? (
              <Button onClick={() => setStep((s) => s + 1)} disabled={!canProceed()} className="flex-1">
                Continuer →
              </Button>
            ) : (
              <Button onClick={handleFinish} loading={loading} disabled={!canProceed()} className="flex-1">
                Créer mon programme !
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Step dots */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className={`rounded-full border-2 border-navy transition-all ${
            i + 1 === step ? "w-6 h-3 bg-coral" : i + 1 < step ? "w-3 h-3 bg-sage" : "w-3 h-3 bg-navy/10"
          }`} />
        ))}
      </div>
    </div>
  );
}

function StepPersonalInfo({ data, onChange }: { data: OnboardingData; onChange: (k: string, v: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input label="Âge" type="number" placeholder="25" value={data.age} onChange={(e) => onChange("age", e.target.value)} min="16" max="80" />
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-navy/60 mb-1.5">Genre</label>
          <div className="grid grid-cols-2 gap-2">
            {["male", "female"].map((g) => (
              <button key={g} type="button" onClick={() => onChange("gender", g)}
                className={`py-3 rounded-xl border-2 text-xs font-black uppercase tracking-widest transition-all ${
                  data.gender === g
                    ? "border-coral bg-coral/5 text-coral shadow-[2px_2px_0px_#E8724A]"
                    : "border-navy/15 text-navy/40 hover:border-coral/50"
                }`}>
                {g === "male" ? "Homme" : "Femme"}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Taille (cm)" type="number" placeholder="175" value={data.height} onChange={(e) => onChange("height", e.target.value)} />
        <Input label="Poids (kg)" type="number" placeholder="70" value={data.weight} onChange={(e) => onChange("weight", e.target.value)} />
      </div>
    </div>
  );
}

function StepGoal({ goals, toggle }: { goals: string[]; toggle: (v: string) => void }) {
  const options = [
    { value: "weight_loss", label: "Perte de poids", emoji: "🔥" },
    { value: "muscle_gain", label: "Prise de masse", emoji: "💪" },
    { value: "general_wellness", label: "Bien-être général", emoji: "✨" },
  ];
  return (
    <div className="space-y-3">
      {options.map((o) => (
        <SelectCard key={o.value} selected={goals.includes(o.value)} onClick={() => toggle(o.value)} label={o.label} emoji={o.emoji} />
      ))}
    </div>
  );
}

function StepSessionsPerWeek({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const options = [
    { value: "2", label: "2 fois par semaine", desc: "Idéal pour débuter", emoji: "🌱" },
    { value: "3", label: "3 fois par semaine", desc: "Le bon équilibre", emoji: "⚡" },
    { value: "4", label: "4 fois par semaine", desc: "Pour progresser vite", emoji: "🔥" },
    { value: "5", label: "5 fois par semaine", desc: "Programme intensif", emoji: "💪" },
    { value: "6", label: "6 fois par semaine", desc: "Niveau athlète", emoji: "🏆" },
  ];
  return (
    <div className="space-y-2">
      {options.map((o) => (
        <SelectCard key={o.value} selected={value === o.value} onClick={() => onChange(o.value)} label={o.label} desc={o.desc} emoji={o.emoji} />
      ))}
    </div>
  );
}

function StepActivity({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const options = [
    { value: "sedentary", label: "Sédentaire", desc: "Travail assis, peu de marche", emoji: "🛋️" },
    { value: "light", label: "Léger", desc: "Marche quotidienne", emoji: "🚶" },
    { value: "moderate", label: "Modéré", desc: "Actif dans la journée", emoji: "🏃" },
    { value: "intense", label: "Intense", desc: "Sport quotidien", emoji: "🏋️" },
  ];
  return (
    <div className="space-y-2">
      {options.map((o) => (
        <SelectCard key={o.value} selected={value === o.value} onClick={() => onChange(o.value)} label={o.label} desc={o.desc} emoji={o.emoji} />
      ))}
    </div>
  );
}

function StepEquipment({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const options = [
    { value: "none", label: "Aucun équipement", desc: "Poids du corps", emoji: "🤸" },
    { value: "home", label: "Home gym", desc: "Haltères, élastiques...", emoji: "🏠" },
    { value: "full_gym", label: "Salle complète", desc: "Accès salle de sport", emoji: "🏋️" },
  ];
  return (
    <div className="space-y-2">
      {options.map((o) => (
        <SelectCard key={o.value} selected={value === o.value} onClick={() => onChange(o.value)} label={o.label} desc={o.desc} emoji={o.emoji} />
      ))}
    </div>
  );
}

function StepDiet({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const options = [
    { value: "omnivore", label: "Omnivore", desc: "Je mange de tout", emoji: "🍖" },
    { value: "vegetarian", label: "Végétarien", desc: "Pas de viande", emoji: "🥗" },
    { value: "vegan", label: "Vegan", desc: "Aucun produit animal", emoji: "🌱" },
    { value: "gluten_free", label: "Sans gluten", desc: "Régime sans gluten", emoji: "🌾" },
  ];
  return (
    <div className="space-y-2">
      {options.map((o) => (
        <SelectCard key={o.value} selected={value === o.value} onClick={() => onChange(o.value)} label={o.label} desc={o.desc} emoji={o.emoji} />
      ))}
    </div>
  );
}

function StepWellness({ focus, toggle }: { focus: string[]; toggle: (v: string) => void }) {
  const options = [
    { value: "sleep", label: "Sommeil", emoji: "😴" },
    { value: "stress", label: "Stress", emoji: "🧘" },
    { value: "skincare", label: "Skincare", emoji: "✨" },
    { value: "supplements", label: "Suppléments", emoji: "💊" },
    { value: "all", label: "Tout !", emoji: "🌟" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((o) => (
        <SelectCard key={o.value} selected={focus.includes(o.value)} onClick={() => toggle(o.value)} label={o.label} emoji={o.emoji} />
      ))}
    </div>
  );
}

function SelectCard({ selected, onClick, label, desc, emoji }: {
  selected: boolean; onClick: () => void; label: string; desc?: string; emoji: string;
}) {
  return (
    <button type="button" onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-150 ${
        selected
          ? "border-coral bg-coral/5 shadow-[3px_3px_0px_#E8724A] -translate-x-0.5 -translate-y-0.5"
          : "border-navy/15 bg-white hover:border-coral/50 hover:bg-coral/5"
      }`}>
      <span className="text-2xl">{emoji}</span>
      <div className="flex-1">
        <div className={`font-black uppercase text-xs tracking-wider ${selected ? "text-coral" : "text-navy/70"}`}>{label}</div>
        {desc && <div className="text-navy/40 text-xs mt-0.5">{desc}</div>}
      </div>
      {selected && (
        <div className="w-5 h-5 bg-coral rounded-full border-2 border-white flex items-center justify-center shrink-0">
          <Check size={10} className="text-white" />
        </div>
      )}
    </button>
  );
}
