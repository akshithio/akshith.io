"use client";

import { SideNoteCompProps } from "@/types/mdx";
import { bitscript, erika } from "@/utils/fonts";
import { useTheme } from "next-themes";

export default function SideNoteComp(props: SideNoteCompProps) {
  const { theme } = useTheme();
  return (
    <div className="absolute right-[-75%] w-[70%] tablet:right-[-25%] tablet:w-[20%]" id={"[@" + props.num + "]"}>
      <h1 className={`${bitscript.className} text-3xl`}>@1</h1>
      <div className="bg-[#333] p-3 font-light dark:bg-[#ccc]">
        <h1 className={`${erika.className} text-a-white dark:text-a-black`}>
          {props.description}
        </h1>
      </div>
    </div>
  );
}
