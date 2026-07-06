import type { Config } from "tailwindcss";

// Bold flyer palette — sampled from the Realty Kings ad artwork
//   royal blue:  #0b5fd4   (primary brand — "COMPRAMOS CASAS CASH EN TODO PUERTO RICO")
//   trust green: #16a34a   (banners + checkmarks)
//   urgency red: #dc2626   (RECIBE DINERO RÁPIDO badge)
//   cash yellow: #f7b500   (the CASH lettering)
//   champagne gold: #C3A55A (RK crown crest / heritage only)

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#10192e",
          700: "#1b2942",
          800: "#111c33",
          900: "#0a1225",
        },
        brandblue: {
          DEFAULT: "#0b5fd4",
          light: "#2e7df0",
          dark: "#072a6b",
          ink: "#061d4d",
          50: "#eef4ff",
          100: "#d9e6ff",
          200: "#b3ccff",
          500: "#0b5fd4",
          600: "#0a52ba",
          700: "#083f8f",
          900: "#061d4d",
        },
        brandgreen: {
          DEFAULT: "#16a34a",
          light: "#22c55e",
          dark: "#0f7a37",
        },
        brandred: {
          DEFAULT: "#dc2626",
          dark: "#b91c1c",
        },
        cash: {
          DEFAULT: "#f7b500",
          light: "#ffcb2e",
        },
        gold: {
          DEFAULT: "#C3A55A",
          light: "#d8be7e",
          dark: "#8b6e36",
          100: "#f2ead0",
          200: "#e8d7a4",
          500: "#C3A55A",
          700: "#8b6e36",
        },
        cream: {
          DEFAULT: "#F4F6FB",
          light: "#ffffff",
          paper: "#eef2f9",
        },
      },
      fontFamily: {
        poster: ["Anton", "'Arial Narrow'", "sans-serif"],
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "blue-hero":
          "linear-gradient(135deg, #0b5fd4 0%, #083f8f 55%, #061d4d 100%)",
        "blue-deep":
          "radial-gradient(circle at 50% 30%, #0e63d8 0%, #072a6b 55%, #061d4d 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #ffcb2e 0%, #f7b500 50%, #d89a00 100%)",
        "hero-radial":
          "radial-gradient(circle at 50% 35%, #12203c 0%, #0a1225 60%, #060c18 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-gold": "pulseGold 2.2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(247, 181, 0, 0.55)" },
          "50%": { boxShadow: "0 0 0 18px rgba(247, 181, 0, 0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
