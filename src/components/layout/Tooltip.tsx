"use client";

import { duplet } from "@/utils/fonts";
import { useState, useEffect, useRef } from "react";

export default function Tooltip({
  content,
  children,
}: {
  content: string;
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOverlapped, setIsOverlapped] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkOverlap = () => {
      if (!tooltipRef.current || !isVisible) return;

      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      const checkPoints = [
        [
          tooltipRect.left + tooltipRect.width / 2,
          tooltipRect.top + tooltipRect.height / 2,
        ],
        [tooltipRect.left, tooltipRect.top],
        [tooltipRect.right, tooltipRect.top],
        [tooltipRect.left, tooltipRect.bottom],
        [tooltipRect.right, tooltipRect.bottom],
      ] as [number, number][];

      for (const [x, y] of checkPoints) {
        // const adjustedX = x + window.scrollX;
        // const adjustedY = y + window.scrollY;
        // const elements = document.elementsFromPoint(adjustedX, adjustedY);

        const elements = document.elementsFromPoint(x, y);

        const hasHigherZIndexOverlap = elements.some((el, index) => {
          // skip the first element as it would be the tooltip itself
          if (index === 0 || el === tooltipRef.current) return false;

          if (el instanceof HTMLElement) {
            const elZIndex =
              parseInt(window.getComputedStyle(el).zIndex, 10) || 0;
            const tooltipZIndex =
              parseInt(
                window.getComputedStyle(tooltipRef.current!).zIndex,
                10,
              ) || 0;

            return elZIndex > tooltipZIndex;
          }
          return false;
        });

        if (hasHigherZIndexOverlap) {
          setIsOverlapped(true);
          return;
        }
      }

      setIsOverlapped(false);
    };

    const handleScroll = () => {
      requestAnimationFrame(checkOverlap);
    };

    const handleResize = () => {
      requestAnimationFrame(checkOverlap);
    };

    checkOverlap();

    document.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    const observer = new MutationObserver(checkOverlap);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    return () => {
      document.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={(e) => {
        const tooltipElement =
          e.currentTarget.querySelector('[role="tooltip"]');
        if (
          tooltipElement &&
          !tooltipElement.contains(e.relatedTarget as Node)
        ) {
          setIsVisible(false);
          setIsOverlapped(false);
        }
      }}
    >
      {children}
      <div
        ref={tooltipRef}
        role="tooltip"
        className={`${duplet.className} absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-a-black px-2 py-1 text-sm font-semibold text-a-white transition-all duration-200 ease-out dark:bg-a-white dark:text-a-black ${
          isVisible && !isOverlapped
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        {content}
        <div
          className="absolute left-1/2 top-0 h-2 w-full -translate-x-1/2 -translate-y-2"
          aria-hidden="true"
        >
          <div className="border-transparent absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 border-b-4 border-l-4 border-r-4 border-b-a-black dark:border-b-a-white" />
        </div>
      </div>
    </div>
  );
}
