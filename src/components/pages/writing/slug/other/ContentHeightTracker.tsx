"use client";

import Desert from "@/components/pages/writing/slug/desert/Desert";
import { debounce } from "lodash";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";

export default function ContentHeightTracker(props: {
  content: React.ReactNode;
  title: string;
}) {
  const { theme } = useTheme();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [citationHeight, setCitationHeight] = useState<number | null>(null);
  const calculationsPending = useRef(false);

  useEffect(() => {
    const calculateContentHeight = debounce(() => {
      const element = contentRef.current;
      if (!element || calculationsPending.current) return;

      calculationsPending.current = true;

      requestAnimationFrame(() => {
        // Get total height first
        const totalHeight = element.getBoundingClientRect().height;

        // Find the citation holder if it exists
        const citationHolder = element.querySelector("#citation-holder");

        if (citationHolder) {
          // Get the distance from the top of the content to the top of the citation holder
          const contentRect = element.getBoundingClientRect();
          const citationRect = citationHolder.getBoundingClientRect();
          const heightToCitations = citationRect.top - contentRect.top;

          if (heightToCitations > 0) {
            setContentHeight(heightToCitations);
            // Calculate citation height as the difference
            setCitationHeight(totalHeight - heightToCitations);
          }
        } else {
          // If no citations, use full content height and set citation height to 0
          if (totalHeight > 0) {
            setContentHeight(totalHeight);
            setCitationHeight(0);
          }
        }

        calculationsPending.current = false;
      });
    }, 100);

    const timeoutId = setTimeout(calculateContentHeight, 200);

    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        const entry = entries[0];
        if ((entry?.contentRect?.height ?? 0) > 0) {
          calculateContentHeight();
        }
      },
    );

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      calculationsPending.current = false;
      calculateContentHeight.cancel();
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
    };
  }, [props.content]);

  return (
    <div className="">
      {contentHeight !== null && contentHeight > 0 && (
        <Desert length={contentHeight} title={props.title} />
      )}

      <div className="relative mt-5" ref={contentRef}>
        {citationHeight !== null && citationHeight > 0 && (
          <div className="absolute w-screen">
            <div
              style={{
                position: "absolute",
                right: "80px",
                top: `${contentHeight}px`,
                width: "60px",
                backgroundColor: theme === "dark" ? "#eee" : "#111",
                height: `${citationHeight + 64}px`,
              }}
            />
          </div>
        )}
        <div className="mb-10 font-semibold">{props.content}</div>
      </div>
    </div>
  );
}
