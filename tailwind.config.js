/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main_green: "#008080",
        c_gray: "#f0f0f0",
      },

      boxShadow: {
        card: "0 2px 4px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
