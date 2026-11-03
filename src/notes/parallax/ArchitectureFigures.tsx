"use client";

// The two figures in the architecture part of the Parallax note: the pieces
// and how they connect, and a normal request next to a WebSocket.

import { useEffect, useState } from "react";

// Same colours as the turn figure: blue for a message going out from the
// desktop app, orange for one coming back.
const OUT = "#3b7ff0";
const BACK = "#e8862a";
const FRAME = "border border-black bg-white text-black";

// One colour per piece, used for its outline, its title and the line that
// leaves it, so the reader can follow a piece through the figure.
const DESK = "#2f5bd3";
const DESK_SOFT = "#e3eafb";
const EXT = "#b4531c";
const EXT_SOFT = "#f8e7dc";
const GPT = "#187a55";
const GPT_SOFT = "#dcf1e7";
const WIRE = "#7a3fb8";

export function ArchitectureDiagram() {
  return (
    <div className={FRAME}>
      <svg
        viewBox="0 0 520 300"
        role="img"
        aria-label="The desktop app's renderer and main process talk over IPC. The main process connects to the extension's service worker over a WebSocket on localhost:8765. The service worker talks to the scripts in a ChatGPT tab, and the tab talks to chatgpt.com over HTTPS."
        className="block h-auto w-full"
        fontFamily="inherit"
      >
        {/* Desktop app, the left column */}
        <rect x="12" y="20" width="188" height="262" fill={DESK_SOFT} stroke={DESK} strokeWidth="1.5" />
        <text x="106" y="45" textAnchor="middle" fontSize="14" fontWeight="700" fill={DESK}>
          Desktop app
        </text>
        <rect x="28" y="62" width="156" height="54" fill="#ffffff" stroke={DESK} />
        <text x="106" y="85" textAnchor="middle" fontSize="13" fontWeight="700">
          Renderer
        </text>
        <text x="106" y="103" textAnchor="middle" fontSize="11">
          the window you see
        </text>
        <line x1="106" y1="116" x2="106" y2="210" stroke={DESK} strokeWidth="2" />
        <text x="114" y="167" fontSize="11" fontWeight="700" fill={DESK}>
          IPC
        </text>
        <rect x="28" y="210" width="156" height="54" fill="#ffffff" stroke={DESK} />
        <text x="106" y="233" textAnchor="middle" fontSize="13" fontWeight="700">
          Main process
        </text>
        <text x="106" y="251" textAnchor="middle" fontSize="11">
          files and commands
        </text>

        {/* The WebSocket between the columns */}
        <line x1="184" y1="237" x2="330" y2="237" stroke={WIRE} strokeWidth="2.5" strokeDasharray="7 5" />
        <text x="257" y="226" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={WIRE}>
          WebSocket
        </text>
        <text x="257" y="256" textAnchor="middle" fontSize="11" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fill={WIRE}>
          localhost:8765
        </text>

        {/* The browser side, the right column, from ChatGPT down to the worker */}
        <rect x="330" y="20" width="178" height="62" fill={GPT_SOFT} stroke={GPT} strokeWidth="1.5" />
        <text x="419" y="47" textAnchor="middle" fontSize="14" fontWeight="700" fill={GPT}>
          chatgpt.com
        </text>
        <text x="419" y="66" textAnchor="middle" fontSize="11">
          the model
        </text>
        <line x1="419" y1="82" x2="419" y2="112" stroke={GPT} strokeWidth="2" />
        <text x="427" y="101" fontSize="11" fontWeight="700" fill={GPT}>
          HTTPS
        </text>
        <rect x="330" y="112" width="178" height="76" fill={EXT_SOFT} stroke={EXT} strokeWidth="1.5" />
        <text x="419" y="135" textAnchor="middle" fontSize="14" fontWeight="700" fill={EXT}>
          ChatGPT tab
        </text>
        <text x="419" y="155" textAnchor="middle" fontSize="10.5">
          content script: reads and clicks
        </text>
        <text x="419" y="172" textAnchor="middle" fontSize="10.5">
          page script: editor and network
        </text>
        <line x1="419" y1="188" x2="419" y2="210" stroke={EXT} strokeWidth="2" />
        <rect x="330" y="210" width="178" height="72" fill={EXT_SOFT} stroke={EXT} strokeWidth="1.5" />
        <text x="419" y="233" textAnchor="middle" fontSize="14" fontWeight="700" fill={EXT}>
          Service worker
        </text>
        <text x="419" y="251" textAnchor="middle" fontSize="11">
          extension background
        </text>
        <text x="419" y="268" textAnchor="middle" fontSize="11">
          thread → tab map
        </text>
      </svg>
    </div>
  );
}

type Packet = { dir: "out" | "back"; label: string };
type HttpStep = Packet | { state: "closed" };

const HTTP_STEPS: HttpStep[] = [
  { dir: "out", label: "GET /page" },
  { dir: "back", label: "200 OK + page" },
  { state: "closed" },
];

const SOCKET_STEPS: Packet[] = [
  { dir: "out", label: "send_message" },
  { dir: "back", label: "stream_update" },
  { dir: "back", label: "stream_update" },
  { dir: "back", label: "stream_update" },
  { dir: "back", label: "response" },
  { dir: "out", label: "ping" },
  { dir: "back", label: "pong" },
];

const TICK_MS = 1500;

function Lane({
  left,
  right,
  packet,
  tick,
  lineOpen,
  lineColor,
  status,
  moving,
}: {
  left: string;
  right: string;
  packet: Packet | null;
  tick: number;
  lineOpen: boolean;
  lineColor: string;
  status: string;
  moving: boolean;
}) {
  const color = packet?.dir === "out" ? OUT : BACK;
  const animation = moving
    ? `${packet?.dir === "out" ? "plx-ltr" : "plx-rtl"} ${TICK_MS - 150}ms ease-in-out forwards`
    : undefined;
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-[8px]">
      <div className="border border-black px-[8px] py-[4px] text-[11px] font-bold">
        {left}
      </div>
      <div className="relative h-[46px]">
        <div
          className="absolute inset-x-0 top-1/2 border-t-2 transition-opacity duration-300"
          style={{
            borderColor: lineColor,
            borderStyle: lineOpen ? "solid" : "dashed",
            opacity: lineOpen ? 1 : 0.25,
          }}
        />
        {packet ? (
          <>
            {/* The label stays centred over the line so it never runs into
                the end boxes; only the dot travels. */}
            <div
              className="absolute inset-x-0 top-[2px] text-center font-mono text-[10.8px] font-bold whitespace-nowrap"
              style={{ color }}
            >
              {packet.dir === "out" ? `${packet.label} →` : `← ${packet.label}`}
            </div>
            <div
              key={tick}
              className="absolute top-1/2"
              style={{
                left:
                  packet.dir === "out"
                    ? moving
                      ? "0%"
                      : "50%"
                    : moving
                      ? "100%"
                      : "50%",
                animation,
              }}
            >
              <div
                className="h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2"
                style={{ backgroundColor: color }}
              />
            </div>
          </>
        ) : null}
        <div className="absolute inset-x-0 top-[30px] text-center text-[10.8px]">
          {status}
        </div>
      </div>
      <div className="border border-black px-[8px] py-[4px] text-[11px] font-bold">
        {right}
      </div>
    </div>
  );
}

export function RequestVsSocket() {
  const [tick, setTick] = useState(0);
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setMoving(true);
    const timer = window.setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => window.clearInterval(timer);
  }, []);

  const http = HTTP_STEPS[tick % HTTP_STEPS.length]!;
  const httpClosed = "state" in http;
  const socket = SOCKET_STEPS[tick % SOCKET_STEPS.length]!;

  return (
    <div className={FRAME}>
      <style>{`
        @keyframes plx-ltr { from { left: 0% } to { left: 100% } }
        @keyframes plx-rtl { from { left: 100% } to { left: 0% } }
      `}</style>
      <div className="border-b border-black px-[12px] py-[8px]">
        <div className="text-[11.7px] font-bold">Normal request</div>
        <div className="text-[11px]">
          One question, one answer, line closed. The server has to wait to be
          asked.
        </div>
        <div className="mt-[6px]">
          <Lane
            left="Browser"
            right="Server"
            packet={httpClosed ? null : http}
            tick={tick}
            lineOpen={!httpClosed}
            lineColor="#000000"
            status={httpClosed ? "connection closed" : ""}
            moving={moving}
          />
        </div>
      </div>
      <div className="px-[12px] py-[8px]">
        <div className="text-[11.7px] font-bold">WebSocket</div>
        <div className="text-[11px]">
          One connection that stays open. Both sides push messages whenever they
          have something to say.
        </div>
        <div className="mt-[6px]">
          <Lane
            left="Desktop app"
            right="Extension"
            packet={socket}
            tick={tick}
            lineOpen
            lineColor="#000000"
            status="stays open"
            moving={moving}
          />
        </div>
      </div>
    </div>
  );
}
