"use client";

import { bitscript, erika } from "@/utils/fonts";
import { useTheme } from "next-themes";

interface SideNoteProps {
  num: number;
  description: string;
}

export default function SideNoteComp(props: SideNoteProps) {
  const { theme } = useTheme();
  return (
    <div className="absolute right-[-25%] w-[20%]" id={"[@" + props.num + "]"}>
      <h1 className={`${bitscript.className} text-3xl`}>@1</h1>
      <div className="bg-[#333] p-3 font-light dark:bg-[#ccc]">
        <h1 className={`${erika.className} dark:text-aBlack text-aWhite`}>
          {props.description}
        </h1>
      </div>
    </div>
  );
}
