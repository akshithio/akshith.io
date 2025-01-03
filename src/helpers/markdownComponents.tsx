import ImageComp from "~/components/blog/standard/ImageComp";
import InTextCitationComp from "~/components/blog/standard/InTextCitationComp";
import QuoteComp from "~/components/blog/standard/QuoteComp";
import SideCitationComp from "~/components/blog/standard/SideCitationComp";
import SideNoteComp from "~/components/blog/standard/SideNoteComp";

import { duplet } from "./fonts";

const MarkdownComponents = {
  h1: (props: any) => (
    <h1
      className={`${duplet.className} text-4xl md:text-5xl font-semibold my-6 dark:text-white`}
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className={`${duplet.className} text-3xl md:text-4xl font-semibold my-5 dark:text-white`}
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className={`${duplet.className} text-2xl md:text-3xl font-semibold my-4 dark:text-white`}
      {...props}
    />
  ),
  h4: (props: any) => (
    <h4
      className={`${duplet.className} text-xl md:text-2xl font-semibold my-3 dark:text-white`}
      {...props}
    />
  ),
  h5: (props: any) => (
    <h5
      className={`${duplet.className} text-lg md:text-xl font-semibold my-2 dark:text-white`}
      {...props}
    />
  ),
  h6: (props: any) => (
    <h6
      className={`${duplet.className} text-base md:text-lg font-semibold my-2 dark:text-white`}
      {...props}
    />
  ),

  // Text elements
  p: (props: any) => (
    <p
      className={`${duplet.className} my-4 leading-relaxed font-semibold dark:text-gray-200`}
      {...props}
    />
  ),
  strong: (props: any) => (
    <strong
      className={`${duplet.className} font-semibold dark:text-white`}
      {...props}
    />
  ),
  em: (props: any) => (
    <em
      className={`${duplet.className} italic font-semibold dark:text-gray-200`}
      {...props}
    />
  ),

  // Lists
  ul: (props: any) => (
    <ul
      className={`${duplet.className} list-disc ml-6 my-4 space-y-2 font-semibold dark:text-gray-200`}
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className={`${duplet.className} list-decimal ml-6 my-4 space-y-2 font-semibold dark:text-gray-200`}
      {...props}
    />
  ),
  li: (props: any) => (
    <li className={`${duplet.className} my-1 font-semibold`} {...props} />
  ),

  // Quotes and citations
  blockquote: (props: any) => (
    <blockquote
      className={`${duplet.className} border-l-4 border-gray-300 dark:border-gray-700 pl-4 my-4 italic font-semibold text-gray-700 dark:text-gray-300`}
      {...props}
    />
  ),

  // Code elements
  code: (props: any) => (
    <code
      className={`${duplet.className} bg-gray-100 dark:bg-gray-800 rounded px-1.5 py-0.5 font-semibold text-sm dark:text-gray-200`}
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className={`${duplet.className} bg-gray-100 dark:bg-gray-800 rounded-lg p-4 my-4 overflow-x-auto font-semibold text-sm dark:text-gray-200`}
      {...props}
    />
  ),

  // Table elements
  table: (props: any) => (
    <div className="overflow-x-auto my-4">
      <table
        className={`${duplet.className} min-w-full divide-y divide-gray-200 dark:divide-gray-700 font-semibold`}
        {...props}
      />
    </div>
  ),
  thead: (props: any) => (
    <thead
      className={`${duplet.className} bg-gray-50 dark:bg-gray-800 font-semibold`}
      {...props}
    />
  ),
  tr: (props: any) => (
    <tr
      className={`${duplet.className} dark:border-gray-700 font-semibold`}
      {...props}
    />
  ),
  th: (props: any) => (
    <th
      className={`${duplet.className} px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider`}
      {...props}
    />
  ),
  td: (props: any) => (
    <td
      className={`${duplet.className} px-6 py-4 whitespace-nowrap font-semibold dark:text-gray-200`}
      {...props}
    />
  ),

  // Links
  a: (props: any) => (
    <a
      className={`${duplet.className} text-blue-600 dark:text-blue-400 hover:underline font-semibold`}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),

  // Horizontal rule
  hr: (props: any) => (
    <hr className="my-8 border-gray-200 dark:border-gray-700" {...props} />
  ),

  // Definition lists
  dl: (props: any) => (
    <dl
      className={`${duplet.className} my-4 space-y-4 font-semibold dark:text-gray-200`}
      {...props}
    />
  ),
  dt: (props: any) => (
    <dt
      className={`${duplet.className} font-semibold dark:text-white`}
      {...props}
    />
  ),
  dd: (props: any) => (
    <dd
      className={`${duplet.className} ml-4 font-semibold dark:text-gray-300`}
      {...props}
    />
  ),
};

// Combine custom components with Markdown components
export const components = {
  ...MarkdownComponents,
  ImageComp,
  SideNoteComp,
  SideCitationComp,
  InTextCitationComp,
  QuoteComp,
};
