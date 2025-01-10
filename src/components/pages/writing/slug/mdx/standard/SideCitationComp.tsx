import { bitscript } from "@/utils/fonts";

export default function SideCitationComp(props: any) {
  return (
    <a
      className={`${bitscript.className} text-sm text-[#00f]`}
      href={"#" + props.children}
    >
      {props.children}
    </a>
  );
}
