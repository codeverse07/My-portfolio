import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          orange: "#FF6B35",
          peach: "#F7C59F",
          sun: "#FF9F1C",
          cyan: "#00f0ff",
          purple: "#8a2be2",
          sky: "#38bdf8",
        },
        card: "var(--card)",
      },
      animation: {
        "border-glow": "border-glow 3s ease-in-out infinite",
        "fade-in": "fade-in 1s ease-out forwards",
        "mesh-flow": "mesh-flow 15s ease infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "scan": "scan 2s linear infinite",
        "rotate-fluid": "rotateFluid 30s linear infinite",
      },
      keyframes: {
        "border-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "mesh-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".8", transform: "scale(1.05)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "scan": {
          "0%": { top: "0%" },
          "100%": { top: "100%" },
        },
        rotateFluid: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        }
      },
      boxShadow: {
        "glow-orange": "0 0 20px rgba(255, 107, 53, 0.5)",
        "glow-peach": "0 0 20px rgba(247, 197, 159, 0.5)",
        "glow-sun": "0 0 20px rgba(255, 159, 28, 0.5)",
        "neon": "0 0 10px theme('colors.accent.orange'), 0 0 20px theme('colors.accent.peach')",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.05)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
