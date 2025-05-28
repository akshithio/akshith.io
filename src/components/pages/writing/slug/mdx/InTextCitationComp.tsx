"use client";

import LinkIcon from "@/icons/LinkIcon";
import PaperIcon from "@/icons/PaperIcon";
import VideoIcon from "@/icons/VideoIcon";
import { InTextCitationCompProps } from "@/types/mdx";
import { passenger } from "@/utils/fonts";
import { useTheme } from "next-themes";

export default function InTextCitationComp(props: InTextCitationCompProps) {
  const { theme } = useTheme();

  return (
    <a href={props.link} target="_blank">
      <div className="flex w-full items-center justify-center">
        <div
          className={`${passenger.className} border-black dark:border-white my-6 flex w-[95%] items-center justify-center border border-dotted p-3`}
        >
          <div className="text-a-black dark:text-a-white">
            {props.type === "paper" && <PaperIcon />}
            {props.type === "video" && <VideoIcon />}
            {props.type === "link" && <LinkIcon />}
            {/* TODO: LinkIcon */}
          </div>

          <div className="ml-3">
            <h1>
              <span className="text-a-black dark:text-a-white">{props.name}</span>{" "}
              | <span className="text-[#888]">{props.authors}</span>
            </h1>
          </div>
        </div>
      </div>
    </a>
  );
}
