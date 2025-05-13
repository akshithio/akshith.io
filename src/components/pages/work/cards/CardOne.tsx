import GithubActivity from "@/components/pages/work/GithubActivity";
import PictureGrid from "@/components/pages/work/PictureGrid";
import { duplet, passenger } from "@/utils/fonts";

export default function CardZero() {
  return (
    <div className="relative ml-5 flex h-[400px] w-screen flex-grow overflow-y-hidden border-l-4 border-[#D9D9D9] pl-[20px] text-left">
      <div className="w-[540px] flex-shrink-0">
        <h1
          className={`${passenger.className} mb-[5px] text-[30px] font-normal`}
        >
          Akshith Garapati
        </h1>
        <div className="relative inline-block">
          <h1 className={`${duplet.className} text-[16px] font-semibold`}>
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
          className={`${passenger.className} mt-[20px] text-[16px] font-normal`}
        >
          Apart from <span className="font-bold underline">18 credits</span> and
          a biomedical engineering research opportunity at{" "}
          <span className="font-bold italic text-[#CFB991]">Purdue</span>, I
          joined the <span className="font-bold underline">Boilerexams</span>{" "}
          front-end team,
          <br /> gave 2 research talks, built this website, and learnt to play
          squash!
        </h1>
        <h1
          className={`${duplet.className} mb-[10px] mt-[20px] text-[16px] font-semibold text-[#999]`}
        >
          Github Activity
        </h1>
        <GithubActivity startDate="2025-01-01" endDate="2025-04-01" />
        <h1
          className={`${duplet.className} leading-2 mt-[20px] text-[16px] font-semibold text-[#999]`}
        >
          <span className={`${passenger.className} leading-8 underline`}>
            456
          </span>{" "}
          Calendar Hours •{" "}
          <span className={`${passenger.className} leading-8 underline`}>
            6
          </span>{" "}
          Blogs Published •{" "}
          <span className={`${passenger.className} leading-8 underline`}>
            1200
          </span>{" "}
          Hours Coding
        </h1>
      </div>
      <PictureGrid />
    </div>
  );
}
