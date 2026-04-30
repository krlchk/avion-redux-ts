import defaultTheme from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

const config = {
  theme: {
    screens: {
      tablet: { min: "835px", max: "1279.99px" },
      mobile: { max: "834.99px" },
      xs: { max: "375.99px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans-loaded)", ...defaultTheme.fontFamily.sans],
        dm: ["var(--font-dm-sans-loaded)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
} satisfies Config;

export default config;
