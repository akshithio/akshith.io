import LogoIcon from "@/icons/LogoIcon";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  try {
    const dupletSemiBold = await fetch(
      new URL("/public/fonts/Duplet-Semibold.woff2", import.meta.url),
    ).then((res) => res.arrayBuffer());

    const passengerRegular = await fetch(
      new URL("/public/fonts/PassengerSerif-Regular.woff2", import.meta.url),
    ).then((res) => res.arrayBuffer());

    const erikaRegular = await fetch(
      new URL("/public/fonts/ErikaHand-Regular.woff2", import.meta.url),
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            position: "relative",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#eee",
            padding: "20px",
            borderRadius: "8px",
            color: "#111",
          }}
        >
          {/* Left header */}
          <div
            style={{
              display: "flex",
              position: "absolute",
              left: "48px",
              top: "24px",
            }}
          >
            <h1
              style={{
                fontFamily: "Duplet",
                fontSize: "24px",
                fontWeight: 600,
                marginLeft: "32px",
              }}
            >
              akshith.io
            </h1>
          </div>

          {/* Right header */}
          <div
            style={{
              position: "absolute",
              right: "64px",
              top: "24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                fontFamily: "ErikaHand",
                marginLeft: "6px",
                fontSize: "16px",
                fontWeight: 600,
                color: "#999",
              }}
            >
              /work
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              bottom: "64px",
              left: "24px",
              marginLeft: "48px",
            }}
          >
            <LogoIcon src="/[slug]/opengraph" />
            <h1
              style={{
                fontFamily: "PassengerSerif",
                marginLeft: "16px",
                fontSize: "36px",
              }}
            >
              Akshith Garapati |{" "}
              <span
                style={{
                  fontFamily: "ErikaHand",
                  fontWeight: 600,
                  marginLeft: "16px",
                  fontSize: "24px",
                }}
              >
                work
              </span>
            </h1>
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: "Duplet",
            data: dupletSemiBold,
            style: "normal",
            weight: 600,
          },
          {
            name: "PassengerSerif",
            data: passengerRegular,
            style: "normal",
            weight: 400,
          },
          {
            name: "ErikaHand",
            data: erikaRegular,
            style: "normal",
            weight: 400,
          },
        ],
      },
    );
  } catch (e) {
    console.error("Error generating image:", e);
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#eee",
            color: "#111",
            textDecoration: "underline",
          }}
        >
          akshith.io
        </div>
      ),
      { ...size },
    );
  }
}
