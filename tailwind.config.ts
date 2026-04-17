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
        // GoodMood Shonen palette — white base, coral accent, navy contrast
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
        ink: "#1A1A2A",          // trait de manga
        cream: "#F8F8F8",         // fond blanc chaud
        paper: "#FFFDF9",         // fond page manga
        panel: "#F2F0EC",         // fond case manga
        impact: "#E8724A",        // couleur impact text
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
        panel: "0 2px 8px rgba(13,27,42,0.1), inset 0 0 0 2px rgba(13,27,42,0.08)",
      },
      backgroundImage: {
        "speed-lines": "repeating-conic-gradient(from 0deg at 50% 120%, transparent 0deg, transparent 5deg, rgba(232,114,74,0.03) 5deg, rgba(232,114,74,0.03) 6deg)",
        "hero-paper": "radial-gradient(ellipse at 30% 0%, rgba(232,114,74,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(139,175,139,0.08) 0%, transparent 40%)",
        "panel-stripe": "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(13,27,42,0.02) 4px, rgba(13,27,42,0.02) 8px)",
        "coral-gradient": "linear-gradient(135deg, #E8724A, #C85A35)",
        "navy-gradient": "linear-gradient(135deg, #0D1B2A, #1E3A5F)",
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
      },
    },
  },
  plugins: [],
};
export default config;
