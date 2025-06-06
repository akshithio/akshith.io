import { Microblog } from "@/types/writing";
import { formatTime } from "@/utils/dates";
import { useEffect, useState } from "react";

export const useMicroblogs = () => {
  const [microblogs, setMicroblogs] = useState<Microblog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            const { formattedDate, formattedTime } = formatTime(post.time);

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

        setMicroblogs(sortedPosts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err instanceof Error ? err.message : "Failed to load posts");
        setIsLoading(false);
      });
  }, []);

  return { microblogs, isLoading, error };
};
