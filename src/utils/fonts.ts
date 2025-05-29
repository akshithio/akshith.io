import localFont from "next/font/local";

export const erika = localFont({
  src: [
    {
      path: "../../public/fonts/ErikaHand-Regular.woff2",
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
      path: "../../public/fonts/Bitscript-Regular.woff2",
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
      path: "../../public/fonts/Duplet-Bold.woff2",
      weight: "700",
      style: "regular",
    },
    {
      path: "../../public/fonts/Duplet-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/Duplet-Extrabold.woff2",
      weight: "800",
      style: "regular",
    },
    {
      path: "../../public/fonts/Duplet-ExtraboldItalic.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../public/fonts/Duplet-Extralight.woff2",
      weight: "200",
      style: "regular",
    },
    {
      path: "../../public/fonts/Duplet-ExtralightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/Duplet-Regular.woff2",
      weight: "400",
      style: "regular",
    },
    {
      path: "../../public/fonts/Duplet-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Duplet-Light.woff2",
      weight: "300",
      style: "regular",
    },
    {
      path: "../../public/fonts/Duplet-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/Duplet-Semibold.woff2",
      weight: "600",
      style: "regular",
    },
    {
      path: "../../public/fonts/Duplet-SemiboldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/Duplet-Thin.woff2",
      weight: "100",
      style: "regular",
    },
    {
      path: "../../public/fonts/Duplet-ThinItalic.woff2",
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
      path: "../../public/fonts/PassengerSerif-Bold.woff2",
      weight: "700",
      style: "regular",
    },
    {
      path: "../../public/fonts/PassengerSerif-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/PassengerSerif-Extrabold.woff2",
      weight: "800",
      style: "regular",
    },
    {
      path: "../../public/fonts/PassengerSerif-ExtraboldItalic.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../public/fonts/PassengerSerif-Extralight.woff2",
      weight: "200",
      style: "regular",
    },
    {
      path: "../../public/fonts/PassengerSerif-ExtralightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/PassengerSerif-Regular.woff2",
      weight: "400",
      style: "regular",
    },
    {
      path: "../../public/fonts/PassengerSerifItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/PassengerSerif-Light.woff2",
      weight: "300",
      style: "regular",
    },
    {
      path: "../../public/fonts/PassengerSerif-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/PassengerSerif-Semibold.woff2",
      weight: "600",
      style: "regular",
    },
    {
      path: "../../public/fonts/PassengerSerif-SemiboldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/PassengerSerif-Medium.woff2",
      weight: "500",
      style: "regular",
    },
    {
      path: "../../public/fonts/PassengerSerif-MediumItalic.woff2",
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
          path: "../../public/fonts/Duplet-Regular.woff2",
        },
        {
          weight: "600",
          style: "regular",
          path: "../../public/fonts/Duplet-Semibold.woff2",
        },
      ],
    },
    {
      name: "PassengerSerif",
      weights: [
        {
          weight: "400",
          style: "regular",
          path: "../../public/fonts/PassengerSerif-Regular.woff2",
        },
        {
          weight: "600",
          style: "regular",
          path: "../../public/fonts/PassengerSerif-Semibold.woff2",
        },
      ],
    },
    {
      name: "ErikaHand",
      weights: [
        {
          weight: "400",
          style: "regular",
          path: "../../public/fonts/ErikaHand-Regular.woff2",
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