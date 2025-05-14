import Navbar from "@/components/layout/Navbar";
import ContentHeightTracker from "@/components/pages/writing/slug/other/ContentHeightTracker";
import ViewCounter from "@/components/pages/writing/slug/other/ViewCounter";
import LogoIcon from "@/icons/LogoIcon";
import RSSIcon from "@/icons/RSSIcon";
import { convertDate } from "@/utils/dates";
import { duplet, passenger } from "@/utils/fonts";
import { getPost } from "@/utils/getPost";

export async function generateMetadata({ params: { slug } }) {
  const { frontMatter } = await getPost(slug);

  return {
    title: frontMatter.title,
    description: frontMatter.description,
    openGraph: {
      title: frontMatter.title,
      description: frontMatter.description,
      url: `https://akshith.io/writing/${slug}`,
      siteName: "Akshith Garapati",
    },
  };
}

export default async function Page({ params: { slug } }) {
  const { content, frontMatter } = await getPost(slug);

  return (
    <div
      className={`${duplet.className} min-h-screen w-screen overflow-x-hidden overflow-y-scroll bg-aWhite p-6 text-aBlack transition-all duration-500 ease-in-out dark:bg-aBlack dark:text-aWhite`}
    >
      <Navbar />

      <div className="ml-5 mt-10 flex h-full w-[90%]">
        <div className="mt-10">
          <LogoIcon src="/writing/[slug]" />
        </div>

        <div className="ml-10 h-full w-[75%]">
          <div className={`${passenger.className}`}>
            <div className="flex items-center">
              <h1>
                {convertDate(frontMatter.date)} • <ViewCounter slug={slug} />
              </h1>

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
