import { Rank } from "@/lib/gamification";

interface RankBadgeProps {
  rank: Rank;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function RankBadge({ rank, size = "md", showLabel = true }: RankBadgeProps) {
  const dims = {
    sm: { box: "w-8 h-8", kanji: "text-sm", label: "text-[10px]" },
    md: { box: "w-11 h-11", kanji: "text-lg", label: "text-xs" },
    lg: { box: "w-16 h-16", kanji: "text-2xl", label: "text-sm" },
  }[size];

  return (
    <div className="inline-flex items-center gap-2">
      <div
        className={`relative rounded-xl border-2 border-navy flex items-center justify-center bg-gradient-to-br ${rank.gradient} ${rank.shadow} ${dims.box}`}
      >
        <span
          className={`font-black text-white ${dims.kanji}`}
          style={{ textShadow: "1px 1px 0 #0D1B2A" }}
        >
          {rank.kanji}
        </span>
      </div>
      {showLabel && (
        <div>
          <div className={`font-black uppercase tracking-widest text-navy leading-tight ${dims.label}`}>
            {rank.label}
          </div>
        </div>
      )}
    </div>
  );
}
