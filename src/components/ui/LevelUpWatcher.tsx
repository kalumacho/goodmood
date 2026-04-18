"use client";

import { useEffect, useState } from "react";
import { getRank, Rank, RankKey } from "@/lib/gamification";
import LevelUpToast from "./LevelUpToast";

interface LevelUpWatcherProps {
  xp: number;
}

const STORAGE_KEY = "rank:last-seen";

export default function LevelUpWatcher({ xp }: LevelUpWatcherProps) {
  const [newRank, setNewRank] = useState<Rank | null>(null);

  useEffect(() => {
    const current = getRank(xp);
    const stored = localStorage.getItem(STORAGE_KEY) as RankKey | null;

    if (!stored) {
      localStorage.setItem(STORAGE_KEY, current.key);
      return;
    }

    if (stored !== current.key) {
      // Compare positions — only celebrate if rank improved
      const RANKS_ORDER: RankKey[] = ["academie", "genin", "chunin", "jonin", "anbu", "kage"];
      if (RANKS_ORDER.indexOf(current.key) > RANKS_ORDER.indexOf(stored)) {
        setNewRank(current);
      }
      localStorage.setItem(STORAGE_KEY, current.key);
    }
  }, [xp]);

  if (!newRank) return null;
  return <LevelUpToast rank={newRank} onClose={() => setNewRank(null)} />;
}
