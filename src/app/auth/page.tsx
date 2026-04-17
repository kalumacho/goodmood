export const dynamic = "force-dynamic";
import AuthForm from "./AuthForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion / Inscription",
};

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-sage blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-coral blur-3xl" />
      </div>
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white">
            Good<span className="text-coral">Mood</span>
          </h1>
          <p className="text-white/50 mt-2">Ton programme wellness personnalisé</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
