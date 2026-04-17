export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { generateWeeklyPlan } from "@/lib/workout-generator";
import WorkoutWeek from "./WorkoutWeek";
import type { Metadata } from "next";
import type { UserProfile } from "@/types/database";
// Card not needed here

export const metadata: Metadata = { title: "Sport" };

export default async function SportPage() {
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

  const { data: completedSessions } = await supabase
    .from("completed_sessions")
    .select("session_id, completed_at")
    .eq("user_id", user.id)
    .gte("completed_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

  const weekPlan = generateWeeklyPlan(profile);
  const completedDays = completedSessions?.map((s) =>
    new Date(s.completed_at).toLocaleDateString("fr-FR", { weekday: "long" })
  ) || [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-navy">Programme Sport 💪</h1>
        <p className="text-navy/60 mt-1">
          Plan personnalisé · {profile.equipment === "full_gym" ? "Salle de sport" : "Sans équipement"}
        </p>
      </div>
      <WorkoutWeek plan={weekPlan} userId={user.id} completedDays={completedDays} />
    </div>
  );
}
