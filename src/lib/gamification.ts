import type { SupabaseClient } from "@supabase/supabase-js";

export const LEVELS = [
  { level: 1, xpMin: 0, title: "Débutant" },
  { level: 2, xpMin: 100, title: "Actif" },
  { level: 3, xpMin: 300, title: "Régulier" },
  { level: 4, xpMin: 600, title: "Engagé" },
  { level: 5, xpMin: 1000, title: "Confirmé" },
  { level: 6, xpMin: 1600, title: "Avancé" },
  { level: 7, xpMin: 2500, title: "Expert" },
  { level: 8, xpMin: 4000, title: "Élite" },
  { level: 9, xpMin: 6000, title: "Maître" },
  { level: 10, xpMin: 10000, title: "Légende" },
];

export const BADGES = [
  { id: "first_session", label: "Première séance", desc: "1ère séance complétée", xpReward: 25 },
  { id: "sessions_10", label: "Décuple", desc: "10 séances complétées", xpReward: 100 },
  { id: "sessions_50", label: "Centurion", desc: "50 séances complétées", xpReward: 500 },
  { id: "streak_3", label: "En feu", desc: "3 jours consécutifs", xpReward: 50 },
  { id: "streak_7", label: "Semaine parfaite", desc: "7 jours consécutifs", xpReward: 150 },
  { id: "first_progress", label: "Suivi actif", desc: "1er log de poids", xpReward: 20 },
];

export const XP_EVENTS = {
  session_complete: 50,
  daily_login: 5,
  progress_log: 20,
} as const;

export function getLevel(totalXP: number) {
  let current = LEVELS[0];
  for (const l of LEVELS) {
    if (totalXP >= l.xpMin) current = l;
  }
  return current;
}

export function getLevelProgress(totalXP: number) {
  const current = getLevel(totalXP);
  const idx = LEVELS.findIndex((l) => l.level === current.level);
  if (idx === LEVELS.length - 1) {
    return { current, next: null, progress: 1, xpToNext: 0 };
  }
  const next = LEVELS[idx + 1];
  const xpInLevel = totalXP - current.xpMin;
  const xpNeeded = next.xpMin - current.xpMin;
  return {
    current,
    next,
    progress: Math.min(1, xpInLevel / xpNeeded),
    xpToNext: next.xpMin - totalXP,
  };
}

export async function awardXP(
  supabase: SupabaseClient,
  userId: string,
  eventType: string,
  amount: number,
  isUnique = false
) {
  try {
    const today = new Date().toISOString().split("T")[0];
    const { data: existing } = await (
      isUnique
        ? supabase.from("xp_events").select("id").eq("user_id", userId).eq("event_type", eventType).limit(1)
        : supabase.from("xp_events").select("id").eq("user_id", userId).eq("event_type", eventType).gte("created_at", today).limit(1)
    );
    if (existing && existing.length > 0) return false;

    await supabase.from("xp_events").insert({ user_id: userId, event_type: eventType, amount });

    const { data: current } = await supabase
      .from("user_xp")
      .select("total_xp")
      .eq("user_id", userId)
      .maybeSingle();

    const newXP = (current?.total_xp ?? 0) + amount;
    await supabase
      .from("user_xp")
      .upsert({ user_id: userId, total_xp: newXP, updated_at: new Date().toISOString() });

    return true;
  } catch {
    return false;
  }
}

export async function checkAndAwardBadge(
  supabase: SupabaseClient,
  userId: string,
  badgeId: string
) {
  try {
    const { data: existing } = await supabase
      .from("user_badges")
      .select("badge_id")
      .eq("user_id", userId)
      .eq("badge_id", badgeId)
      .maybeSingle();

    if (existing) return false;

    await supabase.from("user_badges").insert({ user_id: userId, badge_id: badgeId });

    const badge = BADGES.find((b) => b.id === badgeId);
    if (badge?.xpReward) {
      await awardXP(supabase, userId, `badge_${badgeId}`, badge.xpReward, true);
    }
    return true;
  } catch {
    return false;
  }
}
