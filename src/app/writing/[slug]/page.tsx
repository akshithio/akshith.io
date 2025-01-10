import Navbar from "@/components/layout/Navbar";
import ContentHeightTracker from "@/components/pages/writing/slug/desert/ContentHeightTracker";
import { components } from "@/components/pages/writing/slug/mdx/MarkdownComponents";
import LogoIcon from "@/icons/LogoIcon";
import { FrontMatter } from "@/types/blog";
import { convertDate } from "@/utils/dates";
import { duplet, passenger } from "@/utils/fonts";
import fs from "fs/promises";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }) {
  const { frontMatter } = await getPost(params.slug);

  return {
    title: frontMatter.title,
    description: frontMatter.description,
    openGraph: {
      title: frontMatter.title,
      description: frontMatter.description,
    },
  };
}

async function getPost(slug: string) {
  const filePath = path.join(process.cwd(), "src/content", `${slug}.mdx`);
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

export default async function Page({ params }: PageProps) {
  const { content, frontMatter } = await getPost(params.slug);

  return (
    <div
      className={`${duplet.className} min-h-screen w-screen overflow-x-hidden overflow-y-scroll bg-[#eee] p-6 text-[#111] dark:bg-[#111] dark:text-[#eee]`}
    >
      <Navbar />

      <div className="ml-5 mt-10 flex h-full w-[90%]">
        <div className="mt-10">
          <LogoIcon type="writing/slug" />
        </div>

        <div className="ml-10 h-full w-[75%]">
          <div className={`${passenger.className}`}>
            <h1>{convertDate(frontMatter.date)} • 24,384 views</h1>
            <h1 className="text-5xl font-semibold italic">
              {frontMatter.title}
            </h1>
          </div>
          <ContentHeightTracker content={content} title={frontMatter.title} />
        </div>
      </div>
    </div>
  );
}
export const dynamicParams = true;
