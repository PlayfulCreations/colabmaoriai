/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#14532d", // Māori-inspired green
        accent: "#b91c1c"   // Māori-inspired red
      }
    }
  },
  plugins: []
};
