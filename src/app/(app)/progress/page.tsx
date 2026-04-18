export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProgressView from "./ProgressView";
import { PageHeader } from "@/components/ui/PageHeader";
import { TrendingUp } from "lucide-react";
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
    <div className="animate-fade-in">
      <PageHeader
        title="Mes Progrès"
        subtitle="Suis ton évolution semaine après semaine."
        icon={TrendingUp}
        accent="navy"
      />
      <ProgressView
        userId={user.id}
        logs={logs || []}
        startWeight={profile?.weight || 70}
      />
    </div>
  );
}
