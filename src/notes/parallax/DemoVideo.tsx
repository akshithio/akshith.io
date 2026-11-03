"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const SRC = "/notes/parallax/demo.mp4";
const POSTER = "/notes/parallax/demo-poster.jpg";
const LENGTH = "1:58";
const IDLE_MS = 2000;

function clock(seconds: number) {
  const s = Math.max(0, Math.floor(seconds || 0));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-[24px] w-[24px] shrink-0 cursor-pointer items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/15 hover:text-white"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4">
        {children}
      </svg>
    </button>
  );
}

/**
 * The demo recording with its own controls, so every button sits in one bar.
 * Before the first play it shows the poster and a centred play button. The
 * expand button lifts the same <video> element into a centred overlay that is
 * larger than the column but smaller than the screen, so playback keeps its
 * position; Escape or a click on the backdrop puts it back. Fullscreen uses
 * the frame around the video so the bar stays visible.
 */
export function DemoVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const idle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  // The bar stays up while paused and fades out two seconds after the pointer stops moving.
  const wake = useCallback(() => {
    setActive(true);
    if (idle.current) clearTimeout(idle.current);
    idle.current = setTimeout(() => setActive(false), IDLE_MS);
  }, []);
  useEffect(() => () => {
    if (idle.current) clearTimeout(idle.current);
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    setStarted(true);
    if (v.paused) void v.play();
    else v.pause();
    wake();
  };

  const fullscreen = () => {
    const f = frame.current as (HTMLDivElement & { webkitRequestFullscreen?: () => void }) | null;
    const v = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (document.fullscreenElement) void document.exitFullscreen();
    else if (f?.requestFullscreen) void f.requestFullscreen();
    else if (f?.webkitRequestFullscreen) f.webkitRequestFullscreen();
    else v?.webkitEnterFullscreen?.(); // iPhone Safari only fullscreens the video itself
  };

  const showBar = started && (active || !playing);

  return (
    <div className="my-[2em] aspect-[2560/1654] w-full">
      <div
        onClick={(event) => {
          if (event.target === event.currentTarget) setExpanded(false);
        }}
        className={
          expanded
            ? "fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-[4vmin]"
            : "relative h-full w-full"
        }
      >
        <div
          ref={frame}
          onPointerMove={wake}
          onPointerLeave={() => setActive(false)}
          className={`relative overflow-hidden border border-black/15 bg-[#f4f4f2] [&:fullscreen]:border-0 [&:fullscreen]:bg-black ${
            expanded
              ? "aspect-[2560/1654] w-[min(88vw,calc(84vh*2560/1654))]"
              : "h-full w-full"
          } ${started && !showBar ? "cursor-none" : ""}`}
        >
          <video
            ref={video}
            className="block h-full w-full cursor-pointer object-contain"
            src={SRC}
            poster={POSTER}
            playsInline
            preload="none"
            onClick={toggle}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            onSeeked={(e) => setTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onVolumeChange={(e) => {
              setMuted(e.currentTarget.muted);
              setVolume(e.currentTarget.volume);
            }}
          />

          {!started && (
            <button
              type="button"
              onClick={toggle}
              aria-label="Play the Parallax demo"
              className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-white/10 transition-colors hover:bg-transparent"
            >
              <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white/90 text-black shadow-[0_1px_4px_rgba(0,0,0,0.2)] transition-transform group-hover:scale-105">
                <svg width="16" height="18" viewBox="0 0 16 18" aria-hidden="true" className="ml-[3px]">
                  <path d="M0 0 L16 9 L0 18 Z" fill="currentColor" />
                </svg>
              </span>
              <span className="absolute right-[8px] bottom-[8px] rounded-full bg-black/55 px-[7px] py-[2px] font-mono text-[10.8px] text-white">
                {LENGTH}
              </span>
            </button>
          )}

          {started && (
            <div
              className={`absolute inset-x-0 bottom-0 flex items-center gap-[6px] bg-gradient-to-t from-black/60 to-transparent px-[8px] pt-[18px] pb-[6px] transition-opacity duration-300 ${
                showBar ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <IconButton label={playing ? "Pause" : "Play"} onClick={toggle}>
                {playing ? (
                  <path d="M3.5 2 V10 M8.5 2 V10" strokeWidth="2" />
                ) : (
                  <path d="M3 1.5 L10 6 L3 10.5 Z" fill="currentColor" stroke="none" />
                )}
              </IconButton>
              <span className="shrink-0 font-mono text-[10.8px] text-white/90 tabular-nums">
                {clock(time)} / {duration ? clock(duration) : LENGTH}
              </span>
              <input
                type="range"
                aria-label="Seek"
                min={0}
                max={duration || 0}
                step={0.1}
                value={time}
                onChange={(e) => {
                  const v = video.current;
                  if (v) v.currentTime = Number(e.target.value);
                  setTime(Number(e.target.value));
                  wake();
                }}
                className="h-[3px] min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-white/30 accent-white [&::-moz-range-thumb]:h-[10px] [&::-moz-range-thumb]:w-[10px] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:h-[10px] [&::-webkit-slider-thumb]:w-[10px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                style={{
                  background: `linear-gradient(to right, rgba(255,255,255,0.9) ${duration ? (time / duration) * 100 : 0}%, rgba(255,255,255,0.3) 0)`,
                }}
              />
              {/* The volume slider opens upward from the speaker button while
                  the pointer or keyboard focus is on either of them. Dragging
                  it up from zero also unmutes, so the two controls never
                  disagree about whether sound is on. */}
              <div className="group/volume relative flex shrink-0">
                <div className="pointer-events-none absolute bottom-full left-1/2 hidden -translate-x-1/2 pb-[6px] group-focus-within/volume:pointer-events-auto group-focus-within/volume:flex group-hover/volume:pointer-events-auto group-hover/volume:flex">
                  <div className="flex h-[84px] w-[24px] items-center justify-center rounded-full bg-black/70">
                    <input
                      type="range"
                      aria-label="Volume"
                      aria-orientation="vertical"
                      min={0}
                      max={1}
                      step={0.05}
                      value={muted ? 0 : volume}
                      onChange={(e) => {
                        const v = video.current;
                        const next = Number(e.target.value);
                        if (v) {
                          v.volume = next;
                          v.muted = next === 0;
                        }
                        wake();
                      }}
                      className="h-[64px] w-[3px] cursor-pointer appearance-none rounded-full [direction:rtl] [writing-mode:vertical-lr] [&::-moz-range-thumb]:h-[10px] [&::-moz-range-thumb]:w-[10px] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:h-[10px] [&::-webkit-slider-thumb]:w-[10px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                      style={{
                        background: `linear-gradient(to top, rgba(255,255,255,0.9) ${(muted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) 0)`,
                      }}
                    />
                  </div>
                </div>
                <IconButton
                  label={muted ? "Unmute" : "Mute"}
                  onClick={() => {
                    const v = video.current;
                    if (v) v.muted = !v.muted;
                    wake();
                  }}
                >
                  <path d="M1.5 4.5 H3.5 L6.5 2 V10 L3.5 7.5 H1.5 Z" fill="currentColor" stroke="none" />
                  {/* Muted shows a cross; up to half volume shows one wave,
                      and above half a second, larger wave. */}
                  {muted || volume === 0 ? (
                    <path d="M8.5 4.5 L11 7 M11 4.5 L8.5 7" />
                  ) : (
                    <>
                      <path d="M8 4.3 Q9.2 6 8 7.7" />
                      {volume > 0.5 && <path d="M9.6 2.8 Q11.6 6 9.6 9.2" />}
                    </>
                  )}
                </IconButton>
              </div>
              <IconButton
                label={expanded ? "Shrink" : "Enlarge"}
                onClick={() => {
                  setExpanded((open) => !open);
                  wake();
                }}
              >
                {expanded ? <path d="M4 1 V4 H1 M8 11 V8 H11" /> : <path d="M1 4 V1 H4 M11 8 V11 H8" />}
              </IconButton>
              <IconButton label="Fullscreen" onClick={fullscreen}>
                <path d="M1 4 V1 H4 M8 1 H11 V4 M11 8 V11 H8 M4 11 H1 V8" />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
