"use client";

import CardOne from "@/components/pages/work/cards/CardOne";
import CardZero from "@/components/pages/work/cards/CardZero";
import { erika } from "@/utils/fonts";
import { useEffect, useState } from "react";

export default function WorkSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      } else if (e.key === "ArrowUp" && currentSlide < totalSlides - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, totalSlides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const renderCard = () => {
    switch (currentSlide) {
      case 0:
        return <CardZero />;
      case 1:
        return <CardOne />;
      default:
        return <CardZero />;
    }
  };

  const slideSubtitles = {
    0: "||| the beginning?",
    1: "||| it snows in april down here",
  };

  return (
    <div className="flex h-full flex-col justify-center">
      <h1 className={`${erika.className} mb-[10px] ml-5 w-fit text-sm`}>
        x {currentSlide.toString().padStart(2, "0")}
      </h1>
      <div className="flex items-center transition-all duration-500 ease-in-out">
        <div className="flex -translate-y-1/2 flex-col items-center gap-2">
          {Array.from({ length: totalSlides })
            .reverse()
            .map((_, index) => (
              <button
                key={totalSlides - index - 1}
                onClick={() => goToSlide(totalSlides - index - 1)}
                className={`h-[6px] w-[6px] rounded-full transition-all ${
                  currentSlide === totalSlides - index - 1
                    ? "bg-a-black dark:bg-a-white"
                    : "bg-[#999]"
                }`}
                aria-label={`Go to slide ${totalSlides - index}`}
              />
            ))}
        </div>
        {renderCard()}
      </div>
      <h1 className={`${erika.className} ml-[22px] mt-[10px] text-sm`}>
        {slideSubtitles[currentSlide] ?? "||| the beginning?"}
      </h1>
    </div>
  );
}
