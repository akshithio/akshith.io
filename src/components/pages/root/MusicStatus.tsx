"use client";

import { useMusic } from "@/hooks/useMusic";
import { duplet } from "@/utils/fonts";

export default function MusicStatus() {
  const { music, SPLITTING_STRING } = useMusic();

  return (
    <div>
      {music !== "not listening to anything" && (
        <div className="absolute -bottom-12">
          <h1
            className={`${duplet.className} desktop:text-xl desktop-xl:text-2xl phone-l:text-base text-sm whitespace-nowrap text-[#999]`}
          >
            listening to {music.substring(0, music.indexOf(SPLITTING_STRING))}
            {"  "}•{"  "}
            {music.substring(music.indexOf(SPLITTING_STRING) + 21)}{" "}
            {"            "}
          </h1>
        </div>
      )}
    </div>
  );
}
