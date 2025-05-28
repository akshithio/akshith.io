import { bitscript } from "@/utils/fonts";

export default function SideCitationComp(props: any) {
  return (
    <a
      className={`${bitscript.className} text-sm text-[#22f] dark:text-[#93C5FD]`}
      href={"#" + props.children}
    >
      {props.children}
    </a>
  );
}
