export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          age: number;
          gender: string;
          height: number;
          weight: number;
          goal: string[];
          activity_level: string;
          equipment: string;
          diet: string;
          wellness_focus: string[];
          sessions_per_week: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["user_profiles"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["user_profiles"]["Insert"]>;
      };
      workout_plans: {
        Row: {
          id: string;
          user_id: string;
          week_number: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["workout_plans"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["workout_plans"]["Insert"]>;
      };
      sessions: {
        Row: {
          id: string;
          plan_id: string;
          day: string;
          title: string;
          exercises: Json;
        };
        Insert: Omit<Database["public"]["Tables"]["sessions"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["sessions"]["Insert"]>;
      };
      completed_sessions: {
        Row: {
          id: string;
          user_id: string;
          session_id: string;
          completed_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["completed_sessions"]["Row"], "id" | "completed_at">;
        Update: Partial<Database["public"]["Tables"]["completed_sessions"]["Insert"]>;
      };
      nutrition_plans: {
        Row: {
          id: string;
          user_id: string;
          week_number: number;
          meals: Json;
          macros: Json;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["nutrition_plans"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["nutrition_plans"]["Insert"]>;
      };
      progress_logs: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          weight: number | null;
          measurements: Json | null;
          performance: Json | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["progress_logs"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["progress_logs"]["Insert"]>;
      };
      articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          category: string;
          content: string;
          cover_image: string | null;
          published_at: string;
          excerpt: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["articles"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["articles"]["Insert"]>;
      };
      messages: {
        Row: {
          id: string;
          user_id: string;
          coach_id: string | null;
          content: string;
          sent_at: string;
          is_read: boolean;
          sender: string;
        };
        Insert: Omit<Database["public"]["Tables"]["messages"]["Row"], "id" | "sent_at">;
        Update: Partial<Database["public"]["Tables"]["messages"]["Insert"]>;
      };
    };
  };
}

export type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"];
export type WorkoutPlan = Database["public"]["Tables"]["workout_plans"]["Row"];
export type Session = Database["public"]["Tables"]["sessions"]["Row"];
export type CompletedSession = Database["public"]["Tables"]["completed_sessions"]["Row"];
export type NutritionPlan = Database["public"]["Tables"]["nutrition_plans"]["Row"];
export type ProgressLog = Database["public"]["Tables"]["progress_logs"]["Row"];
export type Article = Database["public"]["Tables"]["articles"]["Row"];
export type Message = Database["public"]["Tables"]["messages"]["Row"];
