import FolderIcon from "@/icons/FolderIcon";
import LogoIcon from "@/icons/LogoIcon";
import { convertDate } from "@/utils/dates";
import { headers } from "next/headers";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const host = headers().get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const baseURL = `${protocol}://${host}`;

  const post = await fetch(
    `${baseURL}/api/posts?searchString=${params.slug}`,
  ).then((res) => res.json());

  try {
    const dupletSemiBold = await fetch(
      new URL("/public/fonts/Duplet-Semibold.otf", import.meta.url),
    ).then((res) => res.arrayBuffer());

    const passengerRegular = await fetch(
      new URL("/public/fonts/PassengerSerif-Regular.otf", import.meta.url),
    ).then((res) => res.arrayBuffer());

    const erikaRegular = await fetch(
      new URL("/public/fonts/ErikaHand-Regular.otf", import.meta.url),
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
            <FolderIcon />
            <h1
              style={{
                fontFamily: "Duplet",
                marginLeft: "6px",
                fontSize: "16px",
                fontWeight: 600,
                color: "#999",
              }}
            >
              {post.category}
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
            <LogoIcon type="opengraph" />
            <h1
              style={{
                fontFamily: "PassengerSerif",
                marginLeft: "16px",
                fontSize: "36px",
              }}
            >
              {post.title}
            </h1>
          </div>

          <h1
            style={{
              fontFamily: "ErikaHand",
              fontSize: "16px",
              fontWeight: 600,
              color: "#999",
              position: "absolute",
              bottom: "120px",
              left: "24px",
              marginLeft: "48px",
            }}
          >
            Written on {convertDate(post.date)}
          </h1>
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
          }}
        >
          Error generating image
        </div>
      ),
      { ...size },
    );
  }
}
