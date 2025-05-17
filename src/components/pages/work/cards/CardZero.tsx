import Snake from "@/components/pages/work/card-components/Snake";
import { duplet, passenger } from "@/utils/fonts";

export default function CardZero() {
  return (
    <div className="relative ml-5 flex h-[400px] w-screen grow overflow-y-hidden border-l-4 border-[#D9D9D9] pl-5 text-left">
      <div className="w-[340px] shrink-0">
        <h1
          className={`${passenger.className} mb-[5px] text-[30px] font-normal`}
        >
          Akshith Garapati
        </h1>
        <div className="relative inline-block">
          <h1 className={`${duplet.className} text-[16px] font-semibold`}>
            May '07 - Present
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

        <h1 className={`${passenger.className} mt-5 text-[12px]`}>
          what does it even mean to <em>work?</em>
        </h1>

        <div className={`${passenger.className} mt-[10px]`}>
          <div>
            <div className="flex w-fit items-center justify-center">
              <h1 className="text-[24px]">work</h1>
              <span className="ml-[5px] mt-[5px] text-[12px]">/wərk/</span>
            </div>

            <h1 className=" text-[14px] font-semibold">
              activity involving mental or physical effort done in order to
              achieve a purpose or result.
            </h1>
          </div>

          <h1 className="mt-[15px] text-[12px]">
            therefore, i clearly haven't gained sentience enough to know of my
            purpose. Perhaps, the purpose was{" "}
            <span className="underline">
              the friends we made along the way?
            </span>{" "}
            regardless, consider this page to be a documentation of my "along
            the ways" as i try to put in some level of mental or physical
            effort.
          </h1>

          <h1 className="mt-[15px] text-[12px]">
            Scroll up to see my progression and click{" "}
            <span className="underline">here</span> for the latest entry into
            this self-induced performance report, or stay here and play some
            snek!
          </h1>
        </div>
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <Snake />
      </div>
    </div>
  );
}
