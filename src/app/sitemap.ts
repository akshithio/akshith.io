import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const baseURL = `${protocol}://${host}`;

  const postsRes = await fetch(`${baseURL}/api/posts?searchString=all`);

  if (!postsRes.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts = await postsRes.json();

  return [
    {
      url: `${baseURL}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 1,
    },
    {
      url: `${baseURL}/writing`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...posts.map((post: { filename: string }) => ({
      url: `${baseURL}/writing/${post.filename}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
