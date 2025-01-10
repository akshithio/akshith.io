"use client";

import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import DesertGenerator from "./Desert";

interface ContentHeightTrackerInterface {
  content: React.ReactNode;
  title: string;
}

const ContentHeightTracker = (props: ContentHeightTrackerInterface) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const calculationsPending = useRef(false);

  useEffect(() => {
    const calculateContentHeight = debounce(() => {
      const element = contentRef.current;
      if (!element || calculationsPending.current) return;

      calculationsPending.current = true;

      requestAnimationFrame(() => {
        const citationHolder = element.querySelector(".CitationHolder");
        const totalHeight = element.getBoundingClientRect().height;
        const citationHeight = citationHolder
          ? citationHolder.getBoundingClientRect().height
          : 0;

        const newHeight = totalHeight - citationHeight;

        if (newHeight > 0) {
          setContentHeight(newHeight);
        }

        calculationsPending.current = false;
      });
    }, 100); // Reduced debounce time since we have other safeguards

    // Initial calculation
    const timeoutId = setTimeout(calculateContentHeight, 200); // Increased initial delay

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
    <div>
      {contentHeight !== null && contentHeight > 0 && (
        <DesertGenerator length={contentHeight} title={props.title} />
      )}
      <div className="relative mt-5" ref={contentRef}>
        <div className="mb-10">{props.content}</div>
      </div>
    </div>
  );
};

export default ContentHeightTracker;
