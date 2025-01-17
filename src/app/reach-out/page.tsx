import Navbar from "@/components/layout/Navbar";

export async function generateMetadata() {
  return {
    title: "Akshith Garapati | Reach Out",
    description: "Information & a form to reach out to me! - Akshith Garapati",
    openGraph: {
      title: "Akshith Garapati | Reach Out",
      description:
        "Information & a form to reach out to me! - Akshith Garapati",
      url: `https://akshith.io/reach-out/`,
      siteName: "Akshith Garapati",
    },
  };
}

export default function HomePage() {
  return (
    <div className="text-aBlack dark:bg-aBlack bg-aWhite dark:text-aWhite h-screen w-screen overflow-x-hidden overflow-y-hidden p-6">
      <Navbar />
    </div>
  );
}
