import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import "katex/dist/katex.min.css";
import { ThemeProvider } from "next-themes";
import "prismjs/themes/prism-tomorrow.css";

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
    <html suppressHydrationWarning lang="en" className="overflow-x-clip">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="overflow-x-clip">
        <ThemeProvider attribute="class">{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
