export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProgressView from "./ProgressView";
import Ryoku from "@/components/mascot/Ryoku";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Progression — GoodMood" };

export default async function ProgressPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const { data: profile } = await supabase.from("user_profiles").select("weight").eq("user_id", user.id).single();
  const { data: logs } = await supabase.from("progress_logs").select("*").eq("user_id", user.id).order("date", { ascending: true });

  return (
    <div>
      <div className="relative bg-navy border-2 border-navy rounded-2xl shadow-[6px_6px_0px_#E8724A] overflow-hidden mb-8 p-6">
        <div className="absolute inset-0 speed-lines opacity-20" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div className="inline-block manga-tag mb-3">Évolution</div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-white leading-tight">
              Ma <span className="text-coral">Progression</span>
            </h1>
            <p className="text-white/40 mt-1 text-xs font-bold uppercase tracking-widest">
              Suis ton évolution semaine après semaine
            </p>
          </div>
          <div className="hidden sm:block shrink-0 -mr-2 -mb-4">
            <Ryoku pose="fistpump" size={100} />
          </div>
        </div>
      </div>
      <ProgressView userId={user.id} logs={logs || []} startWeight={profile?.weight || 70} />
    </div>
  );
}
