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
        cream: "#F8F8F8",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "DM Sans", "Inter", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(13, 27, 42, 0.08)",
        "card-hover": "0 8px 40px rgba(13, 27, 42, 0.14)",
      },
    },
  },
  plugins: [],
};
export default config;
