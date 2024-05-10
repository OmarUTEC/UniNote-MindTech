// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        "cach-l1": "#fffbfc",
        "cach-l2": "#819FF7 ",
        "cach-l3": "#D8D8D8",
        "cach-l4": "#1C1C1C",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
