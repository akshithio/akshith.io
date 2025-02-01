import Navbar from "@/components/layout/Navbar";
import Image from "next/image";

export async function generateMetadata() {
  return {
    title: "Akshith Garapati | Work",
    description:
      "A small showcasing of some of the work I've done - Akshith Garapati",
    openGraph: {
      title: "Akshith Garapati | Work",
      description:
        "A small showcasing of some of the work I've done - Akshith Garapati",
      url: `https://akshith.io/work/`,
      siteName: "Akshith Garapati",
    },
  };
}

export default function HomePage() {
  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-hidden bg-aWhite p-6 dark:bg-aBlack">
      <Navbar />
      <div className="flex h-full w-full items-center justify-center">
        <h1>make an exps page with source code and a way to tes t</h1>
        <Image
          src="/site/sobel_output.png"
          width={600}
          height={450}
          alt="background image of drawn gears"
        />
      </div>
    </div>
  );
}
