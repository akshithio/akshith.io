import fs from "fs";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import path from "path";

// Function to get the MDX file path based on the slug
const getMdxFilePath = (slug: string) => {
  return path.join(process.cwd(), "src/mdx", `${slug}.mdx`);
};

// Function to read the MDX file content
const readMdxFile = async (slug: string) => {
  const filePath = getMdxFilePath(slug);
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return fileContent;
  } catch (error) {
    console.error(`Error reading MDX file: ${error}`);
    throw new Error("MDX file not found");
  }
};

// Get all available slugs
const getAllSlugs = () => {
  const files = fs.readdirSync(path.join(process.cwd(), "src/mdx"));
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));
};

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static paths at build time
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each page
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = params.slug;

  return {
    title: `${slug} - Your Site Name`,
    description: `Article about ${slug}`,
  };
}

// Make page static
export const dynamic = "force-static";
export const dynamicParams = false;

// Define any custom components you want to use in your MDX
const components = {
  h1: (props: any) => <h1 className="my-4 text-3xl font-bold" {...props} />,
  h2: (props: any) => <h2 className="my-3 text-2xl font-bold" {...props} />,
  p: (props: any) => <p className="my-2" {...props} />,
  // Add more components as needed
};

export default async function Page({ params }: PageProps) {
  try {
    // Read MDX content at build time
    const content = await readMdxFile(params.slug);

    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Post: {params.slug}</h1>
        <MDXRemote source={content} components={components} />
      </div>
    );
  } catch (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 text-red-600">
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }
}
