"use client";

import LogoIcon from "@/icons/LogoIcon";
import { bitscript, duplet } from "@/utils/fonts";
import { useTheme } from "next-themes";

export default function NotFoundPage() {
  const { theme } = useTheme();

  return (
    <div className="text-aBlack dark:bg-aBlack bg-aWhite dark:text-aWhite flex h-screen w-screen items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center justify-center">
        <LogoIcon src="/404" />

        <h1
          className={`${duplet.className} my-7 w-96 text-center text-2xl font-semibold`}
        >
          we’ve been lookin around but <br /> can’t seem to find what you want.{" "}
          <br /> go back to{" "}
          <a className="underline" href="/">
            square one?
          </a>
        </h1>
        <h1 className={`${bitscript.className} text-center text-2xl`}>
          error 404
        </h1>
      </div>
    </div>
  );
}
