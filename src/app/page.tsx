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
    <div className="h-screen w-screen overflow-x-hidden overflow-y-hidden bg-aWhite p-6 dark:bg-aBlack">
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
      <div className="flex h-full w-screen flex-grow ">
        <div className="ml-34 mt-28 h-fit w-fit">
          <LocationStatus />
          <div className="mt-3 flex">
            <div className="text-aBlack dark:text-aWhite">
              <LogoIcon src="root" />
            </div>

            <h1
              className={`ml-3 ${passenger.className} text-2xl text-aBlack dark:text-aWhite`}
            >
              Akshith Garapati
            </h1>
          </div>

          <div
            className={`${duplet.className} relative mt-6 w-80 text-base leading-6 text-aBlack dark:text-aWhite`}
          >
            <p>
              I’m a comp sci (‘28) freshman{" "}
              <span className="font-semibold">@purdue</span> that’s currently
              tryna understand{" "}
              <span className="italic">why people work the way they do</span>.
            </p>

            <br />

            <p>
              If you’ve ever even written down a simple todo list or are the
              kind of person that has 30 zapier integrations to hold your life
              together, <span className="underline">i want to talk to you</span>
              .
            </p>

            <br />

            <p>
              I use this place to write in an effort to teach myself, experiment
              with new pieces of web tech, train my design muscles or overcome
              the twitter character limit.
            </p>

            <br />

            <p>
              I've previously built organizational systems for teams{" "}
              <span className="font-semibold">@dimension</span>, goofed around
              with some crazy smart ppl{" "}
              <span className="font-semibold">@tks</span> and got my hs to agree
              to hosting an irl hackathon on campus with ~85 ppl participating
              over the weekend.
            </p>

            <br />

            <p>
              I get my hands dirty quite often with projects that’ve included
              building a gen-z focused newsletter, a crypto UPI-like payment
              system, a socialized traveling web app, a linktree replacement
              amongst many other random chronicles in between.
            </p>
            <MusicStatus />
          </div>
        </div>
        <Sapling />
      </div>
    </div>
  );
}
