import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateBMR(
  weight: number,
  height: number,
  age: number,
  gender: string
): number {
  if (gender === "male") {
    return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  }
  return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
}

export function calculateTDEE(bmr: number, activityLevel: string): number {
  const multipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    intense: 1.725,
  };
  return Math.round(bmr * (multipliers[activityLevel] || 1.55));
}

export function calculateMacros(
  tdee: number,
  goal: string[]
): { protein: number; carbs: number; fats: number; calories: number } {
  let calories = tdee;
  if (goal.includes("weight_loss")) calories = tdee - 400;
  if (goal.includes("muscle_gain")) calories = tdee + 300;

  const protein = Math.round((calories * 0.3) / 4);
  const fats = Math.round((calories * 0.25) / 9);
  const carbs = Math.round((calories * 0.45) / 4);

  return { protein, carbs, fats, calories: Math.round(calories) };
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
