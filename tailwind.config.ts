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
        navy: {
          DEFAULT: "#0D1B2A",
          50: "#1a2d42",
          100: "#0D1B2A",
          900: "#081220",
        },
        sage: {
          DEFAULT: "#8BAF8B",
          light: "#a8c5a8",
          dark: "#6a8f6a",
        },
        coral: {
          DEFAULT: "#E8724A",
          light: "#f08c6a",
          dark: "#c85c38",
        },
        sand: {
          DEFAULT: "#F4E4CF",
          dark: "#E2CDAE",
        },
        cream: "#F8F8F8",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "DM Sans", "Inter", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        "card-lg": "24px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(13, 27, 42, 0.08)",
        "card-hover": "0 12px 40px rgba(13, 27, 42, 0.14)",
        "card-soft": "0 2px 10px rgba(13, 27, 42, 0.04)",
        glow: "0 0 0 6px rgba(232, 114, 74, 0.15)",
        "glow-sage": "0 0 0 6px rgba(139, 175, 139, 0.18)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease forwards",
        "slide-up": "slide-up 0.6s ease forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, #0D1B2A 0%, #1a2d42 50%, #0D1B2A 100%)",
        "gradient-coral": "linear-gradient(135deg, #E8724A 0%, #f08c6a 100%)",
        "gradient-sage": "linear-gradient(135deg, #8BAF8B 0%, #a8c5a8 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
