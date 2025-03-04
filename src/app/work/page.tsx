import Navbar from "@/components/layout/Navbar";
import WorkSection from "@/components/pages/work/WorkSection";

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

export default function WorkPage() {
  return (
    <div className="relative h-screen w-screen overflow-x-hidden overflow-y-hidden bg-aWhite p-6 text-aBlack dark:bg-aBlack dark:text-aWhite">
      <Navbar />
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          backgroundImage: `
      linear-gradient(to right, rgba(17, 17, 17, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(17, 17, 17, 0.05) 1px, transparent 1px)
    `,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0",
          pointerEvents: "none",
        }}
      />
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          backgroundImage: `
      linear-gradient(to right, rgba(238, 238, 238, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(238, 238, 238, 0.05) 1px, transparent 1px)
    `,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0",
          pointerEvents: "none",
        }}
      />

      <div className="relative flex h-full w-full flex-col justify-center">
        <div className="relative z-10">
          <WorkSection />
        </div>
      </div>
    </div>
  );
}
