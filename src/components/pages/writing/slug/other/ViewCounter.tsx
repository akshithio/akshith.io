"use client";
import { useEffect, useState } from "react";

interface ViewCounterProps {
  slug: string;
  initialViews?: number;
}

export default function ViewCounter({
  slug,
  initialViews = 0,
}: ViewCounterProps) {
  const [views, setViews] = useState<number>(initialViews);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch(
          `/api/blog-views?slug=${encodeURIComponent(slug)}`,
          {
            method: "GET",
          },
        );
        const data = await response.json();
        if ("views" in data) {
          setViews(data.views);
          setHasLoaded(true);
        }
      } catch (e) {
        console.error("Error fetching views:", e);
        setHasLoaded(true);
      }
    };

    fetchViews();

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/blog-views?slug=${encodeURIComponent(slug)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const data = await response.json();
        if ("views" in data) {
          setViews(data.views);
        }
      } catch (e) {
        console.error("Error incrementing views:", e);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [slug]);

  if (!hasLoaded) {
    return null;
  }

  return (
    <span>
      {views.toLocaleString()} {views === 1 ? "view" : "views"}
    </span>
  );
}
