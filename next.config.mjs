import createMDX from "@next/mdx";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    mdxRs: true,
  },
  images: {
    domains: ["v9qoelznu6.ufs.sh"],
  },
  transpilePackages: ["next-mdx-remote"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});

export default withMDX(nextConfig);
