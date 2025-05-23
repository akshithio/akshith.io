import Navbar from "@/components/layout/Navbar";
import LocationStatus from "@/components/pages/root/LocationStatus";
import MusicStatus from "@/components/pages/root/MusicStatus";
import GithubIcon from "@/icons/GithubIcon";
import LogoIcon from "@/icons/LogoIcon";
import TwitterIcon from "@/icons/TwitterIcon";
import Sapling from "@/components/pages/root/Sapling";
import { duplet, passenger } from "@/utils/fonts";

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
    <div className="bg-a-white dark:bg-a-black h-screen w-screen overflow-x-hidden phone-l:overflow-y-hidden p-6">
      <Navbar />
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          backgroundImage: `
      linear-gradient(to right, rgba(17, 17, 17, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(17, 17, 17, 0.05) 1px, transparent 1px)
    `,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0",
          pointerEvents: "none",
        }}
      />
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          backgroundImage: `
      linear-gradient(to right, rgba(238, 238, 238, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(238, 238, 238, 0.05) 1px, transparent 1px)
    `,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0",
          pointerEvents: "none",
        }}
      />
      <div className="absolute bottom-2 left-2 flex items-center justify-center gap-x-3">
        <a
          href="https://github.com/akshithio"
          target="_blank"
          aria-label="Link to akshithio on Github"
        >
          {" "}
          <GithubIcon />
        </a>

        <a
          href="https://x.com/akshithio"
          target="_blank"
          aria-label="Link to akshithio on X (formerly Twitter)"
        >
          <div className="mt-0.5">
            <TwitterIcon />
          </div>
        </a>
      </div>

      <div className="tablet:justify-start tablet:items-stretch flex h-full w-screen grow items-center justify-center">
        <div className="phone-l:pr-[16.6%] phone-l:pb-[10%] tablet:py-[6%] tablet:px-[12.6%] laptop:px-[9.6%] laptop:py-[6%] laptop-l:px-[9.6%] laptop-l:py-[6%] desktop:py-[6%] desktop:px-[10%] desktop-xl:px-[14.7%] desktop-xl:py-[8%] text-a-black dark:text-a-white pr-[12.5%] pb-[25%]">
          <LocationStatus />
          <div className="mt-3 flex">
            <div>
              <LogoIcon src="root" />
            </div>

            <h1
              className={`ml-3 ${passenger.className} desktop:text-3xl phone-l:text-2xl text-xl`}
            >
              Akshith Garapati
            </h1>
          </div>

          <div
            className={`${duplet.className} desktop:text-xl desktop-xl:text-2xl desktop:w-100 desktop-xl:w-112 desktop:leading-8 desktop-xl:leading-9 desktop-xl:mt-9 relative mt-6 phone-l:w-80 w-65 phone-l:text-base text-sm phone-l:leading-6`}
          >
            <p>
              I study computer science{" "}
              <span className="font-semibold">@purdue</span> and spend my time
              primarily tinkering with web systems and machine intelligence
              models.
            </p>

            <br />

            <p>
              I use this website to write as a way to teach myself, experiment
              with new pieces of web tech, train my design muscles and{" "}
              <a href="/writing" className="underline">
                overcome the twitter character limit
              </a>
              .
            </p>

            <br />

            <p>
              I've previously built organizational systems for teams{" "}
              <span className="font-semibold">@dimension</span>, goofed around
              with some crazy smart people{" "}
              <span className="font-semibold">@tks</span> and got my hs to agree
              to hosting an irl hackathon on campus with ~85 ppl participating
              over the weekend.
            </p>

            <br />

            <p>
              I’m spending this summer building web archival systems{" "}
              <span className="font-semibold">@internetarchive</span>. I also
              help maintain Purdue’s unofficial version of Khan Academy with
              ~8.4 million submissions and counting, called{" "}
              <span className="italic">Boilerexams</span>.
            </p>

            <br />

            <p>
              I’m currently interested in & thinking about interpretability
              research, performant systems & hip-hop.
            </p>

            <MusicStatus />
          </div>
        </div>
        <Sapling />
      </div>
    </div>
  );
}
