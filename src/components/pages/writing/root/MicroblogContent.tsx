"use client";

import { useMicroblogs } from "@/hooks/useMicroblog";
import { duplet, erika } from "@/utils/fonts";

const LoadingState = () => (
  <div className="mt-6">
    <div className="relative h-5 w-full">
      <div className="absolute right-2 h-3 w-32 animate-pulse rounded-sm bg-[#999]/20 dark:bg-[#999]/10" />
    </div>

    <div className="mt-1 rounded-3xl border-[1px] border-solid border-[#999]/20 px-4 py-1.5 dark:border-[#999]/10">
      <div className="h-12 w-full animate-pulse rounded-sm bg-[#999]/20 dark:bg-[#999]/10" />
    </div>
  </div>
);

const ErrorState = () => (
  <div className="mt-12 flex h-[65%] w-[336px] flex-col items-center justify-center">
    <div className="mb-4 text-center">
      <h2
        className={`${duplet.className} text-xl font-semibold text-[#ef4444] dark:text-[#f87171]`}
      >
        Unable to load microblogs
      </h2>
      <p className={`${duplet.className} mt-2 text-sm text-[#999]`}>
        There was an error loading the microblogs. Please try again later.
      </p>
    </div>
    <button
      onClick={() => window.location.reload()}
      className={`${duplet.className} mt-2 rounded-md bg-[#999]/10 px-4 py-1 text-sm font-semibold transition-colors hover:bg-[#999]/20`}
    >
      Retry
    </button>
  </div>
);

export default function MicroblogContent() {
  const { microblogs, isLoading, error } = useMicroblogs();

  if (isLoading) {
    return (
      <div className="ml-1.5 mt-6 w-[336px] text-aBlack dark:text-aWhite">
        {[...Array(7)].map((_, index) => (
          <LoadingState key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="ml-1.5 mt-6 w-[336px] text-aBlack dark:text-aWhite">
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
            className={`${erika.className} rounded-3xl border-[1px] border-solid border-aBlack px-4 py-1.5 dark:border-aWhite`}
          >
            <h1>{microblog.content}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}
