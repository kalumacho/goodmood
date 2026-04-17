export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { generateWeeklyPlan } from "@/lib/workout-generator";
import WorkoutWeek from "./WorkoutWeek";
import Ryoku from "@/components/mascot/Ryoku";
import type { Metadata } from "next";
import type { UserProfile } from "@/types/database";

export const metadata: Metadata = { title: "Sport — GoodMood" };

export default async function SportPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const { data: profileData } = await supabase.from("user_profiles").select("*").eq("user_id", user.id).single();
  if (!profileData) redirect("/onboarding");
  const profile = profileData as unknown as UserProfile;

  const { data: completedSessions } = await supabase
    .from("completed_sessions").select("session_id, completed_at").eq("user_id", user.id)
    .gte("completed_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

  const weekPlan = generateWeeklyPlan(profile);
  const completedDays = completedSessions?.map((s) =>
    new Date(s.completed_at).toLocaleDateString("fr-FR", { weekday: "long" })
  ) || [];

  const equipmentLabel: Record<string, string> = {
    full_gym: "Salle de sport", home: "Home gym", none: "Poids du corps",
  };

  return (
    <div>
      {/* Header panel */}
      <div className="relative bg-navy border-2 border-navy rounded-2xl shadow-[6px_6px_0px_#E8724A] overflow-hidden mb-8 p-6">
        <div className="absolute inset-0 speed-lines opacity-20" />
        <div className="absolute inset-0 halftone opacity-10" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div className="inline-block manga-tag mb-3">Programme Hebdo</div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-white leading-tight">
              Missions <span className="text-coral">Sport</span>
            </h1>
            <p className="text-white/40 mt-1 text-xs font-bold uppercase tracking-widest">
              {equipmentLabel[profile.equipment] || "Sur-mesure"} · Plan personnalisé
            </p>
          </div>
          <div className="hidden sm:block shrink-0 -mr-2 -mb-4">
            <Ryoku pose="running" size={110} />
          </div>
        </div>
      </div>

      <WorkoutWeek plan={weekPlan} userId={user.id} completedDays={completedDays} />
    </div>
  );
}
