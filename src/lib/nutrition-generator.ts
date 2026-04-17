type Meal = {
  name: string;
  foods: string[];
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
};

type DayPlan = {
  day: string;
  meals: { breakfast: Meal; lunch: Meal; dinner: Meal; snack: Meal };
  total: { protein: number; carbs: number; fats: number; calories: number };
};

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

const MEALS = {
  omnivore: {
    breakfasts: [
      { name: "Oatmeal protéiné", foods: ["80g flocons d'avoine", "1 scoop whey vanille", "1 banane", "1 cuil. beurre d'amande"], protein: 35, carbs: 65, fats: 10, calories: 490 },
      { name: "Œufs & toast", foods: ["3 œufs brouillés", "2 tranches pain complet", "1/2 avocat", "1 orange"], protein: 28, carbs: 45, fats: 18, calories: 450 },
      { name: "Greek yogurt bowl", foods: ["200g yaourt grec 0%", "40g granola", "1 poignée myrtilles", "1 cuil. miel"], protein: 22, carbs: 50, fats: 6, calories: 340 },
    ],
    lunches: [
      { name: "Bowl poulet riz", foods: ["150g poulet grillé", "100g riz basmati cuit", "200g légumes sautés", "1 cuil. huile olive"], protein: 42, carbs: 55, fats: 12, calories: 500 },
      { name: "Wrap thon avocat", foods: ["1 tortilla complète", "120g thon au naturel", "1/2 avocat", "salade, tomate, concombre"], protein: 35, carbs: 38, fats: 15, calories: 430 },
      { name: "Salmon & patate douce", foods: ["150g saumon au four", "150g patate douce", "haricots verts", "citron"], protein: 40, carbs: 42, fats: 18, calories: 490 },
    ],
    dinners: [
      { name: "Bœuf & légumes", foods: ["150g steak haché 5%", "200g brocoli", "150g riz complet", "sauce soja légère"], protein: 45, carbs: 48, fats: 12, calories: 480 },
      { name: "Poulet méditerranéen", foods: ["160g escalope de poulet", "quinoa 80g sec", "tomates cerises", "olives, herbes"], protein: 48, carbs: 40, fats: 10, calories: 450 },
      { name: "Pasta thon", foods: ["80g pâtes complètes", "120g thon", "sauce tomate maison", "parmesan léger"], protein: 38, carbs: 62, fats: 8, calories: 470 },
    ],
    snacks: [
      { name: "Shake protéiné", foods: ["1 scoop whey", "250ml lait d'amande", "1 banane"], protein: 28, carbs: 32, fats: 4, calories: 275 },
      { name: "Collation équilibrée", foods: ["30g amandes", "1 pomme", "20g fromage blanc"], protein: 10, carbs: 25, fats: 16, calories: 280 },
    ],
  },
  vegan: {
    breakfasts: [
      { name: "Smoothie bowl", foods: ["200ml lait soja", "1 scoop protéine vegan", "1 banane", "beurre cacahuète"], protein: 30, carbs: 55, fats: 12, calories: 450 },
      { name: "Chia pudding", foods: ["40g graines chia", "300ml lait coco", "mangue", "fruits rouges"], protein: 14, carbs: 48, fats: 18, calories: 410 },
    ],
    lunches: [
      { name: "Buddha bowl", foods: ["150g tofu grillé", "100g quinoa cuit", "edamame", "sauce tahini"], protein: 32, carbs: 50, fats: 15, calories: 470 },
      { name: "Curry lentilles", foods: ["150g lentilles corail", "lait coco", "épinards", "riz basmati 80g"], protein: 22, carbs: 68, fats: 10, calories: 450 },
    ],
    dinners: [
      { name: "Tempeh & légumes", foods: ["150g tempeh", "patate douce", "brocoli", "sauce tamari"], protein: 28, carbs: 45, fats: 10, calories: 390 },
      { name: "Bowl pois chiches", foods: ["200g pois chiches", "courgettes rôties", "quinoa", "houmous"], protein: 24, carbs: 55, fats: 12, calories: 420 },
    ],
    snacks: [
      { name: "Shake vegan", foods: ["1 scoop protéine pois", "lait avoine", "1 banane"], protein: 25, carbs: 40, fats: 4, calories: 300 },
    ],
  },
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function scale(meal: Meal, targetCalories: number, mealRatio: number): Meal {
  const target = targetCalories * mealRatio;
  const ratio = target / meal.calories;
  return {
    ...meal,
    protein: Math.round(meal.protein * ratio),
    carbs: Math.round(meal.carbs * ratio),
    fats: Math.round(meal.fats * ratio),
    calories: Math.round(meal.calories * ratio),
  };
}

export function generateNutritionPlan(diet: string, targetCalories: number): DayPlan[] {
  const template = (diet === "vegan" || diet === "vegetarian")
    ? MEALS.vegan
    : MEALS.omnivore;

  return DAYS.map((day) => {
    const breakfast = scale(pick(template.breakfasts), targetCalories, 0.25);
    const lunch = scale(pick(template.lunches), targetCalories, 0.35);
    const dinner = scale(pick(template.dinners), targetCalories, 0.3);
    const snack = scale(pick(template.snacks), targetCalories, 0.1);

    return {
      day,
      meals: { breakfast, lunch, dinner, snack },
      total: {
        protein: breakfast.protein + lunch.protein + dinner.protein + snack.protein,
        carbs: breakfast.carbs + lunch.carbs + dinner.carbs + snack.carbs,
        fats: breakfast.fats + lunch.fats + dinner.fats + snack.fats,
        calories: breakfast.calories + lunch.calories + dinner.calories + snack.calories,
      },
    };
  });
}
