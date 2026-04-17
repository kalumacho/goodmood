export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import MessagesView from "./MessagesView";
import Ryoku from "@/components/mascot/Ryoku";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Coach — GoodMood" };

export default async function MessagesPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const { data: messages } = await supabase.from("messages").select("*").eq("user_id", user.id).order("sent_at", { ascending: true });

  return (
    <div>
      <div className="relative bg-navy border-2 border-navy rounded-2xl shadow-[6px_6px_0px_#E8724A] overflow-hidden mb-8 p-6">
        <div className="absolute inset-0 halftone opacity-10" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div className="inline-block manga-tag mb-3">Messagerie</div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-white leading-tight">
              Mon <span className="text-coral">Coach</span>
            </h1>
            <p className="text-white/40 mt-1 text-xs font-bold uppercase tracking-widest">
              Pose tes questions · Réponse sous 24h
            </p>
          </div>
          <div className="hidden sm:block shrink-0 -mr-2 -mb-4">
            <Ryoku pose="idle" size={100} />
          </div>
        </div>
      </div>
      <MessagesView userId={user.id} initialMessages={messages || []} />
    </div>
  );
}
