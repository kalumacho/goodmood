import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: "#E8724A",
          light: "#F08060",
          dark: "#C85A35",
          50: "#FEF3EF",
          100: "#FDE0D4",
        },
        navy: {
          DEFAULT: "#0D1B2A",
          50: "#F0F3F6",
          100: "#D6DEE7",
          200: "#A8BBCC",
        },
        sage: {
          DEFAULT: "#8BAF8B",
          dark: "#5C8A5C",
          light: "#B8D4B8",
        },
        // Sunset palette — mood soleil couchant
        sunset: {
          gold: "#F9C74F",
          amber: "#F4A259",
          rose: "#F48A8A",
          pink: "#E8719C",
          purple: "#9B5DE5",
          deep: "#D6355E",
        },
        ink: "#1A1A2A",
        cream: "#F8F8F8",
        paper: "#FFFDF9",
        panel: "#F2F0EC",
        impact: "#E8724A",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "DM Sans", "Inter", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        badge: "6px",
        panel: "4px",
      },
      boxShadow: {
        card: "0 2px 16px rgba(13,27,42,0.08), 0 0 0 1px rgba(13,27,42,0.06)",
        "card-hover": "0 8px 32px rgba(232,114,74,0.2), 0 0 0 2px rgba(232,114,74,0.3)",
        coral: "0 4px 24px rgba(232,114,74,0.35)",
        "coral-sm": "0 2px 12px rgba(232,114,74,0.25)",
        ink: "4px 4px 0px #0D1B2A",
        "ink-sm": "2px 2px 0px #0D1B2A",
        "ink-coral": "4px 4px 0px #E8724A",
        "ink-gold": "4px 4px 0px #F9C74F",
        sunset: "0 8px 30px -4px rgba(244, 138, 138, 0.5)",
        panel: "0 2px 8px rgba(13,27,42,0.1), inset 0 0 0 2px rgba(13,27,42,0.08)",
      },
      backgroundImage: {
        "speed-lines": "repeating-conic-gradient(from 0deg at 50% 120%, transparent 0deg, transparent 5deg, rgba(232,114,74,0.03) 5deg, rgba(232,114,74,0.03) 6deg)",
        "hero-paper": "radial-gradient(ellipse at 30% 0%, rgba(232,114,74,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(139,175,139,0.08) 0%, transparent 40%)",
        "panel-stripe": "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(13,27,42,0.02) 4px, rgba(13,27,42,0.02) 8px)",
        "coral-gradient": "linear-gradient(135deg, #E8724A, #C85A35)",
        "navy-gradient": "linear-gradient(135deg, #0D1B2A, #1E3A5F)",
        // Sunset gradients
        "sunset-sky": "linear-gradient(180deg, #FFE8D6 0%, #F9C74F 30%, #F4A259 55%, #E8719C 80%, #9B5DE5 100%)",
        "sunset-horizon": "linear-gradient(135deg, #F9C74F 0%, #F48A8A 50%, #9B5DE5 100%)",
        "sunset-soft": "linear-gradient(180deg, #FFFDF9 0%, #FEF3EF 40%, #FDE0D4 80%, #F4A259 100%)",
        "sunset-radial": "radial-gradient(ellipse at 50% 90%, #F9C74F 0%, #F48A8A 35%, #9B5DE5 70%, transparent 100%)",
        "sunset-fire": "linear-gradient(180deg, #F9C74F 0%, #E8724A 50%, #D6355E 100%)",
      },
      keyframes: {
        "slide-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "bounce-in": {
          "0%": { opacity: "0", transform: "scale(0.8) translateY(8px)" },
          "60%": { transform: "scale(1.05) translateY(-4px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "fist-pump": {
          "0%": { transform: "translateY(0) rotate(0deg)" },
          "30%": { transform: "translateY(-12px) rotate(-10deg)" },
          "60%": { transform: "translateY(-4px) rotate(5deg)" },
          "100%": { transform: "translateY(0) rotate(0deg)" },
        },
        "shake": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-8deg)" },
          "75%": { transform: "rotate(8deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "impact-pop": {
          "0%": { transform: "scale(0) rotate(-12deg)", opacity: "0" },
          "60%": { transform: "scale(1.15) rotate(3deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(-3deg)", opacity: "1" },
        },
        "fire": {
          "0%, 100%": { transform: "scaleY(1) scaleX(1)" },
          "33%": { transform: "scaleY(1.1) scaleX(0.95)" },
          "66%": { transform: "scaleY(0.95) scaleX(1.05)" },
        },
        "speed-flash": {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translateX(100%)" },
        },
        "pulse-coral": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(232,114,74,0)" },
          "50%": { boxShadow: "0 0 0 8px rgba(232,114,74,0.15)" },
        },
        "draw-line": {
          from: { strokeDashoffset: "1000" },
          to: { strokeDashoffset: "0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "flame-flicker": {
          "0%, 100%": { transform: "scale(1) rotate(-1deg)", filter: "brightness(1)" },
          "25%": { transform: "scale(1.06) rotate(2deg)", filter: "brightness(1.1)" },
          "50%": { transform: "scale(0.97) rotate(-2deg)", filter: "brightness(0.95)" },
          "75%": { transform: "scale(1.04) rotate(1deg)", filter: "brightness(1.15)" },
        },
        "xp-rise": {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.9)" },
          "30%": { opacity: "1", transform: "translateY(-4px) scale(1.05)" },
          "100%": { opacity: "0", transform: "translateY(-40px) scale(1)" },
        },
        "power-up": {
          "0%": { boxShadow: "0 0 0 0 rgba(249,199,79,0.7)" },
          "50%": { boxShadow: "0 0 0 20px rgba(249,199,79,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(249,199,79,0)" },
        },
        "sunset-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "level-up-pop": {
          "0%": { opacity: "0", transform: "scale(0.4) rotate(-15deg)" },
          "50%": { opacity: "1", transform: "scale(1.1) rotate(2deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.4s ease forwards",
        "bounce-in": "bounce-in 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "fist-pump": "fist-pump 0.6s ease forwards",
        "shake": "shake 0.4s ease-in-out",
        "float": "float 3s ease-in-out infinite",
        "impact-pop": "impact-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "fire": "fire 0.8s ease-in-out infinite",
        "speed-flash": "speed-flash 0.8s ease forwards",
        "pulse-coral": "pulse-coral 2s ease-in-out infinite",
        "draw-line": "draw-line 1s ease forwards",
        "spin-slow": "spin-slow 12s linear infinite",
        "flame-flicker": "flame-flicker 1.4s ease-in-out infinite",
        "xp-rise": "xp-rise 1.2s ease forwards",
        "power-up": "power-up 1.2s ease forwards",
        "sunset-pan": "sunset-pan 12s ease-in-out infinite",
        "level-up-pop": "level-up-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
