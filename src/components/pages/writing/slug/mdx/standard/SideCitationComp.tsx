import { bitscript } from "@/helpers/fonts";

export default function SideCitationComp(props: any) {
  return (
    <a
      className={`${bitscript.className} text-[14px] text-[#00f]`}
      href={"#" + props.children}
    >
      {props.children}
    </a>
  );
}
