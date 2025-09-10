/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
 theme: {
    extend: {
      colors: {
        primary: "#f97316",      // Orange
        secondary: "#ec4899",    // Pink
      },
    },
  },
  plugins: [],
};