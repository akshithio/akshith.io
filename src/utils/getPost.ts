import { components } from "@/components/pages/writing/slug/mdx/MarkdownComponents";
import { FrontMatter } from "@/types/writing";
import fs from "fs/promises";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import path from "path";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export async function getPost(slug: string) {
  const contentDir = path.join(process.cwd(), "src/content");
  const files = await fs.readdir(contentDir);

  const matchingFile = files.find(
    (filename) =>
      filename.replace(/^.*?-(.*)$/, "$1").replace(".mdx", "") === slug,
  );

  if (!matchingFile) {
    notFound();
  }

  const filePath = path.join(contentDir, matchingFile);
  const fileContent = await fs.readFile(filePath, "utf8");

  const { data: frontMatter, content } = matter(fileContent);

  const { content: compiled } = await compileMDX({
    source: content,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeKatex,
            {
              strict: false,
              trust: true,
              throwOnError: false,
            },
          ],
        ],
      },
    },
  });

  return {
    frontMatter: frontMatter as FrontMatter,
    content: compiled,
  };
}
