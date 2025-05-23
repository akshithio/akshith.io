import Navbar from "@/components/layout/Navbar";
import BlogPosts from "@/components/pages/writing/root/BlogPosts";
import MicroblogContent from "@/components/pages/writing/root/MicroblogContent";

export default function WholePage() {
  return (
    <div className="bg-a-white dark:bg-a-black h-screen w-screen overflow-x-hidden overflow-y-hidden p-6 transition-all duration-500 ease-in-out">
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
      <div className="flex h-full w-full flex-col sm:flex-row">
        <div className="h-1/4 w-full sm:h-full sm:w-1/4">
          <MicroblogContent />
        </div>
        <div className="h-3/4 w-full sm:h-full sm:w-3/4 sm:mt-0 mt-4">
          <BlogPosts />
        </div>
      </div>
    </div>
  );
}
