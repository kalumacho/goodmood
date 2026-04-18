export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import MessagesView from "./MessagesView";
import { PageHeader } from "@/components/ui/PageHeader";
import { MessageCircle } from "lucide-react";
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
    <div className="animate-fade-in">
      <PageHeader
        title="Mon Coach"
        subtitle="Pose tes questions, ton coach te répond sous 24h."
        icon={MessageCircle}
        accent="coral"
      />
      <MessagesView userId={user.id} initialMessages={messages || []} />
    </div>
  );
}
