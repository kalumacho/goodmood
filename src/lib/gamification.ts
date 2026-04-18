export type RankKey = "academie" | "genin" | "chunin" | "jonin" | "anbu" | "kage";

export interface Rank {
  key: RankKey;
  label: string;
  kanji: string;
  min: number;
  max: number;
  color: string;
  gradient: string;
  shadow: string;
}

export const RANKS: Rank[] = [
  {
    key: "academie",
    label: "Académie",
    kanji: "学",
    min: 0,
    max: 300,
    color: "text-navy",
    gradient: "from-navy/20 to-navy/10",
    shadow: "shadow-[3px_3px_0px_#0D1B2A]",
  },
  {
    key: "genin",
    label: "Genin",
    kanji: "下",
    min: 300,
    max: 900,
    color: "text-sage-dark",
    gradient: "from-sage-light to-sage",
    shadow: "shadow-[3px_3px_0px_#5C8A5C]",
  },
  {
    key: "chunin",
    label: "Chunin",
    kanji: "中",
    min: 900,
    max: 2100,
    color: "text-sunset-amber",
    gradient: "from-sunset-gold to-sunset-amber",
    shadow: "shadow-[3px_3px_0px_#F4A259]",
  },
  {
    key: "jonin",
    label: "Jonin",
    kanji: "上",
    min: 2100,
    max: 4500,
    color: "text-coral-dark",
    gradient: "from-coral-light to-coral-dark",
    shadow: "shadow-[3px_3px_0px_#E8724A]",
  },
  {
    key: "anbu",
    label: "ANBU",
    kanji: "影",
    min: 4500,
    max: 9000,
    color: "text-sunset-purple",
    gradient: "from-sunset-pink to-sunset-purple",
    shadow: "shadow-[3px_3px_0px_#9B5DE5]",
  },
  {
    key: "kage",
    label: "Kage",
    kanji: "影",
    min: 9000,
    max: Infinity,
    color: "text-sunset-deep",
    gradient: "from-sunset-gold via-coral to-sunset-deep",
    shadow: "shadow-[3px_3px_0px_#D6355E]",
  },
];

export const XP_REWARDS = {
  workout: 100,
  mealLogged: 40,
  waterGoal: 60,
  weightLogged: 30,
  meditation: 25,
  streakDay: 20,
  questComplete: 50,
  dailyCheckin: 10,
} as const;

export function getRank(xp: number): Rank {
  return RANKS.find((r) => xp >= r.min && xp < r.max) || RANKS[RANKS.length - 1];
}

export function getNextRank(xp: number): Rank | null {
  const idx = RANKS.findIndex((r) => xp >= r.min && xp < r.max);
  return idx >= 0 && idx < RANKS.length - 1 ? RANKS[idx + 1] : null;
}

export function getRankProgress(xp: number): {
  current: Rank;
  next: Rank | null;
  progressPct: number;
  xpInRank: number;
  xpToNext: number;
} {
  const current = getRank(xp);
  const next = getNextRank(xp);
  const xpInRank = xp - current.min;
  const range = current.max - current.min;
  const progressPct = next ? Math.min(100, (xpInRank / range) * 100) : 100;
  const xpToNext = next ? next.min - xp : 0;
  return { current, next, progressPct, xpInRank, xpToNext };
}

// XP formula based on session counts + days active (deterministic from DB state)
export function computeXP(params: {
  totalSessions: number;
  streakDays: number;
  questsCompleted: number;
  daysActive: number;
}): number {
  return (
    params.totalSessions * XP_REWARDS.workout +
    params.streakDays * XP_REWARDS.streakDay +
    params.questsCompleted * XP_REWARDS.questComplete +
    params.daysActive * XP_REWARDS.dailyCheckin
  );
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  xp: number;
  icon: string;
}

export const DAILY_QUESTS: Quest[] = [
  {
    id: "workout",
    title: "Mission d'entraînement",
    description: "Complète ta séance du jour",
    xp: 100,
    icon: "sword",
  },
  {
    id: "hydration",
    title: "Rituel d'hydratation",
    description: "Bois 2L d'eau (8 verres)",
    xp: 60,
    icon: "droplet",
  },
  {
    id: "meditation",
    title: "Méditation du ninja",
    description: "10 min de respiration ou méditation",
    xp: 25,
    icon: "wind",
  },
  {
    id: "weight",
    title: "Rapport de mission",
    description: "Logue ton poids ou tes mesures",
    xp: 30,
    icon: "scale",
  },
];

export interface Achievement {
  id: string;
  title: string;
  description: string;
  kanji: string;
  xpReward: number;
  check: (stats: AchievementStats) => boolean;
}

export interface AchievementStats {
  totalSessions: number;
  streakDays: number;
  totalXP: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_blood",
    title: "Première Mission",
    description: "Complète ta 1ère séance",
    kanji: "初",
    xpReward: 50,
    check: (s) => s.totalSessions >= 1,
  },
  {
    id: "streak_7",
    title: "Ninja Assidu",
    description: "7 jours consécutifs",
    kanji: "連",
    xpReward: 150,
    check: (s) => s.streakDays >= 7,
  },
  {
    id: "sessions_10",
    title: "Genin Confirmé",
    description: "10 missions accomplies",
    kanji: "十",
    xpReward: 100,
    check: (s) => s.totalSessions >= 10,
  },
  {
    id: "sessions_50",
    title: "Chunin Expérimenté",
    description: "50 missions accomplies",
    kanji: "五",
    xpReward: 300,
    check: (s) => s.totalSessions >= 50,
  },
  {
    id: "streak_30",
    title: "Maître du Rythme",
    description: "30 jours consécutifs",
    kanji: "月",
    xpReward: 500,
    check: (s) => s.streakDays >= 30,
  },
  {
    id: "sessions_100",
    title: "Jonin Vétéran",
    description: "100 missions accomplies",
    kanji: "百",
    xpReward: 750,
    check: (s) => s.totalSessions >= 100,
  },
];

export function computeStreak(completedDatesISO: string[]): number {
  if (completedDatesISO.length === 0) return 0;
  const done = new Set(completedDatesISO.map((d) => d.split("T")[0]));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  const cursor = new Date(today);

  // If today isn't done, start checking from yesterday
  if (!done.has(cursor.toISOString().split("T")[0])) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (done.has(cursor.toISOString().split("T")[0])) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}
