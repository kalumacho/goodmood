export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { calculateBMR, calculateTDEE, calculateMacros } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { Sword, Salad, TrendingUp, Sparkles, ArrowRight, Flame, Zap, Droplets, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import type { UserProfile } from "@/types/database";
import GoalsEditor from "./GoalsEditor";

export const metadata: Metadata = { title: "Base — GoodMood" };

const RANK_BY_SESSIONS = (n: number) =>
  n >= 200 ? "Kage" : n >= 100 ? "Jonin" : n >= 50 ? "Chunin" : n >= 10 ? "Genin" : "Académie";

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
  const rank = RANK_BY_SESSIONS(totalSessions);
  const sessionsPerWeek = (profile as any).sessions_per_week || 3;

  const goalLabels: Record<string, string> = {
    weight_loss: "Perte de poids", muscle_gain: "Prise de masse",
    general_wellness: "Bien-être", maintenance: "Maintien",
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-white/20 text-xs uppercase tracking-widest font-bold capitalize">{today}</p>
        <div className="flex flex-wrap items-start justify-between gap-4 mt-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-white">
              Prêt pour la <span className="text-orange">mission</span> ? 🔥
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="text-xs font-black uppercase tracking-widest text-orange border border-orange/30 bg-orange/10 px-2 py-1 rounded">
                Rang : {rank}
              </span>
              <span className="text-xs text-white/30 font-bold uppercase tracking-widest">
                {profile.goal.map((g: string) => goalLabels[g] || g).join(" · ")}
              </span>
              <span className="text-xs text-white/30 font-bold">
                {sessionsPerWeek}x / semaine
              </span>
            </div>
          </div>
          <GoalsEditor currentGoals={profile.goal} currentSessions={sessionsPerWeek} userId={user.id} />
        </div>
      </div>

      {/* Chakra / Macros */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <StatCard icon={Flame} label="Chakra total" value={macros.calories} unit="kcal" color="orange" />
        <StatCard icon={Zap} label="Protéines" value={macros.protein} unit="g" color="chakra" />
        <StatCard icon={Droplets} label="Glucides" value={macros.carbs} unit="g" color="red" />
        <StatCard icon={Droplets} label="Lipides" value={macros.fats} unit="g" color="blue" />
      </div>

      {/* Missions streak */}
      <Card className="mb-6 sm:mb-8 border-orange/20 bg-shadow-light">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-white/30 mb-1">Progression totale</p>
            <p className="text-2xl sm:text-3xl font-black text-white">
              {totalSessions} <span className="text-orange">missions</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-black uppercase tracking-widest text-white/30 mb-1">Aujourd&apos;hui</p>
            <p className={`text-lg font-black uppercase ${completedToday && completedToday.length > 0 ? "text-orange" : "text-white/20"}`}>
              {completedToday && completedToday.length > 0 ? "✓ Mission accomplie" : "En attente"}
            </p>
          </div>
          {/* Rank progression bar */}
          <div className="w-full">
            <div className="flex justify-between text-xs font-black uppercase tracking-widest text-white/30 mb-1">
              <span>{rank}</span>
              <span>{totalSessions} / {totalSessions >= 200 ? 200 : totalSessions >= 100 ? 200 : totalSessions >= 50 ? 100 : totalSessions >= 10 ? 50 : 10} missions</span>
            </div>
            <div className="h-1.5 bg-void rounded-full overflow-hidden">
              <div className="h-full energy-bar rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, (totalSessions / (totalSessions >= 200 ? 200 : totalSessions >= 100 ? 200 : totalSessions >= 50 ? 100 : totalSessions >= 10 ? 50 : 10)) * 100)}%` }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Quick access */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MissionCard href="/sport" icon={Sword} title="Missions Sport" desc="Voir le planning de la semaine"
          tag={completedToday && completedToday.length > 0 ? "✓ Mission du jour accomplie" : "Mission en attente"} color="orange" />
        <MissionCard href="/nutrition" icon={Salad} title="Rations du Clan" desc="Plan repas & macros du jour"
          tag={`${macros.calories} kcal · ${macros.protein}g protéines`} color="chakra" />
        <MissionCard href="/progress" icon={TrendingUp} title="Niveau & Stats" desc="Poids, mesures, performances"
          tag="Logger aujourd'hui" color="red" />
        <MissionCard href="/wellness" icon={Sparkles} title="Chakra & Bien-être" desc="Routines, skincare & suppléments"
          tag="Routine disponible" color="orange" />
        <MissionCard href="/blog" icon={Zap} title="Parchemins" desc="Articles & conseils de Sensei"
          tag="Nouveaux parchemins" color="chakra" />
        <MissionCard href="/messages" icon={MessageCircle} title="Contacter le Sensei" desc="Message ton coach"
          tag="Messagerie ouverte" color="red" />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, unit, color }: {
  icon: React.ElementType; label: string; value: number; unit: string; color: string;
}) {
  const colors: Record<string, string> = {
    orange: "text-orange bg-orange/10 border-orange/20",
    chakra: "text-chakra bg-chakra/10 border-chakra/20",
    red: "text-red-light bg-red/10 border-red/20",
    blue: "text-blue-light bg-blue/10 border-blue/20",
  };
  return (
    <div className="bg-shadow-light border border-orange/10 rounded p-4">
      <div className={`w-8 h-8 rounded flex items-center justify-center mb-2 border ${colors[color]}`}>
        <Icon size={15} />
      </div>
      <div className="text-xl sm:text-2xl font-black text-white">
        {value}<span className="text-xs font-bold text-white/30 ml-1">{unit}</span>
      </div>
      <div className="text-xs text-white/30 uppercase tracking-widest font-bold mt-0.5">{label}</div>
    </div>
  );
}

function MissionCard({ href, icon: Icon, title, desc, tag, color }: {
  href: string; icon: React.ElementType; title: string; desc: string; tag: string; color: string;
}) {
  const colors: Record<string, string> = {
    orange: "text-orange bg-orange/10 border-orange/20 group-hover:bg-orange/20",
    chakra: "text-chakra bg-chakra/10 border-chakra/20 group-hover:bg-chakra/20",
    red: "text-red-light bg-red/10 border-red/20 group-hover:bg-red/20",
  };
  return (
    <Link href={href} className="group">
      <div className="bg-shadow border border-orange/10 rounded p-5 hover:border-orange/30 transition-all h-full">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-10 h-10 rounded flex items-center justify-center border transition-all ${colors[color]}`}>
            <Icon size={18} />
          </div>
          <ArrowRight size={16} className="text-white/20 group-hover:text-orange transition-colors" />
        </div>
        <h3 className="font-black uppercase text-xs tracking-wider text-white mb-1">{title}</h3>
        <p className="text-white/40 text-xs mb-3">{desc}</p>
        <span className="text-xs text-white/20 bg-white/5 border border-white/5 px-2 py-1 rounded font-bold">{tag}</span>
      </div>
    </Link>
  );
}
