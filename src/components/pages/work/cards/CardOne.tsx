import GithubActivity from "@/components/pages/work/card-components/GithubActivity";
import PictureGrid from "@/components/pages/work/card-components/PictureGrid";
import { duplet, passenger } from "@/utils/fonts";

export default function CardOne() {
  return (
    <div className="scrollbar-thin relative ml-5 flex h-[400px] w-screen grow overflow-x-auto overflow-y-hidden border-l-4 border-[#D9D9D9] pl-5 text-left">
      <div className="mr-4 w-[540px] shrink-0">
        <h1 className={`${passenger.className} mb-1.5 text-3xl font-normal`}>
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

        <h1 className={`${passenger.className} mt-5 text-base font-normal`}>
          Apart from my first foray into lab research at{" "}
          <span className="font-bold text-[#CFB991] italic">Purdue</span>, I
          presented at 2 small-scale conferences, started helping out at the{" "}
          <a
            className="font-bold underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://boilerexams.com"
          >
            Boilerexams
          </a>{" "}
          team, spent way too much time building this website, and also learnt
          to play a little bit of squash!
        </h1>
        <h1
          className={`${duplet.className} mt-5 mb-4 text-base font-semibold text-[#999]`}
        >
          Github Activity
        </h1>
        <GithubActivity startDate="2025-01-01" endDate="2025-04-06" />
        <h1 className={`${passenger.className} mt-8 text-sm`}>
          p.s. random photo collection to the right, all of which may not be
          from specified time period. i apologize 😔 i'll try to actually
          showcase my "work" next time on. i just wanted to build a working
          carousel :)
        </h1>
      </div>
      <PictureGrid
        columns={[
          {
            items: [
              {
                url: "https://v9qoelznu6.ufs.sh/f/KqS0F7xRrUGcYfzaV3djN9eV1Ww7x3yziUSQAvR0CJraGbcj",
                alt: "Doraemon, the blue robotic cat character from the popular Japanese manga and anime series, shown with his characteristic white face, red nose, and mischievous winking expression. He's wearing his signature red collar with a bell and appears to be in an indoor setting.",
              },
              {
                url: "https://v9qoelznu6.ufs.sh/f/KqS0F7xRrUGcrvvxxnXBQOJob845Dy2VfT1lmPisHSWXaqKI",
                alt: "A street-level view in Chicago's downtown Loop district, showing the famous elevated train (the \"L\") running along the right side of the image. Tall urban buildings line both sides of the street, creating the characteristic canyon effect of downtown Chicago's financial district, with the iconic public transit system that gives the Loop its name.",
              },
              {
                url: "https://v9qoelznu6.ufs.sh/f/KqS0F7xRrUGcYaYlp5jN9eV1Ww7x3yziUSQAvR0CJraGbcj6",
                alt: "A winter evening scene near a shopping center or institutional building. Snow covers the ground and a street lamp glows warmly against the twilight sky with orange and purple hues. Bare trees and a long, low building are visible in the background, with cars parked nearby.",
              },
            ],
            direction: "normal",
            duration: 90,
          },
          {
            items: [
              {
                url: "https://v9qoelznu6.ufs.sh/f/KqS0F7xRrUGcUv4r9IOcBLkv3XEW0aTbgOD6ed1lUz9JuHK2",
                alt: "A residential street scene showing a blooming cherry tree with pink blossoms in the center, surrounded by modest two-story houses. A concrete walkway runs through the scene with well-maintained grass areas, capturing the scene during spring bloom season.",
              },
              {
                url: "https://v9qoelznu6.ufs.sh/f/KqS0F7xRrUGcHEY4lhKWRjbwpEzBYqaOnMh7QJAXr3tDy08T",
                alt: "Interior view of a dorm room, showing a couch, the top-half of a self-made cricket bat, luggage including a red suitcase, and various personal belongings scattered around the room",
              },
              {
                url: "https://v9qoelznu6.ufs.sh/f/KqS0F7xRrUGcIE7eVUgXATYNesg58FmjpZnS9aC3IEJMxU6W",
                alt: "Urban skyline showing a mix of architectural styles - red brick historic buildings in the foreground and a tall modern glass skyscraper in the background under an overcast sky",
              },
            ],
            direction: "reverse",
            duration: 90,
          },
          {
            items: [
              {
                url: "https://v9qoelznu6.ufs.sh/f/KqS0F7xRrUGcNDHKEWbolga2nLfUTtyqKWD0vkPBZJpHO87X",
                alt: "A green park or field with trees lining the background under a blue sky with white clouds, with the Purude bell tower visible among the trees",
              },
              {
                url: "https://v9qoelznu6.ufs.sh/f/KqS0F7xRrUGcxtFFUqhON3ic8YBfplJ6U1vnDsWeIhbTwkKX",
                alt: "A cheeseless cheese pizza cut into slices in an open cardboard delivery box, with hands visible reaching for it and a small container of what appears to be garlic sauce nearby",
              },
              {
                url: "https://v9qoelznu6.ufs.sh/f/KqS0F7xRrUGc6A6Fg2IlfqaOQzsIrDumBZhbFYETke1cwPJK",
                alt: "Cookbooks stacked on store shelves, with a dark green cookbook titled 'From Crook to Cook' featuring a photo of Snoop Dog in white clothing prominently displayed in the center",
              },
            ],
            direction: "normal",
            duration: 90,
          },
        ]}
        gap={4}
      />
    </div>
  );
}
