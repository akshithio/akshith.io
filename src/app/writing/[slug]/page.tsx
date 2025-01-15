import Navbar from "@/components/layout/Navbar";
import ContentHeightTracker from "@/components/pages/writing/slug/desert/ContentHeightTracker";
import LogoIcon from "@/icons/LogoIcon";
import RSSIcon from "@/icons/RSSIcon";
import { convertDate } from "@/utils/dates";
import { duplet, passenger } from "@/utils/fonts";
import { getPost } from "@/utils/getPost";

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

export default async function Page({ params }: PageProps) {
  const { content, frontMatter } = await getPost(params.slug);

  return (
    <div
      className={`${duplet.className} min-h-screen w-screen overflow-x-hidden overflow-y-scroll bg-[#eee] p-6 text-[#111] dark:bg-[#111] dark:text-[#eee]`}
    >
      <Navbar />

      <div className="ml-5 mt-10 flex h-full w-[90%]">
        <div className="mt-10">
          <LogoIcon src="/writing/[slug]" />
        </div>

        <div className="ml-10 h-full w-[75%]">
          <div className={`${passenger.className}`}>
            <div className="flex items-center">
              <h1>{convertDate(frontMatter.date)} • 24,384 views</h1>

              <a href="/rss" target="_blank" className="ml-3">
                <RSSIcon src="/writing/[slug]" />
              </a>
            </div>

            <h1 className="mt-2 text-5xl font-semibold italic">
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
