/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F97316",   // orange (buttons, accents)
        secondary: "#4C1D95"  // purple (header bar)
      }
    },
  },
  plugins: [],
}
