/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        honey: ["honey"],
      },
      width: {
        120: "32rem",
      },
      height: {
        128: "32rem",
      },
      backgroundImage: {
        hex: "url('src/assets/images/pattern.svg')",
        "hex-dark": "url('src/assets/images/pattern-dark.svg')",
      },
      colors: {
        honey: "#f6e05e",
        "honey-dark": "#f6ad55",
      },
    },
    screens: {
      myxl: "1440px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
  darkMode: "class",
};
