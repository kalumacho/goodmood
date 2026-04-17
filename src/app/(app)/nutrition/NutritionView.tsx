"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { ShoppingCart, Coffee, Sun, Moon, Cookie } from "lucide-react";

type Meal = { name: string; foods: string[]; protein: number; carbs: number; fats: number; calories: number };
type DayPlan = { day: string; meals: { breakfast: Meal; lunch: Meal; dinner: Meal; snack: Meal }; total: { protein: number; carbs: number; fats: number; calories: number } };

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

export default function NutritionView({
  plan,
}: {
  plan: DayPlan[];
  macros?: { protein: number; carbs: number; fats: number; calories: number };
}) {
  const todayIdx = new Date().getDay();
  const adjustedIdx = todayIdx === 0 ? 6 : todayIdx - 1;
  const [activeDay, setActiveDay] = useState(adjustedIdx);
  const [showShopping, setShowShopping] = useState(false);

  const day = plan[activeDay];

  const shoppingList = plan.flatMap((d) =>
    Object.values(d.meals).flatMap((m) => m.foods)
  );
  const uniqueItems = Array.from(new Set(shoppingList));

  return (
    <div>
      {/* Day selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {DAYS.map((d, i) => (
          <button
            key={d}
            onClick={() => setActiveDay(i)}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeDay === i
                ? "bg-coral text-white shadow-md"
                : "bg-white text-navy/60 hover:text-navy hover:bg-white shadow-sm"
            }`}
          >
            {d.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Day macro bar */}
      <Card className="mb-6 bg-navy text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="font-bold text-lg">{day.day}</h2>
            <p className="text-white/50 text-sm">{day.total.calories} kcal</p>
          </div>
          <div className="flex gap-6">
            <MacroStat label="Protéines" value={day.total.protein} unit="g" color="coral" />
            <MacroStat label="Glucides" value={day.total.carbs} unit="g" color="sage" />
            <MacroStat label="Lipides" value={day.total.fats} unit="g" color="white" />
          </div>
        </div>
      </Card>

      {/* Meals */}
      <div className="space-y-4">
        <MealCard icon={Coffee} title="Petit-déjeuner" meal={day.meals.breakfast} />
        <MealCard icon={Sun} title="Déjeuner" meal={day.meals.lunch} />
        <MealCard icon={Moon} title="Dîner" meal={day.meals.dinner} />
        <MealCard icon={Cookie} title="Collation" meal={day.meals.snack} />
      </div>

      {/* Shopping list */}
      <div className="mt-6">
        <button
          onClick={() => setShowShopping(!showShopping)}
          className="flex items-center gap-2 bg-white rounded-card px-5 py-3 shadow-card text-navy font-semibold hover:shadow-card-hover transition-all"
        >
          <ShoppingCart size={18} className="text-coral" />
          {showShopping ? "Masquer la liste de courses" : "Générer la liste de courses"}
        </button>
        {showShopping && (
          <Card className="mt-4">
            <h3 className="font-bold text-navy mb-4">Liste de courses — Semaine complète</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {uniqueItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-navy/70">
                  <span className="w-4 h-4 rounded border border-navy/20 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function MacroStat({ label, value, unit, color }: { label: string; value: number; unit: string; color: string }) {
  return (
    <div className="text-center">
      <div className={`text-lg font-black ${color === "coral" ? "text-coral" : color === "sage" ? "text-sage" : "text-white"}`}>
        {value}<span className="text-xs font-normal ml-0.5">{unit}</span>
      </div>
      <div className="text-white/40 text-xs">{label}</div>
    </div>
  );
}

function MealCard({ icon: Icon, title, meal }: { icon: React.ElementType; title: string; meal: Meal }) {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <button className="w-full flex items-center gap-4 text-left" onClick={() => setOpen(!open)}>
        <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center shrink-0">
          <Icon size={18} className="text-coral" />
        </div>
        <div className="flex-1">
          <div className="text-xs text-navy/40 mb-0.5">{title}</div>
          <div className="font-bold text-navy">{meal.name}</div>
        </div>
        <div className="text-right">
          <div className="font-bold text-navy">{meal.calories} kcal</div>
          <div className="text-xs text-navy/40">{meal.protein}g P · {meal.carbs}g G · {meal.fats}g L</div>
        </div>
      </button>
      {open && (
        <ul className="mt-4 pt-4 border-t border-navy/5 space-y-1">
          {meal.foods.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-navy/70">
              <span className="w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
