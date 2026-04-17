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
        // Naruto palette
        void: "#050508",        // fond noir absolu
        shadow: "#0D0D14",      // fond cards
        "shadow-light": "#13131F",
        "shadow-mid": "#1A1A2E",
        orange: {
          DEFAULT: "#FF6B00",   // orange Naruto
          light: "#FF8C3A",
          dark: "#CC5500",
          glow: "#FF6B0033",
        },
        red: {
          DEFAULT: "#CC0000",   // rouge sang
          light: "#FF2222",
          dark: "#990000",
        },
        chakra: {
          DEFAULT: "#FFD700",   // jaune chakra
          light: "#FFE840",
          dark: "#CCB000",
        },
        blue: {
          DEFAULT: "#0066FF",   // bleu Sasuke
          light: "#3388FF",
          dark: "#0044CC",
        },
        white: "#F0F0F0",
        "white-dim": "#A0A0B0",
        // compatibility aliases
        navy: "#050508",
        coral: "#FF6B00",
        sage: "#FFD700",
        cream: "#0D0D14",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "DM Sans", "Inter", "sans-serif"],
        ninja: ["var(--font-dm-sans)", "sans-serif"],
      },
      borderRadius: {
        card: "4px",            // angulaire style manga
        badge: "2px",
      },
      boxShadow: {
        card: "0 0 0 1px rgba(255,107,0,0.15), 0 4px 24px rgba(0,0,0,0.6)",
        "card-hover": "0 0 20px rgba(255,107,0,0.3), 0 0 0 1px rgba(255,107,0,0.4)",
        orange: "0 0 30px rgba(255,107,0,0.5)",
        chakra: "0 0 20px rgba(255,215,0,0.4)",
        red: "0 0 20px rgba(204,0,0,0.5)",
      },
      backgroundImage: {
        "hero-pattern": "radial-gradient(ellipse at 20% 50%, rgba(255,107,0,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(204,0,0,0.1) 0%, transparent 50%), linear-gradient(180deg, #050508 0%, #0D0D14 100%)",
        "chakra-gradient": "linear-gradient(135deg, #FF6B00, #CC0000)",
        "card-gradient": "linear-gradient(135deg, #13131F, #0D0D14)",
        "orange-gradient": "linear-gradient(135deg, #FF6B00, #CC5500)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        pulse_orange: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(255,107,0,0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(255,107,0,0.8)" },
        },
        slide_up: {
          "from": { opacity: "0", transform: "translateY(20px)" },
          "to": { opacity: "1", transform: "translateY(0)" },
        },
        charge: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        flicker: "flicker 3s ease-in-out infinite",
        pulse_orange: "pulse_orange 2s ease-in-out infinite",
        slide_up: "slide_up 0.4s ease forwards",
        charge: "charge 1s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;
