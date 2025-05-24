import GithubActivity from "@/components/pages/work/card-components/GithubActivity";
import PictureGrid from "@/components/pages/work/card-components/PictureGrid";
import { duplet, passenger } from "@/utils/fonts";

export default function CardZero() {
  return (
    <div className="relative ml-5 flex h-[400px] w-screen grow overflow-y-hidden border-l-4 border-[#D9D9D9] pl-5 text-left">
      <div className="w-[540px] shrink-0 mr-4">
        <h1 className={`${passenger.className} mb-[5px] text-3xl font-normal`}>
          Akshith Garapati
        </h1>
        <div className="relative inline-block">
          <h1 className={`${duplet.className} text-base font-semibold`}>
            Jan 2025 - April 2025
          </h1>
          <svg
            className="absolute bottom-[-2px] left-0 h-1 w-full"
            viewBox="0 0 100 5"
            preserveAspectRatio="none"
          >
            <path
              d="M0,2.5 Q2.5,0 5,2.5 T10,2.5 T15,2.5 T20,2.5 T25,2.5 T30,2.5 T35,2.5 T40,2.5 T45,2.5 T50,2.5 T55,2.5 T60,2.5 T65,2.5 T70,2.5 T75,2.5 T80,2.5 T85,2.5 T90,2.5 T95,2.5 T100,2.5"
              stroke="#999"
              fill="none"
              strokeWidth="2"
            />
          </svg>
        </div>

        <h1
          className={`${passenger.className} mt-5 text-base font-normal`}
        >
          Apart from my first foray into lab research at{" "}
          <span className="font-bold text-[#CFB991] italic">Purdue</span>, I
          presented at 2 small-scale conferences, started helping out at the{" "}
          <a className="font-bold underline">Boilerexams</a> team, spent way too
          much time building this website, and also learnt to play a little bit
          of squash!
        </h1>
        <h1
          className={`${duplet.className} mt-5 mb-4 text-base font-semibold text-[#999]`}
        >
          Github Activity
        </h1>
        <GithubActivity startDate="2025-01-01" endDate="2025-04-06" />
        <h1
          className={`${passenger.className} mt-8 text-base font-normal italic`}
        >
          unfortunately, not all photos you see to the right may have been taken
          in the specific timeframe,
        </h1>
      </div>
      <PictureGrid
        columns={[
          {
            items: [
              {
                url: "https://v9qoelznu6.ufs.sh/f/KqS0F7xRrUGcKPF4yAxRrUGc6qx095LYuNawl2iMhCTJZAWO",
                alt: "Image 1",
              },
              {
                url: "https://v9qoelznu6.ufs.sh/f/KqS0F7xRrUGcfNn6gOu6WOAGaQXNuS0BvnmHJY4UKxz32kgT",
                alt: "Image 2",
              },
              {
                url: "https://v9qoelznu6.ufs.sh/f/KqS0F7xRrUGcdR9TnyGhfW25cMOnKGBmZL9tiyYuk1SvCxRF",
                alt: "Image 2",
              },
            ],
            direction: "normal",
            duration: 45,
          },
          {
            items: [
              {
                url: "https://v9qoelznu6.ufs.sh/f/KqS0F7xRrUGc6vpY81IlfqaOQzsIrDumBZhbFYETke1cwPJK",
                alt: "Image 3",
              },
              {
                url: "https://v9qoelznu6.ufs.sh/f/KqS0F7xRrUGczk4fRSkN6DAPpcgqysIV1RhSumwMUznxLNb0",
                alt: "Image 4",
              },
            ],
            direction: "reverse",
            duration: 80,
          },
        ]}
        gap={4}
      />
    </div>
  );
}
