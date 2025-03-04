import { useEffect, useRef } from "react";

export default function PictureGrid() {
  const firstColumnRef = useRef<HTMLDivElement>(null);
  const secondColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (firstColumnRef.current && secondColumnRef.current) {
      const firstColumnDivs =
        firstColumnRef.current.querySelectorAll(".scroll-item");
      const secondColumnDivs =
        secondColumnRef.current.querySelectorAll(".scroll-item");

      firstColumnDivs.forEach((div) => {
        const clone = div.cloneNode(true);
        if (firstColumnRef.current) {
          firstColumnRef.current.appendChild(clone);
        }
      });

      secondColumnDivs.forEach((div) => {
        const clone = div.cloneNode(true);
        if (secondColumnRef.current) {
          secondColumnRef.current.appendChild(clone);
        }
      });
    }
  }, []);

  return (
    <div className="ml-10 grid w-full h-full grid-cols-2 gap-4">
      <div
        ref={firstColumnRef}
        className="relative grid gap-10 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div className="animate-scroll">
          <div className="scroll-item border-gray-800 mb-4 h-48 rounded-md border-2 border-solid" />
          <div className="scroll-item border-gray-800 mb-4 h-48 rounded-md border-2 border-solid" />
          <div className="scroll-item border-gray-800 mb-4 h-48 rounded-md border-2 border-solid" />
          <div className="scroll-item border-gray-800 mb-4 h-48 rounded-md border-2 border-solid" />
        </div>
      </div>

      <div
        ref={secondColumnRef}
        className="relative grid h-96 gap-4 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div className="animate-scroll-reverse">
          <div className="scroll-item border-gray-800 mb-4 h-48 rounded-md border-2 border-solid" />
          <div className="scroll-item border-gray-800 mb-4 h-48 rounded-md border-2 border-solid" />
          <div className="scroll-item border-gray-800 mb-4 h-48 rounded-md border-2 border-solid" />
          <div className="scroll-item border-gray-800 mb-4 h-48 rounded-md border-2 border-solid" />
        </div>
      </div>

      <style jsx>{`
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        .animate-scroll-reverse {
          animation: scroll 20s linear infinite reverse;
        }

        @keyframes scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-25%);
          }
        }
      `}</style>
    </div>
  );
}
