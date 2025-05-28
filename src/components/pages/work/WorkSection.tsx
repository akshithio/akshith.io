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
        return <CardZero goToSlide={goToSlide} totalSlides={totalSlides} />;
      case 1:
        return <CardOne />;
      default:
        return <CardZero goToSlide={goToSlide} totalSlides={totalSlides} />;
    }
  };

  const slideSubtitles = {
    0: "||| the beginning?",
    1: "||| it snows in april down here",
  };

  return (
    <div className="flex h-full flex-col justify-center">
      <h1 className={`${erika.className} mb-[0.625rem] ml-5 w-fit text-sm`}>
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
                className={`h-[0.4rem] w-[0.4rem] rounded-full transition-all cursor-pointer ${
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
      <h1 className={`${erika.className} mt-[0.625rem] ml-[1.375rem] desktop-xl:ml-6 text-sm desktop-xl:text-lg`}>
        {slideSubtitles[currentSlide] ?? "||| the beginning?"}
      </h1>
    </div>
  );
}
