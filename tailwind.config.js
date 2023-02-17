/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        honey: ["honey"]
      },
      colors: {
        'honey': '#f6e05e',
        'honey-dark': '#f6ad55'
      },
      backgroundImage: {
        'hex': "url('src/assets/images/pattern.svg')",
        'hex-dark': "url('src/assets/images/pattern-dark.svg')"
      }
    },
  },
  plugins: [],
  darkMode: 'class'
};
