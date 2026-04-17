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
    <div className="bg-shadow border border-orange/20 rounded p-6 sm:p-8">
      {/* Mode toggle */}
      <div className="flex rounded bg-void border border-orange/10 p-1 mb-8">
        {(["login", "signup"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded transition-all ${
              mode === m ? "bg-orange text-void" : "text-white/30 hover:text-white"
            }`}>
            {m === "login" ? "Connexion" : "Inscription"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Email" type="email" placeholder="ninja@clan.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Mot de passe" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />

        {error && <div className="bg-red/10 border border-red/30 text-red-light text-xs font-bold uppercase tracking-wider px-4 py-3 rounded">{error}</div>}
        {message && <div className="bg-orange/10 border border-orange/30 text-orange text-xs font-bold uppercase tracking-wider px-4 py-3 rounded">{message}</div>}

        <Button type="submit" loading={loading} className="w-full mt-2">
          {mode === "login" ? "Entrer dans le clan" : "Rejoindre le clan"}
        </Button>
      </form>
    </div>
  );
}
