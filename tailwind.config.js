module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        krona: ["Krona One"],
        nunito: ["Nunito"],
        lexend: ["Lexend"],
        hind: ["Hind"],
      },
      animation: {
        cursor: "cursor .6s linear infinite alternate",
        type: "type 2.3s ease-out .8s 1 normal both",
      },
      keyframes: {
        type: {
          "0%": { transform: "translateX(100ch)" },
          "5%, 10%": { transform: "translateX(1ch)" },
          "15%, 20%": { transform: "translateX(1.75ch)" },
          "25%, 30%": { transform: "translateX(2.65ch)" },
          "35%, 40%": { transform: "translateX(3.5ch)" },
          "45%, 50%": { transform: "translateX(3.9ch)" },
          "55%, 60%": { transform: "translateX(4.5ch)" },
          "65%, 70%": { transform: "translateX(5.3ch)" },
          "75%, 80%": { transform: "translateX(5.7ch)" },
          "85%, 90%": { transform: "translateX(6.55ch)" },
          "95%, 100%": { transform: "translateX(7.45ch)" },
        },
      },
    },
  },
  plugins: [],
};
