"use client";

// The figure for how the page script finds ProseMirror's EditorView. A dot
// climbs from the input bar to the nearest element React rendered, crosses to
// that element's fiber, and follows `return` up through the components until
// one of them holds the view, which then slides out to the left. It starts
// looping when scrolled into view, and can be paused or stepped like Fig. 5.

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

// One colour per kind of thing, named in the legend: orange for HTML
// elements, blue for React fibers, green for the EditorView. A box fills in
// once the search has reached it.
const ELEMENT = "#b4531c";
const ELEMENT_SOFT = "#f8e7dc";
const FIBER = "#2f5bd3";
const FIBER_SOFT = "#e3eafb";
const FOUND = "#187a55";
const FOUND_SOFT = "#dcf1e7";
const PATH = "#000000";
const IDLE = "#9a9a9a";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const W = 480;
const BOX_W = 180;
const BOX_H = 42;
const LEFT_X = 12;
const RIGHT_X = W - 12 - BOX_W;
// The path runs near the right edge of each column, clear of the box text.
const LEFT_C = LEFT_X + BOX_W - 22;
const RIGHT_C = RIGHT_X + BOX_W - 22;
const rowTop = (row: number) => 36 + row * 60;
const rowMid = (row: number) => rowTop(row) + BOX_H / 2;

// Where the dot sits at each phase.
const STOPS: { x: number; y: number }[] = [
  { x: LEFT_C, y: rowMid(4) },
  { x: LEFT_C, y: rowMid(3) },
  { x: RIGHT_C, y: rowMid(3) },
  { x: RIGHT_C, y: rowMid(2) },
  { x: RIGHT_C, y: rowMid(1) },
  { x: LEFT_X + BOX_W, y: rowMid(1) },
];
const STEP_MS = 2800;
const LAST = STOPS.length - 1;

// The line under the figure for each phase, the same order as STOPS.
const CAPTIONS = [
  "Start at the input bar. ProseMirror made it, so it has no fiber.",
  "Go up to its parent, which React rendered.",
  "Follow __reactFiber$ to the parent's fiber.",
  "No view here, so climb to the next fiber.",
  "Composer keeps a ref to the EditorView.",
  "Found the EditorView. The search stops.",
];
const FOUND_PHASE = 4;

// Fibers from the root down; `phase` is when the dot reaches each one, and
// the root is never reached.
const FIBERS = [
  { row: 0, name: "Form", phase: -1 },
  { row: 1, name: "Composer", phase: 4 },
  { row: 2, name: "EditorContent", phase: 3 },
  { row: 3, name: "div", phase: 2 },
];

const LEGEND = [
  { label: "HTML element", stroke: ELEMENT, fill: ELEMENT_SOFT },
  { label: "React fiber", stroke: FIBER, fill: FIBER_SOFT },
  { label: "EditorView", stroke: FOUND, fill: FOUND_SOFT },
  { label: "No fiber", stroke: ELEMENT, fill: "#ffffff", dashed: true },
];

function Box({
  x,
  y,
  title,
  detail,
  mono,
  stroke,
  fill,
  dashed,
  bold,
  dim,
}: {
  x: number;
  y: number;
  title: string;
  detail: string;
  mono?: boolean;
  stroke: string;
  fill: string;
  dashed?: boolean;
  bold?: boolean;
  dim?: boolean;
}) {
  return (
    <g style={{ opacity: dim ? 0.4 : 1, transition: "opacity 300ms" }}>
      <rect
        x={x}
        y={y}
        width={BOX_W}
        height={BOX_H}
        fill={fill}
        stroke={stroke}
        strokeWidth={bold ? 2 : 1.2}
        strokeDasharray={dashed ? "4 3" : undefined}
        style={{ transition: "fill 300ms, stroke 300ms" }}
      />
      <text x={x + 9} y={y + 17} fontSize="13" fontWeight="700" fill={stroke}>
        {title}
      </text>
      <text
        x={x + 9}
        y={y + 33}
        fontSize="11"
        fontFamily={mono ? MONO : undefined}
        fill="#000"
      >
        {detail}
      </text>
    </g>
  );
}

function Edge({
  x1,
  y1,
  x2,
  y2,
  on,
  color = PATH,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  on: boolean;
  color?: string;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={on ? color : IDLE}
      strokeWidth={on ? 2 : 1.2}
      strokeDasharray={on ? undefined : "3 3"}
      style={{ transition: "stroke 300ms" }}
    />
  );
}

function StepButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center hover:opacity-60 disabled:cursor-default disabled:opacity-25"
    >
      <svg
        viewBox="0 0 12 12"
        className="h-[11px] w-[11px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        {children}
      </svg>
    </button>
  );
}

export function FiberSearch() {
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [animate, setAnimate] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const autoplayed = useRef(false);

  useEffect(() => {
    setAnimate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(
      () => setPhase((p) => (p >= LAST ? 0 : p + 1)),
      STEP_MS,
    );
    return () => window.clearTimeout(timer);
  }, [playing, phase]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !autoplayed.current) {
          autoplayed.current = true;
          setPlaying(true);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((index: number) => {
    setPlaying(false);
    setPhase(Math.max(0, Math.min(LAST, index)));
  }, []);

  const dot = STOPS[phase]!;
  const found = phase >= FOUND_PHASE;

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label="How the page script finds the EditorView"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") goTo(phase + 1);
        if (event.key === "ArrowLeft") goTo(phase - 1);
      }}
      className="text-black outline-none focus-visible:ring-2 focus-visible:ring-[#3b7ff0] focus-visible:ring-offset-4"
    >
      <div className="flex items-center justify-end gap-[2px]">
        <span className="mr-[4px] text-[11px] tabular-nums opacity-60">
          {phase + 1} / {STOPS.length}
        </span>
        <StepButton
          label="Previous step"
          onClick={() => goTo(phase - 1)}
          disabled={phase === 0}
        >
          <path d="M7.5 2.5 4 6l3.5 3.5" />
        </StepButton>
        <button
          type="button"
          onClick={() => {
            setPlaying(!playing);
          }}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-[24px] cursor-pointer items-center gap-[5px] px-[6px] text-[11.7px] font-bold hover:opacity-60"
        >
          <svg
            viewBox="0 0 12 12"
            className="h-[9px] w-[9px]"
            fill="currentColor"
          >
            {playing ? (
              <path d="M3 2h2.2v8H3zM6.8 2H9v8H6.8z" />
            ) : (
              <path d="M3 1.8v8.4L10 6z" />
            )}
          </svg>
          {playing ? "Pause" : "Play"}
        </button>
        <StepButton
          label="Next step"
          onClick={() => goTo(phase + 1)}
          disabled={phase === LAST}
        >
          <path d="M4.5 2.5 8 6 4.5 9.5" />
        </StepButton>
      </div>
      <svg
        viewBox={`0 0 ${W} 328`}
        role="img"
        aria-label="The input bar was made by ProseMirror, a plain JavaScript library, and has no fiber. Its parent div was rendered by React and links to its fiber through a __reactFiber$ property. From there the search follows return up through EditorContent to Composer, whose ref holds the EditorView."
        className="block h-auto w-full"
        fontFamily="inherit"
      >
        {LEGEND.map((item, i) => (
          <g key={item.label}>
            <rect
              x={LEFT_X}
              y={6 + i * 18}
              width={14}
              height={10}
              fill={item.fill}
              stroke={item.stroke}
              strokeWidth="1.2"
              strokeDasharray={item.dashed ? "3 2" : undefined}
            />
            <text x={LEFT_X + 22} y={15 + i * 18} fontSize="11">
              {item.label}
            </text>
          </g>
        ))}

        {/* The input bar up to its parent, then across to the parent's fiber */}
        <Edge
          x1={LEFT_C}
          y1={rowTop(4)}
          x2={LEFT_C}
          y2={rowTop(3) + BOX_H}
          on={phase >= 1}
        />
        <text
          x={LEFT_C - 8}
          y={rowTop(4) - 6}
          textAnchor="end"
          fontSize="10.5"
          fontFamily={MONO}
          fill={IDLE}
        >
          parentElement
        </text>
        <Edge
          x1={LEFT_X + BOX_W}
          y1={rowMid(3)}
          x2={RIGHT_X}
          y2={rowMid(3)}
          on={phase >= 2}
        />
        <text
          x={W / 2}
          y={rowMid(3) - 7}
          fontSize="10.5"
          fontFamily={MONO}
          textAnchor="middle"
          fill={IDLE}
        >
          __reactFiber$
        </text>

        {/* Up the fibers through `return`; the search stops before the root */}
        {[3, 2, 1].map((row) => (
          <g key={row}>
            <Edge
              x1={RIGHT_C}
              y1={rowTop(row)}
              x2={RIGHT_C}
              y2={rowTop(row - 1) + BOX_H}
              on={row > 1 && phase >= 6 - row}
            />
            <text
              x={RIGHT_C - 8}
              y={rowTop(row) - 6}
              textAnchor="end"
              fontSize="10.5"
              fontFamily={MONO}
              fill={IDLE}
            >
              return
            </text>
          </g>
        ))}

        {/* The found view, pulled out of Composer's ref */}
        <g
          style={{
            opacity: phase === LAST ? 1 : 0,
            transition: "opacity 400ms",
          }}
        >
          <Edge
            x1={LEFT_X + BOX_W}
            y1={rowMid(1)}
            x2={RIGHT_X}
            y2={rowMid(1)}
            on
            color={FOUND}
          />
          <Box
            x={LEFT_X}
            y={rowTop(1)}
            title="EditorView"
            detail="state · dispatch · dom"
            mono
            stroke={FOUND}
            fill={FOUND_SOFT}
            bold
          />
        </g>

        <Box
          x={LEFT_X}
          y={rowTop(3)}
          title="<div>"
          detail="made by React"
          stroke={ELEMENT}
          fill={phase >= 1 ? ELEMENT_SOFT : "#fff"}
          bold={phase === 1}
        />
        <Box
          x={LEFT_X}
          y={rowTop(4)}
          title="#prompt-textarea"
          detail="ProseMirror (plain JS)"
          stroke={ELEMENT}
          fill={ELEMENT_SOFT}
          dashed
          bold={phase === 0}
        />

        {FIBERS.map((f) => {
          const reached = f.phase >= 0 && phase >= f.phase;
          const isFound = f.phase === FOUND_PHASE && found;
          return (
            <Box
              key={f.name}
              x={RIGHT_X}
              y={rowTop(f.row)}
              title={f.name}
              detail={
                isFound
                  ? "EditorView found"
                  : reached
                    ? "no EditorView"
                    : found
                      ? "never reached"
                      : "not checked yet"
              }
              stroke={isFound ? FOUND : FIBER}
              fill={isFound ? FOUND_SOFT : reached ? FIBER_SOFT : "#fff"}
              bold={phase === f.phase}
              dim={f.phase < 0 && found}
            />
          );
        })}

        <circle
          r="5"
          fill={found ? FOUND : PATH}
          stroke="#fff"
          strokeWidth="1.5"
          style={{
            transform: `translate(${dot.x}px, ${dot.y}px)`,
            // No slide when the loop jumps back to the start.
            transition:
              animate && phase > 0
                ? "transform 700ms ease-in-out, fill 300ms"
                : "none",
          }}
        />
      </svg>
      <p className="mt-[6px] text-center text-[11.7px] leading-[17px]">
        {CAPTIONS[phase]}
      </p>
    </div>
  );
}
