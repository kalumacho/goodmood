export const dynamic = "force-dynamic";
import AuthForm from "./AuthForm";
import Ryoku from "@/components/mascot/Ryoku";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Connexion — GoodMood" };

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-paper" />
      <div className="absolute inset-0 speed-lines opacity-40" />
      <div className="absolute bottom-0 right-0 w-64 h-64 halftone opacity-20" />

      <div className="relative w-full max-w-md">
        {/* Logo + mascot */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <Ryoku pose="idle" size={100} />
          </div>
          <div className="inline-flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 bg-coral border-2 border-navy rounded-xl shadow-[3px_3px_0px_#0D1B2A] flex items-center justify-center">
              <span className="text-white font-black text-sm">GM</span>
            </div>
            <h1 className="text-2xl font-black uppercase text-navy tracking-tight">
              Good<span className="text-coral">Mood</span>
            </h1>
          </div>
          {/* Speech bubble from Ryoku */}
          <div className="speech-bubble inline-block px-4 py-2 mt-3">
            <p className="text-xs text-navy/60 font-bold italic">Bienvenue ! Je t&apos;attendais, ninja !</p>
          </div>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
