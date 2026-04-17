import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminView from "./AdminView";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — GoodMood" };

export default async function AdminPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false });

  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .order("sent_at", { ascending: false });

  return (
    <div className="min-h-screen bg-cream p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-navy">Admin Panel</h1>
        <p className="text-navy/60 mt-1">Gestion des articles et messages</p>
      </div>
      <AdminView articles={articles || []} messages={messages || []} />
    </div>
  );
}
