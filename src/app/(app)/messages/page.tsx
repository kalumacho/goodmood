export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import MessagesView from "./MessagesView";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Messages" };

export default async function MessagesPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .eq("user_id", user.id)
    .order("sent_at", { ascending: true });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-navy">Mon Coach 💬</h1>
        <p className="text-navy/60 mt-1">Pose tes questions, ton coach te répond sous 24h.</p>
      </div>
      <MessagesView userId={user.id} initialMessages={messages || []} />
    </div>
  );
}
