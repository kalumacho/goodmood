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
      });
      if (error) {
        setError(error.message);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError("Email ou mot de passe incorrect.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-card p-8 shadow-card">
      <div className="flex rounded-xl bg-cream p-1 mb-8">
        <button
          onClick={() => setMode("login")}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
            mode === "login" ? "bg-white text-navy shadow-sm" : "text-navy/50 hover:text-navy"
          }`}
        >
          Connexion
        </button>
        <button
          onClick={() => setMode("signup")}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
            mode === "signup" ? "bg-white text-navy shadow-sm" : "text-navy/50 hover:text-navy"
          }`}
        >
          Inscription
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="ton@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Mot de passe"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
        )}
        {message && (
          <div className="bg-sage/10 text-sage-dark text-sm px-4 py-3 rounded-xl">{message}</div>
        )}

        <Button type="submit" loading={loading} className="w-full mt-2">
          {mode === "login" ? "Se connecter" : "Créer mon compte"}
        </Button>
      </form>
    </div>
  );
}
