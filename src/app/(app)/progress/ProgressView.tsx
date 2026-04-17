"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import type { ProgressLog } from "@/types/database";

export default function ProgressView({
  userId,
  logs,
  startWeight,
}: {
  userId: string;
  logs: ProgressLog[];
  startWeight: number;
}) {
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const supabase = createClient();

  const logWeight = async () => {
    if (!weight) return;
    setLoading(true);
    const today = new Date().toISOString().split("T")[0];
    const { error } = await supabase.from("progress_logs").upsert({
      user_id: userId,
      date: today,
      weight: parseFloat(weight),
    }, { onConflict: "user_id,date" });

    if (!error) {
      setMessage("Poids enregistré !");
      setWeight("");
      setTimeout(() => setMessage(""), 3000);
    }
    setLoading(false);
  };

  const chartData = logs.map((l) => ({
    date: new Date(l.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }),
    poids: l.weight,
  }));

  const latestWeight = logs.at(-1)?.weight || startWeight;
  const diff = logs.length >= 2
    ? (logs.at(-1)!.weight! - logs[0].weight!).toFixed(1)
    : "0";
  const isPositive = parseFloat(diff) > 0;

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-shadow border border-white/5 rounded p-4 text-center">
          <div className="text-2xl sm:text-3xl font-black text-white">{startWeight}</div>
          <div className="text-xs text-white/30 font-black uppercase tracking-widest mt-1">Départ (kg)</div>
        </div>
        <div className="bg-shadow border border-orange/20 rounded p-4 text-center">
          <div className="text-2xl sm:text-3xl font-black text-orange">{latestWeight}</div>
          <div className="text-xs text-white/30 font-black uppercase tracking-widest mt-1">Actuel (kg)</div>
        </div>
        <div className="bg-shadow border border-white/5 rounded p-4 text-center">
          <div className={`text-2xl sm:text-3xl font-black ${isPositive ? "text-red" : "text-chakra"}`}>
            {isPositive ? "+" : ""}{diff}
          </div>
          <div className="text-xs text-white/30 font-black uppercase tracking-widest mt-1">Évolution (kg)</div>
        </div>
      </div>

      {/* Chart */}
      <Card>
        <h3 className="font-black uppercase tracking-wider text-white text-sm mb-6">Évolution du poids</h3>
        {chartData.length >= 2 ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)", fontWeight: "bold" }} />
              <YAxis domain={["auto", "auto"]} tick={{ fontSize: 11, fill: "rgba(255,255,255,0.3)", fontWeight: "bold" }} />
              <Tooltip
                contentStyle={{ background: "#0D0D14", border: "1px solid rgba(255,107,0,0.3)", borderRadius: 4, boxShadow: "0 0 20px rgba(255,107,0,0.1)" }}
                labelStyle={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: "bold", textTransform: "uppercase" }}
                itemStyle={{ color: "#FF6B00", fontWeight: "bold" }}
                formatter={(v) => [`${v} kg`, "Poids"]}
              />
              <Line type="monotone" dataKey="poids" stroke="#FF6B00" strokeWidth={2}
                dot={{ fill: "#FF6B00", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: "#FF6B00", stroke: "rgba(255,107,0,0.3)", strokeWidth: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-40 flex items-center justify-center text-white/20 text-xs font-black uppercase tracking-widest">
            Enregistre au moins 2 pesées pour voir l&apos;évolution
          </div>
        )}
      </Card>

      {/* Log form */}
      <Card>
        <h3 className="font-black uppercase tracking-wider text-white text-sm mb-4">Enregistrer le poids du jour</h3>
        <div className="flex gap-3">
          <Input placeholder="Ex: 72.5" type="number" step="0.1" value={weight}
            onChange={(e) => setWeight(e.target.value)} className="max-w-xs" />
          <Button onClick={logWeight} loading={loading}>Enregistrer</Button>
        </div>
        {message && <p className="mt-3 text-xs font-black uppercase tracking-widest text-orange">{message}</p>}
      </Card>

      {/* Logs list */}
      {logs.length > 0 && (
        <Card>
          <h3 className="font-black uppercase tracking-wider text-white text-sm mb-4">Historique</h3>
          <div className="space-y-1">
            {[...logs].reverse().slice(0, 10).map((log) => (
              <div key={log.id} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                <span className="text-xs text-white/40 font-bold uppercase tracking-widest">
                  {new Date(log.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                </span>
                <span className="font-black text-orange text-sm">{log.weight} kg</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
