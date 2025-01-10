import Navbar from "@/components/layout/Navbar";
import LocationStatus from "@/components/pages/root/LocationStatus";
import MusicStatus from "@/components/pages/root/MusicStatus";
import GithubIcon from "@/icons/GithubIcon";
import LogoIcon from "@/icons/LogoIcon";
import TwitterIcon from "@/icons/TwitterIcon";
import { duplet, erika, passenger } from "@/utils/fonts";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-hidden bg-[#eee] p-6 dark:bg-[#111]">
      <Navbar />

      <div className="absolute bottom-0 right-0 mb-2 mr-2 ">
        <h1 className={`${duplet.className} text-base text-[#999]`}>
          (🤖) akshith’s calendar tells me he’s up to no good
        </h1>
      </div>

      <div className="absolute right-0 top-[10%]">
        <Image
          src="/site/image.png"
          width={377}
          height={812.5}
          alt="background image of drawn gears"
        />
      </div>

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

      <div className="flex w-screen">
        <div>
          <div>
            <div className="ml-[136px] mt-[108px]">
              <LocationStatus />
              <div className="mt-3 flex">
                <div className="text-black dark:text-white">
                  <LogoIcon type="root" />
                </div>

                <h1
                  className={`ml-3 ${passenger.className} text-2xl text-[#111] dark:text-[#eee]`}
                >
                  Akshith Garapati
                </h1>
              </div>

              <div
                className={`${duplet.className} relative mt-[26px] w-[332px] text-base leading-6 text-[#111] dark:text-[#eee]`}
              >
                <p>
                  I’m a comp sci (‘28) freshman{" "}
                  <span className="font-semibold">@purdue</span> that’s
                  currently tryna understand{" "}
                  <span className="italic">
                    why people work the way they do
                  </span>
                  .
                </p>

                <br />

                <p>
                  If you’ve ever even written down a simple todo list or are the
                  kind of person that has 30 zapier integrations to hold your
                  life together,{" "}
                  <span className="underline">i want to talk to you</span>.
                </p>

                <br />

                <p>
                  I use this place to write in an effort to teach myself,
                  experiment with new pieces of web tech, train my design
                  muscles or overcome the twitter character limit.
                </p>

                <br />

                <p>
                  I've previously built organizational systems for teams{" "}
                  <span className="font-semibold">@dimension</span>, goofed
                  around with some crazy smart ppl{" "}
                  <span className="font-semibold">@tks</span> and got my hs to
                  agree to hosting an irl hackathon on campus with ~85 ppl
                  participating over the weekend.
                </p>

                <br />

                <p>
                  I get my hands dirty quite often with projects that’ve
                  included building a gen-z focused newsletter, a crypto
                  UPI-like payment system, a socialized traveling web app, a
                  linktree replacement amongst many other random chronicles in
                  between.
                </p>
                <MusicStatus />
              </div>
            </div>
          </div>
        </div>

        <div className="relative ml-[15%] grid w-[40%] place-items-center">
          <h1 className="text-[200px]">🍃</h1>
          <h1
            className={`${erika.className} absolute bottom-[20%] left-[15%] w-[145px] leading-6 text-[#111] dark:text-[#eee]`}
          >
            note: work in progress because i’m not really sure what to put here?
            got ideas?{" "}
            <a href="/reach-out">
              {" "}
              <span className="underline">pls tell me 🙏</span>{" "}
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
}
