"use client";

// The two figures in the Recognition section.
//
// Alignment: drag the face, or one of its points, and watch the solve.
// Margin: the distance axis the threshold slides along, with the numbers that
// were actually measured marked on it.

import { useEffect, useRef, useState } from "react";

const INK = "#000";
const ACCENT = "#0864c7";
const OK = "#14532d";
const WARN = "#8a6100";
const MUTED = "#6b6b6b";

/* ------------------------------------------------------------------ */
/* A 2D similarity transform, in SVG's matrix order.                    */
/* ------------------------------------------------------------------ */

type Mat = { a: number; b: number; c: number; d: number; e: number; f: number };
type Pt = { x: number; y: number };

const apply = (m: Mat, p: Pt): Pt => ({
  x: m.a * p.x + m.c * p.y + m.e,
  y: m.b * p.x + m.d * p.y + m.f,
});

/** m2 after m1. */
const mul = (m2: Mat, m1: Mat): Mat => ({
  a: m2.a * m1.a + m2.c * m1.b,
  b: m2.b * m1.a + m2.d * m1.b,
  c: m2.a * m1.c + m2.c * m1.d,
  d: m2.b * m1.c + m2.d * m1.d,
  e: m2.a * m1.e + m2.c * m1.f + m2.e,
  f: m2.b * m1.e + m2.d * m1.f + m2.f,
});

const matrix = (m: Mat) => `matrix(${m.a} ${m.b} ${m.c} ${m.d} ${m.e} ${m.f})`;

/**
 * The least-squares similarity taking `src` onto `dst`: one rotation, one
 * uniform scale, one translation, and nothing else. This is the same solve
 * the app does (Umeyama) before it hands a crop to the model — it cannot
 * stretch a face, only move, turn and resize it.
 */
function similarity(src: Pt[], dst: Pt[]): Mat {
  const n = src.length;
  const mean = (pts: Pt[]) => ({
    x: pts.reduce((s, p) => s + p.x, 0) / n,
    y: pts.reduce((s, p) => s + p.y, 0) / n,
  });
  const mp = mean(src);
  const mq = mean(dst);

  let varP = 0;
  let dot = 0;
  let cross = 0;
  for (let i = 0; i < n; i++) {
    const ax = src[i]!.x - mp.x;
    const ay = src[i]!.y - mp.y;
    const bx = dst[i]!.x - mq.x;
    const by = dst[i]!.y - mq.y;
    varP += ax * ax + ay * ay;
    dot += ax * bx + ay * by;
    cross += ax * by - ay * bx;
  }
  const sc = dot / varP;
  const ss = cross / varP;
  return {
    a: sc,
    b: ss,
    c: -ss,
    d: sc,
    e: mq.x - (sc * mp.x - ss * mp.y),
    f: mq.y - (ss * mp.x + sc * mp.y),
  };
}

/* ------------------------------------------------------------------ */
/* Figure 1 — alignment                                                 */
/* ------------------------------------------------------------------ */

/**
 * ArcFace's canonical five points, in the 112x112 crop the model is fed.
 * These are the real constants the app aligns against.
 */
const TEMPLATE: Pt[] = [
  { x: 38.2946, y: 51.6963 },
  { x: 73.5318, y: 51.5014 },
  { x: 56.0252, y: 71.7366 },
  { x: 41.5493, y: 92.3655 },
  { x: 70.7299, y: 92.2041 },
];

const FACE_CENTRE: Pt = { x: 56, y: 60 };
// Drawn at the column's own width, so 10px in the drawing is 10px on screen.
const AW = 360;
const PANEL = 148;
const LEFT: Pt = { x: 2, y: 22 };
const RIGHT: Pt = { x: AW - PANEL - 2, y: 22 };
const SANS_A = "Helvetica, Arial, sans-serif";

/** The schematic face, drawn once in template coordinates and reused. */
function FaceShape({ opacity = 1 }: { opacity?: number }) {
  const [le, re, nose, lm, rm] = TEMPLATE as [Pt, Pt, Pt, Pt, Pt];
  return (
    <g
      opacity={opacity}
      fill="none"
      stroke={INK}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    >
      <ellipse cx={FACE_CENTRE.x} cy={FACE_CENTRE.y} rx={33} ry={43} />
      <path d={`M${le.x - 9} ${le.y - 11}q9 -5 18 0`} />
      <path d={`M${re.x - 9} ${re.y - 11}q9 -5 18 0`} />
      <path d={`M${nose.x - 5} ${nose.y + 3}q5 4 10 0`} />
      <path d={`M${lm.x} ${lm.y}q${(rm.x - lm.x) / 2} 7 ${rm.x - lm.x} ${rm.y - lm.y}`} />
    </g>
  );
}

const NO_OFFSETS: Pt[] = TEMPLATE.map(() => ({ x: 0, y: 0 }));

/**
 * Drag the face, or any one of its five points, and watch the solve.
 *
 * The face itself is a rigid shape under a rotation, scale and offset: move
 * it, turn it or resize it and the crop on the right does not change, which
 * is the point of aligning. Dragging a single point is what a similarity
 * cannot absorb. The solve still finds the best fit, but the points can no
 * longer all land on the template, and the misses are drawn.
 * That leftover is the least-squares error the equation above minimises.
 */
export function Alignment() {
  const [tilt, setTilt] = useState(-16);
  const [size, setSize] = useState(0.8);
  const [shift, setShift] = useState<Pt>({ x: 0, y: 0 });
  const [offsets, setOffsets] = useState<Pt[]>(NO_OFFSETS);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const drag = useRef<{ what: number | "face"; start: Pt; from: Pt } | null>(null);

  const theta = (tilt * Math.PI) / 180;
  const pc = size * Math.cos(theta);
  const ps = size * Math.sin(theta);
  const centre = { x: LEFT.x + PANEL / 2 + shift.x, y: LEFT.y + PANEL / 2 + shift.y };
  const pose: Mat = {
    a: pc,
    b: ps,
    c: -ps,
    d: pc,
    e: centre.x - (pc * FACE_CENTRE.x - ps * FACE_CENTRE.y),
    f: centre.y - (ps * FACE_CENTRE.x + pc * FACE_CENTRE.y),
  };

  // What the detector reports: the pose's five points, each nudged by however
  // far the reader has dragged it.
  const detected = TEMPLATE.map((p, i) => {
    const q = apply(pose, p);
    return { x: q.x + offsets[i]!.x, y: q.y + offsets[i]!.y };
  });

  const k = PANEL / 112;
  const crop: Mat = { a: k, b: 0, c: 0, d: k, e: RIGHT.x, f: RIGHT.y };
  const targets = TEMPLATE.map((p) => apply(crop, p));

  // Solved from the five points alone, exactly as the app does it.
  const solved = similarity(detected, targets);
  const landed = detected.map((p) => apply(solved, p));
  const misses = landed.map((p, i) => Math.hypot(p.x - targets[i]!.x, p.y - targets[i]!.y) / k);

  // The solve in the equation's own terms, back in 112x112 crop pixels.
  const toCrop = mul({ a: 1 / k, b: 0, c: 0, d: 1 / k, e: -RIGHT.x / k, f: -RIGHT.y / k }, solved);
  const sSolved = Math.hypot(toCrop.a, toCrop.b);
  const thetaSolved = (Math.atan2(toCrop.b, toCrop.a) * 180) / Math.PI;

  // The right panel plays the solve rather than only showing its answer: it
  // starts with the face exactly as the camera saw it and applies t, then θ,
  // then s. Restarts whenever the face changes; held at the end for anyone
  // who has asked for less motion.
  const [progress, setProgress] = useState(1);
  const [paused, setPaused] = useState(false);
  const elapsed = useRef(0);

  // Any change to the face starts the solve again from the beginning.
  useEffect(() => {
    elapsed.current = 0;
  }, [tilt, size, shift, offsets]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    if (paused) return;
    const HOLD_START = 700;
    const PLAY = 2700;
    const HOLD_END = 4300;
    let last = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      elapsed.current += now - last;
      last = now;
      const t = elapsed.current % (HOLD_START + PLAY + HOLD_END);
      setProgress(Math.max(0, Math.min(1, (t - HOLD_START) / PLAY)));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused]);

  const ease = (u: number) => {
    const c = Math.max(0, Math.min(1, u));
    return c * c * (3 - 2 * c);
  };
  const stageT = ease(progress * 3);
  const stageR = ease(progress * 3 - 1);
  const stageS = ease(progress * 3 - 2);
  const stage = progress >= 1 ? 3 : Math.min(2, Math.floor(progress * 3));

  // Interpolated about the centroid of the detected points, so each stage is
  // exactly one of the equation's unknowns and the last frame is the solve.
  const centroid = {
    x: detected.reduce((sum, p) => sum + p.x, 0) / detected.length,
    y: detected.reduce((sum, p) => sum + p.y, 0) / detected.length,
  };
  const from = { x: centroid.x + RIGHT.x - LEFT.x, y: centroid.y + RIGHT.y - LEFT.y };
  const to = apply(solved, centroid);
  const angleNow = Math.atan2(solved.b, solved.a) * stageR;
  const scaleNow = 1 + (Math.hypot(solved.a, solved.b) - 1) * stageS;
  const at = { x: from.x + (to.x - from.x) * stageT, y: from.y + (to.y - from.y) * stageT };
  const ma = scaleNow * Math.cos(angleNow);
  const mb = scaleNow * Math.sin(angleNow);
  const playing: Mat = {
    a: ma,
    b: mb,
    c: -mb,
    d: ma,
    e: at.x - (ma * centroid.x - mb * centroid.y),
    f: at.y - (mb * centroid.x + ma * centroid.y),
  };
  const moving = detected.map((p) => apply(playing, p));

  const point = (event: React.PointerEvent): Pt => {
    const svg = svgRef.current!;
    const m = svg.getScreenCTM()!.inverse();
    const p = new DOMPoint(event.clientX, event.clientY).matrixTransform(m);
    return { x: p.x, y: p.y };
  };
  const begin = (what: number | "face") => (event: React.PointerEvent) => {
    event.preventDefault();
    (event.target as Element).setPointerCapture(event.pointerId);
    drag.current = {
      what,
      start: point(event),
      from: what === "face" ? shift : offsets[what as number]!,
    };
  };
  const move = (event: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const p = point(event);
    const moved = { x: d.from.x + p.x - d.start.x, y: d.from.y + p.y - d.start.y };
    if (d.what === "face") {
      const lim = PANEL / 2 - 30;
      setShift({ x: Math.max(-lim, Math.min(lim, moved.x)), y: Math.max(-lim, Math.min(lim, moved.y)) });
    } else {
      const i = d.what;
      setOffsets((prev) => prev.map((o, j) => (j === i ? {
        x: Math.max(-30, Math.min(30, moved.x)),
        y: Math.max(-30, Math.min(30, moved.y)),
      } : o)));
    }
  };
  const end = () => { drag.current = null; };
  const bent = offsets.some((o) => o.x !== 0 || o.y !== 0);

  return (
    <div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${AW} ${PANEL + 42}`}
        className="block h-auto w-full touch-none select-none"
        fontFamily={SANS_A}
        onPointerMove={move}
        onPointerUp={end}
        onPointerCancel={end}
      >
        <text x={LEFT.x} y={13} fontSize="10" fill={MUTED}>what the camera saw</text>
        <text x={RIGHT.x} y={13} fontSize="10" fill={MUTED}>the 112&times;112 crop</text>

        <defs>
          <clipPath id="align-left"><rect x={LEFT.x} y={LEFT.y} width={PANEL} height={PANEL} /></clipPath>
          <clipPath id="align-right"><rect x={RIGHT.x} y={RIGHT.y} width={PANEL} height={PANEL} /></clipPath>
        </defs>
        <g fill="none" stroke={INK} strokeWidth="1">
          <rect x={LEFT.x} y={LEFT.y} width={PANEL} height={PANEL} />
          <rect x={RIGHT.x} y={RIGHT.y} width={PANEL} height={PANEL} />
        </g>

        {/* The arrow between them is the transform. */}
        <path d={`M${LEFT.x + PANEL + 8} ${LEFT.y + PANEL / 2} H${RIGHT.x - 8}`} stroke={ACCENT} strokeWidth="1" />
        <path d={`M${RIGHT.x - 13} ${LEFT.y + PANEL / 2 - 4} L${RIGHT.x - 7} ${LEFT.y + PANEL / 2} L${RIGHT.x - 13} ${LEFT.y + PANEL / 2 + 4}`}
          fill="none" stroke={ACCENT} strokeWidth="1" />

        {/* Left: the face as seen, draggable as a whole and point by point. */}
        <g clipPath="url(#align-left)">
          <g transform={matrix(pose)} style={{ cursor: "grab" }} onPointerDown={begin("face")}>
            <ellipse cx={FACE_CENTRE.x} cy={FACE_CENTRE.y} rx={33} ry={43} fill="transparent" />
            <FaceShape />
          </g>
          {detected.map((p, i) => (
            <g key={i} style={{ cursor: "grab" }} onPointerDown={begin(i)}>
              <circle cx={p.x} cy={p.y} r={9} fill="transparent" />
              <circle cx={p.x} cy={p.y} r={3.2} fill={ACCENT} />
            </g>
          ))}
        </g>

        {/* Right: the solve, played. Targets fixed; the face travels to them. */}
        <g clipPath="url(#align-right)">
          <g transform={matrix(mul(playing, pose))}>
            <FaceShape opacity={bent && stage === 3 ? 0.35 : 1} />
          </g>
          {targets.map((t, i) => (
            <circle key={i} cx={t.x} cy={t.y} r={4.2} fill="none" stroke={MUTED} strokeWidth="1" />
          ))}
          {moving.map((p, i) => {
            const missed = stage === 3 && misses[i]! > 0.4;
            return (
              <g key={i}>
                {missed && (
                  <path d={`M${targets[i]!.x} ${targets[i]!.y} L${p.x} ${p.y}`} stroke={WARN} strokeWidth="1.2" />
                )}
                <circle cx={p.x} cy={p.y} r={2.6} fill={missed ? WARN : ACCENT} />
              </g>
            );
          })}
        </g>

        {/* Which unknown is being applied right now. */}
        {(["translate t", "rotate \u03b8", "scale s"] as const).map((label, i) => (
          <text
            key={label}
            x={RIGHT.x + (PANEL / 3) * i + PANEL / 6}
            y={RIGHT.y + PANEL + 15}
            fontSize="10"
            textAnchor="middle"
            fill={stage === i ? ACCENT : MUTED}
            fontWeight={stage === i ? "bold" : "normal"}
            opacity={stage === i || stage === 3 ? 1 : 0.6}
          >
            {label}
          </text>
        ))}
      </svg>

      <div className="mt-[8px] flex flex-wrap items-center gap-x-[16px] gap-y-[6px] text-[10.5px]">
        <label className="flex items-center gap-[7px]">
          <span style={{ color: MUTED }}>tilt</span>
          <input type="range" min={-32} max={32} value={tilt}
            onChange={(e) => setTilt(Number(e.target.value))}
            className="h-[3px] w-[90px] cursor-pointer accent-black"
            aria-label="How far the detected face is tilted" />
        </label>
        <label className="flex items-center gap-[7px]">
          <span style={{ color: MUTED }}>distance</span>
          <input type="range" min={55} max={100} value={Math.round(size * 100)}
            onChange={(e) => setSize(Number(e.target.value) / 100)}
            className="h-[3px] w-[90px] cursor-pointer accent-black"
            aria-label="How large the detected face is" />
        </label>

      </div>
      <div className="mt-[6px] font-mono text-[10.5px] leading-[15px] whitespace-nowrap tabular-nums">
        &theta; = {thetaSolved.toFixed(1)}&deg;&nbsp;&nbsp;s = {sSolved.toFixed(2)}&nbsp;&nbsp;t = ({toCrop.e.toFixed(0)}, {toCrop.f.toFixed(0)})
      </div>
      <div className="mt-[4px] flex items-center gap-[7px] text-[9px] leading-[13.5px]">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play" : "Pause"}
          className="flex h-[14px] w-[14px] shrink-0 cursor-pointer items-center justify-center bg-black text-white"
        >
          <svg viewBox="0 0 12 12" className="h-[7px] w-[7px]" fill="currentColor" aria-hidden>
            {paused ? <path d="M3 1.5 10.5 6 3 10.5Z" /> : <path d="M2.5 1.5h2.6v9H2.5zM6.9 1.5h2.6v9H6.9z" />}
          </svg>
        </button>
        <span>
          the similarity transform shown visually
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Figure 2 — the margin                                                */
/* ------------------------------------------------------------------ */

const D_MIN = 0.35;
const D_MAX = 0.85;
// Drawn at the column's own width, so 10px in the drawing is 10px on screen.
const MW = 360;
const AX0 = 12;
const AX1 = MW - 12;
const dx = (d: number) => AX0 + ((d - D_MIN) / (D_MAX - D_MIN)) * (AX1 - AX0);

/** Everything marked here was measured; nothing between is interpolated. */
const STRICT = 0.45;
const LOOSE = 0.7;
const NEAREST_IMPOSTOR = 0.758;

const SANS = "Helvetica, Arial, sans-serif";

/**
 * Measured, not interpolated: every threshold from 0.38 to 0.82 in steps of
 * 0.01, over the 767 LFW DevTest pairs (377 same person, 390 different) that
 * MacID's own pipeline could detect a face in. Percent accepted at each step.
 */
const CURVE_FROM = 38;
const YOU_ACCEPTED = [47.5, 52.0, 56.0, 59.9, 62.3, 64.7, 67.9, 70.6, 73.5, 76.4, 78.2, 79.8, 83.3, 85.7, 88.1, 89.4, 91.0, 91.5, 92.3, 92.8, 94.2, 95.0, 96.3, 96.8, 97.6, 97.6, 97.6, 97.6, 97.9, 97.9, 98.1, 98.4, 98.4, 98.7, 98.7, 98.7, 98.7, 98.7, 98.9, 98.9, 98.9, 98.9, 98.9, 99.2, 99.5];
const STRANGERS_ACCEPTED = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3, 0.3, 0.3, 0.3, 0.5, 0.8, 0.8];

export function Margin() {
  const [threshold, setThreshold] = useState(0.58);
  const t = dx(threshold);

  // Only the two measured anchors are stated as numbers; between and beyond
  // them the sentence says what is known and no more.
  const i = Math.round(threshold * 100) - CURVE_FROM;
  const youPct = YOU_ACCEPTED[i] ?? 0;
  const strangerPct = STRANGERS_ACCEPTED[i] ?? 0;
  const safe = strangerPct === 0;
  // Kept short enough to stay on one line at the column's width in every case.
  const strangers = safe
    ? "no stranger in 767 pairs gets in"
    : `${strangerPct.toFixed(1)}% of strangers get in`;

  const AXIS = 44;

  return (
    <div>
      <svg viewBox={`0 0 ${MW} 84`} className="block h-auto w-full" fontFamily={SANS}>
        {/* The range the app's slider covers, and nothing else shaded. */}
        <rect x={dx(STRICT)} y={20} width={dx(LOOSE) - dx(STRICT)} height={AXIS - 20} fill={ACCENT} opacity={0.08} />
        <text x={dx(STRICT)} y={14} fontSize="9.5" fill={ACCENT}>Secure</text>
        <text x={dx(LOOSE)} y={14} fontSize="9.5" fill={ACCENT} textAnchor="end">Convenient</text>

        {/* The closest stranger in the whole set. */}
        <circle cx={dx(NEAREST_IMPOSTOR)} cy={AXIS} r={3} fill={WARN} />
        <text x={AX1} y={AXIS - 8} fontSize="9.5" fill={WARN} textAnchor="end">closest stranger</text>

        {/* The threshold. */}
        <path d={`M${t} 18 V${AXIS + 5}`} stroke={safe ? OK : WARN} strokeWidth="1.5" />

        <path d={`M${AX0} ${AXIS} H${AX1}`} stroke={INK} strokeWidth="1" />
        {[0.4, 0.5, 0.6, 0.7, 0.8].map((d) => (
          <g key={d}>
            <path d={`M${dx(d)} ${AXIS} V${AXIS + 4}`} stroke={MUTED} strokeWidth="1" />
            <text x={dx(d)} y={AXIS + 14} fontSize="9" fill={MUTED} textAnchor="middle">{d.toFixed(1)}</text>
          </g>
        ))}
        <text x={AX0} y={80} fontSize="9.5" fill={MUTED}>&larr; same person</text>
        <text x={AX1} y={80} fontSize="9.5" fill={MUTED} textAnchor="end">different people &rarr;</text>
      </svg>

      <div className="mt-[8px] flex flex-wrap items-center gap-x-[14px] gap-y-[6px] text-[11px] leading-[15px]">
        <label className="flex items-center gap-[7px]">
          <span style={{ color: MUTED }}>threshold</span>
          <input
            type="range"
            min={38}
            max={82}
            value={Math.round(threshold * 100)}
            onChange={(e) => setThreshold(Number(e.target.value) / 100)}
            className="h-[3px] w-[140px] cursor-pointer accent-black"
            aria-label="Match threshold"
          />
          <span className="font-mono tabular-nums">{threshold.toFixed(2)}</span>
        </label>
      </div>
      <div className="mt-[5px] text-[10.5px] leading-[15px] whitespace-nowrap">
        Recognizes you {youPct.toFixed(1)}% of the time,{" "}
        <span style={{ color: safe ? OK : WARN }}>{strangers}</span>
      </div>
    </div>
  );
}
