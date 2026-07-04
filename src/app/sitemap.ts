import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "https://akshith.io";

  return [
    {
      url: `${baseURL}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 1,
    },
  ];
}
