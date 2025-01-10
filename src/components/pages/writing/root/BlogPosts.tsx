"use client";

import { usePosts } from "@/hooks/usePosts";
import FolderIcon from "@/icons/FolderIcon";
import { duplet } from "@/utils/fonts";

export default function BlogPosts() {
  const posts = usePosts();

  return (
    <div className="mt-[38px]">
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
              <div className="absolute right-0 top-0 flex items-center justify-center ">
                <FolderIcon />
              </div>
            </div>

            <h1
              className={`${duplet.className} ml-1.5 mt-[-2px] text-base font-semibold text-[#999]`}
            >
              {category}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
}
