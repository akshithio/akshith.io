import { promises as fs } from "fs";
import matter from "gray-matter";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(request: NextRequest) {
  const searchString = request.nextUrl.searchParams.get("searchString");

  if (!searchString) {
    return NextResponse.json(
      { error: "searchString parameter is required" },
      { status: 400 },
    );
  }

  try {
    const contentDir = path.join(process.cwd(), "src/content");
    const files = await fs.readdir(contentDir);

    const posts = await Promise.all(
      files
        .filter((filename) => filename.endsWith(".mdx"))
        .map(async (filename) => {
          const filePath = path.join(contentDir, filename);
          const fileContent = await fs.readFile(filePath, "utf8");

          const { data: frontmatter } = matter(fileContent);

          return {
            ...frontmatter,
            filename: filename.replace(".mdx", ""),
          };
        }),
    );

    const filteredPosts =
      searchString === "all"
        ? posts
        : posts.filter((post) => post.filename === searchString);

    return NextResponse.json(filteredPosts);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
