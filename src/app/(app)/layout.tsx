import Navbar from "@/components/layout/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="lg:pl-64 pt-14 lg:pt-0 min-h-screen">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
