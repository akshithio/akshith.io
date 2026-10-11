import "katex/dist/katex.min.css";

import type { NoteMeta } from "@/types/notes";
import { Aside } from "./Aside";
import { Equation, Tex } from "./Math";
import { Alignment, Margin } from "./RecognitionFigures";
import { UnlockSequence } from "./UnlockSequence";

export const meta: NoteMeta = {
  title: "MacID: Bringing Face ID to the Mac",
  date: "2026-10-11",
  description:
    "How MacID unlocks your Mac with your face: hooking into the lock screen through PAM, recognizing you on device, and keeping your Keychain and password working.",
};

function Block({ label, children }: { label?: string; children: string }) {
  return (
    <div className="my-[1.6em] border border-black">
      {label ? (
        <div className="border-b border-black px-[10px] py-[4px] font-mono text-[10.8px]">
          {label}
        </div>
      ) : null}
      <pre className="m-0 overflow-x-auto p-[10px] font-mono text-[11.7px] leading-[16px]">
        {children}
      </pre>
    </div>
  );
}

/**
 * One PAM rule with its four fields labelled, drawn in the same box as the
 * line itself so the braces and the text can never drift apart.
 *
 * The line is the real one from /etc/pam.d/screensaver_new, but the gaps
 * between fields are set here rather than copied from the file: every field
 * is three characters from the next, which reads better than the file's own
 * ragged alignment. PAM ignores whitespace, so the rule is unchanged.
 *
 * Each token is drawn with `textLength` forced to its character count times
 * the monospace advance, so a brace spans exactly the field it names whatever
 * font the browser actually resolves.
 */
function PamRule() {
  const ADV = 6; // character advance at font-size 10
  const tokens: [string, number][] = [
    ["auth", 0],
    ["optional", 7],
    ["pam_krb5.so", 19],
    ["use_first_pass", 33],
    ["use_kcminit", 48],
    ["no_auth_ccache", 60],
  ];
  // [label, first column, last column] — the brace spans the whole field, so
  // each label can sit on one row directly beneath its own.
  const parts: [string, number, number][] = [
    ["type", 0, 4],
    ["control flag", 7, 15],
    ["module path", 19, 30],
    ["arguments", 33, 74],
  ];

  /** A downward curly brace from x0 to x1, its tip 2r below `y`. */
  const brace = (x0: number, x1: number, y: number, r = 4) => {
    const cx = (x0 + x1) / 2;
    return (
      `M${x0} ${y} q0 ${r} ${r} ${r} L${cx - r} ${y + r} q${r} 0 ${r} ${r}` +
      ` q0 ${-r} ${r} ${-r} L${x1 - r} ${y + r} q${r} 0 ${r} ${-r}`
    );
  };

  return (
    <div className="my-[1.6em] border border-black">
      <div className="border-b border-black px-[10px] py-[4px] font-mono text-[10.8px]">
        /etc/pam.d/screensaver_new
      </div>
      <div className="overflow-x-auto p-[10px]">
        <svg
          viewBox="0 0 446 48"
          width="446"
          className="block max-w-none"
          role="img"
          aria-label="A PAM rule split into its four fields: type, control flag, module path, and arguments."
        >
          <g
            fill="currentColor"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="10"
          >
            {tokens.map(([text, col]) => (
              <text
                key={col}
                x={col * ADV}
                y={11}
                textLength={text.length * ADV}
                lengthAdjust="spacingAndGlyphs"
              >
                {text}
              </text>
            ))}
          </g>
          <g stroke="currentColor" strokeWidth="1" fill="none">
            {parts.map(([label, from, to]) => (
              <g key={label}>
                <path d={brace(from * ADV, to * ADV, 17)} />
                <path d={`M${((from + to) / 2) * ADV} 25 V32`} />
              </g>
            ))}
          </g>
          <g fill="currentColor" fontSize="9" textAnchor="middle">
            {parts.map(([label, from, to]) => (
              <text key={label} x={((from + to) / 2) * ADV} y={41}>
                {label}
              </text>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}

/**
 * What the probe module saw.
 *
 * Styled inline rather than through `.note table`, which rules every cell and
 * gives the header nothing to distinguish it: this one wants an outline, a
 * filled header row and separators, so the columns read as columns. Inline
 * styles because `.note th` and `.note td` are more specific than a utility
 * class and would otherwise win.
 *
 * Everything else is the site's own idiom — square corners and 1px black
 * rules, the same as the code blocks, and the header fill is the #f0efec used
 * behind inline code.
 */
function Findings() {
  const rows: [string, string][] = [
    ["screensaver", "no"],
    ["screensaver_new", "yes, with the typed password already collected"],
    ["screensaver_la", "no (the LocalAuthentication path: Touch ID, Watch)"],
    ["sudo", "no, this is sudo's own stack, and it runs before the password is typed"],
  ];

  const pad = "9px 14px";
  const head: React.CSSProperties = {
    background: "#f0efec",
    padding: pad,
    textAlign: "left",
    fontWeight: 600,
    fontSize: "11.5px",
    color: "#000",
    border: "none",
    borderBottom: "1px solid #000",
  };
  const cell = (first: boolean): React.CSSProperties => ({
    padding: pad,
    border: "none",
    borderTop: first ? "none" : "1px solid #000",
    verticalAlign: "top",
    fontWeight: 400,
    lineHeight: 1.55,
  });

  return (
    <table
      className="caption-bottom"
      style={{
        width: "100%",
        margin: "1.6em 0",
        border: "1px solid #000",
        borderCollapse: "separate",
        borderSpacing: 0,
        fontSize: "12px",
      }}
    >
      <caption className="pt-[8px] text-left text-[9px] leading-[13.5px] text-black">
        findings, macOS 26.5.2
      </caption>
      <thead>
        <tr>
          <th scope="col" style={head}>
            stack
          </th>
          <th scope="col" style={head}>
            used by the lock screen
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([stack, verdict], i) => (
          <tr key={stack}>
            <th
              scope="row"
              style={{ ...cell(i === 0), whiteSpace: "nowrap", width: "1%" }}
            >
              <code>{stack}</code>
            </th>
            <td style={cell(i === 0)}>{verdict}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * The lock screen stack after installing, as a diff.
 *
 * Comments are dropped and the columns are aligned — the real file is ragged
 * and carries a `# authorization: auth account` header that means nothing
 * here. What matters is that one line was added, at the top, and the diff
 * marker says so without a sentence having to.
 */
function StackDiff() {
  const lines: [boolean, string][] = [
    [true, "auth      sufficient  /opt/macid/lib/pam_macid.so"],
    [false, "auth      optional    pam_krb5.so use_first_pass use_kcminit no_auth_ccache"],
    [false, "auth      optional    pam_ntlm.so use_first_pass"],
    [false, "auth      required    pam_opendirectory.so use_first_pass nullok"],
    [false, "account   required    pam_opendirectory.so"],
  ];

  return (
    <div className="my-[1.6em] border border-black">
      <div className="border-b border-black px-[10px] py-[4px] font-mono text-[10.8px]">
        /etc/pam.d/screensaver_new
      </div>
      <pre className="m-0 overflow-x-auto py-[10px] font-mono text-[11.7px] leading-[17px]">
        {lines.map(([added, text], i) => (
          <div
            key={i}
            className="px-[10px]"
            style={added ? { background: "#e4f2e8", color: "#14532d" } : undefined}
          >
            {added ? "+ " : "  "}
            {text}
          </div>
        ))}
      </pre>
    </div>
  );
}

function Links() {
  const box =
    "flex flex-1 items-center gap-[10px] bg-black px-[14px] py-[10px] text-[13px] text-white no-underline transition-opacity hover:opacity-85";
  return (
    <div className="mb-[1.6em] flex flex-col gap-[8px] sm:flex-row">
      <a href="https://macid.akshith.io" target="_blank" rel="noreferrer" className={box}>
        <svg viewBox="23 26 56 48" className="h-[16px] w-[19px] shrink-0" fill="currentColor" aria-hidden>
          <rect x="23" y="26" width="13" height="48" rx="6.5" />
          <path
            fillRule="evenodd"
            d="M45 26h10a24 24 0 0 1 0 48H45V26Zm10 16a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z"
          />
        </svg>
        macid.akshith.io
      </a>
      <a href="https://github.com/akshithio/macid" target="_blank" rel="noreferrer" className={box}>
        <svg viewBox="0 0 16 16" className="h-[16px] w-[16px] shrink-0" fill="currentColor" aria-hidden>
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
        </svg>
        akshithio/macid
      </a>
    </div>
  );
}

export default function MacIDNote() {
  return (
    <>
      <Links />
      <p>
        I wanted to bring Face ID to the Mac. The resulting product, that I call
        MacID, works as seamlessly as your OS will allow and does the best
        possible job it can under the limitations it faces (pun somewhat
        intended).
      </p>
      <p>
        MacID doesn&apos;t automatically open up your desktop. It needs you to
        get to the password field and press the return key. Then, if MacID
        believes that the face it sees matches what it has stored, you&apos;re
        logged into your computer. If not, then the computer treats it the same
        way as a wrong password, which on macOS is the password bar wiggling
        side-to-side rather aggressively.
      </p>
      <p>
        Of course, you can always enter your password normally and still log in;
        MacID does nothing to interfere with that. Similar to Touch ID, MacID
        also needs your password after a restart or hibernation before it can
        start working again.
      </p>
      <p>
        You can{" "}
        <a
          href="https://macid.akshith.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          download the desktop app here
        </a>{" "}
        and{" "}
        <a
          href="https://github.com/akshithio/macid"
          target="_blank"
          rel="noopener noreferrer"
        >
          read its code here
        </a>
        .
        I&apos;ll try and walk you through the core technical details in this
        note.
      </p>

      <h4>Authentication On macOS</h4>
      <p>
        At the core of macOS authentication is PAM, pluggable
        authentication modules. PAM is what Unix systems use to answer
        &ldquo;is this person who they say they are?&rdquo; without every single
        program having to implement their own answer. <code>sudo</code>,{" "}
        <code>login</code>, <code>ssh</code> and even the macOS lock screen all
        delegate that question to PAM rather than checking a password
        themselves.
      </p>
      <p>
        Each application that consults PAM for authentication is called a
        consumer. So in my previous example, <code>sudo</code>,{" "}
        <code>login</code>, <code>ssh</code> and the macOS lock screen are all
        consumers of PAM. Every consumer gets something called <em>a stack</em>, which
        is a text file located at <code>/etc/pam.d/</code>. Each line in this file
        contains 4 parts: a type, a control flag, a module path, and arguments
        for that module.
      </p>
      <p>For example, take this line:</p>
      <PamRule />
      <p>
        The key components you&apos;ll need to understand here are the module
        path and the control flag. A module is simply a piece of software
        that PAM calls on to do a particular job. Here <code>pam_krb5.so</code>{" "}
        corresponds to{" "}
        <a
          href="https://en.wikipedia.org/wiki/Kerberos_(protocol)"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kerberos
        </a>
        , a network authentication protocol.
      </p>
      <p>
        A control flag can take 3 basic values: <code>required</code> which
        means the module must send a success response back to PAM;{" "}
        <code>optional</code> which means the module&apos;s result doesn&apos;t
        affect the overall result; and <code>sufficient</code> which is the
        useful one for us here: if that module says yes, the stack
        short-circuits and nothing below it runs.
      </p>
      <p>
        One last thing to note about PAM is that the files do act like a true
        stack wherein the execution order is determined by the line order in the
        file. So:
      </p>
      <Block>{`auth  required  pam_A.so
auth  optional  pam_B.so
auth  required  pam_C.so`}</Block>
      <p>means that PAM processes them as:</p>
      <Block>{`pam_A → pam_B → pam_C`}</Block>
      <p>
        So, in principle, adding a face unlock is as simple as adding a{" "}
        <code>sufficient</code> module ahead of the password check. One
        difficulty here is that the macOS lock screen&apos;s use of PAM is not
        documented or known to be stable across releases, and nothing tells you
        when it changes.
      </p>

      <h4>Finding The Hook</h4>
      <p>
        When looking through files in <code>/etc/pam.d/</code> I found a couple
        different stack files of interest including <code>screensaver</code>,{" "}
        <code>screensaver_new</code> and <code>screensaver_la</code>. In order
        to find the correct file where MacID belongs, I wrote a diagnostic PAM
        module, that does nothing but log every call it receives, wired it into a bunch of files as{" "}
        <code>auth optional</code> (which always returns{" "}
        <code>PAM_IGNORE</code> and therefore cannot deny anything) to watch
        what happens.
      </p>
      <Findings />
      <p>
        From this, I learnt that the lock screen uses{" "}
        <code>screensaver_new</code> and it calls the stack after the password
        has already been collected. Most importantly, this stack is called even
        when you type nothing at all and just press return.
      </p>
      <p>
        The ability to send in an empty submission is important to MacID. There
        is no supported way for a PAM module to say &ldquo;give me a moment, I
        am looking at a camera&rdquo;, and no way to draw UI at the lock screen.
        But pressing return on an empty password field is a perfectly ordinary
        authentication attempt, and it costs the user exactly one keystroke.
      </p>
      <p>
        This is therefore the most convenient way to use MacID, by simply
        pressing return on the password bar. Of course, if you enter the wrong
        password, and then press return but MacID recognizes your face you will
        still be logged in. This is the point of having MacID run as{" "}
        <code>sufficient</code> in the stack before your password checker is
        triggered by PAM. MacID doesn&apos;t care what&apos;s in the password
        bar because it never reads it.
      </p>
      <p>
        So, we&apos;ve now added the MacID PAM to{" "}
        <code>/etc/pam.d/screensaver_new</code> and it looks like this, a
        filepath to a sufficient module that triggers before anything else on
        the system:
      </p>
      <StackDiff />

      <h4>App Structure</h4>
      <p>
        MacID&apos;s PAM module, <code>pam_macid.so</code> runs as root inside{" "}
        <code>loginwindow</code>, which is the system process responsible for
        the graphical login interface. Opening the camera as root inside{" "}
        <code>loginwindow</code> is a terrible idea because camera perms belong
        to the user and not root, so macOS would refuse the PAM module access to
        it.
      </p>
      <p>
        This is why the PAM module itself does no recognition and simply serves
        as a bridge between macOS and the MacID desktop app, which starts at
        login (this can be configured), lives in the menu bar and actually
        contains the recognition service. This is possible because apps are
        allowed to hold camera perms, which you grant during app setup.
      </p>
      <p>
        Apart from the desktop app, MacID includes a small helper with higher
        privileges that needs admin perms to modify the system
        settings required for lock-screen authentication. This helper exists
        because of a privilege problem since editing the lock screen config
        does two things:
      </p>
      <ol>
        <li>
          Write our module into <code>/etc/pam.d/</code>
        </li>
        <li>
          Install our PAM module at{" "}
          <code>/opt/macid/lib/pam_macid.so</code>
        </li>
      </ol>
      <p>
        Both of these need root perms, but our desktop app itself must never run
        as root, because a root GUI app is a bad idea for a lot of reasons and
        the camera permission belongs to your user account. So the root half is a
        separate binary that only handles writing and deleting these files. You,
        the user, must still authorize editing and writing to these files
        through the standard macOS admin password prompt (i.e. MacID would like
        to do xyz, enter password). After both of these actions are done, MacID
        never needs root perms.
      </p>
      <p>
        This system worked great for me until I ran into a problem. When you
        typically unlock your Mac, macOS also unlocks your Keychain, which holds
        your saved passwords, tokens and signing keys, using whatever was typed
        into the password field. These keys and tokens handle things like email
        signing and git commit signing, and the Keychain is also where apps
        store sensitive information. For example, Chrome stores a key in the
        Keychain that it uses to decrypt the saved passwords and cookies in your
        browser. But currently in MacID, that field is empty after a face
        unlock, so the Keychain stays locked and everything that reads from it
        starts failing or prompting. In my case, I was prompted every time I
        tried to git commit because my GPG key was stored in the Keychain.
      </p>
      <p>
        Touch ID gets around this with a key the Secure Enclave keeps for the
        Keychain; however, only Apple can use that key, which is a security
        feature of the Mac. So MacID asks for your password once,
        checks that it’s right, and encrypts it with a key that lives inside
        this Mac&apos;s Secure Enclave and never leaves it. After a face unlock,
        MacID uses it to unlock your Keychain, and for nothing else. If you
        change your password, MacID notices the saved one no longer works,
        deletes it, and goes back to asking for your password until you give it
        the new one.
      </p>
      <figure className="mx-0 my-[1.6em]">
        <UnlockSequence />
      </figure>

      <h4>Recognition</h4>
      <p>
        Recognition itself uses <code>w600k_mbf</code>, a pretrained
        face-recognition model from InsightFace that turns each face into a
        512-dimensional embedding. I convert it from the <code>.onnx</code>{" "}
        format into an Apple Core ML model so that it can run locally on your
        Mac.
      </p>
      <p>
        Measured through our app&apos;s pipeline over 767 image pairs from a
        famous dataset called{" "}
        <a
          href="https://www.kaggle.com/datasets/jessicali9530/lfw-dataset"
          target="_blank"
          rel="noopener noreferrer"
        >
          LFW
        </a>{" "}
        it separates the same person from different people with 99.5% accuracy and a
        0.0% false acceptance rate. The model is ~3.4M parameters and is ~6.6 MB
        on your disk. The whole <code>.dmg</code> is 7.5 MB so the model itself
        is ~88% of what you download.
      </p>
      <p>
        Since the model handles recognition, my main focus is alignment &
        normalization. For every image, Apple&apos;s Vision API produces 5
        landmark regions: two eyes, two corners of the mouth and the nose tip. Our
        model expects them at fixed positions in a 112x112 crop as input, so
        each face needs to be warped onto that layout with something called a{" "}
        <em>similarity transform</em> before it is passed through the model. Without
        this, the embedding is using more of its capacity measuring how your
        head is tilted rather than whose head it is.
      </p>
      <Aside title="The Similarity Transform">
        <p>
          A similarity transform is the family of 2D transforms that can move
          (translation: <Tex tex="t_x, t_y" />), rotate (angle:{" "}
          <Tex tex="\theta" />) and uniformly resize a shape (scale:{" "}
          <Tex tex="s" />) without interfering with anything else. This gives
          us the 4 unknowns <Tex tex="t_x" />, <Tex tex="t_y" />,{" "}
          <Tex tex="\theta" /> and <Tex tex="s" />:
        </p>
        <Equation tex={`\\begin{bmatrix} x' \\\\ y' \\end{bmatrix} = \\begin{bmatrix} s\\cos\\theta & -s\\sin\\theta \\\\ s\\sin\\theta & s\\cos\\theta \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} + \\begin{bmatrix} t_x \\\\ t_y \\end{bmatrix} \\tag{1}`} />
        <p>
          <Tex tex="[x\ y]^T" /> is simply a 2-dimensional point in the context
          of a 1280x720 image (your webcam&apos;s resolution), such as (300, 250)
          for your left eye, which is one of the 5 landmarks. So{" "}
          <Tex tex="(x, y)" /> is where a landmark is in the camera frame, and{" "}
          <Tex tex="(x', y')" /> is where that same landmark should end up in the
          112x112 crop that we give to the face recognition model.
        </p>
        <p>
          Similarity transforms are helpful for this task because they&apos;re
          quite limited. A more flexible transform (e.g. an affine one) could
          also stretch the face more in one direction than another, or slant it.
          This could squash a wide face narrower until its landmarks lined up,
          which erases the proportions that the model is trying to recognize. A
          similarity transform can only move, turn and resize, so the output
          image has the same proportions as the input.
        </p>
        <p>
          Call the five landmarks the camera found <Tex tex="p_1, \dots, p_5" />{" "}
          (each one an <Tex tex="(x, y)" /> from above), and the five spots the
          model wants them at <Tex tex="q_1, \dots, q_5" /> (each one an{" "}
          <Tex tex="(x', y')" />). Putting one landmark through equation (1) gives
          two equations, one for <Tex tex="x'" /> and one for <Tex tex="y'" />,
          so five landmarks give ten equations but there are only four unknowns.
          Real landmarks are never placed perfectly, so no single choice of{" "}
          <Tex tex="t_x, t_y, \theta" /> and <Tex tex="s" /> satisfies all ten.
        </p>
        <p>
          Instead we take the least-squares answer, which can be written in
          terms of <Tex tex="s\cos\theta" /> and <Tex tex="s\sin\theta" />{" "}
          instead of <Tex tex="\theta" /> and <Tex tex="s" />, making all ten
          equations linear and the answer something we can calculate directly.
          First, measure each point from the centre of its own set (i.e.{" "}
          <Tex tex="\bar p" /> and <Tex tex="\bar q" />),{" "}
          <Tex tex="a_i = p_i - \bar p" /> and <Tex tex="b_i = q_i - \bar q" />.
          Then:
        </p>
        <Equation tex={`s\\cos\\theta = \\frac{\\sum_i a_i \\cdot b_i}{\\sum_i \\lVert a_i \\rVert^2} \\qquad s\\sin\\theta = \\frac{\\sum_i a_i \\times b_i}{\\sum_i \\lVert a_i \\rVert^2}`} />
        <p>
          The dot products (<Tex tex="a_i \cdot b_i" />) measure how much the
          two sets of points line up, and the cross products (
          <Tex tex="a_i \times b_i" />) measure how far one is turned relative
          to the other. Those two numbers fill in the whole matrix, so{" "}
          <Tex tex="\theta" /> and <Tex tex="s" /> never need to be worked out
          separately. The translation then comes from the two centres:{" "}
          <Tex tex="t = \bar q - M\,\bar p" />, where <Tex tex="M" /> is the
          matrix.
        </p>
        <figure className="mx-0 my-[1.6em]">
          <Alignment />
        </figure>
      </Aside>
      <p>
        This is one of many reasons why face recognition systems will capture
        your face from several angles because the lock screen will not see you
        head-on, and it has to work out how much of what it&apos;s looking at
        is noise.
      </p>
      <p>
        A naive way to calculate noise is to compare the largest distance
        between two image samples, but this doesn&apos;t account for pose since
        the difference between your head leaning left and your head leaning
        right is signal about coverage rather than noise. So samples are grouped
        by the pose they were held at, so that only two samples of the same
        pose, which differ only by light or micro-expressions, count as noise.
      </p>
      <p>
        I capture multiple poses during setup, using yaw and pitch to check that
        each pose has actually been reached before using those frames.
      </p>
      <p>
        To decide whether a face is yours, MacID measures the distance between
        the embedding it sees and the one it has stored. The smaller that
        distance, the more alike the faces, and anything closer than a threshold
        cutoff counts as you. You choose this threshold value, wherein setting
        the threshold lower means that it recognizes you less often but is less
        likely to mistake someone else for you, and vice versa.
      </p>
      <p>
        Using the same LFW dataset as earlier, I calculate how likely it is to
        recognize you and to mistake someone else for you, in order to help you
        make that decision. The blue shaded region in the slider below indicates
        the range that MacID lets you select from.
      </p>
      <figure className="mx-0 my-[1.6em]">
        <Margin />
      </figure>

      <h4>In Summary</h4>
      <p>
        MacID is as close as I could get to a seamless Face ID experience on the
        Mac. It does come with some caveats as we&apos;ve seen&mdash;such as
        still having to interact with the password bar&mdash;that can be mostly
        resolved
        with some clever engineering, but the one last issue that I can&apos;t
        resolve is physical. The reason Macs don&apos;t already have Face ID is
        that they lack the sensors necessary for it, such as the depth sensor,
        which can look at a real three-dimensional reconstruction of your face
        instead of the flat image that your webcam sees. So a good enough photo
        of you could unlock your Mac.
      </p>
      <p>
        To account for this, MacID comes with a &ldquo;require a blink&rdquo;
        setting that you can turn on or off, which needs you to blink before it
        does an unlock. Again, a video might be able to get through, but this is
        the best possible solution I could think of.{" "}
        <a
          href="https://github.com/akshithio/macid/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          Let me know
        </a>{" "}
        if you have a better idea! Finally, I think it&apos;s important to treat
        using MacID as more of a convenience rather than a replacement for your
        password.
      </p>
      <p>
        Thanks so much for reading this note and{" "}
        <a href="mailto:mail@akshith.io">feel free to reach out</a> if you have
        any questions!
      </p>
    </>
  );
}
