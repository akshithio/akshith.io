import Image from "next/image";

interface ImageProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  num: number;
  description: string;
  creds?: string;
}

export default function ImageComp(props: ImageProps) {
  return (
    <div className="my-9 flex w-full flex-col items-center justify-center font-semibold">
      <div className="rounded-3xl">
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
          <a className="text-[#00f]" href={props.creds} target="_blank">
            [creds]
          </a>
        )}
      </h1>
    </div>
  );
}
