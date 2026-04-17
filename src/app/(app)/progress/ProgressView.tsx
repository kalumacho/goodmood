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
      setMessage("✅ Poids enregistré !");
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
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center">
          <div className="text-3xl font-black text-navy">{startWeight}</div>
          <div className="text-xs text-navy/50 mt-1">Poids initial (kg)</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-black text-coral">{latestWeight}</div>
          <div className="text-xs text-navy/50 mt-1">Poids actuel (kg)</div>
        </Card>
        <Card className="text-center">
          <div className={`text-3xl font-black ${isPositive ? "text-coral" : "text-sage-dark"}`}>
            {isPositive ? "+" : ""}{diff}
          </div>
          <div className="text-xs text-navy/50 mt-1">Évolution (kg)</div>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <h3 className="font-bold text-navy mb-6">Évolution du poids</h3>
        {chartData.length >= 2 ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#0D1B2A80" }} />
              <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12, fill: "#0D1B2A80" }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }}
                formatter={(v) => [`${v} kg`, "Poids"]}
              />
              <Line
                type="monotone"
                dataKey="poids"
                stroke="#E8724A"
                strokeWidth={3}
                dot={{ fill: "#E8724A", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-40 flex items-center justify-center text-navy/30 text-sm">
            Enregistre au moins 2 pesées pour voir l&apos;évolution
          </div>
        )}
      </Card>

      {/* Log form */}
      <Card>
        <h3 className="font-bold text-navy mb-4">Enregistrer mon poids d&apos;aujourd&apos;hui</h3>
        <div className="flex gap-3">
          <Input
            placeholder="Ex: 72.5"
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="max-w-xs"
          />
          <Button onClick={logWeight} loading={loading}>
            Enregistrer
          </Button>
        </div>
        {message && (
          <p className="mt-3 text-sm text-sage-dark">{message}</p>
        )}
      </Card>

      {/* Logs list */}
      {logs.length > 0 && (
        <Card>
          <h3 className="font-bold text-navy mb-4">Historique</h3>
          <div className="space-y-2">
            {[...logs].reverse().slice(0, 10).map((log) => (
              <div key={log.id} className="flex items-center justify-between py-2 border-b border-navy/5 last:border-0">
                <span className="text-sm text-navy/60">
                  {new Date(log.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                </span>
                <span className="font-bold text-navy">{log.weight} kg</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
