import type { NoteMeta } from "@/types/notes";
import type { ReactNode } from "react";
import { ArchitectureDiagram, RequestVsSocket } from "./ArchitectureFigures";
import { DemoVideo } from "./DemoVideo";
import { FiberSearch } from "./FiberSearch";
import { TagParser, TurnRoute } from "./TurnExplorer";
import { highlightCode, highlightMessages, highlightPrompt } from "./syntax";

export const meta: NoteMeta = {
  title: "ChatGPT Web as an Agent Runtime",
  date: "2026-11-03",
  description:
    "What it took to put the ChatGPT web app in the loop of a local coding agent: a tag protocol, a browser extension, and a lot of prompt engineering.",
};

function Fig({
  n,
  caption,
  children,
}: {
  n: number;
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-[2em]">
      {children}
      <figcaption className="mt-[7.2px] flex gap-[7.2px] text-[9px] leading-[13.5px] text-black">
        <span className="shrink-0 font-bold">Fig. {n}</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

function Code({
  file,
  lang = "ts",
  children,
}: {
  file: string;
  lang?: "ts" | "prompt" | "messages";
  children: string;
}) {
  return (
    <div className="my-[1.6em] border border-black">
      <div className="border-b border-black px-[10px] py-[4px] font-mono text-[10.8px]">
        {file}
      </div>
      <pre className="m-0 overflow-x-auto p-[10px] font-mono text-[11.7px] leading-[16px]">
        {lang === "messages"
          ? highlightMessages(children)
          : lang === "prompt"
            ? highlightPrompt(children)
            : highlightCode(children)}
      </pre>
    </div>
  );
}

// A link that opens in a new tab. The note's prose rules colour links black,
// so the blue is marked important to win over them.
function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#1a56db]!"
    >
      {children}
    </a>
  );
}

function ChatGPTLink() {
  return <ExternalLink href="https://chatgpt.com">chatgpt.com</ExternalLink>;
}

export default function ParallaxNote() {
  return (
    <>
      <p>
        Parallax is an experimental coding harness I&apos;ve been building for
        the past couple of months whose &quot;brain&quot; is the ChatGPT
        website.
      </p>
      <p>
        When you type a task into the Parallax desktop app, instead of sending
        a request to an API, like an ordinary harness, Parallax opens up a{" "}
        <ChatGPTLink /> tab, types in your request, takes the commands that
        ChatGPT produces, runs them on your computer and sends the results back
        to the ChatGPT tab.
      </p>
      <p>
        This loop repeats until your task is done. I&apos;ll walk you through
        the core technical details of how this works in this note, and then
        explain why Parallax isn&apos;t available to the general public and why
        you shouldn&apos;t attempt to build something similar.
      </p>
      <p>But first, here&apos;s a video of Parallax in action:</p>

      <DemoVideo />

      <h4>Core Architecture</h4>
      <p>
        Parallax is two things: a desktop app and a Chrome extension. The
        desktop app runs actual commands on your computer, while the Chrome
        extension runs the ChatGPT tab but can&apos;t touch anything on your
        computer. The ChatGPT website itself knows nothing about Parallax and
        only sees someone sending messages.
      </p>
      <p>
        The desktop app has two processes: a renderer, which displays the UI,
        and a main process, which runs the shell commands. The Chrome extension
        has a script that runs continuously in the background, called a service
        worker, that connects to the desktop app over a WebSocket and remembers
        which thread in the desktop app corresponds to which tab on the
        browser.
      </p>

      <Fig
        n={1}
        caption="System Architecture"
      >
        <ArchitectureDiagram />
      </Fig>

      <p>
        If you&apos;re not familiar with WebSockets, think of ordinary web
        traffic as like sending a letter: your browser sends a request (like
        &quot;give me this page&quot;), to which the server sends back a single
        response (the page), and the exchange is over. In this paradigm, the
        server can never start a conversation, and only replies.
      </p>
      <p>
        A WebSocket is more similar to a phone call in that one side calls, the
        other side picks up and then the line stays open. Either side can talk
        at any moment, as many times as they want, until one of the parties
        ends the call. Each message is a small chunk of text, and for Parallax
        specifically each chunk is always a JSON object with a{" "}
        <code>type</code> attribute.
      </p>

      <Fig
        n={2}
        caption="WebSockets vs. HTTP Requests"
      >
        <RequestVsSocket />
      </Fig>

      <p>
        Parallax needs WebSockets because the extension needs to continuously
        stream the model&apos;s response to the desktop app many times a
        second, while the desktop app needs to also tell the extension to send
        the user&apos;s message to ChatGPT. This is a two-way ongoing
        conversation (full-duplex), which is exactly what WebSockets are for.
      </p>
      <p>
        The desktop&apos;s main process opens a WebSocket server at{" "}
        <code>localhost:8765</code>, which the extension&apos;s service worker
        connects to at <code>ws://localhost:8765</code>. This lets them trade
        messages like this:
      </p>

      <Code file="WebSocket messages" lang="messages">{`desktop → extension   { "type": "send_message", ... }   type this into the thread's tab
extension → desktop   { "type": "stream_update", ... }  here's the answer so far
extension → desktop   { "type": "response", ... }       the answer is finished
extension → desktop   { "type": "turn_status", ... }    which turns are still running`}</Code>

      <p>
        To prevent Chrome from shutting down the extension&apos;s background
        script when it&apos;s idle, the desktop app pings the extension every
        10 seconds, while a timer wakes up the extension&apos;s service worker
        every 30 seconds to reconnect if the connection dropped.
      </p>
      <p>
        Apart from the service worker, the extension basically boils down to
        two <code>.ts</code> files: a content script, <code>content.ts</code>,
        which reads and clicks the page, and a page script,{" "}
        <code>inject.ts</code>, that is injected into the page&apos;s own
        JavaScript and runs as if it were ChatGPT&apos;s own code, which lets
        the extension do things like natively edit the text editor and read
        the tab&apos;s network traffic.
      </p>
      <p>
        To do this, the content script puts a <code>&lt;script&gt;</code> tag
        into the page, which loads <code>inject.ts</code>, the page script,
        into the tab&apos;s own JavaScript. Then, the content and page scripts
        can communicate with each other using <code>window.postMessage</code>,
        which allows the content script to type in a particular piece of text,
        and also receive the model&apos;s response as it is being streamed
        back to the website.
      </p>
      <p>
        For most extensions, Chrome ensures that an extension&apos;s code is
        completely separate from a website&apos;s code. This ensures that they run in a
        walled-off space, so that they can see and click everything on the
        page but can&apos;t touch the page&apos;s own JavaScript. However,
        Parallax needs two things that can only be done by editing the
        page&apos;s own JS:
      </p>
      <ol>
        <li>
          <strong>ChatGPT&apos;s text editor.</strong> The input bar is a{" "}
          <ExternalLink href="https://prosemirror.net/">
            ProseMirror editor
          </ExternalLink>
          , and the only way to reliably put text in it is through editing its
          internal JavaScript object, called <code>EditorView</code>, which
          the extension&apos;s page script finds by digging through
          React&apos;s internals and replacing the input bar&apos;s contents
          directly.
        </li>
        <li>
          <strong>ChatGPT&apos;s network traffic.</strong> When OpenAI&apos;s
          servers send the answer to your browser, the answer arrives as a
          stream over the network and in order to show this response as
          quickly as possible on Parallax&apos;s desktop app, the
          extension&apos;s scripts swap in its own versions of the
          browser&apos;s <code>fetch</code>, <code>EventSource</code> and{" "}
          <code>WebSocket</code> for the page so Parallax&apos;s code sees each
          piece of the answer as OpenAI sends it to your browser and copies it
          out.
        </li>
      </ol>
      <p>
        I cover some of these in more detail in the{" "}
        <a href="#driving-the-chatgpt-tab" className="text-[#1a56db]!">
          Driving the ChatGPT tab
        </a>{" "}
        section.
      </p>

      <h4 id="driving-the-chatgpt-tab">Driving the ChatGPT Tab</h4>
      <p>
        For Parallax to work, it needs to be able to type into ChatGPT&apos;s
        input bar programmatically and consistently. Simple approaches like
        just pasting the text into the bar don&apos;t work because when the
        text is too long, the website turns it into an attachment, thereby
        sending a file instead of a prompt. The other approach I tried, setting
        the <code>textContent</code> DOM property, only changes the text on
        screen but actually leaves the internal state of the input component
        unchanged, meaning that ChatGPT never sees the message.
      </p>
      <p>
        To fix this, you would need the extension to edit the input bar
        natively, in the same manner that ChatGPT&apos;s own code does. The
        input bar keeps its contents in an object called the{" "}
        <code>EditorView</code>, and every change, such as someone typing, goes
        through this object&apos;s <code>dispatch</code> function. So, if an
        extension can locate the <code>EditorView</code> component and its{" "}
        <code>dispatch</code> function, it can replace the contents itself,
        which ChatGPT would treat like any other edit made by a user.
      </p>
      <p>
        This isn&apos;t so obvious because the site&apos;s bundler (something
        like webpack, which combines all of a site&apos;s code into a few
        files) keeps it in a local variable with no global name that the
        extension could use to just reach it. However, since ChatGPT is a React
        website, we can still reach this <code>EditorView</code> object through
        something called fibers. For every component that React renders, it
        keeps an internal record called a <em>fiber</em>, which holds that
        component&apos;s props, state, refs, and also a link to its
        parent&apos;s fiber.
      </p>
      <p>
        React saves each fiber on the HTML element that the React component
        rendered, under a property whose name starts with{" "}
        <code>__reactFiber$</code>. So, this means that the React component
        that wraps the input bar keeps a pointer to the{" "}
        <code>EditorView</code>, so following a path from the input bar&apos;s
        element up through the fibers of its parent components leads to it.
        While this isn&apos;t a documented API by any means, it&apos;s all
        still reachable from the page&apos;s own JavaScript, which is where our
        extension&apos;s page script runs, so Parallax finds the reference by
        essentially traversing a series of fibers, using the following code
        snippet:
      </p>

      <Code file="apps/extension/src/inject.ts">{`let element = node;
let fiber = null;

for (let hops = 0; hops < 12 && element; hops++) {
  const fiberKey =
    Object
    .keys(element)
    .find((k) => k.startsWith('__reactFiber$'));

  if (fiberKey) {
    fiber = element[fiberKey];
    break;
  }

  element = element.parentElement;
}

for (let depth = 0; fiber && depth < 40; depth++) {
  /**
   * Check the three places a component can keep the
   * EditorView: the object behind the fiber, the
   * component's hooks, and the props it was given.
   */
  const inObject = viewWithin(fiber.stateNode, node);
  const inHooks = viewInHooks(fiber, node);
  const inProps = viewInProps(fiber, node);

  if (inObject || inHooks || inProps) {
    return inObject || inHooks || inProps;
  }

  // Not here, so climb to the parent component
  fiber = fiber.return;
}`}</Code>

      <p>
        The search starts at the input bar&apos;s HTML element with id{" "}
        <code>#prompt-textarea</code>. Since this component was created by
        ProseMirror, a component library written in plain JS, rather than by
        React, it has no fiber of its own, and the extension checks its parent
        elements, up to 12 levels, for the first one that does. From that fiber
        it climbs up to 40 levels through parent components, checking each
        one&apos;s state, refs and props for an object that looks like an{" "}
        <code>EditorView</code>: something with a <code>dispatch</code>{" "}
        function, a <code>state</code>, and the input bar as its element.
      </p>

      <Fig
        n={3}
        caption="Finding the EditorView"
      >
        <FiberSearch />
      </Fig>

      <p>
        Once it has the <code>EditorView</code>, the page script types the
        message by replacing the input bar&apos;s contents through the{" "}
        <code>EditorView</code>&apos;s <code>dispatch</code> function, with the
        following code snippet in <code>inject.ts</code>:
      </p>

      <Code file="apps/extension/src/inject.ts">{`const paragraphs = String(text).split('\\n').map((line) => (
  paragraph.create(null, line ? state.schema.text(line) : null)
));
const tr = state.tr.replaceWith(0, state.doc.content.size, paragraphs);
view.dispatch(tr.scrollIntoView());`}</Code>

      <p>
        That is the same path ChatGPT&apos;s own edits take, so the send button
        turns on as it would for a person typing, and a long message stays text
        instead of becoming a pasted-file attachment.
      </p>

      <p>
        After the message is sent, the page script reads the reply. It wraps{" "}
        <code>fetch</code>, <code>EventSource</code> and{" "}
        <code>WebSocket</code>, tees every event stream the page opens, and
        rebuilds the reply from the small edits that ChatGPT streams, then
        passes it on to the desktop app. Messages whose content type is{" "}
        <code>thoughts</code>, <code>reasoning_recap</code> or similar are
        skipped, which separates the model&apos;s reasoning from its output.
      </p>

      <h4>Prompt Grammar &amp; Hierarchy</h4>
      <p>
        To actually send your message to the website, Parallax wraps it in{" "}
        <code>{"{plx:task}"}</code> tags (<code>{"{plx:task} YOUR MESSAGE {/plx:task}"}</code>), appends its system prompt, and
        sends it all as one ordinary chat message. So for Parallax, the system prompt
        is just more text in your message and has none of the priority a
        system prompt actually gets through an API. This is also why I had to
        experiment with different system prompts to convince the model to call
        tools in the format I wanted instead of the one OpenAI had set for
        chatgpt.com.
      </p>
      <p>
        When I asked it to look through a repository, the model would routinely
        open its own code interpreter, list an empty sandbox, and report that
        the project was empty. The system prompt therefore has to explicitly
        prohibit ChatGPT from using its built-in tools:
      </p>

      <Code
        file="apps/desktop/lib/agent/systemPrompt.ts"
        lang="prompt"
      >{`Do not use native tools, a code interpreter,
or another terminal. They cannot access the
mounted workspace. Do not claim you lack access
or ask for uploads; emit Parallax actions.`}</Code>

      <p>
        Every reply by the model is either an ACT, which is one{" "}
        <code>{"{plx:note}"}</code> followed by one to four command line
        instructions wrapped in tags, or an ANSWER, which is a single{" "}
        <code>{"{plx:done}"}</code>, with no prose allowed outside the{" "}
        <code>{"{plx:*}"}</code> tags. The desktop app finds the shell commands it needs to run by parsing
        the model&apos;s reply for these tags, which is also why they use
        braces instead of angle brackets (<code>{"{plx:note}"}</code> instead
        of <code>{"<plx:note>"}</code>), because ChatGPT&apos;s renderer
        reads paired tags (<code>{"<plx:note></plx:note>"}</code>) as HTML
        elements and strips them from the page.
      </p>

      <p>
        In Fig. 4, you can type into a model reply and see which notes,
        commands and answers the desktop app&apos;s parser pulls out of it.
      </p>

      <Fig
        n={4}
        caption="Message Parser"
      >
        <TagParser />
      </Fig>

      <p>
        The model doesn&apos;t always follow the format either. It still
        writes <code>{"<plx:note>"}</code> with angle brackets some of the
        time, and often leaves a note or a final answer unclosed. So before
        anything else reads the reply, the parser rewrites angle-bracket tags
        into the brace form, closes an open note where the next tag starts,
        and closes an open answer at the end of the reply.
      </p>

      <p>
        The results of tool calls are sent back as{" "}
        <code>{"{plx:result}"}</code> blocks in a single message that you
        never see in the desktop app, but can see on chatgpt.com. ChatGPT
        refuses messages over a certain size, which would leave the
        user&apos;s task stuck, so the results are cut to fit. Short results
        are kept whole and only the long ones are shortened, so if one
        command prints an enormous file and fifteen others print a few lines
        each, only the long one gets cut.
      </p>

      <h4>In Summary</h4>
      <p>
        One turn of conversation in Parallax is therefore a hodgepodge of the
        many different interactions between a desktop app, a Chrome extension
        and a website. The diagram below neatly summarizes everything that
        happens when you send a single message.
      </p>

      <Fig n={5} caption="The route one turn takes.">
        <TurnRoute />
      </Fig>

      <p>
        You could definitely take this further. It&apos;s easy to see how
        common harness features such as auto-reviewing commands, a model picker
        and sub-agents could be added to Parallax. You can&apos;t, however,
        overcome the system&apos;s inherent fragility.
      </p>

      <p>
        Parallax completely relies on ChatGPT&apos;s internal behavior, which
        is subject to change at a moment&apos;s notice and, obviously, has no
        public-facing documentation. This means that any update to the website
        could break Parallax. If ChatGPT moves the <code>EditorView</code> out
        of the component that is holding it today, the fiber search would
        climb 40 levels, find nothing and render the extension unable to type
        and halt the entire loop. If ChatGPT were to add new markers or tags to
        their prompts, our parser would stop working and the loop stops again.
      </p>

      <p>
        Parallax isn&apos;t available for use, and I&apos;d recommend against
        building something like it. I built it purely to tinker with
        WebSockets and streaming architectures.
      </p>
      <p>
        OpenAI&apos;s{" "}
        <ExternalLink href="https://openai.com/policies/terms-of-use/">
          Terms
        </ExternalLink>{" "}
        also forbid &quot;automatically or programmatically extracting
        output&quot; from its product offerings, which is exactly what Parallax
        does, so using Parallax would put your ChatGPT account at risk. The
        OpenAI API, and the harnesses built on top of it, like{" "}
        <ExternalLink href="https://openai.com/codex/">Codex</ExternalLink>,
        do Parallax&apos;s job much better through an architecture that&apos;s
        actually meant for it.
      </p>
    </>
  );
}
