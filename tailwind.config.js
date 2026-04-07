/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        kraft: {
          50: "#fdfcfa",
          100: "#f9f6f0",
          200: "#f3ebe0",
          300: "#e8dcc8",
          400: "#d4c4a8",
          500: "#c4a882",
          600: "#a8875c",
          700: "#8a6d48",
          800: "#6d5639",
          900: "#5a472f",
        },
        charcoal: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#2d2d2d",
          950: "#1a1a1a",
        },
        // Couleurs officielles de la marque
        brand: {
          yellow: "#f5a623",
          navy: "#1e3a5f",
        },
        gold: "#f5a623",
        navy: "#1e2d3d",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        handwritten: ["Caveat", "cursive"],
        artisan: ["Cormorant Garamond", "Georgia", "serif"],
      },
      animation: {
        marquee: "marquee 60s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.33%)" },
        },
      },
    },
  },
  plugins: [],
};
