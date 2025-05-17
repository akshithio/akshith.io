"use client";

import Navbar from "@/components/layout/Navbar";
import Tooltip from "@/components/layout/Tooltip";
import BlogPosts from "@/components/pages/writing/root/BlogPosts";
import FilterSearch from "@/components/pages/writing/root/FilterSearch";
import MicroblogContent from "@/components/pages/writing/root/MicroblogContent";
import FilterIcon from "@/icons/FilterIcon";
import RSSIcon from "@/icons/RSSIcon";
import { duplet, erika, passenger } from "@/utils/fonts";
import { useState } from "react";

export default function WholePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (selectedCategories: string[]) => {
    setSelectedCategories(selectedCategories);
  };

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
      <div className="flex h-full w-full">
        <div className="scrollbar-hidden mt-[2.813rem] h-full w-94 overflow-y-scroll border-r-2 border-dotted border-r-[#999] pr-9">
          <div className="text-a-black dark:text-a-white w-84">
            <h1 className={`${passenger.className} text-2xl italic`}>
              the ✨ microblog ✨
            </h1>
            <h1 className={`${erika.className} mt-1 w-80.5 text-sm`}>
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

        <div className="text-a-black dark:text-a-white mt-6 ml-[4.063rem]">
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
              <div className="flex items-center justify-center">
                <FilterSearch onCategoryChange={handleCategoryChange}>
                  <Tooltip content="Filter Category">
                    <FilterIcon />
                  </Tooltip>
                </FilterSearch>
              </div>
            </div>
          </div>

          <BlogPosts selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}
