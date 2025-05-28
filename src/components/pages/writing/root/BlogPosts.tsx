"use client";

import Tooltip from "@/components/layout/Tooltip";
import FilterSearch from "@/components/pages/writing/root/FilterSearch";
import { usePosts } from "@/hooks/usePosts";
import FilterIcon from "@/icons/FilterIcon";
import FolderIcon from "@/icons/FolderIcon";
import PencilIcon from "@/icons/PencilIcon";
import RSSIcon from "@/icons/RSSIcon";
import { duplet, passenger } from "@/utils/fonts";
import { useState } from "react";

const LoadingState = () => (
  <div className="mb-4 flex w-full items-center justify-between sm:mb-6">
    <div className="relative w-2/3">
      <div className="h-5 w-full animate-pulse rounded-xs bg-[#999]/20 sm:h-6 sm:w-150 dark:bg-[#999]/10" />
      <div className="absolute top-0 right-0">
        <div className="mr-0.5 h-5 w-5 animate-pulse rounded-xs bg-[#999]/20 sm:h-6 sm:w-6 dark:bg-[#999]/10" />
      </div>
    </div>
    <div className="ml-1 h-5 w-16 animate-pulse rounded-xs bg-[#999]/20 sm:ml-1.5 sm:h-6 sm:w-20 dark:bg-[#999]/10" />
  </div>
);

const ErrorState = () => (
  <div className="mt-8 flex h-[40%] flex-col items-center justify-center px-4 sm:mt-12">
    <div className="text-red mb-4 text-center">
      <h2
        className={`${duplet.className} text-lg font-semibold text-[#ef4444] sm:text-xl dark:text-[#f87171]`}
      >
        Unable to load posts
      </h2>
      <p className={`${duplet.className} mt-2 text-xs text-[#999] sm:text-sm`}>
        There was an error loading the blog posts. Please try again later.
      </p>
    </div>
    <button
      onClick={() => window.location.reload()}
      className={`${duplet.className} mt-2 rounded-md bg-[#999]/10 px-4 py-1 text-xs font-semibold transition-colors hover:bg-[#999]/20 sm:text-sm`}
    >
      Retry
    </button>
  </div>
);

export default function BlogPosts() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { posts, isLoading, error } = usePosts();

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const filteredPosts =
    posts?.filter((post) => {
      if (selectedCategories.length === 0) return true;
      return selectedCategories.some((category) => category === post.category);
    }) || [];

  return (
    <div className="text-a-black dark:text-a-white mx-4 mt-6 sm:ml-[4.063rem]">
      <div className="relative mt-4 flex w-full items-center sm:mt-9 sm:w-11/12">
        <div className="justify-start">
          <h1 className={`${passenger.className} text-xl italic sm:text-2xl`}>
            writings.
          </h1>
        </div>

        <div className="absolute right-0 flex items-center justify-end">
          <Tooltip content="RSS Feed">
            <a href="/rss" target="_blank" aria-label="RSS Feed">
              <RSSIcon src="/writing" />
            </a>
          </Tooltip>

          <div className="ml-2 sm:ml-4" />
          <div className="flex items-center justify-center" >
            <FilterSearch onCategoryChange={handleCategoryChange}>
              <Tooltip content="Filter Category">
                <FilterIcon />
              </Tooltip>
            </FilterSearch>
          </div>
        </div>
      </div>

      <div className="mt-6 h-full sm:mt-9">
        {isLoading ? (
          [...Array(6)].map((_, index) => <LoadingState key={index} />)
        ) : error ? (
          <ErrorState />
        ) : filteredPosts.length === 0 ? (
          <div className="flex w-full items-center justify-center">
            <p
              className={`${duplet.className} text-sm font-semibold sm:text-base`}
            >
              No blog posts available for the selected categories.
            </p>
          </div>
        ) : (
          filteredPosts.map(({ title, filename, category }) => (
            <div key={filename}>
              <div className="mt-1 flex flex-col sm:flex-row sm:items-center">
                <div className="relative sm:w-11/12">
                  <a
                    href={`/writing/${filename}`}
                    className={`${duplet.className} inline-block pr-6 text-sm font-semibold sm:pr-0 sm:text-base`}
                  >
                    {title.toLowerCase()}
                  </a>
                  <div className="absolute top-0 right-0 flex items-center justify-center">
                    <FolderIcon />
                    <h1
                      className={`${duplet.className} mt-1 mb-0.5 ml-1 text-sm font-semibold text-[#999] sm:text-base`}
                    >
                      {category}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {!isLoading && !error && filteredPosts.length <= 10 && (
          <div
            className={`absolute top-[45%] left-[65%] hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center sm:flex ${duplet.className} text-xl font-semibold md:text-2xl`}
          >
            <PencilIcon />
            <p className="mt-8">
              i'm writing more stuff that <br />
              should be out soon ʕ•́ᴥ•̀ʔ
            </p>
          </div>
        )}

        {!isLoading && !error && filteredPosts.length <= 15 && (
          <div
            className={`mt-12 mb-8 flex flex-col items-center justify-center text-center sm:hidden ${duplet.className} text-lg font-semibold`}
          >
            <PencilIcon />
            <p className="mt-4">
              i'm writing more stuff that <br />
              should be out soon ʕ•́ᴥ•̀ʔ
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
