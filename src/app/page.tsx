import Link from "next/link";
import { ArrowRight, Dumbbell, Salad, TrendingUp, Leaf, Star, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-navy/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-2xl font-bold text-navy">
            Good<span className="text-coral">Mood</span>
          </span>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-sm font-medium text-navy/70 hover:text-navy transition-colors hidden sm:block">
              Blog
            </Link>
            <Link href="/auth">
              <Button size="sm">Commencer</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy via-navy-50 to-navy min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-sage blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-coral blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 text-sage-light text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Star size={14} className="fill-current" />
              Wellness platform #1 en France
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
              Transforme ton
              <span className="text-coral block">bien-être.</span>
            </h1>
            <p className="text-white/70 text-lg lg:text-xl leading-relaxed mb-10 max-w-lg">
              Programmes sport et nutrition 100% personnalisés, suivi de progrès,
              conseils skincare, supplements et bien plus. Tout commence ici.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth">
                <Button size="lg" className="w-full sm:w-auto">
                  Démarrer gratuitement
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/blog">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white w-full sm:w-auto">
                  Lire le blog
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { icon: Dumbbell, title: "Sport", desc: "Plans d'entraînement sur-mesure", color: "coral" },
              { icon: Salad, title: "Nutrition", desc: "Macros et repas calculés pour toi", color: "sage" },
              { icon: TrendingUp, title: "Progrès", desc: "Suis ton évolution avec des charts", color: "coral" },
              { icon: Leaf, title: "Wellness", desc: "Skincare, sommeil & suppléments", color: "sage" },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="bg-white/10 backdrop-blur-sm rounded-card p-6 border border-white/10 hover:bg-white/15 transition-all"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color === "coral" ? "bg-coral/20" : "bg-sage/20"}`}>
                  <Icon size={20} className={color === "coral" ? "text-coral" : "text-sage"} />
                </div>
                <h3 className="font-bold text-white mb-1">{title}</h3>
                <p className="text-white/60 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-navy mb-4">
              Tout ce dont tu as besoin
            </h2>
            <p className="text-navy/60 text-lg max-w-xl mx-auto">
              Un écosystème complet pour transformer ta santé et ton bien-être au quotidien.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-card p-8 shadow-card hover:shadow-card-hover transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-coral/10 flex items-center justify-center mb-6 group-hover:bg-coral/20 transition-colors">
                  <f.icon size={28} className="text-coral" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{f.title}</h3>
                <p className="text-navy/60 leading-relaxed">{f.description}</p>
                <ul className="mt-4 space-y-2">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-navy/70">
                      <CheckCircle size={14} className="text-sage shrink-0" />
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
      <section className="py-24 px-6 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-coral blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Prêt(e) à changer ?
          </h2>
          <p className="text-white/60 text-lg mb-10">
            Rejoins des milliers d&apos;utilisateurs qui ont déjà transformé leur quotidien avec GoodMood.
          </p>
          <Link href="/auth">
            <Button size="lg">
              Créer mon compte gratuit
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy border-t border-white/10 py-8 px-6 text-center">
        <p className="text-white/40 text-sm">
          © 2024 GoodMood. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Dumbbell,
    title: "Programmes Sport",
    description: "Des séances d'entraînement générées selon ton profil, ton équipement et tes objectifs.",
    points: ["Planning semaine complet", "Vidéos & instructions", "Suivi des séances"],
  },
  {
    icon: Salad,
    title: "Plans Nutrition",
    description: "Tes macros calculées au gramme près avec des plans repas adaptés à ton régime.",
    points: ["Calories & macros précis", "Liste de courses auto", "Adapté à ton régime"],
  },
  {
    icon: TrendingUp,
    title: "Suivi des Progrès",
    description: "Visualise tes évolutions avec des graphiques clairs et des check-ins hebdomadaires.",
    points: ["Charts interactifs", "Poids & mesures", "Performances sportives"],
  },
  {
    icon: Leaf,
    title: "Conseils Wellness",
    description: "Routines personnalisées, skincare adapté à ton âge, suppléments recommandés.",
    points: ["Routine matin & soir", "Skincare par tranche d'âge", "Suppléments ciblés"],
  },
  {
    icon: Star,
    title: "Contenu Editorial",
    description: "Articles experts en sport, nutrition, mindset et bien-être pour rester informé.",
    points: ["Articles catégorisés", "Conseils d'experts", "Mis à jour régulièrement"],
  },
  {
    icon: CheckCircle,
    title: "Coaching Dédié",
    description: "Pose tes questions à un coach et obtiens des réponses personnalisées.",
    points: ["Messagerie directe", "Réponses rapides", "Suivi personnalisé"],
  },
];
