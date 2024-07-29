import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      margin: {
        '18': '4.5rem',  // Custom value
        '20': '5rem',    // Custom value
        '24': '6rem',    // Custom value
        '28': '7rem',    // Custom value
        '32': '8rem',    // Custom value
        '40': '10rem',   // Custom value
        '48': '12rem',   // Custom value
        '56': '14rem',   // Custom value
        '64': '16rem',   // Custom value
      },
    },
  },
  plugins: [],
};
export default config;
