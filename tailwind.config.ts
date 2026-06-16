import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0d1a",
          50: "#f7f7f8",
          900: "#0a0d1a",
        },
        gold: {
          DEFAULT: "#c5a063",
          50: "#fbf7ee",
          100: "#f5e9cf",
          200: "#ead29c",
          300: "#dab86b",
          400: "#c5a063",
          500: "#a78145",
          600: "#856537",
          700: "#674e2c",
          800: "#4a3a26",
          900: "#332919",
        },
        silver: {
          DEFAULT: "#c8c8c8",
          50: "#f8f8f8",
          100: "#eaeaea",
          200: "#d8d8d8",
          300: "#c8c8c8",
          400: "#a0a0a0",
          500: "#787878",
          600: "#505050",
        },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #fbf7ee 0%, #c5a063 35%, #856537 70%, #c5a063 100%)",
        "silver-gradient": "linear-gradient(135deg, #f8f8f8 0%, #c8c8c8 50%, #787878 100%)",
        "hero-radial": "radial-gradient(circle at 50% 40%, #1a1e2e 0%, #0a0d1a 70%)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(197, 160, 99, 0.6)" },
          "50%": { boxShadow: "0 0 0 16px rgba(197, 160, 99, 0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
