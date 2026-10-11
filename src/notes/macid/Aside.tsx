"use client";

import type { ReactNode } from "react";

/**
 * A collapsible digression.
 *
 * `<details>` rather than a button and a piece of state: it opens without
 * JavaScript, the browser handles the keyboard for it, and Cmd-F finds the
 * text inside even while it is shut. The default disclosure triangle is
 * removed and replaced with a + that becomes a − when open, which is the one
 * thing the element does not give you for free.
 *
 * Opening it must not move the page. Near the bottom, the browser's scroll
 * anchoring can pick the footer as its anchor and hold that still while the
 * aside grows above it, which carries the reader down past what they opened.
 * So anchoring is off for the element, and the summary is put back exactly
 * where it was clicked once the new height is laid out.
 */
export function Aside({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <details className="group my-[1.6em] border-t border-b border-black py-[10px] [overflow-anchor:none]">
      <summary
        onClick={(event) => {
          const summary = event.currentTarget;
          const before = summary.getBoundingClientRect().top;
          requestAnimationFrame(() => {
            const shift = summary.getBoundingClientRect().top - before;
            if (shift !== 0) window.scrollBy(0, shift);
          });
        }}
        className="flex cursor-pointer list-none items-baseline gap-[8px] [&::-webkit-details-marker]:hidden"
      >
        <span
          aria-hidden
          className="font-mono text-[12.6px] leading-[17px] select-none"
        >
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">&minus;</span>
        </span>
        <span className="text-[12.6px] leading-[17px] font-bold">
          Aside: {title}
        </span>
      </summary>
      {/* `.note > p` only reaches direct children, so the prose in here
          would otherwise run together with no gaps at all. */}
      <div className="mt-[10px] [&>p]:mt-[1em] [&>p:first-child]:mt-0">
        {children}
      </div>
    </details>
  );
}
