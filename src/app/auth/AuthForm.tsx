"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${location.origin}/auth/callback` },
      });
      if (error) setError(error.message);
      else setMessage("Vérifie ton email pour confirmer ton compte !");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError("Email ou mot de passe incorrect.");
      else { router.push("/dashboard"); router.refresh(); }
    }
    setLoading(false);
  };

  return (
    <div className="bg-white border-2 border-navy rounded-2xl shadow-[6px_6px_0px_#0D1B2A] p-6 sm:p-8">
      {/* Mode toggle */}
      <div className="flex rounded-xl bg-navy/5 border-2 border-navy/10 p-1 mb-8 gap-1">
        {(["login", "signup"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${
              mode === m
                ? "bg-coral text-white border-2 border-navy shadow-[2px_2px_0px_#0D1B2A]"
                : "text-navy/40 hover:text-navy border-2 border-transparent"
            }`}>
            {m === "login" ? "Connexion" : "Inscription"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Email" type="email" placeholder="toi@goodmood.app" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Mot de passe" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />

        {error && (
          <div className="bg-red-50 border-2 border-red-300 text-red-600 text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-xl">{error}</div>
        )}
        {message && (
          <div className="bg-coral/10 border-2 border-coral/40 text-coral-dark text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-xl">{message}</div>
        )}

        <Button type="submit" loading={loading} className="w-full mt-2">
          {mode === "login" ? "Se connecter" : "Créer mon compte"}
        </Button>
      </form>
    </div>
  );
}
