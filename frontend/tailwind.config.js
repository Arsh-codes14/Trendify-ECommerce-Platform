/** @type {import('tailwindcss').Config} */
export default {
  // Paths are resolved relative to this file
  content: { relative: true, files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"] },
  theme: {
    extend: {
      // INFO: "Candy Pop" theme - grape ink on vanilla cream with pastel candy colours
      colors: {
        cream: "#FFF7EC",
        ink: "#2D1B3D",
        bubble: { DEFAULT: "#FF6FAE", light: "#FFE1EE", dark: "#E04E8F" },
        lemon: { DEFAULT: "#FFD84D", light: "#FFF3C4" },
        mint: { DEFAULT: "#7FE3C4", light: "#DDF8EF" },
        lilac: { DEFAULT: "#C3B1FF", light: "#EEE8FF" },
        peach: { DEFAULT: "#FFB38A", light: "#FFE9DC" },
        sky: { DEFAULT: "#9AD7FF", light: "#E3F4FF" },
      },
      fontFamily: {
        sans: ["Nunito", "system-ui", "sans-serif"],
        display: ["Fredoka", "Nunito", "sans-serif"],
        hand: ["Caveat", "cursive"],
      },
      // Hard offset "sticker" shadows
      boxShadow: {
        "pop-sm": "2px 2px 0 0 #2D1B3D",
        pop: "4px 4px 0 0 #2D1B3D",
        "pop-lg": "7px 7px 0 0 #2D1B3D",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        wiggle: { "0%, 100%": { transform: "rotate(-3deg)" }, "50%": { transform: "rotate(3deg)" } },
        pop: { "0%": { transform: "scale(1)" }, "40%": { transform: "scale(1.35)" }, "100%": { transform: "scale(1)" } },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        float: "float 4s ease-in-out infinite",
        wiggle: "wiggle 2.5s ease-in-out infinite",
        "spin-slow": "spin 14s linear infinite",
        pop: "pop 0.35s ease-out",
      },
    },
  },
  plugins: [],
};
