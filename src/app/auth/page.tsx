export const dynamic = "force-dynamic";
import AuthForm from "./AuthForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Rejoindre le Clan" };

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="absolute inset-0 manga-lines opacity-30" />
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-orange rounded flex items-center justify-center">
              <span className="text-void font-black">GM</span>
            </div>
          </div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight">
            Good<span className="text-orange">Mood</span>
          </h1>
          <p className="text-white/30 mt-2 text-xs font-bold uppercase tracking-widest">Ninja Wellness Platform</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
