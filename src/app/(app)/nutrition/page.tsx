export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { calculateBMR, calculateTDEE, calculateMacros } from "@/lib/utils";
import { generateNutritionPlan } from "@/lib/nutrition-generator";
import NutritionView from "./NutritionView";
import type { Metadata } from "next";
import type { UserProfile } from "@/types/database";

export const metadata: Metadata = { title: "Nutrition" };

export default async function NutritionPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const { data: profileData } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!profileData) redirect("/onboarding");
  const profile = profileData as unknown as UserProfile;

  const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender);
  const tdee = calculateTDEE(bmr, profile.activity_level);
  const macros = calculateMacros(tdee, profile.goal);
  const weekPlan = generateNutritionPlan(profile.diet, macros.calories);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-navy">Plan Nutrition 🥗</h1>
        <p className="text-navy/60 mt-1">
          {macros.calories} kcal · {macros.protein}g protéines · {macros.carbs}g glucides · {macros.fats}g lipides
        </p>
      </div>
      <NutritionView plan={weekPlan} />
    </div>
  );
}
