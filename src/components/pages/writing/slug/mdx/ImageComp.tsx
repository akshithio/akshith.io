import { ImageCompProps } from "@/types/mdx";
import Image from "next/image";

export default function ImageComp(props: ImageCompProps) {
  return (
    <div className="my-9 flex w-full flex-col items-center justify-center font-semibold">
      <div className="rounded-lg overflow-hidden">
        <Image
          src={props.src}
          width={props.width}
          height={props.height}
          alt={props.alt}
        />
      </div>
      <h1 className="mt-3">
        Image {props.num}: {props.description}{" "}
        {props.creds && (
          <a
            className="text-[#22f] dark:text-[#93C5FD]"
            href={props.creds}
            target="_blank"
          >
            [creds]
          </a>
        )}
      </h1>
    </div>
  );
}
