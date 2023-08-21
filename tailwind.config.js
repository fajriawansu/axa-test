/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#6a4c48",
        "secondary": "#88706d",
        "tertiary": "#a69491",
        "quaternary": "#c3b7b6",
        "quinary": "#e1dbda"
      }
    },
  },
  plugins: [],
}

