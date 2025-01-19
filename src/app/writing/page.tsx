import Navbar from "@/components/layout/Navbar";
import Tooltip from "@/components/layout/Tooltip";
import BlogPosts from "@/components/pages/writing/root/BlogPosts";
import MicroblogContent from "@/components/pages/writing/root/MicroblogContent";
import FilterIcon from "@/icons/FilterIcon";
import RSSIcon from "@/icons/RSSIcon";
import { duplet, erika, passenger } from "@/utils/fonts";

export async function generateMetadata() {
  return {
    title: "Akshith Garapati | Writing",
    description:
      'A list of the "blog" posts that I write alongside the microblog I keep track of. Written and maintained by Akshith Garapati.',
    openGraph: {
      title: "Akshith Garapati | Writing",
      description:
        'A list of the "blog" posts that I write alongside the microblog I keep track of. Written and maintained by Akshith Garapati.',
      url: `https://akshith.io/writing/`,
      siteName: "Akshith Garapati",
    },
  };
}

export default function WritingPage() {
  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-hidden bg-aWhite p-6 dark:bg-aBlack">
      <Navbar />
      <div className="flex h-full w-full">
        <div className="scrollbar-hidden mt-[45px] h-[100%] w-[372px] overflow-y-scroll border-r-2 border-dotted border-r-[#999] pr-9">
          <div className="w-[336px] text-aBlack dark:text-aWhite">
            <h1 className={`${passenger.className} text-2xl italic `}>
              the ✨ microblog ✨
            </h1>
            <h1 className={`${erika.className} mt-1 w-[323px] text-sm`}>
              these are meant to be notes / drafts tweets / shower thoughts /
              whatever else tbh. inspired from{" "}
              <a
                href="https://udara.io/microblog"
                target="_blank"
                aria-label="Link to Udara Jay's personal website"
                className={`${duplet.className} font-semibold underline`}
              >
                udara.io
              </a>
            </h1>
          </div>

          <MicroblogContent />
        </div>

        <div className="ml-[65px] mt-6 text-aBlack dark:text-aWhite">
          <div className="relative mt-9 flex items-center">
            <div className="justify-start">
              <h1 className={`${passenger.className} text-2xl italic`}>
                writings.
              </h1>
            </div>

            <div className="absolute right-0 flex items-center justify-end">
              <Tooltip content="RSS Feed">
                <a href="/rss" target="_blank">
                  <RSSIcon src="/writing" />
                </a>
              </Tooltip>

              <div className="ml-4" />
              <Tooltip content="Filter Category">
                <FilterIcon />
              </Tooltip>
            </div>
          </div>

          <BlogPosts />
        </div>
      </div>
    </div>
  );
}
