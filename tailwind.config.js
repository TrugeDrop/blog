/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  mode: "jit",
  theme: {
    extend: {
        screens: {
          'xs': '475px',
        },
    },
  },
  plugins: [],
};