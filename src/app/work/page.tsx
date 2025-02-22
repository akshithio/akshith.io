import Navbar from "@/components/layout/Navbar";
import { duplet, erika, passenger } from "@/utils/fonts";

export async function generateMetadata() {
  return {
    title: "Akshith Garapati | Work",
    description:
      "A small showcasing of some of the work I've done - Akshith Garapati",
    openGraph: {
      title: "Akshith Garapati | Work",
      description:
        "A small showcasing of some of the work I've done - Akshith Garapati",
      url: `https://akshith.io/work/`,
      siteName: "Akshith Garapati",
    },
  };
}

export default function WorkPage() {
  return (
    <div className="relative h-screen w-screen overflow-x-hidden overflow-y-hidden bg-aWhite p-6 text-aBlack dark:bg-aBlack dark:text-aWhite">
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
      <Navbar />
      <div className="relative flex h-full w-full items-center">
        <div className="relative z-10">
          <div className="flex h-full flex-col justify-center">
            <h1
              className={`${erika.className} mb-[10px] ml-[20px] text-[14px]`}
            >
              x oh so summer ☀️
            </h1>
            <div className="leading-2 ml-[20px] w-[530px] border-l-4 border-[#D9D9D9] pl-[20px] text-left">
              <h1
                className={`${passenger.className} mb-[5px] text-[30px] font-normal`}
              >
                Akshith Garapati
              </h1>
              <div className="relative inline-block">
                <h1 className={`${duplet.className} text-[16px] font-semibold`}>
                  Jan 2025 - May 2025
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
                Apart from{" "}
                <span className="font-bold underline">18 credits</span> and a
                biomedical engineering research opportunity at{" "}
                <span className="font-bold italic text-[#CFB991]">Purdue</span>,
                I joined the{" "}
                <span className="font-bold underline">Boilerexams</span>{" "}
                front-end team, wrote 40,000 lines of go for{" "}
                <span className="font-bold underline">my own web-scraper</span>,
                built this website, and learnt to play squash!
              </h1>
              <h1
                className={`${duplet.className} mt-[20px] mb-[10px] text-[16px] font-semibold text-[#999]`}
              >
                Github Activity
              </h1>
              <div className="grid-cols-24 grid w-[90%] grid-rows-6 gap-x-[1px] gap-y-1">
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
                <div className="h-[14px] w-[14px] rounded-md bg-[#3EBE5E]" />
              </div>

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
            <h1
              className={`${erika.className} ml-[20px] mt-[10px] text-[14px]`}
            >
              ||| If you’re looking for projects i have hosted on this site, go{" "}
              <span className="underline">here</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
