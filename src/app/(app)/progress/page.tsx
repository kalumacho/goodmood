export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProgressView from "./ProgressView";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mes Progrès" };

export default async function ProgressPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("weight")
    .eq("user_id", user.id)
    .single();

  const { data: logs } = await supabase
    .from("progress_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: true });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-navy">Mes Progrès 📈</h1>
        <p className="text-navy/60 mt-1">Suis ton évolution semaine après semaine.</p>
      </div>
      <ProgressView
        userId={user.id}
        logs={logs || []}
        startWeight={profile?.weight || 70}
      />
    </div>
  );
}
