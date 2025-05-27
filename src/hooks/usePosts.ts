"use client";

import { FrontMatter } from "@/types/writing";
import { useEffect, useState } from "react";

export const usePosts = () => {
  const [posts, setPosts] = useState<FrontMatter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/posts?searchString=all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((postsData) => {
        const sortedPosts = postsData.sort(
          (a: FrontMatter, b: FrontMatter) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setPosts(sortedPosts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err instanceof Error ? err.message : "Failed to load posts");
        setIsLoading(false);
      });
  }, []);

  return { posts, isLoading, error };
};
