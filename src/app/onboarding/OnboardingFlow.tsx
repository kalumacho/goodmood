"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Check } from "lucide-react";

type OnboardingData = {
  age: string;
  gender: string;
  height: string;
  weight: string;
  goal: string[];
  sessions_per_week: string;
  activity_level: string;
  equipment: string;
  diet: string;
  wellness_focus: string[];
};

const TOTAL_STEPS = 7;

export default function OnboardingFlow() {
  const router = useRouter();
  const supabase = createClient();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<OnboardingData>({
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: [],
    sessions_per_week: "",
    activity_level: "",
    equipment: "",
    diet: "",
    wellness_focus: [],
  });

  const toggle = (field: "goal" | "wellness_focus", value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
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

    if (error) {
      setError("Erreur lors de la sauvegarde. Réessaie.");
      setLoading(false);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-orange rounded flex items-center justify-center">
            <span className="text-void font-black text-sm">GM</span>
          </div>
          <h1 className="text-2xl font-black uppercase text-white">
            Good<span className="text-orange">Mood</span>
          </h1>
        </div>
        <p className="text-white/30 text-xs font-black uppercase tracking-widest">
          Initialisation du ninja — Phase {step}/{TOTAL_STEPS}
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1 mb-8">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${
            i + 1 <= step ? "bg-orange shadow-orange" : "bg-white/5"
          }`} />
        ))}
      </div>

      <div className="bg-shadow border border-orange/20 rounded p-6 sm:p-8 animate-fade-in">
        {step === 1 && (
          <StepPersonalInfo data={data} onChange={(k, v) => setData((p) => ({ ...p, [k]: v }))} />
        )}
        {step === 2 && (
          <StepGoal goals={data.goal} toggle={(v) => toggle("goal", v)} />
        )}
        {step === 3 && (
          <StepSessionsPerWeek value={data.sessions_per_week} onChange={(v) => setData((p) => ({ ...p, sessions_per_week: v }))} />
        )}
        {step === 4 && (
          <StepActivity value={data.activity_level} onChange={(v) => setData((p) => ({ ...p, activity_level: v }))} />
        )}
        {step === 5 && (
          <StepEquipment value={data.equipment} onChange={(v) => setData((p) => ({ ...p, equipment: v }))} />
        )}
        {step === 6 && (
          <StepDiet value={data.diet} onChange={(v) => setData((p) => ({ ...p, diet: v }))} />
        )}
        {step === 7 && (
          <StepWellness focus={data.wellness_focus} toggle={(v) => toggle("wellness_focus", v)} />
        )}

        {error && (
          <div className="mt-4 bg-red/10 border border-red/30 text-red-light text-xs font-black uppercase tracking-wider px-4 py-3 rounded">{error}</div>
        )}

        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep((s) => s - 1)} className="flex-1">
              Retour
            </Button>
          )}
          {step < TOTAL_STEPS ? (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!canProceed()} className="flex-1">
              Continuer
            </Button>
          ) : (
            <Button onClick={handleFinish} loading={loading} disabled={!canProceed()} className="flex-1">
              Créer mon programme !
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepPersonalInfo({ data, onChange }: { data: OnboardingData; onChange: (k: string, v: string) => void }) {
  return (
    <div>
      <h2 className="text-xl font-black uppercase tracking-wide text-white mb-1">Identité du ninja</h2>
      <p className="text-white/30 mb-6 text-xs font-bold uppercase tracking-widest">Ces infos calculent tes besoins en chakra.</p>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Âge" type="number" placeholder="25" value={data.age} onChange={(e) => onChange("age", e.target.value)} min="16" max="80" />
          <div>
            <label className="block text-sm font-medium text-navy/70 mb-1.5">Genre</label>
            <div className="grid grid-cols-2 gap-2">
              {["male", "female"].map((g) => (
                <button key={g} type="button" onClick={() => onChange("gender", g)}
                  className={`py-3 rounded border text-xs font-black uppercase tracking-widest transition-all ${data.gender === g ? "border-orange/60 bg-orange/10 text-orange" : "border-white/10 text-white/30 hover:border-orange/30"}`}>
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
    <div>
      <h2 className="text-xl font-black uppercase tracking-wide text-white mb-1">Objectif de mission</h2>
      <p className="text-white/30 mb-6 text-xs font-bold uppercase tracking-widest">Sélectionne ta ou tes cibles.</p>
      <div className="space-y-3">
        {options.map((o) => (
          <SelectCard key={o.value} selected={goals.includes(o.value)} onClick={() => toggle(o.value)} label={o.label} emoji={o.emoji} />
        ))}
      </div>
    </div>
  );
}

function StepSessionsPerWeek({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const options = [
    { value: "2", label: "2 fois par semaine", desc: "Idéal pour débuter ou maintenir", emoji: "🌱" },
    { value: "3", label: "3 fois par semaine", desc: "Le bon équilibre sport / récupération", emoji: "⚡" },
    { value: "4", label: "4 fois par semaine", desc: "Pour progresser rapidement", emoji: "🔥" },
    { value: "5", label: "5 fois par semaine", desc: "Programme intensif, bonne récupération requise", emoji: "💪" },
    { value: "6", label: "6 fois par semaine", desc: "Niveau avancé, athlètes", emoji: "🏆" },
  ];
  return (
    <div>
      <h2 className="text-xl font-black uppercase tracking-wide text-white mb-1">Fréquence d&apos;entraînement</h2>
      <p className="text-white/30 mb-6 text-xs font-bold uppercase tracking-widest">Combien de missions par semaine ?</p>
      <div className="space-y-3">
        {options.map((o) => (
          <SelectCard key={o.value} selected={value === o.value} onClick={() => onChange(o.value)} label={o.label} desc={o.desc} emoji={o.emoji} />
        ))}
      </div>
    </div>
  );
}

function StepActivity({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const options = [
    { value: "sedentary", label: "Sédentaire", desc: "Travail assis, peu de marche", emoji: "🛋️" },
    { value: "light", label: "Léger", desc: "Marche quotidienne, debout", emoji: "🚶" },
    { value: "moderate", label: "Modéré", desc: "Actif dans la journée", emoji: "🏃" },
    { value: "intense", label: "Intense", desc: "Travail physique ou sport quotidien", emoji: "🏋️" },
  ];
  return (
    <div>
      <h2 className="text-xl font-black uppercase tracking-wide text-white mb-1">Niveau d&apos;activité</h2>
      <p className="text-white/30 mb-6 text-xs font-bold uppercase tracking-widest">En dehors des missions — pour calibrer le chakra.</p>
      <div className="space-y-3">
        {options.map((o) => (
          <SelectCard key={o.value} selected={value === o.value} onClick={() => onChange(o.value)} label={o.label} desc={o.desc} emoji={o.emoji} />
        ))}
      </div>
    </div>
  );
}

function StepEquipment({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const options = [
    { value: "none", label: "Aucun équipement", desc: "Exercices au poids du corps", emoji: "🤸" },
    { value: "home", label: "Home gym", desc: "Haltères, élastiques, etc.", emoji: "🏠" },
    { value: "full_gym", label: "Salle complète", desc: "Accès à une salle de sport", emoji: "🏋️" },
  ];
  return (
    <div>
      <h2 className="text-xl font-black uppercase tracking-wide text-white mb-1">Arsenal disponible</h2>
      <p className="text-white/30 mb-6 text-xs font-bold uppercase tracking-widest">Quel équipement as-tu pour t&apos;entraîner ?</p>
      <div className="space-y-3">
        {options.map((o) => (
          <SelectCard key={o.value} selected={value === o.value} onClick={() => onChange(o.value)} label={o.label} desc={o.desc} emoji={o.emoji} />
        ))}
      </div>
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
    <div>
      <h2 className="text-xl font-black uppercase tracking-wide text-white mb-1">Régime alimentaire</h2>
      <p className="text-white/30 mb-6 text-xs font-bold uppercase tracking-widest">Pour adapter tes rations de ninja.</p>
      <div className="space-y-3">
        {options.map((o) => (
          <SelectCard key={o.value} selected={value === o.value} onClick={() => onChange(o.value)} label={o.label} desc={o.desc} emoji={o.emoji} />
        ))}
      </div>
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
    <div>
      <h2 className="text-xl font-black uppercase tracking-wide text-white mb-1">Développement du chakra</h2>
      <p className="text-white/30 mb-6 text-xs font-bold uppercase tracking-widest">Quels pouvoirs veux-tu développer ?</p>
      <div className="grid grid-cols-2 gap-3">
        {options.map((o) => (
          <SelectCard key={o.value} selected={focus.includes(o.value)} onClick={() => toggle(o.value)} label={o.label} emoji={o.emoji} />
        ))}
      </div>
    </div>
  );
}

function SelectCard({ selected, onClick, label, desc, emoji }: {
  selected: boolean; onClick: () => void; label: string; desc?: string; emoji: string;
}) {
  return (
    <button type="button" onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded border text-left transition-all ${
        selected ? "border-orange/50 bg-orange/10" : "border-white/5 bg-shadow-light hover:border-orange/20"
      }`}>
      <span className="text-2xl">{emoji}</span>
      <div className="flex-1">
        <div className={`font-black uppercase text-xs tracking-wider ${selected ? "text-orange" : "text-white/70"}`}>{label}</div>
        {desc && <div className="text-white/30 text-xs mt-0.5">{desc}</div>}
      </div>
      {selected && <Check size={16} className="text-orange shrink-0" />}
    </button>
  );
}
