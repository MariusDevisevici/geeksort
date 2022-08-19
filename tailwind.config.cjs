/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        brutalShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
      },
      fontFamily: {
        customFont: ["Nunito", "sans-serif"],
      },
      backgroundColor: {
        custom: "hsl(213,20%,11%)",
      },
      zIndex: {
        minusOne: "-1",
      },
    },
  },
  plugins: [],
};
