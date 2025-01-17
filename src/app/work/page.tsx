import Navbar from "@/components/layout/Navbar";

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
    <div className="dark:bg-aBlack bg-aWhite h-screen w-screen overflow-x-hidden overflow-y-hidden p-6">
      <Navbar />
    </div>
  );
}
