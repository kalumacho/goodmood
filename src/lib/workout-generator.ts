import type { UserProfile } from "@/types/database";

type Exercise = {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  instructions: string;
};

type DaySession = {
  day: string;
  title: string;
  exercises: Exercise[];
  isRest: boolean;
};

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

const EXERCISES = {
  bodyweight: {
    upper: [
      { name: "Pompes", sets: 3, reps: "10-15", rest: "60s", instructions: "Corps gainé, coudes à 45°" },
      { name: "Dips sur chaise", sets: 3, reps: "10-12", rest: "60s", instructions: "Descends lentement, pousse avec les triceps" },
      { name: "Pike push-ups", sets: 3, reps: "8-12", rest: "60s", instructions: "Fesses en l'air, tête entre les bras" },
    ],
    lower: [
      { name: "Squats", sets: 4, reps: "15-20", rest: "60s", instructions: "Pieds dans l'axe, genoux dans l'axe des pieds" },
      { name: "Fentes avant", sets: 3, reps: "12 par jambe", rest: "60s", instructions: "Genou arrière à 5cm du sol" },
      { name: "Glute bridge", sets: 3, reps: "20", rest: "45s", instructions: "Contracte les fessiers en haut" },
    ],
    core: [
      { name: "Planche", sets: 3, reps: "30-60s", rest: "45s", instructions: "Corps droit, abdos gaindés" },
      { name: "Crunchs", sets: 3, reps: "20", rest: "45s", instructions: "Exhale en montant, ne tire pas sur la nuque" },
    ],
  },
  gym: {
    upper: [
      { name: "Développé couché", sets: 4, reps: "8-10", rest: "90s", instructions: "Barre à la poitrine, coudes à 75°" },
      { name: "Tirage horizontal", sets: 4, reps: "10-12", rest: "90s", instructions: "Coudes près du corps" },
      { name: "Développé militaire", sets: 3, reps: "10-12", rest: "75s", instructions: "Gainde les abdos, pousse droit" },
      { name: "Curl biceps haltères", sets: 3, reps: "12-15", rest: "60s", instructions: "Serre le bicep en haut" },
    ],
    lower: [
      { name: "Squat barre", sets: 4, reps: "6-10", rest: "120s", instructions: "Profondeur parallèle, dos droit" },
      { name: "Leg press", sets: 3, reps: "12-15", rest: "90s", instructions: "Pieds à largeur d'épaules" },
      { name: "Romanian deadlift", sets: 3, reps: "10-12", rest: "90s", instructions: "Dos plat, ressentir les ischios" },
      { name: "Extensions quadriceps", sets: 3, reps: "15", rest: "60s", instructions: "Isométrie 1s en haut" },
    ],
    core: [
      { name: "Planche lestée", sets: 3, reps: "45s", rest: "60s", instructions: "Poids sur le bas du dos" },
      { name: "Cable crunch", sets: 3, reps: "15-20", rest: "60s", instructions: "Contracte fort les abdos" },
    ],
  },
};

export function generateWeeklyPlan(profile: UserProfile): DaySession[] {
  const equipment = profile.equipment === "full_gym" ? "gym" : "bodyweight";
  const isGain = profile.goal.includes("muscle_gain");

  const sessions: DaySession[] = [];

  // Use sessions_per_week if set, otherwise fall back to activity_level
  const sessionsCount = (profile as any).sessions_per_week
    ? parseInt((profile as any).sessions_per_week)
    : profile.activity_level === "sedentary" ? 2
    : profile.activity_level === "light" ? 3
    : profile.activity_level === "moderate" ? 4
    : 5;

  const TRAINING_DAYS_BY_COUNT: Record<number, number[]> = {
    2: [1, 4],
    3: [0, 2, 4],
    4: [0, 1, 3, 4],
    5: [0, 1, 2, 4, 5],
    6: [0, 1, 2, 3, 4, 5],
  };

  const trainingDays = TRAINING_DAYS_BY_COUNT[sessionsCount] || TRAINING_DAYS_BY_COUNT[3];

  const sessionTypes = isGain
    ? ["upper", "lower", "upper", "lower", "full"]
    : ["full", "cardio", "full", "cardio", "full"];

  let sessionIdx = 0;
  for (let i = 0; i < 7; i++) {
    if (!trainingDays.includes(i)) {
      sessions.push({ day: DAYS[i], title: "Repos actif", exercises: [], isRest: true });
      continue;
    }

    const type = sessionTypes[sessionIdx % sessionTypes.length];
    sessionIdx++;

    const exos = EXERCISES[equipment as keyof typeof EXERCISES];
    let exercises: Exercise[] = [];
    let title = "";

    if (type === "upper") {
      exercises = [...exos.upper, ...exos.core.slice(0, 1)];
      title = "Haut du corps";
    } else if (type === "lower") {
      exercises = [...exos.lower, ...exos.core.slice(0, 1)];
      title = "Bas du corps";
    } else if (type === "cardio") {
      exercises = [
        { name: "Cardio (course / vélo / corde)", sets: 1, reps: "30 min", rest: "—", instructions: "Zone 2 : tu peux encore parler" },
        ...exos.core,
      ];
      title = "Cardio & Core";
    } else {
      exercises = [...exos.upper.slice(0, 2), ...exos.lower.slice(0, 2), ...exos.core.slice(0, 1)];
      title = "Full body";
    }

    sessions.push({ day: DAYS[i], title, exercises, isRest: false });
  }

  return sessions;
}
