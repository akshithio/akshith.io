import { FrontMatter } from "@/types/writing";
import { Feed } from "feed";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

async function getAllPosts(): Promise<FrontMatter[]> {
  const host = (await headers()).get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const baseURL = `${protocol}://${host}`;

  const posts = await fetch(`${baseURL}/api/posts?searchString=all`).then(
    (res) => res.json(),
  );

  return posts
    .map((post: FrontMatter) => ({
      ...post,
    }))
    .sort(
      (a: FrontMatter, b: FrontMatter) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export async function GET() {
  const posts = await getAllPosts();
  const host = (await headers()).get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const baseURL = `${protocol}://${host}`;

  const feed = new Feed({
    title: "Akshith Garapati",
    description: "Akshith Garapati's Personal Blog",
    id: baseURL,
    link: baseURL,
    language: "en",
    favicon: `${baseURL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    author: {
      name: "Akshith Garapati",
      email: "mail@akshith.io",
      link: baseURL,
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${baseURL}/writing/${post.filename}`,
      link: `${baseURL}/writing/${post.filename}`,
      description: post.description || "",
      content: post.excerpt,
      date: new Date(post.date),
      image: `${baseURL}/writing/${post.filename}/opengraph-image`,
      enclosure: {
        url: `${baseURL}/writing/${post.filename}/opengraph-image`,
        type: "image/png",
        length: 0,
      },
    });
  });

  return new NextResponse(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
