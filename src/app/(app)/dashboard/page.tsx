export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { calculateBMR, calculateTDEE, calculateMacros } from "@/lib/utils";
import Link from "next/link";
import {
  Sword,
  Salad,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Flame,
  Zap,
  Droplets,
  MessageCircle,
} from "lucide-react";
import type { Metadata } from "next";
import type { UserProfile } from "@/types/database";
import GoalsEditor from "./GoalsEditor";
import DailyQuests from "./DailyQuests";
import StreakFlame from "./StreakFlame";
import HydrationTracker from "./HydrationTracker";
import Ryoku from "@/components/mascot/Ryoku";
import Shuriken from "@/components/mascot/Shuriken";
import NinjaSilhouette from "@/components/mascot/NinjaSilhouette";
import RankBadge from "@/components/ui/RankBadge";
import LevelUpWatcher from "@/components/ui/LevelUpWatcher";
import {
  computeStreak,
  computeXP,
  getRankProgress,
  XP_REWARDS,
} from "@/lib/gamification";

export const metadata: Metadata = { title: "Dashboard — GoodMood" };

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const { data: profileData } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();
  if (!profileData) redirect("/onboarding");
  const profile = profileData as unknown as UserProfile;

  const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender);
  const tdee = calculateTDEE(bmr, profile.activity_level);
  const macros = calculateMacros(tdee, profile.goal);

  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const todayISO = new Date().toISOString().split("T")[0];

  const { data: completedAll } = await supabase
    .from("completed_sessions")
    .select("id, completed_at")
    .eq("user_id", user.id);
  const { data: completedToday } = await supabase
    .from("completed_sessions")
    .select("id")
    .eq("user_id", user.id)
    .gte("completed_at", `${todayISO}T00:00:00`)
    .lt("completed_at", `${todayISO}T23:59:59`);

  const totalSessions = completedAll?.length || 0;
  const allDates = (completedAll || []).map((s: any) => s.completed_at as string);
  const streak = computeStreak(allDates);
  const daysActive = new Set(allDates.map((d) => d.split("T")[0])).size;
  const missionDoneToday = (completedToday?.length ?? 0) > 0;
  const sessionsPerWeek = (profile as any).sessions_per_week || 3;

  // XP derived from DB state (deterministic)
  const xp = computeXP({
    totalSessions,
    streakDays: streak,
    questsCompleted: 0,
    daysActive,
  });
  const { current: rank, next: nextRank, progressPct, xpToNext } =
    getRankProgress(xp);

  const goalLabels: Record<string, string> = {
    weight_loss: "Perte de poids",
    muscle_gain: "Prise de masse",
    general_wellness: "Bien-être",
    maintenance: "Maintien",
  };

  // Week strip
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const iso = d.toISOString().split("T")[0];
    const hit = allDates.some((s) => s.startsWith(iso));
    return {
      iso,
      label: d.toLocaleDateString("fr-FR", { weekday: "narrow" }),
      date: d.getDate(),
      hit,
      isToday: iso === todayISO,
    };
  });

  return (
    <div>
      <LevelUpWatcher xp={xp} />

      {/* Hero — sunset shonen panel */}
      <div className="relative overflow-hidden border-2 border-navy rounded-2xl shadow-[6px_6px_0px_#E8724A] mb-8">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-sunset-sky" />
        {/* Sun disc */}
        <div
          className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle, #F9C74F 0%, #F4A259 35%, rgba(232,113,156,0.4) 70%, transparent 100%)",
          }}
        />
        {/* Sun rays */}
        <div className="absolute inset-0 sun-rays opacity-40" />
        {/* Ninja silhouette horizon */}
        <div className="absolute bottom-0 right-4 md:right-12 opacity-80 pointer-events-none">
          <NinjaSilhouette pose="crouch" size={180} fill="#0D1B2A" />
        </div>
        {/* Spinning shuriken accents */}
        <div className="absolute top-4 right-4 opacity-70">
          <Shuriken size={48} />
        </div>
        <div className="absolute top-20 right-20 opacity-40 hidden md:block">
          <Shuriken size={28} color="#0D1B2A" />
        </div>

        <div className="relative p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-navy/70 text-xs uppercase tracking-widest font-black capitalize mb-2">
                {today}
              </p>
              <h1 className="text-2xl sm:text-4xl font-black uppercase text-navy leading-tight mb-3">
                {missionDoneToday ? (
                  <>
                    Mission{" "}
                    <span className="rank-shimmer">accomplie</span>
                  </>
                ) : (
                  <>
                    Prêt pour la{" "}
                    <span className="rank-shimmer">mission</span> ?
                  </>
                )}
              </h1>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <RankBadge rank={rank} size="md" />
                <span className="text-[10px] text-navy/60 font-black uppercase tracking-widest bg-white/60 backdrop-blur px-2 py-1 rounded-md border border-navy/20">
                  {profile.goal
                    .map((g: string) => goalLabels[g] || g)
                    .join(" · ")}
                </span>
                <span className="text-[10px] text-navy/70 font-black uppercase tracking-widest bg-white/60 backdrop-blur px-2 py-1 rounded-md border border-navy/20">
                  {sessionsPerWeek}x / sem
                </span>
              </div>

              {/* XP bar */}
              {nextRank ? (
                <div className="max-w-md bg-white/60 backdrop-blur rounded-xl border-2 border-navy p-3 shadow-[2px_2px_0px_#0D1B2A]">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-navy mb-1.5">
                    <span>
                      {xp} XP · {rank.label}
                    </span>
                    <span className="text-coral">
                      +{xpToNext} XP → {nextRank.label}
                    </span>
                  </div>
                  <div className="h-3 bg-navy/10 rounded-full overflow-hidden border border-navy/20">
                    <div
                      className="h-full bg-sunset-fire rounded-full transition-all duration-700"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="inline-block text-xs font-black uppercase tracking-widest bg-navy text-white px-3 py-1.5 rounded-lg border-2 border-navy shadow-[3px_3px_0px_#E8724A]">
                  ★ Rang Maximum — Kage ★
                </div>
              )}
            </div>

            {/* Mascot */}
            <div className="hidden sm:block shrink-0 -mr-2">
              <Ryoku pose={missionDoneToday ? "fistpump" : "idle"} size={140} />
            </div>
          </div>

          <div className="relative mt-4 flex items-center gap-3 flex-wrap">
            <GoalsEditor
              currentGoals={profile.goal}
              currentSessions={sessionsPerWeek}
              userId={user.id}
            />
            <span className="text-[10px] text-navy/60 font-black uppercase tracking-widest">
              XP source : {XP_REWARDS.workout}/mission · {XP_REWARDS.streakDay}/jour · {XP_REWARDS.questComplete}/quête
            </span>
          </div>
        </div>
      </div>

      {/* Week strip */}
      <div className="bg-white border-2 border-navy rounded-2xl shadow-[4px_4px_0px_#0D1B2A] p-4 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-navy border-2 border-navy flex items-center justify-center">
              <Flame size={13} className="text-sunset-gold" fill="currentColor" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest text-navy">
              Cette semaine
            </h3>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-navy/40">
            {weekDays.filter((d) => d.hit).length}/{weekDays.length} jours actifs
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {weekDays.map((d) => (
            <div
              key={d.iso}
              className={`flex flex-col items-center gap-1 py-2 rounded-lg border-2 transition-all ${
                d.isToday
                  ? "border-coral bg-coral/5 shadow-[2px_2px_0px_#E8724A]"
                  : d.hit
                  ? "border-navy bg-sunset-gold/20"
                  : "border-navy/10 bg-white"
              }`}
            >
              <span
                className={`text-[10px] font-black uppercase ${
                  d.isToday ? "text-coral" : "text-navy/50"
                }`}
              >
                {d.label}
              </span>
              <span
                className={`text-sm font-black ${
                  d.hit ? "text-navy" : "text-navy/30"
                }`}
              >
                {d.date}
              </span>
              {d.hit ? (
                <Flame size={11} className="text-coral" fill="currentColor" />
              ) : (
                <span className="w-[11px] h-[11px] rounded-full border border-navy/15" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Gamification grid : Streak + Hydration + Quests */}
      <div className="grid lg:grid-cols-3 gap-4 mb-8">
        <StreakFlame streak={streak} bestStreak={streak} />
        <HydrationTracker />
        <div className="lg:col-span-1">
          <DailyQuests todayHasSession={missionDoneToday} />
        </div>
      </div>

      {/* Macros row */}
      <h2 className="text-xs font-black uppercase tracking-widest text-navy/40 mb-4">
        Rations du ninja
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatCard icon={Flame} label="Calories" value={macros.calories} unit="kcal" accent="coral" />
        <StatCard icon={Zap} label="Protéines" value={macros.protein} unit="g" accent="navy" />
        <StatCard icon={Droplets} label="Glucides" value={macros.carbs} unit="g" accent="sage" />
        <StatCard icon={Droplets} label="Lipides" value={macros.fats} unit="g" accent="coral" />
      </div>

      {/* Quick access — missions */}
      <h2 className="text-xs font-black uppercase tracking-widest text-navy/40 mb-4">
        Missions
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MissionCard
          href="/sport"
          icon={Sword}
          title="Sport"
          desc="Planning de la semaine"
          tag={missionDoneToday ? "✓ Mission du jour" : "+100 XP au complet"}
          accent="coral"
        />
        <MissionCard
          href="/nutrition"
          icon={Salad}
          title="Nutrition"
          desc="Plan repas & macros"
          tag={`${macros.calories} kcal · ${macros.protein}g P`}
          accent="navy"
        />
        <MissionCard
          href="/progress"
          icon={TrendingUp}
          title="Progression"
          desc="Stats & évolution"
          tag="+30 XP · logger poids"
          accent="sage"
        />
        <MissionCard
          href="/wellness"
          icon={Sparkles}
          title="Chakra"
          desc="Routines & suppléments"
          tag="+25 XP · méditation"
          accent="coral"
        />
        <MissionCard
          href="/blog"
          icon={Zap}
          title="Blog"
          desc="Articles & conseils"
          tag="Lire les articles"
          accent="navy"
        />
        <MissionCard
          href="/messages"
          icon={MessageCircle}
          title="Coach"
          desc="Messagerie"
          tag="Envoyer un message"
          accent="sage"
        />
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  unit: string;
  accent: string;
}) {
  const accents: Record<string, { bg: string; icon: string; shadow: string }> = {
    coral: {
      bg: "bg-coral-50 border-coral/30",
      icon: "text-coral bg-coral/10",
      shadow: "shadow-[3px_3px_0px_#E8724A]",
    },
    navy: {
      bg: "bg-navy/5 border-navy/20",
      icon: "text-navy bg-navy/10",
      shadow: "shadow-[3px_3px_0px_#0D1B2A]",
    },
    sage: {
      bg: "bg-sage/10 border-sage/30",
      icon: "text-sage-dark bg-sage/20",
      shadow: "shadow-[3px_3px_0px_#8BAF8B]",
    },
  };
  const a = accents[accent] || accents.coral;

  return (
    <div className={`bg-white border-2 border-navy rounded-xl p-4 ${a.shadow}`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${a.icon}`}>
        <Icon size={15} />
      </div>
      <div className="text-2xl font-black text-navy">
        {value}
        <span className="text-xs font-bold text-navy/30 ml-1">{unit}</span>
      </div>
      <div className="text-xs text-navy/40 uppercase tracking-widest font-black mt-0.5">
        {label}
      </div>
    </div>
  );
}

function MissionCard({
  href,
  icon: Icon,
  title,
  desc,
  tag,
  accent,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  tag: string;
  accent: string;
}) {
  const accents: Record<
    string,
    { icon: string; tag: string; hover: string; shadow: string }
  > = {
    coral: {
      icon: "bg-coral text-white",
      tag: "bg-coral/10 text-coral border-coral/20",
      hover: "hover:shadow-[6px_6px_0px_#E8724A] hover:border-coral",
      shadow: "shadow-[4px_4px_0px_#0D1B2A]",
    },
    navy: {
      icon: "bg-navy text-white",
      tag: "bg-navy/5 text-navy/50 border-navy/10",
      hover: "hover:shadow-[6px_6px_0px_#0D1B2A]",
      shadow: "shadow-[4px_4px_0px_#0D1B2A]",
    },
    sage: {
      icon: "bg-sage text-white",
      tag: "bg-sage/10 text-sage-dark border-sage/20",
      hover: "hover:shadow-[6px_6px_0px_#8BAF8B] hover:border-sage",
      shadow: "shadow-[4px_4px_0px_#0D1B2A]",
    },
  };
  const a = accents[accent] || accents.coral;

  return (
    <Link href={href} className="group">
      <div
        className={`bg-white border-2 border-navy rounded-xl p-5 transition-all duration-150 ${a.shadow} ${a.hover} hover:-translate-x-0.5 hover:-translate-y-0.5`}
      >
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 border-navy ${a.icon}`}
          >
            <Icon size={17} />
          </div>
          <ArrowRight
            size={16}
            className="text-navy/20 group-hover:text-navy transition-colors mt-1"
          />
        </div>
        <h3 className="font-black uppercase text-sm tracking-wider text-navy mb-1">
          {title}
        </h3>
        <p className="text-navy/50 text-xs mb-3">{desc}</p>
        <span
          className={`inline-block text-xs border rounded-lg px-2.5 py-1 font-black uppercase tracking-wide ${a.tag}`}
        >
          {tag}
        </span>
      </div>
    </Link>
  );
}
