import { useEffect, useState } from "react";

interface Microblog {
  id: string;
  content: string;
  time: string;
  formattedTime: string;
  formattedDate: string;
}

export const useMicroblogs = () => {
  const [microblogs, setMicroblogs] = useState<Microblog[]>([]);

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

  return microblogs;
};
