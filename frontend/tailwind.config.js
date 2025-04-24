/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      tablet: { max: "1279.99px" },
      mobile: { max: "834.99px" },
      xs: { max: "375.99px" },
    },
    extend: {
      fontFamily: {
        DMSans: ["DM Sans", "sans-serif"],
        Playfair: ["Playfair", "sans-serif"],
      },
      spacing: {
        80: "80px",
        50: "50px",
        40: "40px",
        24: "24px",
      },
    },
  },
  plugins: [],
};
