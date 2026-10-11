import { readFileSync } from "node:fs";
import { join } from "node:path";

import { formatNoteDate, getNote, noteSlugs } from "@/notes";
import { ImageResponse } from "next/og";

/**
 * The share card for a note.
 *
 * Without this every note falls back to the site-wide card, so each one
 * unfurls identically and says nothing about where the link goes. This carries
 * the title, which is the only thing somebody deciding whether to click needs.
 *
 * The furniture is the site's: white, the eyes, and the name set in Passenger
 * Serif, the same face and weight as a note's own heading. Nothing else is on
 * it. A description here would only repeat the <meta> one, which the unfurl
 * already prints underneath.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return noteSlugs().map((slug) => ({ slug }));
}

const font = (file: string) =>
  readFileSync(join(process.cwd(), "public/fonts", file));

/**
 * The mark from components/layout/Eyes, as a data URI.
 *
 * Satori renders an <img> more predictably than inline SVG, and the pupils sit
 * inside the eye openings at rest, so the clip paths the component needs for
 * its tracking animation can be dropped here.
 */
const EYES = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 35" fill="#111">
<path fill-rule="evenodd" d="M12.3138 15.4526C12.3138 18.1621 12.2715 21.4643 11.8481 24.8089C11.5518 27.1797 10.9591 29.4658 9.73132 31.5826C9.26562 32.3447 8.71526 33.0644 8.03788 33.6571C6.25977 35.1812 4.01597 35.1388 2.2802 33.5301C1.51815 32.8527 1.05246 32.006 0.713769 31.0746C0.29041 29.8468 0.121066 28.5344 0.0787304 27.222C-0.132949 22.3534 0.0787304 17.4847 0.756105 12.6584C1.01012 10.9227 1.34881 9.1869 1.94151 7.49347C2.36487 6.26572 2.91524 5.12265 3.67728 4.10659C4.43933 3.09053 5.41306 2.32848 6.68313 1.9898C7.27584 1.86279 7.8262 1.90512 8.41891 1.9898C10.0277 2.28615 10.9591 3.21754 11.4671 4.74163C11.9328 6.01171 12.1445 7.32412 12.1868 8.63653C12.2291 10.711 12.2715 12.7855 12.3138 15.4526ZM9.68898 12.9548C9.73132 12.7855 9.73132 12.6584 9.73132 12.5314C9.73132 11.219 9.77365 9.90661 9.73132 8.63653C9.68898 7.78982 9.56198 6.9431 9.43497 6.13872C9.3503 5.67302 9.09628 5.20733 8.92694 4.74163C8.58825 3.89491 7.36051 3.6409 6.6408 4.2336C6.13277 4.65696 5.70941 5.12265 5.45539 5.71536C5.07437 6.51974 4.73568 7.36646 4.48167 8.21318C3.84663 10.6263 3.55028 13.0818 3.3386 15.5373C3.12692 18.1198 2.99991 20.7446 2.91524 23.3694C2.83056 25.2322 2.8729 27.1373 3.12692 29.0001C3.21159 29.6775 3.38093 30.3549 3.67728 30.9899C4.524 32.5987 5.92109 32.768 7.06416 31.3709C7.57219 30.7782 7.86854 30.1008 8.12255 29.3811C8.58825 28.1111 8.84226 26.7986 9.01161 25.4862C9.09628 24.9359 9.13862 24.3855 9.18095 23.8351Z"/>
<path fill-rule="evenodd" d="M19.2992 23.2424C19.4685 19.9826 19.7226 16.6804 20.1459 13.4628C20.4423 11.346 20.6963 9.27157 21.1196 7.19711C21.3313 5.96936 21.7547 4.78396 22.178 3.59855C22.3897 2.92118 22.7707 2.28614 23.1518 1.69344C23.4481 1.27008 23.8291 0.93139 24.2525 0.592703C24.6759 0.21168 25.2262 0 25.7766 0C27.5547 0.0846718 29.2481 0.381023 30.2219 2.15913C30.7299 3.09052 31.1532 4.02191 31.3649 5.03797C31.7883 6.94309 32 8.89054 32 10.838C32 15.2833 31.6189 19.6862 30.4759 24.0045C30.0102 25.8249 29.3328 27.5183 28.2321 29.0001C27.6817 29.7198 27.089 30.3549 26.3693 30.9052C23.6175 32.9373 20.1882 31.0322 19.5532 28.3227C19.4262 27.6877 19.3415 27.0527 19.3415 26.4176C19.2992 25.4016 19.2992 24.3008 19.2992 23.2424ZM29.3328 12.4891C29.3751 12.1504 29.4175 11.9387 29.3751 11.727C29.2481 9.99128 29.2058 8.2555 28.9941 6.51973C28.9094 5.67301 28.6131 4.82629 28.3591 4.02191C28.1051 3.21753 27.47 2.66716 26.708 2.32848C26.2846 2.1168 25.9036 2.20147 25.6072 2.54015C25.3956 2.79417 25.1839 3.09052 25.0145 3.38687C24.7605 3.97958 24.5065 4.57228 24.3372 5.16498C23.8291 6.81608 23.5751 8.55186 23.3211 10.2876C22.8131 13.8862 22.3897 17.5271 22.178 21.168C22.051 23.0307 22.0087 24.9359 21.924 26.7986C21.924 27.222 21.9664 27.6877 22.0934 28.0687C22.5167 29.3811 23.9138 29.8045 25.0145 28.9578C25.2686 28.7884 25.5226 28.5344 25.6919 28.2804C26.0729 27.7724 26.454 27.2643 26.7503 26.6716C27.47 25.3169 27.851 23.8351 28.1897 22.311C28.2321 22.184 28.1897 22.057 28.1897 21.8877Z"/>
<path d="M9.18095 23.8351C8.58825 23.5388 7.99555 23.3271 7.48751 23.0307C5.75174 22.057 4.94736 20.5753 5.1167 18.5431C5.20138 17.3154 5.54006 16.1723 6.1751 15.0716C6.97948 13.8015 7.99555 12.9125 9.68898 12.9548Z"/>
<path d="M28.1897 21.8877C27.851 21.803 27.5547 21.7183 27.216 21.6337C26.5386 21.4643 25.9036 21.168 25.3532 20.7023C24.2948 19.8555 23.7868 18.7548 23.9138 17.4001C24.0408 15.749 24.8029 14.3519 26.0729 13.2511C26.835 12.6161 27.6817 12.2774 28.6978 12.3621C28.9094 12.4891 29.0788 12.4891 29.3328 12.4891Z"/>
</svg>`;

const EYES_URI = `data:image/svg+xml;base64,${Buffer.from(EYES).toString("base64")}`;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = await getNote(slug);
  const title = note?.meta.title ?? "Notes";
  const date = note ? formatNoteDate(note.meta.date) : "";

  // Two sizes rather than a measuring pass: Satori exposes no text metrics to
  // reflow against, and the break point only has to be about right.
  const titleSize = title.length > 46 ? 64 : 76;

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
          color: "#111",
          padding: "68px 72px",
          fontFamily: "Passenger Serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Helvetica",
              fontSize: "20px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#6b6b6b",
            }}
          >
            {date}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "30px",
              maxWidth: "960px",
              fontSize: `${titleSize}px`,
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
            }}
          >
            {title}
          </div>
        </div>

        {/* The lockup the old card ended on: mark, then the name in serif.
            Sized off the name — on the site the mark is about twice the height
            of the text it sits with. */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={EYES_URI} width={58} height={63} alt="" />
          <div style={{ marginLeft: "24px", fontSize: "38px" }}>
            Akshith Garapati
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Passenger Serif",
          data: font("PassengerSerif-Regular.otf"),
          style: "normal",
          weight: 400,
        },
        {
          // The pages set Helvetica, which Satori cannot reach and could not
          // ship anyway. Arimo is metric-compatible with it, so the date sets
          // at the same widths under an open licence.
          name: "Helvetica",
          data: font("Arimo-Regular.ttf"),
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
