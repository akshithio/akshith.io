import type { NoteMeta } from "@/types/notes";
import type { ReactNode } from "react";

export const meta: NoteMeta = {
  title: "Face Unlock for the macOS Lock Screen",
  date: "2026-09-20",
  description:
    "MacID puts a PAM module in front of the macOS lock screen so a webcam can stand in for your password. Notes on what PAM is, the undocumented hook the whole thing depends on, and why a face unlock has to be built to fail.",
};

function Block({ label, children }: { label: string; children: string }) {
  return (
    <div className="my-[1.6em] border border-black">
      <div className="border-b border-black px-[10px] py-[4px] font-mono text-[10.8px]">
        {label}
      </div>
      <pre className="m-0 overflow-x-auto p-[10px] font-mono text-[11.7px] leading-[16px]">
        {children}
      </pre>
    </div>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <p className="my-[1.6em] border-l-2 border-black pl-[12px] text-[13px] leading-[19px]">
      {children}
    </p>
  );
}

export default function MacIDNote() {
  return (
    <>
      <p>
        My Mac has a camera pointed at my face all day and a password prompt
        that ignores it. Touch ID exists, but not on an external keyboard, and
        Apple has never shipped Face ID on a Mac. So the question was whether
        the lock screen could be persuaded to accept a webcam instead — not by
        faking keystrokes or automating the UI, but by plugging into the thing
        macOS actually asks when it wants to know who you are.
      </p>
      <p>
        MacID is what came out of that. Wake the Mac, press Return on the empty
        password field, and if the camera recognizes you, you are in. These are
        notes on how it works, what it is plugged into, and the one
        undocumented detail the whole thing rests on.
      </p>

      <h4>What PAM actually is</h4>
      <p>
        PAM — Pluggable Authentication Modules — is the layer Unix systems use
        to answer &ldquo;is this person who they say they are?&rdquo; without
        every program having to implement an answer. <code>sudo</code>,{" "}
        <code>login</code>, <code>ssh</code> and the macOS lock screen all
        delegate that question to PAM rather than checking a password
        themselves.
      </p>
      <p>
        Each consumer gets a <em>stack</em>: a text file in{" "}
        <code>/etc/pam.d/</code> naming the modules to consult, in order, each
        with a control flag saying how much its answer counts.
      </p>
      <Block label="/etc/pam.d/screensaver_new">{`auth  optional  pam_krb5.so  use_first_pass use_kcminit no_auth_ccache
auth  optional  pam_ntlm.so  use_first_pass
auth  required  pam_opendirectory.so  use_first_pass nullok
account  required  pam_opendirectory.so`}</Block>
      <p>
        A module is a shared library exporting a handful of known symbols; the
        one that matters here is <code>pam_sm_authenticate</code>. The control
        flags are the interesting part. <code>required</code> must succeed.{" "}
        <code>optional</code> is consulted but cannot decide anything on its
        own. <code>sufficient</code> is the useful one: if that module says yes,
        the stack short-circuits and nothing below it runs.
      </p>
      <p>
        So adding face unlock is, in principle, one line — a{" "}
        <code>sufficient</code> module ahead of the password check. In practice
        the entire difficulty is that the lock screen&apos;s use of PAM is not
        API. It is not documented, it is not stable across releases, and
        nothing tells you when it changes.
      </p>

      <h4>Finding the hook</h4>
      <p>
        The obvious file to edit is <code>/etc/pam.d/screensaver</code>. On
        macOS 26 that file is never consulted. I only know that because I wrote
        a module that does nothing but log every call it receives, wired it into
        every plausible stack as <code>auth optional</code> (which always
        returns <code>PAM_IGNORE</code> and so cannot deny anything), and
        watched what happened.
      </p>
      <Block label="findings, macOS 26.5.2">{`stack             consulted at the lock screen
screensaver       no
screensaver_new   yes — authtok pre-filled, authtok_len=0 on an empty Return
screensaver_la    no (the LocalAuthentication path: Touch ID, Watch)
sudo              yes, authtok not set — the module runs before the prompt`}</Block>
      <p>
        Two things fell out of that. The lock screen uses{" "}
        <code>screensaver_new</code>. And it calls the stack with the typed
        password <em>already collected</em> — including when you have typed
        nothing at all and just pressed Return.
      </p>
      <p>
        That empty submission is the hook the whole project hangs on. There is
        no supported way for a module to say &ldquo;give me a moment, I am
        looking at a camera&rdquo;, and no way to draw UI at the lock screen.
        But an empty password field submitted with Return is a perfectly
        ordinary authentication attempt, and it costs the user exactly one
        keystroke. The diagnostic module is still in the repo, because it is the
        fastest way to answer &ldquo;is my stack even being called&rdquo; on a
        future macOS — which is the question that will break this first.
      </p>

      <h4>The shape of it</h4>
      <p>
        A PAM module runs as root inside <code>loginwindow</code>. That is a
        terrible place to open a camera: the camera permission belongs to the
        user, not to root, and no permission prompt can appear at the lock
        screen anyway. So the module does no recognition at all. It asks
        something else.
      </p>
      <Block label="what happens when you press Return">{`pam_macid.so   auth sufficient, first line of screensaver_new
     |         runs as root inside loginwindow
     v
agent.sock     unix socket in ~/Library/Application Support/MacID
     |
     v
MacID.app      camera on -> Vision detection -> featureprint -> compare
     |         answers from what it sees now, then camera off
     v
pam_macid.so   OK     -> PAM_SUCCESS, the stack short-circuits
               NO     -> PAM_IGNORE, the password stack runs as normal`}</Block>
      <p>
        The app hosts the recognizer because the app is the thing that can hold
        a camera grant the user can see and revoke in System Settings. It starts
        at login and lives in the menu bar. The only other binary is a small
        privileged helper inside the app bundle with two verbs, install and
        uninstall, handed to the standard administrator prompt when the lock
        screen needs wiring. There is no command-line tool; enrolling, testing
        and diagnostics all live in the app.
      </p>
      <p>
        Recognition itself is Vision: detect exactly one face, crop and
        normalize it, and compute a <code>VNGenerateImageFeaturePrintRequest</code>{" "}
        descriptor to compare against the enrolled ones. That request is a
        general-purpose image descriptor rather than a dedicated face embedding,
        which is the honest weak point — it ships with the OS, so there is no
        model to download or keep in sync, but it separates similar faces less
        well than a purpose-built embedding would.
      </p>

      <h4>Recognizing at the moment of the unlock</h4>
      <p>
        The first version turned the camera on when the screen locked, looked
        for a minute, and armed a token that the module could spend. It worked,
        and it was wrong in two ways. Come back an hour later and there was
        nothing armed, so it silently did nothing. And a face seen at lock time
        could unlock the machine later, which is not a property you want in the
        thing guarding your laptop.
      </p>
      <p>
        Now pressing Return is what starts recognition. The module asks, the app
        looks for up to three and a half seconds, answers, and stops looking.
        There is no standing window during which the machine will open, and
        walking up an hour later behaves exactly like walking up immediately.
      </p>
      <p>
        That cost about a second and a half, and the logs say where it went:
        one to two seconds from the request to an answer, of which the
        recognition itself is three frames — roughly a tenth of a second.
        Everything else is <code>AVCaptureSession</code> starting and the
        exposure settling. The camera, in other words, was the slow part, and it
        was slow because it was being switched on at the last possible moment.
      </p>
      <p>
        The fix has to work around the same blindness as everything else here:
        the lock screen tells you nothing until Return is pressed, so
        &ldquo;the user has focused the password field&rdquo; is not a signal
        you can have. The earliest one you <em>can</em> have is the display
        waking. So while the screen is locked the agent watches display power
        state, and when the display wakes it starts the capture session and lets
        it settle. By the time you have looked at the screen and pressed Return,
        the session is warm and the answer is immediate.
      </p>
      <p>
        Warming only runs the camera. No frame is compared against anything and
        nothing is armed until a root <code>VERIFY</code> arrives, so this does
        not quietly reintroduce the standing unlock I had just removed. The
        window closes after twelve seconds, or as soon as the display sleeps
        again.
      </p>
      <Note>
        This does weaken one promise. The indicator light used to mean
        &ldquo;someone is being recognized right now&rdquo;; it now means
        &ldquo;the Mac is awake at the lock screen and ready to look.&rdquo; The
        camera genuinely is on in both cases, so the light is not lying — but it
        is a broader statement than the one I started with, and it is the price
        of the second and a half.
      </Note>
      <p>
        The corollary took longer to notice: the loop was written to wait for
        success and had no way to conclude failure. Someone who is clearly not
        you held the camera for the full timeout before the password field
        became useful. It now counts consecutive frames showing a well-lit,
        attentive, non-matching face and gives up in well under a second.
      </p>

      <h4>Built to fail</h4>
      <p>
        This is the part I would want to read first if someone else had written
        it. <code>pam_macid.so</code> returns only <code>PAM_SUCCESS</code> or{" "}
        <code>PAM_IGNORE</code>. Never <code>PAM_AUTH_ERR</code>. Agent crashed,
        socket missing, camera denied, face not recognized, app slow past the
        module&apos;s timeout — every one of those falls through to the ordinary
        password prompt. Breaking MacID cannot lock you out of your Mac.
      </p>
      <p>
        That property is doing a lot of work, because the failure modes here are
        nasty. PAM misconfiguration is one of the classic ways to brick a Unix
        login, and I did it to myself once during this project: OpenPAM refuses
        to initialize a stack <em>at all</em> when a listed module is missing —
        even an <code>optional</code> one — so deleting a module that some stack
        still names breaks every consumer of that stack, <code>sudo</code>{" "}
        included. Uninstall now restores a saved copy of the stack only when
        that copy is itself free of our modules, and filters the live file
        otherwise.
      </p>
      <p>
        The socket needs its own care, since the module trusts whatever answers
        it. Running as root, it refuses the socket unless both the socket and
        its directory are owned by the target user and are not group- or
        world-writable — otherwise another account could plant a socket that
        always says yes. The app checks the peer&apos;s uid from its side, and a{" "}
        <code>VERIFY</code> from any non-root process is refused without the
        camera ever starting.
      </p>
      <Note>
        The limitation I have not solved: a process already running as you could
        bind that socket path if the app were not running, and vouch for you.
        Defending against that needs peer code-signature verification.
      </Note>

      <h4>Calibrating on the right variation</h4>
      <p>
        Enrollment captures your face from several angles, because the lock
        screen will not see you square-on, and derives the match threshold from
        those samples. Getting that derivation wrong is subtle and I got it
        wrong for a while.
      </p>
      <p>
        The first rule took the largest distance between <em>any</em> two
        enrolled samples and set the threshold above it. But your left-profile
        sample and your right-profile sample are far apart by design — that
        distance is <em>coverage</em>, not noise. So the more honest the
        enrollment, the looser the gate it produced; mine pinned to its ceiling
        and cheerfully accepted a face at a distance it should have refused. The
        same number drove a &ldquo;lighting was uneven&rdquo; warning, which
        therefore fired on every single run and meant nothing.
      </p>
      <p>
        Samples are now grouped by the pose they were held at. Two samples of
        one held pose, seconds apart, differ only by light, sensor and
        micro-expression — that is the real noise floor, and that is what sets
        the threshold. Distances across poses are reported as coverage and are
        never allowed to loosen anything.
      </p>
      <p>
        Which only works if the poses are real. The prompts used to be
        decorative: &ldquo;turn your head left&rdquo; followed by a fixed sleep
        and whatever frame was in the buffer, so sitting perfectly still
        produced eight samples the code believed spanned a range of angles. Each
        step now waits for the pose it asked for, measured from Vision&apos;s
        reported yaw and pitch. Two details made that usable: Vision quantizes
        those angles into buckets about 11 degrees apart, so judging a single
        frame makes the prompt flicker while your head is still; and a laptop
        camera looks up at you, so your resting pitch is already well off zero
        and asking for an absolute angle means craning off the screen. The
        median of recent frames fixes the first, measuring relative to how you
        actually sit fixes the second.
      </p>

      <h4>What it is not</h4>
      <p>
        Apple&apos;s Face ID projects roughly 30,000 infrared dots and matches a
        depth map. This matches a 2D image from a webcam. By default it unlocks
        when it sees the enrolled face with eyes open, which means a good
        photograph of that face can unlock it too. Requiring a blink stops a
        still photo; it will not stop a video.
      </p>
      <p>
        So the honest framing is that this is a convenience over typing, not an
        upgrade over your password. What I think makes it worth building anyway
        is the shape of the thing: it uses a real authentication path rather
        than simulating input, it recognizes at the moment you ask rather than
        holding a window open, everything runs on-device with no image or
        descriptor leaving the machine, and every failure it can have puts you
        back in front of the password prompt you already know.
      </p>
      <p>
        The source is at{" "}
        <a href="https://github.com/akshithio/macid">akshithio/macid</a>, and the
        installer at <a href="https://macid.akshith.io">macid.akshith.io</a>.
      </p>
    </>
  );
}
