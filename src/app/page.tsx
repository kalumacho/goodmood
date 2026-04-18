import Link from "next/link";
import { ArrowRight, Sword, Salad, TrendingUp, Sparkles, Zap, Shield } from "lucide-react";
import Button from "@/components/ui/Button";
import Ryoku from "@/components/mascot/Ryoku";
import Shuriken from "@/components/mascot/Shuriken";
import NinjaSilhouette from "@/components/mascot/NinjaSilhouette";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-navy bg-white shadow-[0_2px_0px_#0D1B2A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-coral border-2 border-navy rounded-xl shadow-[2px_2px_0px_#0D1B2A] flex items-center justify-center">
              <span className="text-white font-black text-xs">GM</span>
            </div>
            <span className="font-black uppercase tracking-tight text-navy text-lg">
              Good<span className="text-coral">Mood</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/blog" className="hidden sm:block text-xs font-black uppercase tracking-widest text-navy/40 hover:text-coral transition-colors">
              Blog
            </Link>
            <Link href="/auth">
              <Button size="sm">Rejoindre</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO — sunset shonen */}
      <section className="relative min-h-screen flex items-center pt-14 overflow-hidden">
        {/* Sunset sky */}
        <div className="absolute inset-0 bg-sunset-soft" />
        {/* Big sun disc rising from horizon */}
        <div
          className="absolute bottom-[-260px] left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full opacity-80 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, #F9C74F 0%, #F4A259 35%, rgba(232,113,156,0.35) 70%, transparent 100%)",
            filter: "blur(2px)",
          }}
        />
        {/* Radiating sun rays */}
        <div className="absolute inset-0 sun-rays opacity-40 pointer-events-none" />
        {/* Speed lines overlay */}
        <div className="absolute inset-0 speed-lines opacity-30" />
        {/* Horizon line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-navy" />
        {/* Ninja silhouettes on horizon */}
        <div className="absolute bottom-0 left-8 sm:left-20 opacity-90 pointer-events-none hidden md:block">
          <NinjaSilhouette pose="crouch" size={200} fill="#0D1B2A" />
        </div>
        {/* Spinning shurikens */}
        <div className="absolute top-24 right-10 opacity-80">
          <Shuriken size={56} />
        </div>
        <div className="absolute top-48 right-40 opacity-50 hidden lg:block">
          <Shuriken size={36} color="#9B5DE5" />
        </div>
        <div className="absolute bottom-40 left-[45%] opacity-30 hidden lg:block">
          <Shuriken size={28} color="#0D1B2A" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              {/* Impact tag */}
              <div className="inline-flex items-center gap-2 bg-navy border-2 border-navy rounded-xl px-3 py-1.5 shadow-[3px_3px_0px_#F9C74F] mb-6">
                <Zap size={12} className="text-sunset-gold fill-current" />
                <span className="text-white text-xs font-black uppercase tracking-widest">
                  Rang S · Sunset Edition
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-none mb-4 text-navy">
                Surpasse
                <br />
                <span className="rank-shimmer">tes limites.</span>
              </h1>

              <p className="text-navy/70 text-base sm:text-lg leading-relaxed mb-8 max-w-lg font-medium">
                Programmes sport sur-mesure, nutrition calculée et gamification à la sauce shonen.
                Accomplis tes missions, gagne des XP et gravis les rangs ninja vers la meilleure version de toi.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link href="/auth" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto">
                    Commencer l&apos;aventure
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
                <Link href="/blog" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Lire le blog
                  </Button>
                </Link>
              </div>

              {/* Stats — manga panel style */}
              <div className="flex gap-6 pt-6 border-t-2 border-navy/10">
                {[
                  { label: "Missions quotidiennes", value: "4" },
                  { label: "Rangs à gravir", value: "6" },
                  { label: "Série max", value: "∞" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-black text-coral">{s.value}</div>
                    <div className="text-[10px] text-navy/50 uppercase tracking-widest font-black">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mascot + feature cards */}
            <div className="hidden lg:flex flex-col items-center gap-6">
              {/* Mascot Ryoku — hero pose */}
              <div className="relative">
                {/* Impact text */}
                <div className="absolute -top-6 -left-8 onomatopoeia text-4xl rotate-[-8deg] z-10">
                  PUSH!
                </div>
                <div className="absolute -bottom-2 -right-6 onomatopoeia text-2xl rotate-[5deg] z-10">
                  LET&apos;S GO!
                </div>
                {/* Glowing sun behind mascot */}
                <div
                  className="absolute inset-0 -m-16 rounded-full opacity-60 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(249,199,79,0.6), rgba(244,138,138,0.3) 50%, transparent 75%)",
                  }}
                />
                <Ryoku pose="running" size={280} className="relative z-10 drop-shadow-lg" />
              </div>

              {/* Mini feature tags */}
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "XP & Rangs ninja",
                  "Quêtes quotidiennes",
                  "Série enflammée",
                  "Hydratation",
                ].map((tag) => (
                  <span key={tag} className="manga-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white border-t-2 border-navy relative">
        {/* Section header — manga panel */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-coral border-2 border-navy rounded-xl px-3 py-1 shadow-[3px_3px_0px_#0D1B2A] text-xs font-black uppercase tracking-widest text-white mb-4">
              Arsenal complet
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-navy">
              Tout ce qu&apos;il te faut<br/>
              <span className="text-coral">pour progresser</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title}
                className="bg-white border-2 border-navy rounded-2xl p-6 shadow-[4px_4px_0px_#0D1B2A] hover:-translate-y-1 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_#E8724A] transition-all duration-150 group screen-tone">
                <div className="w-12 h-12 rounded-xl bg-coral border-2 border-navy shadow-[3px_3px_0px_#0D1B2A] flex items-center justify-center mb-4">
                  <f.icon size={20} className="text-white" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider text-navy mb-2">{f.title}</h3>
                <p className="text-navy/50 text-sm leading-relaxed mb-4">{f.description}</p>
                <ul className="space-y-1.5">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-navy/60 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MASCOT SECTION */}
      <section className="py-20 px-4 sm:px-6 bg-navy border-t-2 border-b-2 border-navy relative overflow-hidden">
        <div className="absolute inset-0 speed-lines opacity-20" />
        <div className="absolute inset-0 halftone opacity-10" />
        <div className="relative max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-10">
          <div className="shrink-0">
            <Ryoku pose="idle" size={180} />
          </div>
          <div>
            {/* Speech bubble */}
            <div className="bg-white border-2 border-navy rounded-2xl p-5 shadow-[6px_6px_0px_#E8724A] mb-4 relative">
              <p className="text-navy font-bold text-lg leading-relaxed">
                &ldquo;Salut ! Je suis <span className="text-coral font-black">Ryoku</span>, ton coach ninja personnel.
                Je vais t&apos;accompagner pas à pas pour atteindre tes objectifs !&rdquo;
              </p>
              <div className="absolute -bottom-3 left-8 w-6 h-3 bg-white border-b-2 border-r-2 border-navy rotate-45" />
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="manga-tag">Sport personnalisé</span>
              <span className="manga-tag">Nutrition sur-mesure</span>
              <span className="manga-tag">Coaching wellness</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 halftone opacity-20" />
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <Ryoku pose="fistpump" size={120} />
          </div>
          <div className="onomatopoeia text-3xl sm:text-5xl mb-4">LEVEL UP!</div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-navy mb-4">
            Prêt à devenir la<br />
            <span className="text-coral">meilleure version de toi ?</span>
          </h2>
          <p className="text-navy/50 mb-8 text-sm sm:text-base font-medium">
            Rejoins des milliers de membres qui ont déjà transformé leur corps et leur esprit.
          </p>
          <Link href="/auth">
            <Button size="lg">
              Créer mon profil gratuit
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t-2 border-navy bg-white py-6 px-6 text-center">
        <p className="text-navy/30 text-xs font-black uppercase tracking-widest">
          © 2024 GoodMood — Ninja Wellness Platform
        </p>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Sword,
    title: "Sport sur-mesure",
    description: "Séances générées selon ton équipement, tes objectifs et ta fréquence d'entraînement.",
    points: ["Planning semaine complet", "Instructions détaillées", "Suivi des sessions"],
  },
  {
    icon: Salad,
    title: "Nutrition calculée",
    description: "Macros précis et plans repas adaptés à tes objectifs et ton régime alimentaire.",
    points: ["Calories & macros précis", "Liste de courses auto", "Adapté à ton régime"],
  },
  {
    icon: TrendingUp,
    title: "Suivi de progression",
    description: "Visualise ton évolution avec des graphiques et monte en rang au fil des sessions.",
    points: ["Charts interactifs", "Suivi du poids", "Système de rangs"],
  },
  {
    icon: Sparkles,
    title: "Bien-être & Chakra",
    description: "Routines matin/soir, skincare adapté à ton âge, suppléments recommandés.",
    points: ["Routine matin & soir", "Skincare ciblé", "Suppléments optimaux"],
  },
  {
    icon: Zap,
    title: "Blog & Conseils",
    description: "Articles experts en entraînement, nutrition, mindset et bien-être.",
    points: ["Articles catégorisés", "Conseils d'experts", "Mises à jour régulières"],
  },
  {
    icon: Shield,
    title: "Coach personnel",
    description: "Pose tes questions et obtiens des réponses personnalisées de ton coach.",
    points: ["Messagerie directe", "Réponses rapides", "Suivi personnalisé"],
  },
];
