import { passenger } from "~/helpers/fonts";

interface QuoteProps {
  author: string;
  quote: string;
}

export default function QuoteComp(props: QuoteProps) {
  return (
    <div className="w-full flex justify-center items-center">
      <div
        className={`${passenger.className} py-[12px] px-[12px] w-[95%] my-[24px] border-l-solid border-l-[3px] [border-image:linear-gradient(to_bottom,#FF0000,#EBB751,#A6EB6A)_1]`}
      >
        <div className="ml-[12px]">
          <h1 className="text-[#111]">
            {props.quote}{" "}
            <span className="font-bold">~ {props.author}</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
