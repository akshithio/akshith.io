"use client";

import { useMicroblogs } from "@/hooks/useMicroblog";
import { duplet, erika, passenger } from "@/utils/fonts";

const LoadingState = () => (
  <div className="mt-4 sm:mt-6">
    <div className="relative h-5 w-full">
      <div className="absolute right-2 h-3 w-24 animate-pulse rounded-xs bg-[#999]/20 sm:w-32 dark:bg-[#999]/10" />
    </div>

    <div className="mt-1 rounded-3xl border-[0.063rem] border-solid border-[#999]/20 px-3 py-1.5 sm:px-4 dark:border-[#999]/10">
      <div className="h-12 w-full animate-pulse rounded-xs bg-[#999]/20 dark:bg-[#999]/10" />
    </div>
  </div>
);

const ErrorState = () => (
  <div className="mt-8 flex h-[65%] w-full flex-col items-center justify-center px-4 sm:mt-12">
    <div className="mb-4 text-center">
      <h2
        className={`${duplet.className} text-lg font-semibold text-[#ef4444] sm:text-xl dark:text-[#f87171]`}
      >
        Unable to load microblogs
      </h2>
      <p className={`${duplet.className} mt-2 text-xs text-[#999] sm:text-sm`}>
        There was an error loading the microblogs. Please try again later.
      </p>
    </div>
    <button
      onClick={() => window.location.reload()}
      className={`${duplet.className} mt-2 rounded-md bg-[#999]/10 px-4 py-1 text-xs font-semibold transition-colors hover:bg-[#999]/20 sm:text-sm`}
    >
      Retry
    </button>
  </div>
);

export default function Microblog() {
  const { microblogs, isLoading, error } = useMicroblogs();

  return (
    <div className=" h-full border-r-0 border-t-2 border-dotted border-r-[#999] sm:border-r-2 sm:border-t-0">
      <div className="flex h-full flex-col">
        {/* Header - Fixed at top */}
        <div className="mt-4 flex-shrink-0 px-3 sm:mt-[2.813rem] sm:pr-9 sm:pl-0">
          <div className="text-a-black dark:text-a-white">
            <h1 className={`${passenger.className} text-lg italic md:text-2xl`}>
              the ✨ microblog ✨
            </h1>
            <h1
              className={`${erika.className} mt-1 max-w-full text-xs sm:text-sm`}
            >
              these are meant to be notes / drafts tweets / shower thoughts /
              whatever else tbh. inspired from{" "}
              <a
                href="https://udara.io/microblog"
                target="_blank"
                aria-label="Link to Udara Jay's personal website"
                className={`${duplet.className} font-semibold underline`}
              >
                udara.io
              </a>
            </h1>
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="md:scrollbar-hidden flex-1 overflow-y-auto px-3 sm:pr-9 sm:pl-0">
          {isLoading ? (
            <div className="text-a-black dark:text-a-white">
              {[...Array(7)].map((_, index) => (
                <LoadingState key={index} />
              ))}
            </div>
          ) : error ? (
            <ErrorState />
          ) : (
            <div className="text-a-black dark:text-a-white pt-4 pb-4 sm:pt-6 sm:pb-6">
              {microblogs.map((microblog) => (
                <div key={microblog.id} className="mt-4 sm:mt-6">
                  <div className="relative h-5 w-full">
                    <h1
                      className={`${duplet.className} absolute right-2 text-[0.65rem] font-semibold text-[#999] sm:text-xs`}
                    >
                      {microblog.formattedTime}, {microblog.formattedDate}
                    </h1>
                  </div>

                  <div
                    className={`${erika.className} border-a-black dark:border-a-white rounded-3xl border-[0.063rem] border-solid px-3 py-1.5 sm:px-4`}
                  >
                    <h1 className="text-sm break-words sm:text-base">
                      {microblog.content}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
