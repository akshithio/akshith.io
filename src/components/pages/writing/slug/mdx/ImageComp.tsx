"use client";

import { ImageCompProps } from "@/types/mdx";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageComp(props: ImageCompProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isExpanded]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false);
    };

    if (isExpanded) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isExpanded]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setIsExpanded(false);
  };

  return (
    <>
      <div className="my-9 flex w-full flex-col items-center justify-center font-semibold">
        <div
          className="max-w-full cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:opacity-90"
          onClick={() => setIsExpanded(true)}
        >
          <Image
            src={props.src}
            width={props.width}
            height={props.height}
            alt={props.alt}
            className="block h-auto max-w-full"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
        <h1 className="mt-3 px-4 text-center">
          Image {props.num}: {props.description}{" "}
          {props.creds && (
            <a
              className="text-[#22f] transition-all duration-200 hover:underline dark:text-[#93C5FD]"
              href={props.creds}
              target="_blank"
              rel="noopener noreferrer"
            >
              [creds]
            </a>
          )}
        </h1>
      </div>

      {isExpanded && (
        <div
          className="text-a-white fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-in-out"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
          onClick={handleOverlayClick}
        >
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-4 right-4 z-60 cursor-pointer rounded-full bg-black/20 p-2 text-white transition-all duration-200 hover:scale-110 hover:bg-black/40"
            aria-label="Close image viewer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="animate-in zoom-in-95 fade-in flex w-10/12 flex-col items-center duration-300 ease-out">
            <div className="flex h-full max-h-[80vh] items-center justify-center overflow-hidden rounded-lg shadow-2xl">
              <Image
                src={props.src}
                width={props.width}
                height={props.height}
                alt={props.alt}
                className="h-full object-contain transition-transform duration-300 ease-in-out"
              />
            </div>

            <div className="animate-in slide-in-from-bottom-4 mt-4 max-w-4xl px-4 text-center duration-500 ease-out">
              <h2 className="text-lg font-semibold text-white">
                Image {props.num}: {props.description}{" "}
                {props.creds && (
                  <a
                    className="text-[#93C5FD] transition-colors duration-200 hover:text-blue-200 hover:underline"
                    href={props.creds}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    [creds]
                  </a>
                )}
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
