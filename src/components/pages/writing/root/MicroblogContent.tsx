"use client";

import { useMicroblogs } from "@/hooks/useMicroblog";
import { duplet, erika } from "@/utils/fonts";

export default function MicroblogContent() {
  const microblogs = useMicroblogs();

  return (
    <div className="text-aBlack dark:text-aWhite ml-1.5 mt-6 w-[336px]">
      {microblogs.map((microblog) => (
        <div key={microblog.id} className="mt-6">
          <div className="relative h-5 w-full">
            <h1
              className={`${duplet.className} absolute right-2 text-xs font-semibold text-[#999]`}
            >
              {microblog.formattedTime}, {microblog.formattedDate}
            </h1>
          </div>

          <div
            className={`${erika.className} border- border-aBlack dark:border-aWhite rounded-3xl border-[1px] border-solid px-4 py-1.5`}
          >
            <h1>{microblog.content}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}
