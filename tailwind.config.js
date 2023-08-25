/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      height: {
        "screen-minus-header": "calc(100vh - 80px)",
      },
    },
  },
  plugins: [],
};
