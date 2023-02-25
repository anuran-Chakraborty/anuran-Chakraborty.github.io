/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Charter"],
        heading: ["Martel Sans"],
        author: ["sans"],
        date: ["Martel Sans"]
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
