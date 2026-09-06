import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const LINK_BLUE = "#0864c7";
const BODY = "#333";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          color: BODY,
          padding: "76px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            maxWidth: "900px",
            fontSize: "40px",
            lineHeight: 1.45,
          }}
        >
          I study computer science at Purdue and spend most of my time tinkering
          with the web, machine intelligence, and performant systems.
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "30px", fontWeight: 600, color: "#000" }}>
            Akshith Garapati
          </div>
          <div
            style={{
              marginTop: "10px",
              fontSize: "30px",
              color: LINK_BLUE,
              textDecoration: "underline",
            }}
          >
            akshith.io
          </div>
        </div>
      </div>
    ),
    size,
  );
}
