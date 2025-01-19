"use client";

import { duplet } from "@/utils/fonts";
import { useState } from "react";

export default function Tooltip({
  content,
  children,
}: {
  content: string;
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={(e) => {
        // check if we're not moving to the tooltip
        const tooltipElement =
          e.currentTarget.querySelector('[role="tooltip"]');
        if (
          tooltipElement &&
          !tooltipElement.contains(e.relatedTarget as Node)
        ) {
          setIsVisible(false);
        }
      }}
    >
      {children}
      <div
        role="tooltip"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={(e) => {
          // hide only if not moving back to the element that caused the trigger
          if (
            !e.currentTarget.parentElement?.contains(e.relatedTarget as Node)
          ) {
            setIsVisible(false);
          }
        }}
        className={`${duplet.className} absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-aBlack px-2 py-1 text-sm font-semibold text-aWhite transition-all duration-200 ease-out dark:bg-aWhite dark:text-aBlack ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        {content}
        <div
          className="absolute left-1/2 top-0 h-2 w-full -translate-x-1/2 -translate-y-2"
          aria-hidden="true"
        >
          <div className="border-transparent absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 border-b-4 border-l-4 border-r-4 border-b-aBlack dark:border-b-aWhite" />
        </div>
      </div>
    </div>
  );
}
