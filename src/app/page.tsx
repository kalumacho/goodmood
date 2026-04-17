import Link from "next/link";
import { ArrowRight, Sword, Salad, TrendingUp, Sparkles, Zap, Shield } from "lucide-react";
import Button from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-void overflow-x-hidden">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-orange/10 bg-void/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-orange rounded flex items-center justify-center">
              <span className="text-void font-black text-xs">GM</span>
            </div>
            <span className="font-black uppercase tracking-tight text-white">Good<span className="text-orange">Mood</span></span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/blog" className="hidden sm:block text-xs font-black uppercase tracking-widest text-white/40 hover:text-orange transition-colors">
              Parchemins
            </Link>
            <Link href="/auth">
              <Button size="sm">Rejoindre</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-14 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute inset-0 manga-lines opacity-50" />
        {/* Diagonal accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/50 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-slide_up">
              {/* Rank badge */}
              <div className="inline-flex items-center gap-2 border border-orange/30 bg-orange/5 text-orange text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded mb-6">
                <Zap size={12} className="fill-current" />
                Rang S — Wellness Platform
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-none mb-4 text-white">
                Surpasse
                <br />
                <span className="text-gradient-orange">tes limites.</span>
              </h1>

              <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-8 max-w-lg font-medium">
                Programmes d&apos;entraînement ninja, nutrition de shinobi et développement du chakra.
                Ton chemin vers le sommet commence ici.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/auth" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto">
                    Commencer l&apos;entraînement
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
                <Link href="/blog" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Lire les parchemins
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-6 mt-10 pt-10 border-t border-orange/10">
                {[
                  { label: "Ninjas actifs", value: "12K+" },
                  { label: "Missions complétées", value: "98K+" },
                  { label: "Rang moyen", value: "Jonin" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-xl sm:text-2xl font-black text-orange">{s.value}</div>
                    <div className="text-xs text-white/30 uppercase tracking-widest font-bold">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature cards grid */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {[
                { icon: Sword, title: "Missions Sport", desc: "Entraînement sur-mesure selon ton rang", color: "orange" },
                { icon: Salad, title: "Rations Ninja", desc: "Nutrition calculée pour maximiser le chakra", color: "chakra" },
                { icon: TrendingUp, title: "Progression", desc: "Monte en rang, visualise ton évolution", color: "red" },
                { icon: Sparkles, title: "Chakra & Bien-être", desc: "Skincare, sommeil, suppléments de shinobi", color: "orange" },
              ].map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className={`bg-shadow-light border rounded p-5 transition-all hover:border-orange/30 ${
                  color === "orange" ? "border-orange/15" : color === "chakra" ? "border-chakra/15" : "border-red/15"
                }`}>
                  <div className={`w-9 h-9 rounded flex items-center justify-center mb-4 ${
                    color === "orange" ? "bg-orange/20" : color === "chakra" ? "bg-chakra/20" : "bg-red/20"
                  }`}>
                    <Icon size={18} className={
                      color === "orange" ? "text-orange" : color === "chakra" ? "text-chakra" : "text-red-light"
                    } />
                  </div>
                  <h3 className="font-black uppercase text-xs tracking-wider text-white mb-1">{title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/30 to-transparent" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="text-xs font-black uppercase tracking-widest text-orange mb-3">Arsenal complet</div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white">
              Tout l&apos;équipement<br/>
              <span className="text-gradient-orange">du ninja parfait</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-shadow-light border border-orange/10 rounded p-6 sm:p-8 hover:border-orange/30 hover:bg-shadow transition-all group">
                <div className="w-12 h-12 rounded bg-orange/10 border border-orange/20 flex items-center justify-center mb-5 group-hover:bg-orange/20 group-hover:border-orange/40 transition-all">
                  <f.icon size={22} className="text-orange" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider text-white mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4">{f.description}</p>
                <ul className="space-y-1.5">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-white/50">
                      <span className="w-1 h-1 rounded-full bg-orange shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange/5 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/40 to-transparent" />
        <div className="relative max-w-2xl mx-auto text-center">
          <Shield size={40} className="text-orange mx-auto mb-6 opacity-50" />
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white mb-4">
            Prêt à devenir<br />
            <span className="text-gradient-orange">Hokage ?</span>
          </h2>
          <p className="text-white/40 mb-8 text-sm sm:text-base font-medium">
            Rejoins des milliers de ninjas qui ont déjà transformé leur corps et leur esprit.
          </p>
          <Link href="/auth">
            <Button size="lg">
              Commencer maintenant
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-orange/10 py-6 px-6 text-center">
        <p className="text-white/20 text-xs font-bold uppercase tracking-widest">
          © 2024 GoodMood — Ninja Wellness Platform
        </p>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Sword,
    title: "Missions Sport",
    description: "Des séances générées selon ton rang, ton équipement et tes objectifs de shinobi.",
    points: ["Planning semaine complet", "Instructions & techniques", "Suivi des missions"],
  },
  {
    icon: Salad,
    title: "Rations du Clan",
    description: "Macros calculés au gramme près avec des plans repas pour maximiser ton chakra.",
    points: ["Calories & macros précis", "Liste de courses", "Adapté à ton régime"],
  },
  {
    icon: TrendingUp,
    title: "Progression de Rang",
    description: "Visualise ta montée en niveau avec des graphiques et check-ins hebdomadaires.",
    points: ["Charts interactifs", "Poids & mesures", "Performances de combat"],
  },
  {
    icon: Sparkles,
    title: "Développement du Chakra",
    description: "Routines de shinobi, skincare selon ton âge, suppléments recommandés.",
    points: ["Routine matin & soir", "Skincare ciblé", "Suppléments optimaux"],
  },
  {
    icon: Zap,
    title: "Parchemins",
    description: "Articles experts en entraînement, nutrition, mindset et bien-être ninja.",
    points: ["Articles catégorisés", "Conseils de Sensei", "Mise à jour régulière"],
  },
  {
    icon: Shield,
    title: "Sensei Personnel",
    description: "Pose tes questions à ton coach et obtiens des réponses personnalisées.",
    points: ["Messagerie directe", "Réponses rapides", "Suivi personnalisé"],
  },
];
