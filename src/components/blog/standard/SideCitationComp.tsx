import { bitscript } from "~/helpers/fonts";

export default function SideCitationComp(props: any) {
  return (
    <a
      className={`${bitscript.className} text-[#00f] text-[14px]`}
      href={"#" + props.children}
    >
      {props.children}
    </a>
  );
}
