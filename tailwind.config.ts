import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      spacing: {
        '34': '8.5rem'
      }
    },
    colors: {
      aWhite: "#eee",
      aBlack: "#111",
    },
  
  },
  plugins: [],
} satisfies Config;
