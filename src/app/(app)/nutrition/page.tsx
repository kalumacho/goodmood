export const dynamic = "force-dynamic";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { calculateBMR, calculateTDEE, calculateMacros } from "@/lib/utils";
import { generateNutritionPlan } from "@/lib/nutrition-generator";
import NutritionView from "./NutritionView";
import Ryoku from "@/components/mascot/Ryoku";
import type { Metadata } from "next";
import type { UserProfile } from "@/types/database";

export const metadata: Metadata = { title: "Nutrition — GoodMood" };

export default async function NutritionPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const { data: profileData } = await supabase.from("user_profiles").select("*").eq("user_id", user.id).single();
  if (!profileData) redirect("/onboarding");
  const profile = profileData as unknown as UserProfile;

  const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender);
  const tdee = calculateTDEE(bmr, profile.activity_level);
  const macros = calculateMacros(tdee, profile.goal);
  const weekPlan = generateNutritionPlan(profile.diet, macros.calories);

  return (
    <div>
      <div className="relative bg-navy border-2 border-navy rounded-2xl shadow-[6px_6px_0px_#E8724A] overflow-hidden mb-8 p-6">
        <div className="absolute inset-0 speed-lines opacity-20" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div className="inline-block manga-tag mb-3">Plan Semaine</div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-white leading-tight">
              Plan <span className="text-coral">Nutrition</span>
            </h1>
            <div className="flex flex-wrap gap-3 mt-2">
              {[
                { label: "Calories", val: `${macros.calories} kcal` },
                { label: "Protéines", val: `${macros.protein}g` },
                { label: "Glucides", val: `${macros.carbs}g` },
                { label: "Lipides", val: `${macros.fats}g` },
              ].map((m) => (
                <span key={m.label} className="text-xs text-white/50 font-black uppercase tracking-widest">
                  <span className="text-coral">{m.val}</span> {m.label}
                </span>
              ))}
            </div>
          </div>
          <div className="hidden sm:block shrink-0 -mr-2 -mb-4">
            <Ryoku pose="thinking" size={100} />
          </div>
        </div>
      </div>
      <NutritionView plan={weekPlan} />
    </div>
  );
}
