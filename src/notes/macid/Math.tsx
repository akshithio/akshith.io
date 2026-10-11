import katex from "katex";

/**
 * A display equation, typeset at build time.
 *
 * KaTeX runs here on the server and emits finished markup, so the page ships
 * the equation and the stylesheet but none of the library. `throwOnError`
 * stays on: a typo in a formula should break the build, not render a red
 * smear on the published page.
 */
export function Equation({ tex }: { tex: string }) {
  const html = katex.renderToString(tex, {
    displayMode: true,
    throwOnError: true,
    output: "html",
  });
  return (
    <div
      className="my-[1.2em] overflow-x-auto text-[13px]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/** The same, inline in a sentence. */
export function Tex({ tex }: { tex: string }) {
  const html = katex.renderToString(tex, {
    displayMode: false,
    throwOnError: true,
    output: "html",
  });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
