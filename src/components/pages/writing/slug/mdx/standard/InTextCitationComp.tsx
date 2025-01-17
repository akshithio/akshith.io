"use client";

import BookIcon from "@/icons/BookIcon";
import { passenger } from "@/utils/fonts";
import { useTheme } from "next-themes";

interface InTextCitationProps {
  type: string; // define a type?
  name: string;
  authors: string;
}

export default function InTextCitationComp(props: InTextCitationProps) {
  const { theme } = useTheme();

  return (
    <div className="flex w-full items-center justify-center">
      <div
        className={`${passenger.className} my-6 flex w-[95%] items-center justify-center border border-dotted border-black p-3 dark:border-white`}
      >
        <div className="text-aBlack dark:text-aWhite">
          {props.type === "book" && <BookIcon />}
        </div>
        <div className="ml-3">
          <h1>
            <span className="text-aBlack dark:text-aWhite">{props.name}</span> |{" "}
            <span className="text-[#888]">{props.authors}</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
