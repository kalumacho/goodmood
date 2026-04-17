"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { ShoppingCart, Coffee, Sun, Moon, Cookie, ChevronDown, ChevronUp } from "lucide-react";

type Meal = { name: string; foods: string[]; protein: number; carbs: number; fats: number; calories: number };
type DayPlan = { day: string; meals: { breakfast: Meal; lunch: Meal; dinner: Meal; snack: Meal }; total: { protein: number; carbs: number; fats: number; calories: number } };

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

export default function NutritionView({ plan }: { plan: DayPlan[]; macros?: { protein: number; carbs: number; fats: number; calories: number } }) {
  const todayIdx = new Date().getDay();
  const adjustedIdx = todayIdx === 0 ? 6 : todayIdx - 1;
  const [activeDay, setActiveDay] = useState(adjustedIdx);
  const [showShopping, setShowShopping] = useState(false);

  const day = plan[activeDay];
  const shoppingList = plan.flatMap((d) => Object.values(d.meals).flatMap((m) => m.foods));
  const uniqueItems = Array.from(new Set(shoppingList));

  return (
    <div>
      {/* Day selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {DAYS.map((d, i) => (
          <button key={d} onClick={() => setActiveDay(i)}
            className={`shrink-0 px-4 py-2 rounded text-xs font-black uppercase tracking-widest transition-all ${
              activeDay === i ? "bg-orange text-void shadow-orange" : "bg-shadow border border-white/5 text-white/40 hover:text-white hover:border-orange/30"
            }`}>
            {d.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Day macro bar */}
      <div className="bg-shadow border border-orange/20 rounded p-5 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="font-black uppercase tracking-wide text-white text-lg">{day.day}</h2>
            <p className="text-orange text-sm font-black">{day.total.calories} kcal</p>
          </div>
          <div className="flex gap-6">
            <MacroStat label="Protéines" value={day.total.protein} unit="g" color="orange" />
            <MacroStat label="Glucides" value={day.total.carbs} unit="g" color="chakra" />
            <MacroStat label="Lipides" value={day.total.fats} unit="g" color="white" />
          </div>
        </div>
      </div>

      {/* Meals */}
      <div className="space-y-3">
        <MealCard icon={Coffee} title="Petit-déjeuner" meal={day.meals.breakfast} />
        <MealCard icon={Sun} title="Déjeuner" meal={day.meals.lunch} />
        <MealCard icon={Moon} title="Dîner" meal={day.meals.dinner} />
        <MealCard icon={Cookie} title="Collation" meal={day.meals.snack} />
      </div>

      {/* Shopping list */}
      <div className="mt-6">
        <button onClick={() => setShowShopping(!showShopping)}
          className="flex items-center gap-2 bg-shadow border border-white/5 hover:border-orange/40 rounded px-5 py-3 text-white/60 hover:text-orange font-black text-xs uppercase tracking-widest transition-all">
          <ShoppingCart size={16} className="text-orange" />
          {showShopping ? "Masquer la liste" : "Liste de ravitaillement"}
          {showShopping ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {showShopping && (
          <Card className="mt-3">
            <h3 className="font-black uppercase tracking-wider text-white text-sm mb-4">Ravitaillement — Semaine complète</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {uniqueItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-white/50">
                  <span className="w-3 h-3 rounded border border-orange/30 shrink-0" />
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
  const colorClass = color === "orange" ? "text-orange" : color === "chakra" ? "text-chakra" : "text-white";
  return (
    <div className="text-center">
      <div className={`text-xl font-black ${colorClass}`}>
        {value}<span className="text-xs font-normal ml-0.5">{unit}</span>
      </div>
      <div className="text-white/30 text-xs font-bold uppercase tracking-widest mt-0.5">{label}</div>
    </div>
  );
}

function MealCard({ icon: Icon, title, meal }: { icon: React.ElementType; title: string; meal: Meal }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-shadow border border-white/5 hover:border-orange/20 rounded transition-all">
      <button className="w-full flex items-center gap-4 p-4 text-left" onClick={() => setOpen(!open)}>
        <div className="w-10 h-10 rounded bg-orange/10 border border-orange/20 flex items-center justify-center shrink-0">
          <Icon size={16} className="text-orange" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-white/30 font-black uppercase tracking-widest mb-0.5">{title}</div>
          <div className="font-black uppercase text-xs sm:text-sm tracking-wide text-white truncate">{meal.name}</div>
        </div>
        <div className="text-right shrink-0 mr-2">
          <div className="font-black text-orange text-sm">{meal.calories} kcal</div>
          <div className="text-xs text-white/30">{meal.protein}g P · {meal.carbs}g G · {meal.fats}g L</div>
        </div>
        {open ? <ChevronUp size={14} className="text-orange shrink-0" /> : <ChevronDown size={14} className="text-white/20 shrink-0" />}
      </button>
      {open && (
        <ul className="px-4 pb-4 pt-0 space-y-1.5 border-t border-orange/10">
          {meal.foods.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-white/50 pt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange/60 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
