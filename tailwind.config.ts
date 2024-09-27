import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        vazir: ["Vazir"],
        tanha: ["tanha"],
      },
      keyframes: {
        popUp: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        fadeOut: {
          "0%": { opacity: " 1" },
          "100%": { opacity: " 0" },
        },
        count: {
          "0%": {
            opacity: "0",
            transform: "translateY(-40%) rotateY(-180deg)",
          },
          "100%": { opacity: "1", transform: "translateY(0) rotateY(0deg)" },
        },
      },
      animation: {
        popup: "popUp 0.5s ease-out",
        fadeOut: "fadeOut 0.25s ease-in",
        count: "count 1s ",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
