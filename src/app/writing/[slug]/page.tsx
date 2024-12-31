import fs from "fs/promises";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";

// Define the front matter type
interface FrontMatter {
  title: string;
  date: string;
  category: string;
}

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<FrontMatter> {
  const { frontMatter } = await getPost(params.slug);

  return {
    title: frontMatter.title,
    date: frontMatter.date,
    category: frontMatter.category,
  };
}

async function getPost(slug: string) {
  const filePath = path.join(process.cwd(), "src/content", `${slug}.mdx`);
  const fileContent = await fs.readFile(filePath, "utf8");

  // Parse front matter
  const { data: frontMatter, content } = matter(fileContent);

  // Compile MDX
  const { content: compiled } = await compileMDX({
    source: content,
    options: { parseFrontmatter: true },
  });

  return {
    frontMatter: frontMatter as FrontMatter,
    content: compiled,
  };
}

export default async function Page({ params }: PageProps) {
  const { content, frontMatter } = await getPost(params.slug);

  return (
    <article>
      <h1>{frontMatter.title}</h1>
      <time>{frontMatter.date}</time>
      <p>{frontMatter.category}</p>
      {content}
    </article>
  );
}

export const dynamicParams = true;
