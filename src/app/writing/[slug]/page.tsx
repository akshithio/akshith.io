import Navbar from "@/components/layout/Navbar";
import ContentHeightTracker from "@/components/pages/writing/slug/other/ContentHeightTracker";
import ViewCounter from "@/components/pages/writing/slug/other/ViewCounter";
import LogoIcon from "@/icons/LogoIcon";
import RSSIcon from "@/icons/RSSIcon";
import { convertDate } from "@/utils/dates";
import { duplet, passenger } from "@/utils/fonts";
import { getPost } from "@/utils/getPost";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { frontMatter } = await getPost(params.slug);

  return {
    title: frontMatter.title,
    description: frontMatter.description,
    openGraph: {
      title: frontMatter.title,
      description: frontMatter.description,
      url: `https://akshith.io/writing/${params.slug}`,
      siteName: "Akshith Garapati",
    },
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const { content, frontMatter } = await getPost(params.slug);

  return (
    <div
      className={`${duplet.className} bg-a-white text-a-black dark:bg-a-black dark:text-a-white tablet:overflow-x-clip min-h-screen w-screen overflow-y-scroll p-6 transition-all duration-500 ease-in-out`}
    >
      <Navbar />

      <div className="mt-10 ml-5 flex h-full w-[90%]">
        <div className="mt-10">
          <LogoIcon src="/writing/[slug]" />
        </div>

        <div className="ml-10 h-full w-[75%]">
          <div className={`${passenger.className}`}>
            <div className="flex items-center">
              <h1>
                {convertDate(frontMatter.date)} •{" "}
                <ViewCounter slug={params.slug} />
              </h1>

              <a href="/rss" target="_blank" className="ml-3" aria-label="RSS Feed">
                <RSSIcon src="/writing/[slug]" />
              </a>
            </div>

            <h1 className="tablet:text-5xl mt-2 text-4xl font-semibold italic">
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
