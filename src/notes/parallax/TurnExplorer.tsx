"use client";

// The three figures in the Parallax note, sharing one parser and one sample
// reply: the route a turn takes, the tag parser, and the permission gate.

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { highlightCode, highlightPrompt } from "./syntax";

type Decision = "approved" | "denied";
type Level = "auto-review" | "approve" | "full-access";

type Action = {
  kind: string;
  attributes: Record<string, string>;
  body: string;
};

const OUT = "#3b7ff0";
const BACK = "#e8862a";

export const SAMPLE_REPLY = `{plx:note}Checking the layout and the test script before running anything.{/plx:note}
{plx:run}ls -la{/plx:run}
{plx:run}sed -n '1,40p' package.json{/plx:run}
{plx:run approval="required"}pnpm test{/plx:run}`;

// Same grammar as the desktop parser: seven tag names, self-closing or paired,
// close tag matched to its opener, whitespace allowed inside the close tag.
const TAG =
  /\{\s*plx:(note|read|list|search|run|write|done)\b([^}]*?)(?:\/\}|\}([\s\S]*?)\{\s*\/\s*plx:\1\s*\})/g;

const KIND_COLOR: Record<string, string> = {
  note: "#000000",
  read: OUT,
  list: OUT,
  search: OUT,
  run: BACK,
  write: "#e5484d",
  done: "#8757ec",
};

const READ_ONLY_BINARIES = new Set([
  "ls",
  "cat",
  "head",
  "tail",
  "rg",
  "grep",
  "wc",
  "pwd",
  "sed",
  "find",
  "git",
]);

function isReadOnlyCommand(command: string): boolean {
  if (/[;&|><`$(){}\n]/.test(command)) return false;
  const [binary, ...args] = command.trim().split(/\s+/);
  if (!binary || !READ_ONLY_BINARIES.has(binary)) return false;
  if (binary === "sed" && args.some((arg) => arg.startsWith("-i")))
    return false;
  if (
    binary === "find" &&
    args.some((arg) => ["-delete", "-exec", "-execdir"].includes(arg))
  )
    return false;
  if (
    binary === "git" &&
    !["status", "log", "diff", "show"].includes(args[0] ?? "")
  )
    return false;
  return true;
}

function parse(text: string): Action[] {
  return [...text.matchAll(TAG)].map((match) => {
    const attributes = Object.fromEntries(
      [...(match[2] ?? "").matchAll(/(\w+)\s*=\s*"([^"]*)"/g)].map((pair) => [
        pair[1] ?? "",
        pair[2] ?? "",
      ]),
    );
    return {
      kind: match[1] ?? "",
      attributes,
      body: (match[3] ?? attributes.command ?? attributes.text ?? "").trim(),
    };
  });
}

const isTool = (action: Action) =>
  action.kind !== "note" && action.kind !== "done";

function needsApproval(action: Action, level: Level): boolean {
  if (action.kind !== "run" && action.kind !== "write") return false;
  if (level === "full-access") return false;
  if (level === "approve") return true;
  return action.attributes.approval === "required";
}

// Stand-in output, only so the gate figure has something to send back.
function standInOutput(action: Action): string {
  if (action.kind === "run") {
    if (action.body.startsWith("ls"))
      return `$ ${action.body}\npackage.json  src  test  tsconfig.json\n[exit 0]`;
    if (action.body.includes("package.json"))
      return `$ ${action.body}\n{ "scripts": { "test": "vitest run" } }\n[exit 0]`;
    if (action.body.includes("test"))
      return `$ ${action.body}\n✓ 12 passed\n[exit 0]`;
    return `$ ${action.body}\n[exit 0]`;
  }
  if (action.kind === "write")
    return `Wrote ${action.attributes.path ?? "file"}.`;
  if (action.kind === "read")
    return `(contents of ${action.attributes.path ?? "file"})`;
  if (action.kind === "list") return "package.json\nsrc/\ntest/";
  if (action.kind === "search")
    return `${action.attributes.path ?? "."}:12: match`;
  return "";
}

const CODE =
  "m-0 p-[12px] text-[11.7px] leading-[17px] whitespace-pre-wrap break-words";
const FRAME = "border border-black bg-white text-black";

function Panel({
  label,
  aside,
  children,
}: {
  label: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-black">
      <div className="flex items-center justify-between gap-[10px] px-[12px] py-[6px] text-[11.7px]">
        <span className="font-bold">{label}</span>
        {aside ? <span className="text-right">{aside}</span> : null}
      </div>
      {children}
    </div>
  );
}

function ActionRow({
  action,
  status,
  detail,
  children,
}: {
  action: Action;
  status?: string;
  detail?: string;
  children?: ReactNode;
}) {
  return (
    <li
      className={`m-0 flex items-center gap-[10px] border-b border-black/15 px-[12px] py-[6px] last:border-b-0 ${status === "dropped" ? "opacity-40" : ""}`}
    >
      <span
        className="w-[42px] shrink-0 py-[1px] text-center text-[11px] font-bold text-white"
        style={{ backgroundColor: KIND_COLOR[action.kind] ?? "#000" }}
      >
        {action.kind}
      </span>
      <span
        className={`min-w-0 flex-1 truncate text-[12.6px] ${status === "dropped" ? "line-through" : ""}`}
      >
        {action.body}
      </span>
      {children ?? (
        <span className="shrink-0 text-[11.7px] font-bold">
          {detail ?? status}
        </span>
      )}
    </li>
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

/* ---------------------------------------------------------------- route --- */

// One turn drawn as a sequence diagram: a lifeline for each piece, and one row
// per step, either a message from one piece to another or something a piece
// does on its own. Rows draw in as the turn plays; later rows stay faint so the
// whole route is visible before it starts.

const LANES = [
  { name: "Desktop app", role: "Electron", color: "#2f5bd3" },
  { name: "Extension", role: "service worker", color: "#b4531c" },
  { name: "ChatGPT tab", role: "content + page script", color: "#b4531c" },
  { name: "chatgpt.com", role: "the model", color: "#187a55" },
];

type RouteStep = {
  title: string;
  text: string;
  payload?: string;
} & (
  | { kind: "message"; from: number; to: number; label: string; hidden?: boolean }
  | { kind: "local"; at: number; label: string }
);

const ROUTE: RouteStep[] = [
  {
    kind: "local",
    at: 0,
    label: "build the full prompt",
    title: "Build the full prompt",
    text: "Your text is wrapped in {plx:task}. Parallax's system prompt is appended after it, all in the same chat message, while the thread itself shows only what you typed.",
    payload: "{plx:task}\nlook through this project\n{/plx:task}\n\nYou are Parallax's planner in a desktop coding harness. …",
  },
  {
    kind: "message",
    from: 0,
    to: 1,
    label: "send_message",
    title: "Over the WebSocket",
    text: "The main process sends the full prompt to the extension's service worker over the WebSocket on localhost:8765.",
    payload: '{ "type": "send_message", ... }',
  },
  {
    kind: "message",
    from: 1,
    to: 2,
    label: "type + send",
    title: "Into the thread's tab",
    text: "The worker hands the text to the content script in this thread's background tab. The page script replaces the contents of ProseMirror's EditorView in one transaction and clicks send.",
  },
  {
    kind: "message",
    from: 2,
    to: 3,
    label: "POST /conversation",
    title: "ChatGPT receives a message",
    text: "ChatGPT's own code sends the message to OpenAI's servers. To ChatGPT, this is a person typing.",
  },
  {
    kind: "message",
    from: 3,
    to: 2,
    label: "event stream",
    title: "The answer streams back",
    text: "ChatGPT streams its reply as small edits. The page script's copy of fetch reads every stream the page opens, rebuilds the reply from those edits and skips the model's reasoning.",
    payload: "{plx:note}Checking the layout first.{/plx:note}\n{plx:run}ls -la{/plx:run}",
  },
  {
    kind: "message",
    from: 2,
    to: 1,
    label: "answer so far",
    title: "Up through the extension",
    text: "The page script posts the whole answer so far to the content script, which forwards it to the service worker.",
  },
  {
    kind: "message",
    from: 1,
    to: 0,
    label: "stream_update",
    title: "Back to the desktop",
    text: "The service worker sends the answer so far to the desktop app over the WebSocket.",
    payload: '{ "type": "stream_update", ... }',
  },
  {
    kind: "local",
    at: 0,
    label: "parse tags, run commands",
    title: "Parse and run",
    text: "The desktop app parses the tags in the reply and runs the commands on your computer. Here that is the ls -la ChatGPT asked for.",
    payload: "$ ls -la\ntotal 48\ndrwxr-xr-x  12 you  staff   384 Oct 14 17:31 .\n…\n[exit 0]",
  },
  {
    kind: "message",
    from: 0,
    to: 3,
    label: "{plx:result} · hidden",
    hidden: true,
    title: "Results go back as a hidden message",
    text: "The output travels the same route to ChatGPT, as a message that never appears in your thread. ChatGPT answers with more actions, and the round repeats.",
    payload: '{plx:result action="run" status="ok"}\n$ ls -la\n…\n{/plx:result}',
  },
  {
    kind: "message",
    from: 3,
    to: 0,
    label: "{plx:done}",
    title: "A final answer",
    text: "Rounds repeat until ChatGPT replies with {plx:done} instead of actions.",
    payload: "{plx:done}This is a pnpm monorepo with an Electron desktop app and a Chrome extension. …{/plx:done}",
  },
  {
    kind: "local",
    at: 0,
    label: "show the answer",
    title: "The answer appears in your thread",
    text: "The desktop strips the tags and shows the final answer. The background tab keeps the whole conversation for the thread's next message.",
  },
];

const ROUTE_MS = 5400;
const W = 480;
const LANE_X = [58, 178, 300, 422];
const TOP = 70;
const ROW = 30;
const rowY = (index: number) => TOP + index * ROW;
const H = rowY(ROUTE.length - 1) + 22;
const LOOP_FIRST = 7;
const LOOP_LAST = 8;

function RouteRow({
  step,
  index,
  state,
  animate,
  onSelect,
}: {
  step: RouteStep;
  index: number;
  state: "done" | "current" | "ahead";
  animate: boolean;
  onSelect: () => void;
}) {
  const y = rowY(index);
  const opacity = state === "ahead" ? 0.16 : state === "done" ? 0.5 : 1;

  if (step.kind === "local") {
    const x = LANE_X[step.at]!;
    const width = step.label.length * 5.4 + 14;
    return (
      <g onClick={onSelect} className="cursor-pointer" opacity={opacity}>
        <rect x={0} y={y - ROW / 2} width={W} height={ROW} fill="transparent" />
        <rect x={x - 4} y={y - 4} width={8} height={8} fill="#000" />
        <rect
          x={x + 9}
          y={y - 8}
          width={width}
          height={16}
          rx={8}
          fill={state === "current" ? "#000" : "#ffffff"}
          stroke="#000"
          strokeWidth={0.8}
        />
        <text
          x={x + 16}
          y={y + 3.5}
          fontSize={10}
          fill={state === "current" ? "#ffffff" : "#000"}
        >
          {step.label}
        </text>
      </g>
    );
  }

  const out = step.to > step.from;
  const color = out ? OUT : BACK;
  const x1 = LANE_X[step.from]! + (out ? 5 : -5);
  const x2 = LANE_X[step.to]! + (out ? -7 : 7);
  const head = out
    ? `${x2},${y - 4} ${x2 + 7},${y} ${x2},${y + 4}`
    : `${x2},${y - 4} ${x2 - 7},${y} ${x2},${y + 4}`;
  const drawing = animate && state === "current";

  return (
    <g onClick={onSelect} className="cursor-pointer" opacity={opacity}>
      <rect x={0} y={y - ROW / 2} width={W} height={ROW} fill="transparent" />
      <line
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        stroke={color}
        strokeWidth={state === "current" ? 2.2 : 1.4}
        strokeDasharray={step.hidden ? "5 4" : undefined}
      >
        {drawing && (
          <animate attributeName="x2" from={x1} to={x2} dur="0.9s" fill="freeze" />
        )}
      </line>
      <polygon points={head} fill={color}>
        {drawing && (
          <animate
            attributeName="opacity"
            values="0;0;1"
            keyTimes="0;0.95;1"
            dur="0.9s"
            fill="freeze"
          />
        )}
      </polygon>
      {drawing && (
        <circle cy={y} r={4.5} fill={color}>
          <animate attributeName="cx" from={x1} to={x2} dur="0.9s" fill="freeze" />
          <animate
            attributeName="opacity"
            values="1;1;0"
            keyTimes="0;0.85;1"
            dur="0.9s"
            fill="freeze"
          />
        </circle>
      )}
      <text
        x={(x1 + x2) / 2}
        y={y - 6}
        textAnchor="middle"
        fontSize={10}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontWeight={state === "current" ? 700 : 400}
        fill={state === "current" ? color : "#000"}
      >
        {step.label}
      </text>
    </g>
  );
}

export function TurnRoute() {
  const [stop, setStop] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [animate, setAnimate] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const autoplayed = useRef(false);

  const current = ROUTE[stop] ?? ROUTE[0]!;

  useEffect(() => {
    setAnimate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(
      () => setStop((value) => (value >= ROUTE.length - 1 ? 0 : value + 1)),
      ROUTE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [playing, stop]);

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
    setStop(Math.max(0, Math.min(ROUTE.length - 1, index)));
  }, []);

  const loopTop = rowY(LOOP_FIRST) - ROW / 2 + 2;
  const loopBottom = rowY(LOOP_LAST) + ROW / 2 - 4;

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label="The route one turn takes"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") goTo(stop + 1);
        if (event.key === "ArrowLeft") goTo(stop - 1);
      }}
      className="text-black outline-none focus-visible:ring-2 focus-visible:ring-[#3b7ff0] focus-visible:ring-offset-4"
    >
      <div className="flex items-center justify-between">
        <span className="text-[11.7px] font-bold">One turn</span>
        <div className="flex items-center gap-[2px]">
          <span className="mr-[4px] text-[11px] tabular-nums opacity-60">
            {stop + 1} / {ROUTE.length}
          </span>
          <StepButton
            label="Previous step"
            onClick={() => goTo(stop - 1)}
            disabled={stop === 0}
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
            <svg viewBox="0 0 12 12" className="h-[9px] w-[9px]" fill="currentColor">
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
            onClick={() => goTo(stop + 1)}
            disabled={stop === ROUTE.length - 1}
          >
            <path d="M4.5 2.5 8 6 4.5 9.5" />
          </StepButton>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-[6px] block h-auto w-full"
        fontFamily="inherit"
        aria-hidden="true"
      >
        {LANES.map((lane, index) => (
          <g key={lane.name}>
            <text
              x={LANE_X[index]}
              y={16}
              textAnchor="middle"
              fontSize={11.5}
              fontWeight={700}
              fill={lane.color}
            >
              {lane.name}
            </text>
            <text x={LANE_X[index]} y={30} textAnchor="middle" fontSize={9.5} fill="#000" opacity={0.6}>
              {lane.role}
            </text>
            <line
              x1={LANE_X[index]}
              y1={40}
              x2={LANE_X[index]}
              y2={H - 4}
              stroke={lane.color}
              strokeWidth={1}
              strokeDasharray="2 4"
              opacity={0.55}
            />
          </g>
        ))}

        <rect
          x={4}
          y={loopTop}
          width={W - 8}
          height={loopBottom - loopTop}
          fill="none"
          stroke="#000"
          strokeWidth={0.8}
          strokeDasharray="4 3"
          opacity={stop >= LOOP_FIRST ? 0.7 : 0.25}
        />
        <text
          x={W - 10}
          y={loopTop + 11}
          textAnchor="end"
          fontSize={9.5}
          fontWeight={700}
          opacity={stop >= LOOP_FIRST ? 0.8 : 0.3}
        >
          repeats each round
        </text>

        {ROUTE.map((step, index) => (
          <RouteRow
            key={`${index}-${index === stop ? "on" : "off"}`}
            step={step}
            index={index}
            state={index < stop ? "done" : index === stop ? "current" : "ahead"}
            animate={animate}
            onSelect={() => goTo(index)}
          />
        ))}
      </svg>

      <div className="mt-[10px]">
        <div className="flex items-baseline gap-[8px]">
          <span className="text-[11px] tabular-nums opacity-60">
            {String(stop + 1).padStart(2, "0")}
          </span>
          <span className="text-[12.6px] leading-[17px] font-bold">
            {current.title}
          </span>
        </div>
        <p className="m-0 mt-[3px] text-[12.6px] leading-[16.2px]">
          {current.text}
        </p>
        {current.payload ? (
          <pre className="m-0 mt-[8px] overflow-x-auto bg-black/[0.04] px-[10px] py-[8px] font-mono text-[11px] leading-[15px] whitespace-pre">
            {current.payload.startsWith("{ ")
              ? highlightCode(current.payload)
              : highlightPrompt(current.payload)}
          </pre>
        ) : null}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- tag parser --- */

// Layout effects warn during server rendering, so the server gets a plain effect.
const useSizeEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function TagParser() {
  const [reply, setReply] = useState(SAMPLE_REPLY);
  const actions = useMemo(() => parse(reply), [reply]);
  const field = useRef<HTMLTextAreaElement>(null);

  // The box grows with its text so the whole reply stays visible.
  useSizeEffect(() => {
    const box = field.current;
    if (!box) return;
    box.style.height = "auto";
    box.style.height = `${box.scrollHeight}px`;
  }, [reply]);

  return (
    <div className="text-black">
      <div className="mb-[6px] flex items-baseline justify-between text-[11.7px]">
        <span className="font-bold">A model reply</span>
        <span className="opacity-60">click to type in it</span>
      </div>

      <textarea
        ref={field}
        value={reply}
        onChange={(event) => setReply(event.target.value)}
        spellCheck={false}
        rows={1}
        aria-label="A model reply to parse"
        className={`${CODE} block w-full resize-none overflow-hidden bg-black/[0.04] font-mono text-black outline-none selection:bg-black/15`}
      />

      <div className="mt-[16px] mb-[6px] text-[11.7px] font-bold">
        What the parser found
      </div>

      {actions.length === 0 ? (
        <p className="m-0 text-[12.6px]">
          No complete tags, so the desktop asks the model to re-emit its reply.
        </p>
      ) : (
        <ol className="m-0 flex list-none flex-col gap-[6px] p-0">
          {actions.map((action, index) => (
            <li
              key={`${action.kind}-${index}`}
              className="m-0 flex items-center gap-[10px]"
            >
              <span
                className="w-[42px] shrink-0 py-[1px] text-center text-[11px] font-bold text-white"
                style={{ backgroundColor: KIND_COLOR[action.kind] ?? "#000" }}
              >
                {action.kind}
              </span>
              <span className="min-w-0 flex-1 truncate font-mono text-[11.7px]">
                {action.body}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

/* ------------------------------------------------------- permission gate --- */

const LEVELS: { id: Level; label: string; hint: string }[] = [
  {
    id: "auto-review",
    label: "Auto-review",
    hint: 'the default: asks only for actions marked approval="required"',
  },
  {
    id: "approve",
    label: "Manual",
    hint: "asks before every command and every write",
  },
  {
    id: "full-access",
    label: "Full access",
    hint: "runs everything unattended",
  },
];

type Plan = {
  action: Action;
  status: "ran" | "gated" | "dropped" | "shown";
  order?: "in parallel" | "in order";
};

function planTurn(actions: Action[], level: Level): Plan[] {
  const gated = actions.find(
    (action) => isTool(action) && needsApproval(action, level),
  );
  return actions.map((action) => {
    if (!isTool(action)) return { action, status: "shown" };
    if (gated)
      return { action, status: action === gated ? "gated" : "dropped" };
    const readOnly =
      action.kind === "run"
        ? isReadOnlyCommand(action.body)
        : action.kind !== "write";
    return {
      action,
      status: "ran",
      order: readOnly ? "in parallel" : "in order",
    };
  });
}

export function PermissionGate() {
  const [level, setLevel] = useState<Level>("auto-review");
  const [decision, setDecision] = useState<Decision | null>(null);
  const actions = useMemo(() => parse(SAMPLE_REPLY), []);
  const plan = useMemo(() => planTurn(actions, level), [actions, level]);
  const waiting = plan.some((entry) => entry.status === "gated") && !decision;

  const results = plan
    .map((entry) => {
      const { action } = entry;
      if (entry.status === "shown" || entry.status === "dropped") return null;
      const label =
        action.kind === "run"
          ? `command="${action.body}"`
          : `path="${action.attributes.path ?? ""}"`;
      if (entry.status === "gated") {
        if (!decision) return null;
        if (decision === "denied") {
          return `{plx:result kind="${action.kind}" ${label} status="denied"}\nDenied by the user. Do not retry this action; find another approach or ask.\n{/plx:result}`;
        }
      }
      return `{plx:result kind="${action.kind}" ${label} status="ok"}\n${standInOutput(action)}\n{/plx:result}`;
    })
    .filter(Boolean)
    .join("\n");

  return (
    <div className={FRAME}>
      <div className="flex items-center justify-between px-[12px] py-[6px] text-[11.7px]">
        <span className="font-bold">Permission level</span>
        <span>{waiting ? "waiting on you" : "settled"}</span>
      </div>

      <div className="flex border-t border-black">
        {LEVELS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => {
              setLevel(option.id);
              setDecision(null);
            }}
            aria-pressed={level === option.id}
            className={`flex-1 cursor-pointer border-r border-black/15 px-[6px] py-[5px] text-[12.6px] last:border-r-0 ${level === option.id ? "bg-black font-bold text-white" : ""}`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="m-0 border-t border-black/15 px-[12px] py-[5px] text-[11.7px]">
        {LEVELS.find((option) => option.id === level)?.hint}
      </p>

      <ol className="m-0 list-none border-t border-black p-0">
        {plan.map((entry, index) => (
          <ActionRow
            key={`${entry.action.kind}-${index}`}
            action={entry.action}
            status={entry.status}
            detail={
              entry.status === "gated"
                ? (decision ?? undefined)
                : entry.status === "ran"
                  ? `ran ${entry.order}`
                  : entry.status === "shown"
                    ? "shown"
                    : "dropped"
            }
          >
            {entry.status === "gated" && !decision ? (
              <span className="flex shrink-0 gap-[4px]">
                <button
                  type="button"
                  onClick={() => setDecision("approved")}
                  className="cursor-pointer bg-black px-[8px] py-[2px] text-[11.7px] font-bold text-white"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => setDecision("denied")}
                  className="cursor-pointer border border-black px-[8px] py-[1px] text-[11.7px] font-bold"
                >
                  Deny
                </button>
              </span>
            ) : undefined}
          </ActionRow>
        ))}
      </ol>

      <Panel
        label="Sent back as the next message"
        aside="outputs are stand-ins"
      >
        <pre className={`${CODE} bg-[#0e0e10] text-white`}>
          {waiting
            ? "(waiting for your answer above)"
            : results || "(nothing ran)"}
          {results && !waiting ? (
            <span className="block">
              {
                '{plx:result kind="guidance" status="ok"}\nAnswer now if these results are sufficient…\n{/plx:result}'
              }
            </span>
          ) : null}
        </pre>
      </Panel>
    </div>
  );
}
