import Navbar from "@/components/layout/Navbar";
import LocationStatus from "@/components/pages/root/LocationStatus";
import MusicStatus from "@/components/pages/root/MusicStatus";
import Sapling from "@/components/pages/root/Sapling";
import GithubIcon from "@/icons/GithubIcon";
import LogoIcon from "@/icons/LogoIcon";
import TwitterIcon from "@/icons/TwitterIcon";
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
    <div className="bg-a-white dark:bg-a-black h-screen w-screen overflow-x-hidden overflow-y-hidden p-6">
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
      {/* <div className="absolute bottom-0 right-0 mb-2 mr-2 ">
        <h1 className={`${duplet.className} text-base text-[#999]`}>
          (🤖) akshith’s calendar tells me he’s up to no good
        </h1>
      </div> */}
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
      <div className="flex h-full w-screen grow ">
        <div className="ml-34 mt-28 h-fit w-fit">
          <LocationStatus />
          <div className="mt-3 flex">
            <div className="text-a-black dark:text-a-white">
              <LogoIcon src="root" />
            </div>

            <h1
              className={`ml-3 ${passenger.className} text-a-black dark:text-a-white text-2xl`}
            >
              Akshith Garapati
            </h1>
          </div>

          <div
            className={`${duplet.className} text-a-black dark:text-a-white relative mt-6 w-80 text-base leading-6`}
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
