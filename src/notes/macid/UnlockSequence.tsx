// One face unlock as a sequence diagram: who asks whom, in order, with time
// running down. Static on purpose: the whole exchange is visible at once,
// which a stepper could only show one stop at a time.

const OUT = "#0864c7"; // the site's link blue, for a request
const BACK = "#8a6100"; // amber, for an answer
const OK = "#14532d"; // green, as in the screensaver_new diff
const BAD = "#9f1d1d";

const LANES = ["lock screen", "pam_macid.so", "desktop app", "Keychain"];
const W = 360;
const GUTTER = 30; // the time axis and step numbers
const laneX = (i: number) => GUTTER + 40 + i * ((W - GUTTER - 76) / (LANES.length - 1));

type Msg = {
  from: number;
  to: number;
  label: string;
  color: string;
  dashed?: boolean;
  /** Drawn as a note on one lane rather than an arrow. */
  self?: boolean;
};

const MESSAGES: Msg[] = [
  { from: 0, to: 1, label: "empty password field", color: OUT },
  { from: 1, to: 2, label: "VERIFY, over a local socket", color: OUT },
  { from: 2, to: 2, label: "camera looks", color: "#000", self: true },
  { from: 2, to: 1, label: "OK or NO", color: BACK, dashed: true },
  { from: 1, to: 0, label: "SUCCESS or IGNORE", color: BACK, dashed: true },
  { from: 0, to: 3, label: "tries the empty field: refused", color: BAD },
  { from: 2, to: 3, label: "saved password: unlocked", color: OK },
];

const SANS = "Helvetica, Arial, sans-serif";
const SIZE = 9.5;

export function UnlockSequence() {
  const top = 36;
  const step = 32;
  const rowY = (k: number) => top + k * step + 14;
  const bottom = rowY(MESSAGES.length - 1) + 14;
  const height = bottom + 6;

  return (
    <div className="border-y border-black py-[14px]">
      <svg viewBox={`0 0 ${W} ${height}`} className="block w-full" role="img" fontFamily={SANS}
        aria-label="A sequence diagram of one face unlock: seven messages between the lock screen, MacID's PAM module, the MacID app and the Keychain, in order from top to bottom">
        <defs>
          {[OUT, BACK, OK, BAD].map((c) => (
            <marker key={c} id={`head-${c.slice(1)}`} viewBox="0 0 8 8" refX="7" refY="4"
              markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0.8 L7 4 L0 7.2" fill="none" stroke={c} strokeWidth="1.2" />
            </marker>
          ))}
          <marker id="head-time" viewBox="0 0 8 8" refX="4" refY="7" markerWidth="7" markerHeight="7">
            <path d="M0.8 0 L4 7 L7.2 0" fill="none" stroke="#6b6b6b" strokeWidth="1.2" />
          </marker>
        </defs>

        {/* Columns, then their lifelines. One size throughout; the headings
            differ only by weight. */}
        {LANES.map((name, i) => (
          <g key={name}>
            <text x={laneX(i)} y={12} textAnchor="middle" fontSize={SIZE} fontWeight="bold">
              {name}
            </text>
            <line x1={laneX(i)} x2={laneX(i)} y1={20} y2={bottom}
              stroke="#000" strokeOpacity="0.25" strokeDasharray="2 3" />
          </g>
        ))}

        {/* Rows: time runs down, one numbered message per row. */}
        <line x1={6} x2={6} y1={top} y2={bottom} stroke="#6b6b6b" strokeWidth="1" markerEnd="url(#head-time)" />
        <text x={0} y={top - 6} fontSize={SIZE} fill="#6b6b6b">time</text>

        {MESSAGES.map((m, k) => {
          const y = rowY(k);
          const number = (
            <text x={GUTTER - 6} y={y + 3} fontSize={SIZE} textAnchor="end" fill="#6b6b6b">{k + 1}</text>
          );
          if (m.self) {
            return (
              <g key={k}>
                {number}
                <rect x={laneX(m.from) - 38} y={y - 10} width={76} height={18}
                  fill="#fff" stroke="#000" strokeWidth="0.8" />
                <text x={laneX(m.from)} y={y + 3} textAnchor="middle" fontSize={SIZE}>{m.label}</text>
              </g>
            );
          }
          const x1 = laneX(m.from);
          const x2 = laneX(m.to);
          const dir = x2 > x1 ? 1 : -1;
          return (
            <g key={k}>
              {number}
              <line x1={x1 + dir * 3} x2={x2 - dir * 3} y1={y} y2={y}
                stroke={m.color} strokeWidth="1.1" strokeDasharray={m.dashed ? "4 3" : undefined}
                markerEnd={`url(#head-${m.color.slice(1)})`} />
              <text x={(x1 + x2) / 2} y={y - 5} textAnchor="middle" fontSize={SIZE} fill={m.color}>
                {m.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
