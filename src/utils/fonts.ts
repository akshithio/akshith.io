import localFont from "next/font/local";

export const erika = localFont({
  src: [
    {
      path: "../../public/fonts/ErikaHand-Regular.otf",
      weight: "400",
      style: "regular",
    },
  ],
  variable: "--font-erika",
  display: "swap",
});

export const bitscript = localFont({
  src: [
    {
      path: "../../public/fonts/Bitscript-Regular.otf",
      weight: "400",
      style: "regular",
    },
  ],
  variable: "--font-bitscript",
  display: "swap",
});

export const duplet = localFont({
  src: [
    {
      path: "../../public/fonts/Duplet-Bold.otf",
      weight: "700",
      style: "regular",
    },
    {
      path: "../../public/fonts/Duplet-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/Duplet-Extrabold.otf",
      weight: "800",
      style: "regular",
    },
    {
      path: "../../public/fonts/Duplet-ExtraboldItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../public/fonts/Duplet-Extralight.otf",
      weight: "200",
      style: "regular",
    },
    {
      path: "../../public/fonts/Duplet-ExtralightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/Duplet-Regular.otf",
      weight: "400",
      style: "regular",
    },
    {
      path: "../../public/fonts/Duplet-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Duplet-Light.otf",
      weight: "300",
      style: "regular",
    },
    {
      path: "../../public/fonts/Duplet-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/Duplet-Semibold.otf",
      weight: "600",
      style: "regular",
    },
    {
      path: "../../public/fonts/Duplet-SemiboldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/Duplet-Thin.otf",
      weight: "100",
      style: "regular",
    },
    {
      path: "../../public/fonts/Duplet-ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
  ],
  variable: "--font-duplet",
  display: "swap",
});

export const passenger = localFont({
  src: [
    {
      path: "../../public/fonts/PassengerSerif-Bold.otf",
      weight: "700",
      style: "regular",
    },
    {
      path: "../../public/fonts/PassengerSerif-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/PassengerSerif-Extrabold.otf",
      weight: "800",
      style: "regular",
    },
    {
      path: "../../public/fonts/PassengerSerif-ExtraboldItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../public/fonts/PassengerSerif-Extralight.otf",
      weight: "200",
      style: "regular",
    },
    {
      path: "../../public/fonts/PassengerSerif-ExtralightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/PassengerSerif-Regular.otf",
      weight: "400",
      style: "regular",
    },
    {
      path: "../../public/fonts/PassengerSerifItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/PassengerSerif-Light.otf",
      weight: "300",
      style: "regular",
    },
    {
      path: "../../public/fonts/PassengerSerif-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/PassengerSerif-Semibold.otf",
      weight: "600",
      style: "regular",
    },
    {
      path: "../../public/fonts/PassengerSerif-SemiboldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/PassengerSerif-Medium.otf",
      weight: "500",
      style: "regular",
    },
    {
      path: "../../public/fonts/PassengerSerif-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-passenger",
  display: "swap",
});

export async function loadFontsForOG() {
  const fonts = [
    {
      name: "Duplet",
      weights: [
        {
          weight: "400",
          style: "regular",
          path: "../../public/fonts/Duplet-Regular.otf",
        },
        {
          weight: "600",
          style: "regular",
          path: "../../public/fonts/Duplet-Semibold.otf",
        },
      ],
    },
    {
      name: "PassengerSerif",
      weights: [
        {
          weight: "400",
          style: "regular",
          path: "../../public/fonts/PassengerSerif-Regular.otf",
        },
        {
          weight: "600",
          style: "regular",
          path: "../../public/fonts/PassengerSerif-Semibold.otf",
        },
      ],
    },
    {
      name: "ErikaHand",
      weights: [
        {
          weight: "400",
          style: "regular",
          path: "../../public/fonts/ErikaHand-Regular.otf",
        },
      ],
    },
  ];

  const loadedFonts = await Promise.all(
    fonts.flatMap((font) =>
      font.weights.map(async (weight) => ({
        name: font.name,
        data: await fetch(new URL(weight.path, import.meta.url)).then((res) =>
          res.arrayBuffer(),
        ),
        weight: weight.weight,
        style: weight.style,
      })),
    ),
  );

  return loadedFonts;
}