import { bitscript, erika } from "~/helpers/fonts";

interface SideNoteProps {
  num: number;
  description: string;
}

export default function SideNoteComp(props: SideNoteProps) {
  return (
    <div className="absolute right-[-25%] w-[20%]" id={"[@" + props.num + "]"}>
      <h1 className={`${bitscript.className} text-[32px]`}>@1</h1>
      <div className="bg-[#333] p-[13px] font-light">
        <h1 className={`${erika.className} text-[#eee]`}>
          {props.description}
        </h1>
      </div>
    </div>
  );
}
