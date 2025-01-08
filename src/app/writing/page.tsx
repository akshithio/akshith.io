"use client";

import Navbar from "@/components/layout/Navbar";
import { duplet, erika, passenger } from "@/helpers/fonts";
import { useEffect, useState } from "react";

interface BlogPostMatter {
  title: string;
  category: string;
  date: string;
  url: string;
  description?: string;
  filename: string;
}

interface Microblog {
  id: string;
  content: string;
  time: string;
  formattedTime: string;
  formattedDate: string;
}

export default function WritingPage() {
  const [posts, setPosts] = useState<BlogPostMatter[]>([]);
  const [microblogs, setMicroblogs] = useState<Microblog[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/posts?searchString=all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((postsData) => {
        // Sort posts by date
        const sortedPosts = postsData.sort(
          (a: BlogPostMatter, b: BlogPostMatter) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setPosts(sortedPosts);
        // setIsLoading(false);
      })
      .catch((err) => {
        // setError(err instanceof Error ? err.message : "Failed to load posts");
        // setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("/api/microblog")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((postsData) => {
        const sortedPosts = postsData.data
          .map((post: Microblog) => {
            const postDate = new Date(post.time);
            const now = new Date();
            const diffTime = Math.abs(now.getTime() - postDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const formattedTime = postDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });

            // Format the date based on how recent it is
            const formattedDate =
              diffDays <= 7
                ? postDate.toLocaleDateString([], { weekday: "short" })
                : postDate
                    .toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                    .replace(/(\d+)/, "$1th")
                    .toLowerCase();

            return {
              ...post,
              formattedTime,
              formattedDate,
            };
          })
          .sort(
            (a: Microblog, b: Microblog) =>
              new Date(b.time).getTime() - new Date(a.time).getTime(),
          );

        const recentPosts = sortedPosts.slice(0, 15);
        setMicroblogs(recentPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <body className="h-screen w-screen overflow-x-hidden overflow-y-hidden bg-[#eee] p-[24px] dark:bg-[#111]">
      <Navbar />
      <div className="flex h-full w-full">
        {/* no scrollbar is room for a11y issues */}
        <div className="scrollbar-hidden mt-[45px] h-[100%] w-[372px] overflow-y-scroll border-r-2 border-dotted border-r-[#999] pr-[36px]">
          <div className="w-[336px] text-[#111] dark:text-[#eee]">
            <h1 className={`${passenger.className} text-[24px] italic `}>
              the ✨ microblog ✨
            </h1>
            <h1 className={`${erika.className} mt-[4px] w-[323px] text-[14px]`}>
              these are meant to be notes / drafts tweets / shower thoughts /
              whatever else tbh. inspired from{" "}
              <a
                href="https://udara.io/microblog"
                target="_blank"
                className={`${duplet.className} font-semibold underline`}
              >
                udara.io
              </a>
            </h1>
          </div>

          <div className="ml-[6px] mt-[24px] w-[336px] text-[#111] dark:text-[#eee]">
            {microblogs.map((microblog) => (
              <div key={microblog.id} className="mt-[24px]">
                <h1
                  className={`${duplet.className} right-0 ml-[81%] text-[12px] font-semibold text-[#999]`}
                >
                  {microblog.formattedTime}, {microblog.formattedDate}
                </h1>
                <div
                  className={`${erika.className} rounded-[24px] border-[1px] border-solid border-[#111] px-[18px] py-[6px] dark:border-[#eee]`}
                >
                  <h1>{microblog.content}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ml-[130px] mt-[24px] text-[#111] dark:text-[#eee]">
          <div className="relative mt-[36px] flex items-center">
            <div className="justify-start">
              <h1 className={`${passenger.className} text-[24px] italic`}>
                writings.
              </h1>
            </div>

            <div className="absolute right-0 flex items-center justify-end">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.25854 15.4834C7.41211 15.4834 6.73084 14.8022 6.71019 13.9764C6.64826 11.1894 4.81091 9.35198 2.02389 9.29005C1.17746 9.2694 0.49617 8.56745 0.516815 7.70037C0.537459 6.85395 1.21873 6.19336 2.06516 6.19336C2.0858 6.19336 2.08578 6.19336 2.10643 6.19336C6.54501 6.29658 9.7243 9.45516 9.80688 13.8938C9.82753 14.7402 9.14623 15.4628 8.2998 15.4834C8.27916 15.4834 8.27918 15.4834 8.25854 15.4834Z"
                  fill="#999999"
                />
                <path
                  d="M14.4519 15.4834C13.6055 15.4834 12.9036 14.8022 12.9036 13.9558C12.8829 12.5932 12.6558 11.2926 12.2429 10.0746C11.19 7.06046 8.93978 4.83072 5.92567 3.7572C4.70764 3.32367 3.40702 3.09669 2.04448 3.09669C1.19805 3.09669 0.496157 2.39475 0.516802 1.52768C0.516802 0.681251 1.21872 0 2.06515 0H2.08581C3.79931 0.0206446 5.4302 0.309739 6.9579 0.846499C10.8597 2.22969 13.7706 5.14051 15.1538 9.04234C15.6906 10.57 15.9796 12.2216 16.0002 13.9144C16.0002 14.7815 15.319 15.4834 14.4519 15.4834C14.4725 15.4834 14.4519 15.4834 14.4519 15.4834Z"
                  fill="#999999"
                />
                <path
                  d="M2.06446 15.9995C0.908362 15.9995 0 15.0705 0 13.9351C0 12.7996 0.929007 11.8706 2.06446 11.8706C3.19991 11.8706 4.12892 12.7996 4.12892 13.9351C4.12892 15.0705 3.22056 15.9995 2.06446 15.9995Z"
                  fill="#999999"
                />
              </svg>

              <div className="ml-[16px]" />

              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.4225 0.75H8.52C9.03 0.75 9.4425 1.17 9.4425 1.6875V2.715C9.4425 3.09 9.21 3.555 8.9775 3.7875L6.9975 5.5725C6.72 5.805 6.54 6.27 6.54 6.645V8.655C6.54 8.9325 6.3525 9.3075 6.1275 9.45L5.475 9.8775C4.875 10.2525 4.0425 9.8325 4.0425 9.0825V6.6C4.0425 6.27 3.855 5.85 3.675 5.6175L1.92 3.7425C1.6875 3.51 1.5 3.09 1.5 2.8125V1.7325C1.5 1.17 1.9125 0.75 2.4225 0.75Z"
                  fill="#999999"
                />
                <path
                  d="M12.75 1.5H10.95C10.74 1.5 10.575 1.665 10.575 1.875C10.575 2.235 10.575 2.715 10.575 2.715C10.575 3.4575 10.1775 4.185 9.7875 4.5825L7.7475 6.405C7.725 6.4575 7.6875 6.5325 7.665 6.5925V8.655C7.665 9.3375 7.26 10.08 6.705 10.4175L6.09 10.815C5.745 11.0325 5.3625 11.1375 4.98 11.1375C4.635 11.1375 4.29 11.0475 3.975 10.875C3.62013 10.6785 3.34475 10.3905 3.16331 10.0517C3.02805 9.79905 3 9.50701 3 9.22047V7.6575C3 7.56 2.9625 7.4625 2.8875 7.395L2.1375 6.645C1.905 6.405 1.5 6.57 1.5 6.9075V12.75C1.5 14.82 3.18 16.5 5.25 16.5H12.75C14.82 16.5 16.5 14.82 16.5 12.75V5.25C16.5 3.18 14.82 1.5 12.75 1.5ZM13.5 13.3125H8.25C7.9425 13.3125 7.6875 13.0575 7.6875 12.75C7.6875 12.4425 7.9425 12.1875 8.25 12.1875H13.5C13.8075 12.1875 14.0625 12.4425 14.0625 12.75C14.0625 13.0575 13.8075 13.3125 13.5 13.3125ZM13.5 10.3125H9.75C9.4425 10.3125 9.1875 10.0575 9.1875 9.75C9.1875 9.4425 9.4425 9.1875 9.75 9.1875H13.5C13.8075 9.1875 14.0625 9.4425 14.0625 9.75C14.0625 10.0575 13.8075 10.3125 13.5 10.3125Z"
                  fill="#999999"
                />
              </svg>
            </div>
          </div>

          <div className="mt-[38px]">
            {posts.map((post) => (
              <div>
                <div className="mt-[4px] flex">
                  <div className="relative mt-[4px] w-[800px]">
                    <a
                      href={"/writing/" + post.filename}
                      className={`${duplet.className} text-[16px] font-semibold`}
                    >
                      {post.title.toLowerCase()}
                    </a>

                    <div className="absolute right-0 top-0 flex items-center justify-center ">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7139 4.95915C14.1832 5.46811 13.7171 6.16668 13.0248 6.16668H2.33325C1.78097 6.16668 1.33325 5.71896 1.33325 5.16668V4.28001C1.33325 2.65334 2.65325 1.33334 4.27992 1.33334H5.82659C6.91325 1.33334 7.25325 1.68668 7.68659 2.26668L8.61992 3.50668C8.82659 3.78001 8.85325 3.81334 9.23992 3.81334H11.0999C12.1329 3.81334 13.064 4.2543 13.7139 4.95915Z"
                          fill="#999999"
                        />
                        <path
                          d="M13.6566 7.16649C14.2076 7.16648 14.6548 7.61213 14.6566 8.1631L14.6666 11.1C14.6666 13.0667 13.0666 14.6667 11.0999 14.6667H4.89992C2.93325 14.6667 1.33325 13.0667 1.33325 11.1V8.16664C1.33325 7.61436 1.78096 7.16665 2.33324 7.16664L13.6566 7.16649Z"
                          fill="#999999"
                        />
                      </svg>
                    </div>
                  </div>

                  <h1
                    className={`${duplet.className} ml-[6px] mt-[-2px] text-[16px] font-semibold text-[#999]`}
                  >
                    {post.category}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </body>
  );
}
