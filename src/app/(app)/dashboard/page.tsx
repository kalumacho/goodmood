export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { calculateBMR, calculateTDEE, calculateMacros } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { Dumbbell, Salad, TrendingUp, Leaf, ArrowRight, Flame, Droplets, Zap } from "lucide-react";
import type { Metadata } from "next";
import type { UserProfile } from "@/types/database";
import GoalsEditor from "./GoalsEditor";

export const metadata: Metadata = { title: "Dashboard" };

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

  const today = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  const todayISO = new Date().toISOString().split("T")[0];

  const { data: completedToday } = await supabase
    .from("completed_sessions")
    .select("id")
    .eq("user_id", user.id)
    .gte("completed_at", `${todayISO}T00:00:00`)
    .lt("completed_at", `${todayISO}T23:59:59`);

  const goalLabels: Record<string, string> = {
    weight_loss: "Perte de poids",
    muscle_gain: "Prise de masse",
    general_wellness: "Bien-être général",
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-navy/50 text-sm capitalize">{today}</p>
          <h1 className="text-3xl font-black text-navy mt-1">Bonjour 👋</h1>
          <p className="text-navy/60 mt-1">
            Objectif : <span className="font-semibold text-coral">{profile.goal.map((g: string) => goalLabels[g] || g).join(", ")}</span>
            <span className="text-navy/40 mx-2">·</span>
            <span className="font-semibold text-navy">{(profile as any).sessions_per_week || 3}x/semaine</span>
          </p>
        </div>
        <GoalsEditor
          currentGoals={profile.goal}
          currentSessions={(profile as any).sessions_per_week || 3}
          userId={user.id}
        />
      </div>

      {/* Macros summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MacroCard icon={Flame} label="Calories" value={macros.calories} unit="kcal" color="coral" />
        <MacroCard icon={Zap} label="Protéines" value={macros.protein} unit="g" color="sage" />
        <MacroCard icon={Droplets} label="Glucides" value={macros.carbs} unit="g" color="navy" />
        <MacroCard icon={Droplets} label="Lipides" value={macros.fats} unit="g" color="coral" />
      </div>

      {/* Quick links */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickCard
          href="/sport"
          icon={Dumbbell}
          title="Programme Sport"
          desc="Voir tes séances de la semaine"
          tag={completedToday && completedToday.length > 0 ? "✅ Séance faite aujourd'hui" : "Aucune séance aujourd'hui"}
          color="coral"
        />
        <QuickCard
          href="/nutrition"
          icon={Salad}
          title="Plan Nutrition"
          desc="Tes repas et macros du jour"
          tag={`${macros.calories} kcal · ${macros.protein}g protéines`}
          color="sage"
        />
        <QuickCard
          href="/progress"
          icon={TrendingUp}
          title="Mes Progrès"
          desc="Poids, mesures et performances"
          tag="Loguer aujourd'hui"
          color="navy"
        />
        <QuickCard
          href="/wellness"
          icon={Leaf}
          title="Wellness"
          desc="Routines, skincare & suppléments"
          tag="Routine matin disponible"
          color="sage"
        />
        <QuickCard
          href="/blog"
          icon={Leaf}
          title="Blog"
          desc="Articles sport, nutrition & mindset"
          tag="Nouveaux articles"
          color="coral"
        />
        <QuickCard
          href="/messages"
          icon={Dumbbell}
          title="Mon Coach"
          desc="Envoie un message à ton coach"
          tag="Messagerie ouverte"
          color="navy"
        />
      </div>
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
    sage: "bg-sage/10 text-sage-dark",
    navy: "bg-navy/10 text-navy",
  };
  return (
    <div className="bg-white rounded-card p-5 shadow-card">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${colors[color]}`}>
        <Icon size={18} />
      </div>
      <div className="text-2xl font-black text-navy">{value}<span className="text-sm font-normal text-navy/40 ml-1">{unit}</span></div>
      <div className="text-xs text-navy/50 mt-0.5">{label}</div>
    </div>
  );
}

function QuickCard({
  href, icon: Icon, title, desc, tag, color,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  tag: string;
  color: "coral" | "sage" | "navy";
}) {
  const colors = {
    coral: "bg-coral/10 text-coral",
    sage: "bg-sage/10 text-sage-dark",
    navy: "bg-navy/10 text-navy",
  };
  return (
    <Link href={href}>
      <Card hover className="h-full">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors[color]}`}>
            <Icon size={22} />
          </div>
          <ArrowRight size={18} className="text-navy/30 group-hover:text-coral transition-colors" />
        </div>
        <h3 className="font-bold text-navy mb-1">{title}</h3>
        <p className="text-navy/50 text-sm mb-3">{desc}</p>
        <span className="text-xs text-navy/40 bg-navy/5 px-3 py-1 rounded-full">{tag}</span>
      </Card>
    </Link>
  );
}
