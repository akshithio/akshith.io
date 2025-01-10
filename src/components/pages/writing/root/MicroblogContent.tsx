"use client";

import { useMicroblogs } from "@/hooks/useMicroblog";
import { duplet, erika } from "@/utils/fonts";

export default function MicroblogContent() {
  const microblogs = useMicroblogs();

  return (
    <div className="ml-1.5 mt-6 w-[336px] text-[#111] dark:text-[#eee]">
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
            className={`${erika.className} rounded-3xl border-[1px] border- border-solid border-[#111] px-[18px] py-1.5 dark:border-[#eee]`}
          >
            <h1>{microblog.content}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}
