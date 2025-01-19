"use client";

import { usePosts } from "@/hooks/usePosts";
import FolderIcon from "@/icons/FolderIcon";
import { duplet } from "@/utils/fonts";

const LoadingState = () => (
  <div className="mb-6 flex w-full items-center justify-between">
    <div className="relative w-[800px]">
      <div className="h-6 w-[600px] animate-pulse rounded-sm bg-[#999]/20 dark:bg-[#999]/10" />
      <div className="absolute right-0 top-0">
        <div className="h-5 w-5 animate-pulse rounded-sm bg-[#999]/20 dark:bg-[#999]/10" />
      </div>
    </div>
    <div className="ml-1.5 h-6 w-20 animate-pulse rounded-sm bg-[#999]/20 dark:bg-[#999]/10" />
  </div>
);

const ErrorState = () => (
  <div className="mt-12 flex w-[800px] flex-col items-center justify-center h-[40%]">
    <div className="text-red mb-4 text-center">
      <h2
        className={`${duplet.className} text-xl font-semibold text-[#ef4444] dark:text-[#f87171]`}
      >
        Unable to load posts
      </h2>
      <p className={`${duplet.className} mt-2 text-sm text-[#999]`}>
        There was an error loading the blog posts. Please try again later.
      </p>
    </div>
    <button
      onClick={() => window.location.reload()}
      className={`${duplet.className} mt-2 rounded-md bg-[#999]/10 px-4 py-1 text-sm font-semibold transition-colors hover:bg-[#999]/20`}
    >
      Retry
    </button>
  </div>
);

export default function BlogPosts() {
  const { posts, isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <div className="mt-9">
        {[...Array(6)].map((_, index) => (
          <LoadingState key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="mt-9">
      {posts.map(({ title, filename, category }) => (
        <div key={filename}>
          <div className="mt-1 flex">
            <div className="relative mt-1 w-[800px]">
              <a
                href={`/writing/${filename}`}
                className={`${duplet.className} text-base font-semibold`}
              >
                {title.toLowerCase()}
              </a>
              <div className="absolute right-0 top-0 flex items-center justify-center">
                <FolderIcon />
              </div>
            </div>

            <h1
              className={`${duplet.className} mb-0.5 ml-1.5 text-base font-semibold text-[#999]`}
            >
              {category}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
}
