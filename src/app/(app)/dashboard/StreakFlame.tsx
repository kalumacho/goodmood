import { Flame } from "lucide-react";

interface StreakFlameProps {
  streak: number;
  bestStreak?: number;
}

export default function StreakFlame({ streak, bestStreak }: StreakFlameProps) {
  const tier =
    streak >= 30 ? "legend" : streak >= 14 ? "epic" : streak >= 7 ? "hot" : streak >= 3 ? "warm" : "cold";

  const tierConfig = {
    cold: {
      label: "Démarre la série",
      bg: "bg-white",
      flameColor: "text-navy/20",
      glow: "",
      kanji: "始",
    },
    warm: {
      label: "Belle étincelle",
      bg: "bg-gradient-to-br from-sunset-gold/20 to-sunset-amber/20",
      flameColor: "text-sunset-amber",
      glow: "",
      kanji: "火",
    },
    hot: {
      label: "Série enflammée",
      bg: "bg-gradient-to-br from-sunset-amber/30 to-coral/30",
      flameColor: "text-coral",
      glow: "shadow-[0_0_20px_rgba(232,114,74,0.4)]",
      kanji: "熱",
    },
    epic: {
      label: "Brasier épique",
      bg: "bg-gradient-to-br from-coral/40 to-sunset-deep/40",
      flameColor: "text-sunset-deep",
      glow: "shadow-[0_0_30px_rgba(214,53,94,0.5)]",
      kanji: "炎",
    },
    legend: {
      label: "Flamme légendaire",
      bg: "bg-sunset-fire",
      flameColor: "text-white",
      glow: "shadow-[0_0_40px_rgba(214,53,94,0.7)]",
      kanji: "伝",
    },
  }[tier];

  return (
    <div
      className={`relative overflow-hidden border-2 border-navy rounded-2xl shadow-[4px_4px_0px_#0D1B2A] p-5 ${tierConfig.bg}`}
    >
      {/* Kanji watermark */}
      <div className="absolute -right-3 -bottom-4 text-[110px] font-black leading-none text-navy/5 select-none pointer-events-none">
        {tierConfig.kanji}
      </div>

      <div className="relative flex items-center gap-4">
        {/* Flame icon with animation */}
        <div
          className={`relative w-14 h-14 rounded-xl border-2 border-navy bg-white flex items-center justify-center shadow-[2px_2px_0px_#0D1B2A] ${tierConfig.glow}`}
        >
          <Flame
            size={28}
            className={`flame-flicker ${tierConfig.flameColor}`}
            fill={streak >= 3 ? "currentColor" : "none"}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-black uppercase tracking-widest text-navy/40 mb-0.5">
            Série
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-navy leading-none">{streak}</span>
            <span className="text-xs font-black uppercase tracking-widest text-navy/50">
              jour{streak > 1 ? "s" : ""}
            </span>
          </div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-navy/60 mt-1 truncate">
            {tierConfig.label}
          </div>
        </div>

        {bestStreak !== undefined && bestStreak > 0 && (
          <div className="text-right shrink-0">
            <div className="text-[9px] font-black uppercase tracking-widest text-navy/40">
              Record
            </div>
            <div className="text-lg font-black text-navy leading-none">{bestStreak}</div>
          </div>
        )}
      </div>

      {/* Milestone dots */}
      <div className="relative mt-4 flex items-center gap-1.5">
        {[3, 7, 14, 30].map((milestone) => {
          const hit = streak >= milestone;
          return (
            <div key={milestone} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full h-1.5 rounded-full border border-navy/20 ${
                  hit ? "bg-sunset-fire" : "bg-navy/5"
                }`}
              />
              <div
                className={`text-[9px] font-black ${
                  hit ? "text-navy" : "text-navy/30"
                }`}
              >
                {milestone}j
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
