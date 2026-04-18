import Navbar from "@/components/layout/Navbar";
import { createClient } from "@/lib/supabase/server";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-cream">
      <Navbar userEmail={user?.email ?? null} />
      <main className="lg:pl-64 pt-14 lg:pt-0 min-h-screen">
        <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
