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
        discord: "hsl(230,91%,86%)",
      },
      zIndex: {
        minusOne: "-1",
      },
      textColor: {
        discord: "hsl(230,91%,86%)",
      },
      fontSize: {
        extraSmall: "10px",
      },
    },
  },
  plugins: [],
};
