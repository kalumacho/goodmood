export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { calculateBMR, calculateTDEE, calculateMacros } from "@/lib/utils";
import Link from "next/link";
import { Sword, Salad, TrendingUp, Sparkles, ArrowRight, Flame, Zap, Droplets, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import type { UserProfile } from "@/types/database";
import GoalsEditor from "./GoalsEditor";
import Ryoku from "@/components/mascot/Ryoku";

export const metadata: Metadata = { title: "Dashboard — GoodMood" };

const RANK_DATA = [
  { label: "Académie", min: 0, max: 10, color: "bg-navy/20 text-navy" },
  { label: "Genin", min: 10, max: 50, color: "bg-sage/30 text-sage-dark" },
  { label: "Chunin", min: 50, max: 100, color: "bg-coral/20 text-coral-dark" },
  { label: "Jonin", min: 100, max: 200, color: "bg-coral text-white" },
  { label: "Kage", min: 200, max: 999, color: "bg-navy text-white" },
];

function getRank(n: number) {
  return RANK_DATA.find((r) => n >= r.min && n < r.max) || RANK_DATA[RANK_DATA.length - 1];
}

function getNextRank(n: number) {
  const idx = RANK_DATA.findIndex((r) => n >= r.min && n < r.max);
  return idx < RANK_DATA.length - 1 ? RANK_DATA[idx + 1] : null;
}

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const { data: profileData } = await supabase.from("user_profiles").select("*").eq("user_id", user.id).single();
  if (!profileData) redirect("/onboarding");
  const profile = profileData as unknown as UserProfile;

  const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender);
  const tdee = calculateTDEE(bmr, profile.activity_level);
  const macros = calculateMacros(tdee, profile.goal);

  const today = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  const todayISO = new Date().toISOString().split("T")[0];

  const { data: completedAll } = await supabase.from("completed_sessions").select("id").eq("user_id", user.id);
  const { data: completedToday } = await supabase.from("completed_sessions").select("id").eq("user_id", user.id)
    .gte("completed_at", `${todayISO}T00:00:00`).lt("completed_at", `${todayISO}T23:59:59`);

  const totalSessions = completedAll?.length || 0;
  const rank = getRank(totalSessions);
  const nextRank = getNextRank(totalSessions);
  const sessionsPerWeek = (profile as any).sessions_per_week || 3;
  const missionDoneToday = completedToday && completedToday.length > 0;

  const goalLabels: Record<string, string> = {
    weight_loss: "Perte de poids", muscle_gain: "Prise de masse",
    general_wellness: "Bien-être", maintenance: "Maintien",
  };

  const xpProgress = nextRank
    ? Math.min(100, ((totalSessions - rank.min) / (rank.max - rank.min)) * 100)
    : 100;

  return (
    <div>
      {/* Hero header — manga panel style */}
      <div className="relative overflow-hidden bg-navy border-2 border-navy rounded-2xl shadow-[6px_6px_0px_#E8724A] mb-8 p-6 sm:p-8">
        {/* Speed lines bg */}
        <div className="absolute inset-0 speed-lines opacity-30" />
        {/* Halftone */}
        <div className="absolute bottom-0 right-0 w-40 h-40 halftone opacity-20" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-coral/60 text-xs uppercase tracking-widest font-bold capitalize mb-1">{today}</p>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-white leading-tight mb-3">
              {missionDoneToday ? (
                <><span className="text-coral">Mission</span> accomplie !</>
              ) : (
                <>Prêt pour la <span className="text-coral">mission</span> ?</>
              )}
            </h1>

            {/* Rank badge */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border-2 border-white/20 ${rank.color}`}>
                ★ {rank.label}
              </span>
              <span className="text-xs text-white/40 font-bold uppercase">
                {profile.goal.map((g: string) => goalLabels[g] || g).join(" · ")}
              </span>
            </div>

            {/* XP bar */}
            {nextRank && (
              <div className="max-w-xs">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-white/30 mb-1.5">
                  <span>{rank.label}</span>
                  <span>{totalSessions}/{rank.max} missions → {nextRank.label}</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/10">
                  <div className="h-full xp-bar rounded-full" style={{ width: `${xpProgress}%` }} />
                </div>
              </div>
            )}
            {!nextRank && (
              <div className="text-xs font-black uppercase tracking-widest text-coral">
                ★ Rang Maximum — Kage ★
              </div>
            )}
          </div>

          {/* Mascot */}
          <div className="hidden sm:block shrink-0 -mr-2 -mb-2">
            <Ryoku pose={missionDoneToday ? "fistpump" : "idle"} size={140} />
          </div>
        </div>

        <div className="relative mt-4 flex items-center gap-3">
          <GoalsEditor currentGoals={profile.goal} currentSessions={sessionsPerWeek} userId={user.id} />
          <span className="text-xs text-white/30 font-bold">{sessionsPerWeek}x / semaine</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatCard icon={Flame} label="Calories" value={macros.calories} unit="kcal" accent="coral" />
        <StatCard icon={Zap} label="Protéines" value={macros.protein} unit="g" accent="navy" />
        <StatCard icon={Droplets} label="Glucides" value={macros.carbs} unit="g" accent="sage" />
        <StatCard icon={Droplets} label="Lipides" value={macros.fats} unit="g" accent="coral" />
      </div>

      {/* Total missions manga panel */}
      <div className="bg-white border-2 border-navy rounded-2xl shadow-[4px_4px_0px_#0D1B2A] p-5 mb-8 screen-tone">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-navy/40 mb-1">Total missions</p>
            <p className="text-4xl font-black text-navy">
              {totalSessions}
              <span className="text-coral ml-2 text-2xl">missions</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-black uppercase tracking-widest text-navy/40 mb-1">Aujourd&apos;hui</p>
            {missionDoneToday ? (
              <div className="inline-flex items-center gap-2 bg-coral text-white border-2 border-navy rounded-xl px-3 py-2 shadow-[2px_2px_0px_#0D1B2A]">
                <span className="text-sm font-black uppercase tracking-widest">✓ Accomplie !</span>
              </div>
            ) : (
              <div className="text-navy/20 text-sm font-black uppercase tracking-widest">En attente...</div>
            )}
          </div>
        </div>
      </div>

      {/* Quick access — manga panel grid */}
      <h2 className="text-xs font-black uppercase tracking-widest text-navy/40 mb-4">Accès rapide</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MissionCard href="/sport" icon={Sword} title="Sport" desc="Planning de la semaine"
          tag={missionDoneToday ? "✓ Mission du jour" : "Mission en attente"} accent="coral" />
        <MissionCard href="/nutrition" icon={Salad} title="Nutrition" desc="Plan repas & macros"
          tag={`${macros.calories} kcal · ${macros.protein}g P`} accent="navy" />
        <MissionCard href="/progress" icon={TrendingUp} title="Progression" desc="Stats & évolution"
          tag="Logger le poids" accent="sage" />
        <MissionCard href="/wellness" icon={Sparkles} title="Chakra" desc="Routines & suppléments"
          tag="Routine dispo" accent="coral" />
        <MissionCard href="/blog" icon={Zap} title="Blog" desc="Articles & conseils"
          tag="Lire les articles" accent="navy" />
        <MissionCard href="/messages" icon={MessageCircle} title="Coach" desc="Messagerie"
          tag="Envoyer un message" accent="sage" />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, unit, accent }: {
  icon: React.ElementType; label: string; value: number; unit: string; accent: string;
}) {
  const accents: Record<string, { bg: string; icon: string; shadow: string }> = {
    coral: { bg: "bg-coral-50 border-coral/30", icon: "text-coral bg-coral/10", shadow: "shadow-[3px_3px_0px_#E8724A]" },
    navy: { bg: "bg-navy/5 border-navy/20", icon: "text-navy bg-navy/10", shadow: "shadow-[3px_3px_0px_#0D1B2A]" },
    sage: { bg: "bg-sage/10 border-sage/30", icon: "text-sage-dark bg-sage/20", shadow: "shadow-[3px_3px_0px_#8BAF8B]" },
  };
  const a = accents[accent] || accents.coral;

  return (
    <div className={`bg-white border-2 border-navy rounded-xl p-4 ${a.shadow}`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${a.icon}`}>
        <Icon size={15} />
      </div>
      <div className="text-2xl font-black text-navy">
        {value}<span className="text-xs font-bold text-navy/30 ml-1">{unit}</span>
      </div>
      <div className="text-xs text-navy/40 uppercase tracking-widest font-black mt-0.5">{label}</div>
    </div>
  );
}

function MissionCard({ href, icon: Icon, title, desc, tag, accent }: {
  href: string; icon: React.ElementType; title: string; desc: string; tag: string; accent: string;
}) {
  const accents: Record<string, { icon: string; tag: string; hover: string; shadow: string }> = {
    coral: { icon: "bg-coral text-white", tag: "bg-coral/10 text-coral border-coral/20", hover: "hover:shadow-[6px_6px_0px_#E8724A] hover:border-coral", shadow: "shadow-[4px_4px_0px_#0D1B2A]" },
    navy: { icon: "bg-navy text-white", tag: "bg-navy/5 text-navy/50 border-navy/10", hover: "hover:shadow-[6px_6px_0px_#0D1B2A]", shadow: "shadow-[4px_4px_0px_#0D1B2A]" },
    sage: { icon: "bg-sage text-white", tag: "bg-sage/10 text-sage-dark border-sage/20", hover: "hover:shadow-[6px_6px_0px_#8BAF8B] hover:border-sage", shadow: "shadow-[4px_4px_0px_#0D1B2A]" },
  };
  const a = accents[accent] || accents.coral;

  return (
    <Link href={href} className="group">
      <div className={`bg-white border-2 border-navy rounded-xl p-5 transition-all duration-150 ${a.shadow} ${a.hover} hover:-translate-x-0.5 hover:-translate-y-0.5`}>
        <div className="flex items-start justify-between mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 border-navy ${a.icon}`}>
            <Icon size={17} />
          </div>
          <ArrowRight size={16} className="text-navy/20 group-hover:text-navy transition-colors mt-1" />
        </div>
        <h3 className="font-black uppercase text-sm tracking-wider text-navy mb-1">{title}</h3>
        <p className="text-navy/50 text-xs mb-3">{desc}</p>
        <span className={`inline-block text-xs border rounded-lg px-2.5 py-1 font-black uppercase tracking-wide ${a.tag}`}>
          {tag}
        </span>
      </div>
    </Link>
  );
}
