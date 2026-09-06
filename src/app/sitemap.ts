import { getNotes } from "@/notes";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "https://akshith.io";
  const notes = await getNotes();

  return [
    {
      url: `${baseURL}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 1,
    },
    {
      url: `${baseURL}/notes`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    },
    {
      url: `${baseURL}/highlighter-privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    ...notes.map((note) => ({
      url: `${baseURL}/notes/${note.slug}`,
      lastModified: new Date(`${note.date}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
