/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#13ec5b",
        "primary-dark": "#0ea841",
        "background-light": "#f6f8f6",
        "background-dark": "#102216",
        "surface-light": "#ffffff",
        "surface-dark": "#182c1f",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}