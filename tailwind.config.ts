import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  darkMode: "selector",
  theme: {
    extend: {
      gridTemplateColumns: {
        "24": "repeat(24, minmax(0, 1fr))",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      spacing: {
        "34": "8.5rem",
      },
    },
    colors: {
      aWhite: "#eee",
      aBlack: "#111",
    },
  },
  plugins: [],
} satisfies Config;
