import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#4489C6",
        secondaryColor:"#ffffff"
      },
      boxShadow:{

        cardShadow: "rgba(99, 99, 99, 0.6) 0px 2px 8px 0px"

      }
    },
  },
  plugins: [],
};
export default config;
