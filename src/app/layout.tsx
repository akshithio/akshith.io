import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Akshith Garapati",
  description: "Akshith Garapati's Personal Website",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://akshith.io",
  ),
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className="overflow-x-clip [color-scheme:light]"
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="darkreader-lock" content="" />
      </head>
      <body className="overflow-x-clip bg-white font-sans text-[12.6px] text-black selection:bg-[rgba(8,100,199,0.14)]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
