import SiteMenu from "@/components/layout/SiteMenu";
import LocationStatus from "@/components/pages/root/LocationStatus";

export async function generateMetadata() {
  return {
    title: "Akshith Garapati",
    description: "My Personal Site - Akshith Garapati",
    openGraph: {
      title: "Akshith Garapati",
      description: "My Personal Site - Akshith Garapati",
      url: `https://akshith.io/`,
      siteName: "Akshith Garapati",
    },
  };
}

export default function HomePage() {
  return (
    <div className="narrow:grid narrow:min-h-screen narrow:max-w-none narrow:grid-cols-[25.2px_450px_1fr] narrow:grid-rows-[auto_1fr_auto] narrow:items-start narrow:p-0 mx-auto flex min-h-0 max-w-[576px] flex-col px-[18px] pt-[21.6px]">
      <SiteMenu />

      <div className="narrow:col-start-2 narrow:order-none narrow:row-start-2 narrow:mt-[21.6px] narrow:pb-[2em] order-2 mt-[14.4px] pb-[1em]">
        <p className="text-ink leading-[16.2px]">
          I study computer science at Purdue and spend most of my time tinkering
          with web & machine intelligence systems. In the past I:
        </p>

        <ul className="text-ink my-[1em] list-disc pl-9 leading-[16.2px]">
          <li className="mb-[0.7em]">
            was an early engineer at an enterprise-software startup called{" "}
            <a
              href="https://dimension.dev"
              target="_blank"
              className="text-link underline"
            >
              Dimension
            </a>
            , which is now a part of{" "}
            <a
              href="https://granola.ai"
              target="_blank"
              className="text-link underline"
            >
              Granola
            </a>
            .
          </li>
          <li className="mb-[0.7em]">
            built machine learning pipelines for use at MIT OCW{" "}
            <a
              href="https://blog.coursetexts.org/automating-copyright-compliance-for-open-courseware"
              target="_blank"
              className="text-link underline"
            >
              [blog]
            </a>
          </li>
          <li className="mb-[0.7em]">
            organized one of my city's first high school hackathons with ~85
            in-person attendees
          </li>
          <li className="mb-[0.7em]">
            researched new crawling infrastructure for the Internet Archive's
            Wayback Machine{" "}
            <a
              href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=bW3Pn9EAAAAJ&citation_for_view=bW3Pn9EAAAAJ:u5HHmVD_uO8C"
              target="_blank"
              className="text-link underline"
            >
              [paper]
            </a>{" "}
            <a
              href="https://github.com/internetarchive/wbm_seed_stream"
              target="_blank"
              className="text-link underline"
            >
              [code]
            </a>
            .
          </li>
        </ul>

        <p className="text-ink mt-[1em] leading-[16.2px]">
          I'm currently interested in mechanistic interpretability, performant
          systems, and representation learning.
        </p>

        <p className="text-ink mt-[1em] leading-[16.2px]">
          Things I&apos;ve made that you can use:{" "}
          <a
            href="https://github.com/akshithio/highlighter"
            target="_blank"
            className="text-link underline"
          >
            an extension
          </a>{" "}
          for highlighting things on the web, and{" "}
          <a
            href="https://parallax.akshith.io"
            target="_blank"
            className="text-link underline"
          >
            a desktop coding harness
          </a>{" "}
          that lets you use ChatGPT web instead.
        </p>

        <p className="text-ink mt-[1em] leading-[16.2px] empty:hidden">
          <LocationStatus />
        </p>

        <p className="text-ink mt-[14.4px] leading-[16.2px]">
          <b>@akshithio</b> everywhere on the internet, including{" "}
          <a
            href="https://github.com/akshithio"
            target="_blank"
            className="text-link underline"
          >
            gh
          </a>{" "}
          &amp;{" "}
          <a
            href="https://x.com/akshithio"
            target="_blank"
            className="text-link underline"
          >
            x
          </a>
          .
        </p>
      </div>
    </div>
  );
}
