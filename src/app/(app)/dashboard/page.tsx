export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { calculateBMR, calculateTDEE, calculateMacros } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { ProgressRing } from "@/components/ui/ProgressRing";
import Link from "next/link";
import {
  Dumbbell,
  Salad,
  TrendingUp,
  Leaf,
  ArrowRight,
  Flame,
  Zap,
  Wheat,
  Droplet,
  Calendar,
  BookOpen,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Star,
  Award,
  Trophy,
  Shield,
} from "lucide-react";
import type { Metadata } from "next";
import type { UserProfile } from "@/types/database";
import GoalsEditor from "./GoalsEditor";
import HydrationTracker from "./HydrationTracker";
import {
  getLevelProgress,
  BADGES,
  checkAndAwardBadge,
  awardXP,
  XP_EVENTS,
} from "@/lib/gamification";

export const metadata: Metadata = { title: "Dashboard" };

function greeting(hour: number): { hello: string; emoji: string } {
  if (hour < 6) return { hello: "Bonne nuit", emoji: "🌙" };
  if (hour < 12) return { hello: "Bonjour", emoji: "☀️" };
  if (hour < 18) return { hello: "Bon après-midi", emoji: "👋" };
  return { hello: "Bonsoir", emoji: "🌆" };
}

const BADGE_ICONS: Record<string, React.ElementType> = {
  first_session: Dumbbell,
  sessions_10: Award,
  sessions_50: Trophy,
  streak_3: Flame,
  streak_7: Zap,
  first_progress: TrendingUp,
};

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
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

  const now = new Date();
  const today = now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  const todayISO = now.toISOString().split("T")[0];
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const { data: completedWeek } = await supabase
    .from("completed_sessions")
    .select("completed_at")
    .eq("user_id", user.id)
    .gte("completed_at", sevenDaysAgo);

  const { data: allCompleted } = await supabase
    .from("completed_sessions")
    .select("id")
    .eq("user_id", user.id);

  const completedToday = completedWeek?.filter((s) => s.completed_at.startsWith(todayISO)) || [];
  const sessionsPerWeek = (profile as any).sessions_per_week || 3;
  const completedThisWeek = completedWeek?.length || 0;
  const totalSessions = allCompleted?.length || 0;
  const weekProgress = Math.min(1, completedThisWeek / sessionsPerWeek);

  const doneDays = new Set((completedWeek || []).map((s) => s.completed_at.split("T")[0]));
  const last7 = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (6 - i));
    return {
      iso: d.toISOString().split("T")[0],
      label: d.toLocaleDateString("fr-FR", { weekday: "short" }).charAt(0).toUpperCase(),
      done: doneDays.has(d.toISOString().split("T")[0]),
      isToday: d.toISOString().split("T")[0] === todayISO,
    };
  });

  let streak = 0;
  for (let i = last7.length - 1; i >= 0; i--) {
    if (last7[i].done) streak++;
    else if (last7[i].isToday) continue;
    else break;
  }

  // XP & gamification
  await awardXP(supabase, user.id, "daily_login", XP_EVENTS.daily_login);

  if (totalSessions >= 1) await checkAndAwardBadge(supabase, user.id, "first_session");
  if (totalSessions >= 10) await checkAndAwardBadge(supabase, user.id, "sessions_10");
  if (totalSessions >= 50) await checkAndAwardBadge(supabase, user.id, "sessions_50");
  if (streak >= 3) await checkAndAwardBadge(supabase, user.id, "streak_3");
  if (streak >= 7) await checkAndAwardBadge(supabase, user.id, "streak_7");

  const { data: progressLogs } = await supabase
    .from("progress_logs")
    .select("id")
    .eq("user_id", user.id)
    .limit(1);
  if (progressLogs && progressLogs.length > 0) {
    await checkAndAwardBadge(supabase, user.id, "first_progress");
  }

  const { data: xpData } = await supabase
    .from("user_xp")
    .select("total_xp")
    .eq("user_id", user.id)
    .maybeSingle();
  const totalXP = xpData?.total_xp ?? 0;
  const levelInfo = getLevelProgress(totalXP);

  const { data: earnedBadgesData } = await supabase
    .from("user_badges")
    .select("badge_id")
    .eq("user_id", user.id);
  const earnedBadgeIds = (earnedBadgesData || []).map((b) => b.badge_id);

  const goalLabels: Record<string, string> = {
    weight_loss: "Perte de poids",
    muscle_gain: "Prise de masse",
    general_wellness: "Bien-être général",
    maintenance: "Maintien",
  };

  const g = greeting(now.getHours());
  const firstName = (user.email || "").split("@")[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero greeting */}
      <div className="relative overflow-hidden rounded-card-lg bg-gradient-hero p-6 md:p-8 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-coral blur-3xl" />
          <div className="absolute -bottom-20 left-10 w-72 h-72 rounded-full bg-sage blur-3xl" />
        </div>
        <div className="relative flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-white/60 text-sm capitalize">{today}</p>
            <h1 className="text-3xl md:text-4xl font-black mt-1 flex items-center gap-2">
              {g.hello}, <span className="capitalize">{firstName}</span> {g.emoji}
            </h1>
            <p className="text-white/70 mt-2 max-w-xl">
              Objectif :{" "}
              <span className="font-semibold text-coral-light">
                {profile.goal.map((x: string) => goalLabels[x] || x).join(", ")}
              </span>
              <span className="text-white/30 mx-2">·</span>
              <span className="font-semibold text-white">{sessionsPerWeek}x/semaine</span>
            </p>
          </div>
          <GoalsEditor
            currentGoals={profile.goal}
            currentSessions={sessionsPerWeek}
            userId={user.id}
          />
        </div>

        {/* Week dots */}
        <div className="relative mt-6 flex items-center gap-2">
          {last7.map((d) => (
            <div key={d.iso} className="flex flex-col items-center gap-1.5 flex-1">
              <div
                className={`w-full h-2 rounded-full ${
                  d.done
                    ? "bg-coral"
                    : d.isToday
                    ? "bg-white/30 ring-1 ring-white/50"
                    : "bg-white/10"
                }`}
              />
              <span className={`text-[10px] font-semibold ${d.isToday ? "text-coral-light" : "text-white/40"}`}>
                {d.label}
              </span>
            </div>
          ))}
        </div>

        {/* XP Bar */}
        <div className="relative mt-4 bg-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="bg-coral text-white text-xs font-black px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Star size={10} /> Niv. {levelInfo.current.level}
              </span>
              <span className="text-white/80 text-sm font-semibold">{levelInfo.current.title}</span>
            </div>
            <span className="text-white/60 text-xs font-medium">{totalXP} XP</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-coral to-coral-dark rounded-full transition-all duration-700"
              style={{ width: `${levelInfo.progress * 100}%` }}
            />
          </div>
          {levelInfo.next && (
            <p className="text-white/40 text-xs mt-1.5">
              {levelInfo.xpToNext} XP pour Niv. {levelInfo.next.level} — {levelInfo.next.title}
            </p>
          )}
          {!levelInfo.next && (
            <p className="text-coral-light text-xs mt-1.5 font-semibold">Niveau maximum atteint !</p>
          )}
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="flex items-center gap-5">
          <ProgressRing value={completedThisWeek} max={sessionsPerWeek} size={96} stroke={8} color="coral">
            <div className="text-2xl font-black text-navy leading-none">{completedThisWeek}</div>
            <div className="text-[10px] text-navy/50 font-semibold">/ {sessionsPerWeek}</div>
          </ProgressRing>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-coral uppercase tracking-wider">
              <Calendar size={12} /> Cette semaine
            </div>
            <div className="text-lg font-bold text-navy mt-1">
              {completedThisWeek === 0
                ? "Démarre ta semaine"
                : weekProgress === 1
                ? "Objectif atteint 🎉"
                : `${Math.round(weekProgress * 100)}% complété`}
            </div>
            <div className="text-sm text-navy/50">
              {sessionsPerWeek - completedThisWeek > 0
                ? `${sessionsPerWeek - completedThisWeek} séance${sessionsPerWeek - completedThisWeek > 1 ? "s" : ""} restante${sessionsPerWeek - completedThisWeek > 1 ? "s" : ""}`
                : "Bravo pour cette semaine !"}
            </div>
          </div>
        </Card>

        <Card className="flex items-center gap-5">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center shrink-0 shadow-[0_10px_30px_-10px_rgba(232,114,74,0.7)]">
            <Flame size={36} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-coral uppercase tracking-wider">
              <Sparkles size={12} /> Streak actuel
            </div>
            <div className="text-3xl font-black text-navy mt-1 leading-none">
              {streak} <span className="text-base font-bold text-navy/50">jour{streak > 1 ? "s" : ""}</span>
            </div>
            <div className="text-sm text-navy/50 mt-1">
              {streak === 0 ? "Commence aujourd'hui 💪" : "Continue sur ta lancée !"}
            </div>
          </div>
        </Card>

        <HydrationTracker />
      </div>

      {/* Macros */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-lg font-bold text-navy">Objectif du jour</h2>
          <Link href="/nutrition" className="text-sm font-medium text-coral hover:text-coral-dark inline-flex items-center gap-1">
            Voir le plan <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MacroCard icon={Flame} label="Calories" value={macros.calories} unit="kcal" color="coral" />
          <MacroCard icon={Zap} label="Protéines" value={macros.protein} unit="g" color="sage" />
          <MacroCard icon={Wheat} label="Glucides" value={macros.carbs} unit="g" color="navy" />
          <MacroCard icon={Droplet} label="Lipides" value={macros.fats} unit="g" color="coral" />
        </div>
      </section>

      {/* Badges */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-lg font-bold text-navy">Mes badges</h2>
          <span className="text-xs text-navy/40">{earnedBadgeIds.length}/{BADGES.length} débloqués</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {BADGES.map((badge) => {
            const earned = earnedBadgeIds.includes(badge.id);
            const Icon = BADGE_ICONS[badge.id] ?? Shield;
            return (
              <div
                key={badge.id}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border text-center transition-all ${
                  earned
                    ? "bg-white border-navy/10 shadow-card-soft"
                    : "bg-navy/[0.03] border-transparent"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                    earned ? "bg-coral/10 text-coral" : "bg-navy/5 text-navy/20"
                  }`}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <p className={`text-xs font-bold leading-tight ${earned ? "text-navy" : "text-navy/30"}`}>
                    {badge.label}
                  </p>
                  <p className={`text-[10px] mt-0.5 ${earned ? "text-navy/40" : "text-navy/20"}`}>
                    {badge.desc}
                  </p>
                  {earned && (
                    <p className="text-[10px] text-coral font-semibold mt-1">+{badge.xpReward} XP</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick links */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-lg font-bold text-navy">Ton parcours</h2>
          <span className="text-xs text-navy/40">Accès rapide</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <QuickCard
            href="/sport"
            icon={Dumbbell}
            title="Programme Sport"
            desc="Tes séances de la semaine"
            tag={
              completedToday.length > 0
                ? { text: "Séance faite aujourd'hui", positive: true }
                : { text: "Aucune séance aujourd'hui", positive: false }
            }
            color="coral"
          />
          <QuickCard
            href="/nutrition"
            icon={Salad}
            title="Plan Nutrition"
            desc="Repas et macros du jour"
            tag={{ text: `${macros.calories} kcal · ${macros.protein}g P`, positive: false }}
            color="sage"
          />
          <QuickCard
            href="/progress"
            icon={TrendingUp}
            title="Mes Progrès"
            desc="Poids, mesures et perfs"
            tag={{ text: "Loguer aujourd'hui", positive: false }}
            color="navy"
          />
          <QuickCard
            href="/wellness"
            icon={Leaf}
            title="Wellness"
            desc="Routines, skincare & supps"
            tag={{ text: "Routine matin", positive: false }}
            color="sage"
          />
          <QuickCard
            href="/blog"
            icon={BookOpen}
            title="Blog"
            desc="Sport, nutrition & mindset"
            tag={{ text: "Nouveaux articles", positive: false }}
            color="coral"
          />
          <QuickCard
            href="/messages"
            icon={MessageCircle}
            title="Mon Coach"
            desc="Message ton coach"
            tag={{ text: "Messagerie ouverte", positive: false }}
            color="navy"
          />
        </div>
      </section>
    </div>
  );
}

function MacroCard({
  icon: Icon,
  label,
  value,
  unit,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  unit: string;
  color: "coral" | "sage" | "navy";
}) {
  const colors = {
    coral: "bg-coral/10 text-coral",
    sage: "bg-sage/15 text-sage-dark",
    navy: "bg-navy/10 text-navy",
  };
  return (
    <div className="bg-white rounded-card p-5 shadow-card-soft border border-navy/5 hover:shadow-card transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[color]}`}>
          <Icon size={18} />
        </div>
        <div className="text-[10px] uppercase tracking-wider text-navy/40 font-semibold">{label}</div>
      </div>
      <div className="text-2xl font-black text-navy">
        {value}
        <span className="text-sm font-medium text-navy/40 ml-1">{unit}</span>
      </div>
      <div className="mt-3 h-1 rounded-full bg-navy/5 overflow-hidden">
        <div
          className={`h-full ${
            color === "coral" ? "bg-coral" : color === "sage" ? "bg-sage" : "bg-navy"
          } opacity-60`}
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}

function QuickCard({
  href,
  icon: Icon,
  title,
  desc,
  tag,
  color,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  tag: { text: string; positive: boolean };
  color: "coral" | "sage" | "navy";
}) {
  const colors = {
    coral: "bg-coral/10 text-coral group-hover:bg-coral group-hover:text-white",
    sage: "bg-sage/15 text-sage-dark group-hover:bg-sage group-hover:text-white",
    navy: "bg-navy/10 text-navy group-hover:bg-navy group-hover:text-white",
  };
  return (
    <Link href={href} className="block">
      <div className="relative h-full bg-white rounded-card p-6 shadow-card-soft border border-navy/5 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 group">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${colors[color]}`}>
            <Icon size={22} />
          </div>
          <ArrowRight size={18} className="text-navy/30 group-hover:text-coral group-hover:translate-x-1 transition-all" />
        </div>
        <h3 className="font-bold text-navy mb-1">{title}</h3>
        <p className="text-navy/50 text-sm mb-3">{desc}</p>
        <span
          className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full ${
            tag.positive ? "bg-sage/15 text-sage-dark" : "bg-navy/5 text-navy/50"
          }`}
        >
          {tag.positive && <CheckCircle2 size={12} />}
          {tag.text}
        </span>
      </div>
    </Link>
  );
}
