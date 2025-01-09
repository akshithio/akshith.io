import { convertDate } from "@/utils/dates";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getPost } from "./page";

const FolderIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.7139 4.95915C14.1832 5.46811 13.7171 6.16668 13.0248 6.16668H2.33325C1.78097 6.16668 1.33325 5.71896 1.33325 5.16668V4.28001C1.33325 2.65334 2.65325 1.33334 4.27992 1.33334H5.82659C6.91325 1.33334 7.25325 1.68668 7.68659 2.26668L8.61992 3.50668C8.82659 3.78001 8.85325 3.81334 9.23992 3.81334H11.0999C12.1329 3.81334 13.064 4.2543 13.7139 4.95915Z"
      fill="#999999"
    />
    <path
      d="M13.6566 7.16649C14.2076 7.16648 14.6548 7.61213 14.6566 8.1631L14.6666 11.1C14.6666 13.0667 13.0666 14.6667 11.0999 14.6667H4.89992C2.93325 14.6667 1.33325 13.0667 1.33325 11.1V8.16664C1.33325 7.61436 1.78096 7.16665 2.33324 7.16664L13.6566 7.16649Z"
      fill="#999999"
    />
  </svg>
);

const LogoIcon = () => (
  <svg
    width="29"
    height="31.5"
    viewBox="0 0 58 63"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.1649 27.8147C22.1649 32.6918 22.0887 38.6357 21.3266 44.6559C20.7932 48.9234 19.7263 53.0384 17.5164 56.8487C16.6781 58.2203 15.6875 59.5158 14.4682 60.5827C11.2676 63.326 7.22875 63.2498 4.10436 60.3541C2.73267 59.1348 1.89442 57.6107 1.28478 55.9342C0.522738 53.7243 0.217919 51.3619 0.141715 48.9996C-0.239308 40.236 0.141715 31.4725 1.36099 22.7852C1.81822 19.6608 2.42785 16.5364 3.49472 13.4882C4.25677 11.2783 5.24743 9.22075 6.61911 7.39183C7.99079 5.56292 9.7435 4.19124 12.0296 3.5816C13.0965 3.35299 14.0872 3.42919 15.154 3.5816C18.0498 4.11503 19.7263 5.79154 20.6408 8.5349C21.479 10.821 21.86 13.1834 21.9362 15.5457C22.0124 19.2798 22.0887 23.0138 22.1649 27.8147ZM17.4402 23.3186C17.5164 23.0138 17.5164 22.7852 17.5164 22.5566C17.5164 20.1942 17.5926 17.8319 17.5164 15.5457C17.4402 14.0216 17.2116 12.4975 16.9829 11.0497C16.8305 10.2114 16.3733 9.37316 16.0685 8.5349C15.4588 7.01081 13.2489 6.55358 11.9534 7.62045C11.039 8.3825 10.2769 9.22075 9.81971 10.2876C9.13386 11.7355 8.52423 13.2596 8.067 14.7837C6.92393 19.1274 6.3905 23.5472 6.00947 27.9671C5.62845 32.6156 5.39984 37.3403 5.24743 42.0649C5.09502 45.418 5.17122 48.8472 5.62845 52.2002C5.78086 53.4194 6.08568 54.6387 6.61911 55.7818C8.1432 58.6776 10.658 58.9824 12.7155 56.4676C13.6299 55.4008 14.1634 54.1815 14.6206 52.886C15.4588 50.5999 15.9161 48.2375 16.2209 45.8752C16.3733 44.8845 16.4495 43.8939 16.5257 42.9032C15.4588 42.3698 14.392 41.9887 13.4775 41.4553C10.3531 39.7026 8.90525 37.0354 9.21007 33.3776C9.36248 31.1677 9.97211 29.1102 11.1152 27.1288C12.5631 24.8427 14.392 23.2424 17.4402 23.3186Z"
      fill="black"
    />
    <path
      d="M34.7383 41.8364C35.0431 35.9686 35.5003 30.0246 36.2624 24.2331C36.7958 20.4228 37.253 16.6888 38.0151 12.9548C38.3961 10.7449 39.1581 8.61113 39.9202 6.4774C40.3012 5.25812 40.9871 4.11505 41.6729 3.04819C42.2063 2.28614 42.8922 1.6765 43.6542 1.06687C44.4163 0.381023 45.4069 0 46.3976 0C49.5982 0.152409 52.6464 0.685842 54.3991 3.88644C55.3135 5.56294 56.0756 7.23944 56.4566 9.06835C57.2186 12.4976 57.5997 16.003 57.5997 19.5084C57.5997 27.5099 56.9138 35.4352 54.8563 43.208C54.0181 46.4848 52.7988 49.533 50.8175 52.2002C49.8268 53.4957 48.7599 54.6387 47.4645 55.6294C42.5112 59.2872 36.3386 55.858 35.1955 50.9809C34.9669 49.8378 34.8145 48.6948 34.8145 47.5517C34.7383 45.7228 34.7383 43.7415 34.7383 41.8364ZM52.7988 22.4804C52.875 21.8707 52.9512 21.4897 52.875 21.1087C52.6464 17.9843 52.5702 14.8599 52.1891 11.7355C52.0367 10.2114 51.5033 8.68733 51.0461 7.23944C50.5888 5.79155 49.4458 4.80089 48.0741 4.19126C47.312 3.81023 46.6262 3.96264 46.0928 4.57228C45.7117 5.02951 45.3307 5.56294 45.0259 6.09637C44.5687 7.16324 44.1115 8.2301 43.8066 9.29697C42.8922 12.2689 42.4349 15.3933 41.9777 18.5177C41.0633 24.9951 40.3012 31.5487 39.9202 38.1023C39.6916 41.4553 39.6154 44.8845 39.463 48.2375C39.463 48.9996 39.5392 49.8378 39.7678 50.5237C40.5298 52.886 43.0446 53.6481 45.0259 52.124C45.4831 51.8192 45.9404 51.3619 46.2452 50.9047C46.931 49.9903 47.6169 49.0758 48.1503 48.0089C49.4458 45.5704 50.1316 42.9032 50.7413 40.1599C50.8175 39.9312 50.7413 39.7026 50.7413 39.3978C50.1316 39.2454 49.5982 39.093 48.9885 38.9406C47.7693 38.6358 46.6262 38.1023 45.6355 37.2641C43.7304 35.74 42.816 33.7587 43.0446 31.3201C43.2732 28.3481 44.6449 25.8334 46.931 23.8521C48.3027 22.709 49.8268 22.0993 51.6557 22.2518C52.0367 22.4804 52.3416 22.4804 52.7988 22.4804Z"
      fill="black"
    />
  </svg>
);

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.pathname.split("/").pop();

    if (!slug) {
      return new Response("Slug not found", { status: 400 });
    }

    // Load fonts from public directory
    const dupletSemiBold = await fetch(
      new URL("../../../../public/fonts/Duplet-Semibold.otf", import.meta.url),
    ).then((res) => res.arrayBuffer());

    const passengerRegular = await fetch(
      new URL(
        "../../../../public/fonts/PassengerSerif-Regular.otf",
        import.meta.url,
      ),
    ).then((res) => res.arrayBuffer());

    const erikaRegular = await fetch(
      new URL(
        "../../../../public/fonts/ErikaHand-Regular.otf",
        import.meta.url,
      ),
    ).then((res) => res.arrayBuffer());

    const { frontMatter } = await getPost(slug);

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
          {/* Header */}
          <div
            style={{
              position: "absolute",
              left: "16px",
              top: "16px",
              fontSize: "24px",
              fontWeight: 600,
              fontFamily: "Duplet",
            }}
          >
            akshith.io
          </div>

          {/* Category */}
          <div
            style={{
              position: "absolute",
              right: "16px",
              top: "16px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <FolderIcon />
            <span
              style={{
                color: "#999",
                fontSize: "16px",
                fontWeight: 600,
                fontFamily: "Duplet",
              }}
            >
              {frontMatter.category}
            </span>
          </div>

          {/* Main Content */}
          <div
            style={{
              position: "absolute",
              bottom: "32px",
              left: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <LogoIcon />
              <h1
                style={{
                  fontSize: "36px",
                  fontFamily: "PassengerSerif",
                }}
              >
                {frontMatter.title}
              </h1>
            </div>
            <div
              style={{
                color: "#999",
                fontSize: "16px",
                fontWeight: 600,
                fontFamily: "ErikaHand",
              }}
            >
              Written on {convertDate(frontMatter.date)}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Duplet",
            data: dupletSemiBold,
            weight: 600,
            style: "normal",
          },
          {
            name: "PassengerSerif",
            data: passengerRegular,
            weight: 400,
            style: "normal",
          },
          {
            name: "ErikaHand",
            data: erikaRegular,
            weight: 400,
            style: "normal",
          },
        ],
      },
    );
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Error generating image", { status: 500 });
  }
}

// Helper function to load fonts
async function loadFont(fontName: string) {
  try {
    return await fetch(
      new URL(`../../helpers/fonts/${fontName}.ttf`, import.meta.url),
    ).then((res) => res.arrayBuffer());
  } catch (error) {
    console.error(`Error loading font ${fontName}:`, error);
    throw error;
  }
}
