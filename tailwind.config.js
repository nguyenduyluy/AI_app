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
        primary: "#ee8c2b", // Warm Orange
        "primary-dark": "#d9771f",
        "background-light": "#FAF8F5", // Warm White/Beige
        "background-dark": "#221910", // Warm Black/Brown
        "surface-light": "#ffffff",
        "surface-dark": "#2c241b",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}