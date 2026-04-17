export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Sun, Moon, Pill, Wind, Heart } from "lucide-react";
import type { UserProfile } from "@/types/database";

export const metadata: Metadata = { title: "Chakra" };

function getSkincareRoutine(age: number) {
  if (age < 25) {
    return {
      morning: ["Nettoyant doux", "Sérum vitamine C léger", "Hydratant non comédogène", "SPF 30+"],
      evening: ["Huile démaquillante", "Nettoyant moussant", "Exfoliant AHA (2×/sem)", "Crème hydratante nuit"],
      tips: "Hydratation & protection solaire = base à cet âge. Évite les produits trop agressifs.",
    };
  } else if (age < 35) {
    return {
      morning: ["Nettoyant gel", "Sérum acide hyaluronique", "Crème SPF 50", "Contour des yeux"],
      evening: ["Double nettoyage", "Rétinol (0.025% — débuter doucement)", "Crème nuit riche", "Huile visage en finition"],
      tips: "Moment idéal pour intégrer le rétinol. Commence doucement 2x/semaine.",
    };
  } else {
    return {
      morning: ["Nettoyant crème", "Sérum rétinol", "Crème anti-âge SPF 50", "Contour yeux liftant"],
      evening: ["Huile démaquillante", "Acide glycolique (2-3×/sem)", "Crème nuit régénérante", "Patch yeux"],
      tips: "Mise sur la régénération : rétinol + AHA + hydratation intensive.",
    };
  }
}

function getSupplements(goals: string[], activityLevel: string) {
  const supplements = [
    { name: "Whey Protéine", dose: "25-30g post-workout", reason: "Récupération musculaire", emoji: "🥛", show: goals.includes("muscle_gain") || activityLevel !== "sedentary" },
    { name: "Créatine Monohydrate", dose: "5g/jour", reason: "Force et volume musculaire", emoji: "⚡", show: goals.includes("muscle_gain") },
    { name: "Oméga-3 (EPA/DHA)", dose: "2g/jour avec repas", reason: "Anti-inflammatoire, santé cœur & cerveau", emoji: "🐟", show: true },
    { name: "Magnésium Bisglycinate", dose: "300mg le soir", reason: "Sommeil, récupération, stress", emoji: "🌙", show: true },
    { name: "Vitamine D3", dose: "2000 UI/jour", reason: "Immunité, humeur, os", emoji: "☀️", show: true },
    { name: "Collagène Marin", dose: "10g/jour", reason: "Peau, articulations, ongles", emoji: "✨", show: goals.includes("general_wellness") },
    { name: "Ashwagandha", dose: "600mg/jour", reason: "Réduction du stress & cortisol", emoji: "🌿", show: true },
    { name: "Probiotiques", dose: "10B UFC/jour", reason: "Santé intestinale & immunité", emoji: "🦠", show: goals.includes("general_wellness") },
  ];
  return supplements.filter((s) => s.show);
}

export default async function WellnessPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const { data: profileData } = await supabase
    .from("user_profiles").select("*").eq("user_id", user.id).single();

  if (!profileData) redirect("/onboarding");
  const profile = profileData as unknown as UserProfile;

  const skincare = getSkincareRoutine(profile.age);
  const supplements = getSupplements(profile.goal, profile.activity_level);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-wider text-white">Développement du Chakra</h1>
        <p className="text-white/30 mt-1 text-xs font-bold uppercase tracking-widest">Routines, skincare & suppléments personnalisés</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Morning routine */}
        <Card>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded bg-orange/10 border border-orange/20 flex items-center justify-center">
              <Sun size={18} className="text-orange" />
            </div>
            <div>
              <h2 className="font-black uppercase tracking-wide text-white text-sm">Rituel du Matin</h2>
              <p className="text-xs text-white/30 font-bold">Activer le chakra solaire</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { icon: "💧", step: "Au réveil", action: "Bois 500ml d'eau avec une pincée de sel" },
              { icon: "🧘", step: "5-10 min", action: "Respiration ou méditation (Wim Hof / box breathing)" },
              { icon: "🚿", step: "Douche", action: "Finir par 30s d'eau froide — active le système nerveux" },
              { icon: "☀️", step: "Skincare", action: skincare.morning.join(" → ") },
              { icon: "🍳", step: "Petit-déj", action: "Protéines + glucides complexes pour l'énergie" },
            ].map((r, i) => (
              <div key={i} className="flex gap-3 items-start p-3 bg-void border border-white/5 rounded">
                <span className="text-lg shrink-0">{r.icon}</span>
                <div>
                  <div className="text-xs text-orange font-black uppercase tracking-widest mb-0.5">{r.step}</div>
                  <div className="text-xs text-white/50">{r.action}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Evening routine */}
        <Card>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center">
              <Moon size={18} className="text-white/50" />
            </div>
            <div>
              <h2 className="font-black uppercase tracking-wide text-white text-sm">Rituel du Soir</h2>
              <p className="text-xs text-white/30 font-bold">Récupération & méditation</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { icon: "📱", step: "21h", action: "Pas d'écrans ou mode nuit — réduit la lumière bleue" },
              { icon: "🌿", step: "Skincare soir", action: skincare.evening.join(" → ") },
              { icon: "🧴", step: "Suppléments", action: "Magnésium 300mg + Ashwagandha si stress" },
              { icon: "📖", step: "30 min lecture", action: "Prépare le cerveau au sommeil" },
              { icon: "❄️", step: "Chambre", action: "18-19°C optimal pour la qualité du sommeil" },
            ].map((r, i) => (
              <div key={i} className="flex gap-3 items-start p-3 bg-void border border-white/5 rounded">
                <span className="text-lg shrink-0">{r.icon}</span>
                <div>
                  <div className="text-xs text-white/40 font-black uppercase tracking-widest mb-0.5">{r.step}</div>
                  <div className="text-xs text-white/50">{r.action}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 bg-orange/5 border border-orange/20 rounded">
            <p className="text-xs text-orange font-black uppercase tracking-widest">Conseil skincare · {profile.age} ans</p>
            <p className="text-xs text-white/40 mt-1">{skincare.tips}</p>
          </div>
        </Card>

        {/* Supplements */}
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded bg-chakra/10 border border-chakra/20 flex items-center justify-center">
              <Pill size={18} className="text-chakra" />
            </div>
            <div>
              <h2 className="font-black uppercase tracking-wide text-white text-sm">Arsenal Suppléments</h2>
              <p className="text-xs text-white/30 font-bold uppercase tracking-widest">Basé sur tes objectifs & niveau d&apos;activité</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {supplements.map((s) => (
              <div key={s.name} className="bg-void border border-white/5 hover:border-orange/20 rounded p-4 transition-all">
                <div className="text-2xl mb-2">{s.emoji}</div>
                <h4 className="font-black uppercase tracking-wide text-white text-xs mb-1">{s.name}</h4>
                <div className="text-xs text-orange font-black mb-1">{s.dose}</div>
                <p className="text-xs text-white/30">{s.reason}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Sleep tips */}
        <Card>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded bg-orange/10 border border-orange/20 flex items-center justify-center">
              <Heart size={18} className="text-orange" />
            </div>
            <h2 className="font-black uppercase tracking-wide text-white text-sm">Optimiser le Sommeil</h2>
          </div>
          <ul className="space-y-2">
            {[
              "Se lever à la même heure tous les jours (même le weekend)",
              "Éviter la caféine après 14h",
              "Obscurité totale dans la chambre (masque de nuit si besoin)",
              "Pas d'entraînement intense après 20h",
              "Viser 7-9h de sommeil selon ton âge et activité",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-xs text-white/50">
                <span className="w-5 h-5 rounded bg-orange/10 border border-orange/30 text-orange text-xs flex items-center justify-center shrink-0 mt-0.5 font-black">{i + 1}</span>
                {tip}
              </li>
            ))}
          </ul>
        </Card>

        {/* Stress tips */}
        <Card>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded bg-chakra/10 border border-chakra/20 flex items-center justify-center">
              <Wind size={18} className="text-chakra" />
            </div>
            <h2 className="font-black uppercase tracking-wide text-white text-sm">Maîtriser le Stress</h2>
          </div>
          <ul className="space-y-2">
            {[
              "Respiration 4-7-8 : inspire 4s, retiens 7s, expire 8s",
              "20 min de marche en nature = cortisol -15%",
              "Journaling le soir : 3 choses positives de la journée",
              "Douche froide : active le nerf vague, réduit le stress",
              "Limite les actualités anxiogènes à 15 min/jour",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-xs text-white/50">
                <span className="w-5 h-5 rounded bg-chakra/10 border border-chakra/30 text-chakra text-xs flex items-center justify-center shrink-0 mt-0.5 font-black">{i + 1}</span>
                {tip}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
