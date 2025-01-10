"use client";

import { BlogPostMatter } from "@/types/blog";
import { useEffect, useState } from "react";

export const usePosts = () => {
  const [posts, setPosts] = useState<BlogPostMatter[]>([]);
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

  return posts;
};
