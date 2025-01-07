"use client";

import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";

interface ContentHeightTrackerProps {
  content: React.ReactNode;
}

const ContentHeightTracker: React.FC<ContentHeightTrackerProps> = ({
  content,
}) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const calculateContentHeight = debounce(() => {
      const element = contentRef.current;
      if (!element) return;

      requestAnimationFrame(() => {
        const citationHolder = element.querySelector(".CitationHolder");
        const totalHeight = element.getBoundingClientRect().height;
        const citationHeight = citationHolder
          ? citationHolder.getBoundingClientRect().height
          : 0;

        setContentHeight(totalHeight - citationHeight);
      });
    }, 250);

    const timeoutId = setTimeout(calculateContentHeight, 0);

    const resizeObserver = new ResizeObserver(calculateContentHeight);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      calculateContentHeight.cancel();
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
    };
  }, [content]);

  return (
    <div className="relative mt-[20px]" ref={contentRef}>
      <div className="mb-[40px]">{content}</div>
      <div className="fixed right-4 top-4 rounded bg-black/10 p-2 text-sm">
        Content Height: {Math.round(contentHeight)}px
      </div>
    </div>
  );
};

export default ContentHeightTracker;
