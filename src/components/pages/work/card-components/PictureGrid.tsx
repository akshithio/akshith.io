import { useEffect, useRef } from "react";

type PictureItem = {
  url?: string;
  filepath?: string;
  alt?: string;
};

type ColumnConfig = {
  items: PictureItem[];
  direction?: "normal" | "reverse";
  duration?: number;
};

type PictureGridProps = {
  columns: ColumnConfig[];
  gap?: number;
  className?: string;
};

export default function PictureGrid({
  columns = [],
  gap = 4,
  className = "",
}: PictureGridProps) {
  const columnRefsArray = columns.map(() => useRef<HTMLDivElement>(null));
  const contentRefsArray = columns.map(() => useRef<HTMLDivElement>(null));

  useEffect(() => {
    columnRefsArray.forEach((columnRef, index) => {
      const contentRef = contentRefsArray[index];

      if (contentRef?.current) {
        const items = contentRef.current.querySelectorAll(".scroll-item");
        if (items.length > 0) {
          const totalHeight = Array.from(items).reduce(
            (total, item) => total + item.clientHeight + gap,
            0,
          );

          if (columnRef.current) {
            columnRef.current.style.setProperty(
              "--scroll-distance",
              `${totalHeight}px`,
            );
          }

          items.forEach((item) => {
            const clone = item.cloneNode(true) as HTMLElement;
            contentRef?.current?.appendChild(clone);
          });
        }
      }
    });
  }, [columnRefsArray, contentRefsArray, columns, gap]);

  return (
    <div
      className={`grid h-full w-full gap-${gap} ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
    >
      {columns.map((column, colIndex) => (
        <div
          key={`column-${colIndex}`}
          ref={columnRefsArray[colIndex]}
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          <div
            ref={contentRefsArray[colIndex]}
            className={`animate-scroll${column.direction === "reverse" ? "-reverse" : ""}`}
            style={{
              animationDuration: `${column.duration || 20}s`,
            }}
          >
            {column.items.map((item, itemIndex) => (
              <div
                key={`item-${colIndex}-${itemIndex}`}
                className="scroll-item mb-4 h-48 rounded-md"
              >
                {(item.url || item.filepath) && (
                  <img
                    src={
                      item.url || item.filepath || "/api/placeholder/400/320"
                    }
                    alt={item.alt || `Image ${itemIndex + 1}`}
                    className="h-full w-full rounded object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <style jsx>{`
        .animate-scroll {
          animation: continuousScroll linear infinite;
        }

        .animate-scroll-reverse {
          animation: continuousScroll linear infinite reverse;
        }

        @keyframes continuousScroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(calc(-1 * var(--scroll-distance)));
          }
        }
      `}</style>
    </div>
  );
}
