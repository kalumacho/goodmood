import Link from "next/link";
import {
  ArrowRight,
  Dumbbell,
  Salad,
  TrendingUp,
  Leaf,
  Star,
  CheckCircle,
  Sparkles,
  MessageCircle,
  BookOpen,
  Users,
  Activity,
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-light">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-navy">
            Good<span className="text-coral">Mood</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-navy/70 hover:text-navy transition-colors hidden md:block">
              Fonctionnalités
            </Link>
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
      <section className="relative bg-gradient-hero min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.18]">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-sage blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-coral blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-coral-light blur-3xl animate-float" style={{ animationDelay: "4s" }} />
        </div>

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center w-full">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 glass text-sage-light text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Sparkles size={14} className="text-coral" />
              Wellness platform #1 en France
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
              Transforme ton
              <span className="text-gradient block">bien-être.</span>
            </h1>
            <p className="text-white/70 text-lg lg:text-xl leading-relaxed mb-10 max-w-lg">
              Programmes sport et nutrition 100% personnalisés, suivi de progrès,
              conseils skincare, supplements et coaching. Tout commence ici.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/auth">
                <Button size="lg" className="w-full sm:w-auto">
                  Démarrer gratuitement
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/blog">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white w-full sm:w-auto">
                  Lire le blog
                </Button>
              </Link>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
              <div className="flex -space-x-2">
                {[
                  "from-coral to-coral-dark",
                  "from-sage to-sage-dark",
                  "from-navy-50 to-navy",
                  "from-coral-light to-coral",
                ].map((g, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-full border-2 border-navy bg-gradient-to-br ${g}`}
                  />
                ))}
              </div>
              <div>
                <div className="text-white font-semibold">+ de 12 000 utilisateurs</div>
                <div className="flex items-center gap-1 text-xs">
                  <Star size={12} className="fill-coral text-coral" />
                  <Star size={12} className="fill-coral text-coral" />
                  <Star size={12} className="fill-coral text-coral" />
                  <Star size={12} className="fill-coral text-coral" />
                  <Star size={12} className="fill-coral text-coral" />
                  <span className="ml-1">4.9/5 sur 2 400 avis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="hidden lg:grid grid-cols-2 gap-4 relative">
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-coral/30 blur-2xl animate-pulse-soft" />
            {[
              { icon: Dumbbell, title: "Sport", desc: "Plans d'entraînement sur-mesure", color: "coral", delay: 0 },
              { icon: Salad, title: "Nutrition", desc: "Macros et repas calculés", color: "sage", delay: 0.1 },
              { icon: TrendingUp, title: "Progrès", desc: "Suis ton évolution", color: "coral", delay: 0.2 },
              { icon: Leaf, title: "Wellness", desc: "Skincare & suppléments", color: "sage", delay: 0.3 },
            ].map(({ icon: Icon, title, desc, color, delay }, idx) => (
              <div
                key={title}
                className="glass rounded-card p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${delay}s`, animationFillMode: "both", transform: idx % 2 === 1 ? "translateY(2rem)" : undefined }}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                    color === "coral" ? "bg-coral/20 text-coral" : "bg-sage/20 text-sage-light"
                  }`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-white mb-1">{title}</h3>
                <p className="text-white/60 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="py-12 px-6 border-b border-navy/5 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Users, value: "12k+", label: "Utilisateurs actifs" },
            { icon: Activity, value: "500k+", label: "Séances complétées" },
            { icon: BookOpen, value: "150+", label: "Articles experts" },
            { icon: Star, value: "4.9/5", label: "Note moyenne" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-coral/10 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-coral" />
              </div>
              <div>
                <div className="text-2xl font-black text-navy">{value}</div>
                <div className="text-xs text-navy/50">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-coral text-sm font-semibold uppercase tracking-wider mb-3">
              Fonctionnalités
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-navy mb-4">
              Tout ce dont tu as besoin
            </h2>
            <p className="text-navy/60 text-lg max-w-xl mx-auto">
              Un écosystème complet pour transformer ta santé et ton bien-être au quotidien.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="relative bg-white rounded-card p-8 shadow-card-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group border border-navy/5 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full ${f.accent} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${f.iconBg} group-hover:scale-110 transition-transform`}>
                  <f.icon size={26} className={f.iconColor} />
                </div>
                <h3 className="relative text-xl font-bold text-navy mb-3">{f.title}</h3>
                <p className="relative text-navy/60 leading-relaxed mb-5">{f.description}</p>
                <ul className="relative space-y-2">
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

      {/* How it works */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-sage-dark text-sm font-semibold uppercase tracking-wider mb-3">
              Comment ça marche
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-navy mb-4">
              3 étapes pour démarrer
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-coral/40 to-transparent" />
            {[
              { step: "01", title: "Crée ton profil", desc: "Réponds à quelques questions sur tes objectifs, ton équipement et tes préférences." },
              { step: "02", title: "Reçois ton plan", desc: "Ton programme sport, nutrition et wellness est généré instantanément selon ton profil." },
              { step: "03", title: "Progresse chaque jour", desc: "Suis tes séances, logue tes progrès et obtiens des conseils personnalisés." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-coral text-white font-black text-xl shadow-[0_10px_30px_-8px_rgba(232,114,74,0.5)] mb-5">
                  {step}
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{title}</h3>
                <p className="text-navy/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-coral blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-sage blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
            <MessageCircle size={14} className="text-coral" />
            Support 7j/7
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Prêt(e) à changer ?
          </h2>
          <p className="text-white/60 text-lg mb-10">
            Rejoins des milliers d&apos;utilisateurs qui ont déjà transformé leur quotidien avec GoodMood. Gratuit, sans carte bancaire.
          </p>
          <Link href="/auth">
            <Button size="lg">
              Créer mon compte gratuit
              <ArrowRight size={20} />
            </Button>
          </Link>
          <div className="mt-6 text-white/40 text-sm">
            ✓ Gratuit · ✓ Sans engagement · ✓ Plan personnalisé en 2 min
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold text-white mb-3">
              Good<span className="text-coral">Mood</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              La plateforme wellness qui t&apos;accompagne au quotidien.
            </p>
          </div>
          <div>
            <div className="text-white font-semibold mb-3 text-sm">Produit</div>
            <ul className="space-y-2 text-white/50 text-sm">
              <li><Link href="#features" className="hover:text-white transition-colors">Fonctionnalités</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/auth" className="hover:text-white transition-colors">Connexion</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-3 text-sm">Ressources</div>
            <ul className="space-y-2 text-white/50 text-sm">
              <li><Link href="/blog" className="hover:text-white transition-colors">Articles</Link></li>
              <li><span className="text-white/30">FAQ</span></li>
              <li><span className="text-white/30">Support</span></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-3 text-sm">Légal</div>
            <ul className="space-y-2 text-white/50 text-sm">
              <li><span className="text-white/30">CGU</span></li>
              <li><span className="text-white/30">Confidentialité</span></li>
              <li><span className="text-white/30">Cookies</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-6 border-t border-white/5 text-center text-white/30 text-sm">
          © 2026 GoodMood. Tous droits réservés.
        </div>
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
    iconBg: "bg-coral/10",
    iconColor: "text-coral",
    accent: "bg-coral/30",
  },
  {
    icon: Salad,
    title: "Plans Nutrition",
    description: "Tes macros calculées au gramme près avec des plans repas adaptés à ton régime.",
    points: ["Calories & macros précis", "Liste de courses auto", "Adapté à ton régime"],
    iconBg: "bg-sage/15",
    iconColor: "text-sage-dark",
    accent: "bg-sage/30",
  },
  {
    icon: TrendingUp,
    title: "Suivi des Progrès",
    description: "Visualise tes évolutions avec des graphiques clairs et des check-ins hebdomadaires.",
    points: ["Charts interactifs", "Poids & mesures", "Performances sportives"],
    iconBg: "bg-navy/10",
    iconColor: "text-navy",
    accent: "bg-navy/20",
  },
  {
    icon: Leaf,
    title: "Conseils Wellness",
    description: "Routines personnalisées, skincare adapté à ton âge, suppléments recommandés.",
    points: ["Routine matin & soir", "Skincare par tranche d'âge", "Suppléments ciblés"],
    iconBg: "bg-sage/15",
    iconColor: "text-sage-dark",
    accent: "bg-sage/30",
  },
  {
    icon: BookOpen,
    title: "Contenu Editorial",
    description: "Articles experts en sport, nutrition, mindset et bien-être pour rester informé.",
    points: ["Articles catégorisés", "Conseils d'experts", "Mis à jour régulièrement"],
    iconBg: "bg-coral/10",
    iconColor: "text-coral",
    accent: "bg-coral/30",
  },
  {
    icon: MessageCircle,
    title: "Coaching Dédié",
    description: "Pose tes questions à un coach et obtiens des réponses personnalisées.",
    points: ["Messagerie directe", "Réponses rapides", "Suivi personnalisé"],
    iconBg: "bg-navy/10",
    iconColor: "text-navy",
    accent: "bg-navy/20",
  },
];
