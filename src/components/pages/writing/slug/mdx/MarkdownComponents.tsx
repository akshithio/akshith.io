import BibliographyHolderComp from "@/components/pages/writing/slug/mdx/BibliographyHolderComp";
import BibliographyItemComp from "@/components/pages/writing/slug/mdx/BibliographyItemComp";
import CitationSuperscriptComp from "@/components/pages/writing/slug/mdx/CitationSuperscriptComp";
import CodeBlock from "@/components/pages/writing/slug/mdx/CodeBlockComp";
import ImageComp from "@/components/pages/writing/slug/mdx/ImageComp";
import InTextCitationComp from "@/components/pages/writing/slug/mdx/InTextCitationComp";
import SideCitationComp from "@/components/pages/writing/slug/mdx/SideCitationComp";
import SideNoteComp from "@/components/pages/writing/slug/mdx/SideNoteComp";

import { passenger } from "@/utils/fonts";

const MarkdownComponents = {
  h1: (props: any) => (
    <h1
      className=" my-6 text-4xl font-semibold md:text-5xl dark:text-aWhite"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className=" my-5 text-3xl font-semibold md:text-4xl dark:text-aWhite"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className=" my-4 text-2xl font-semibold md:text-3xl dark:text-aWhite"
      {...props}
    />
  ),
  h4: (props: any) => (
    <h4
      className=" my-3 text-xl font-semibold md:text-2xl dark:text-aWhite"
      {...props}
    />
  ),
  h5: (props: any) => (
    <h5
      className=" my-2 text-lg font-semibold md:text-xl dark:text-aWhite"
      {...props}
    />
  ),
  h6: (props: any) => (
    <h6
      className=" my-2 text-base font-semibold md:text-lg dark:text-aWhite"
      {...props}
    />
  ),

  // Text elements
  p: (props: any) => (
    <p className=" dark:text-gray-200 my-4 leading-relaxed" {...props} />
  ),
  strong: (props: any) => <strong className=" dark:text-aWhite" {...props} />,
  em: (props: any) => <em className=" dark:text-gray-200 italic" {...props} />,

  // Lists
  ul: (props: any) => (
    <ul
      className="dark:text-gray-200 my-4 ml-6 list-disc space-y-2"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className=" dark:text-gray-200 my-4 ml-6 list-decimal space-y-2"
      {...props}
    />
  ),
  li: (props: any) => <li className=" my-1 " {...props} />,

  // Quotes and citations
  blockquote: (props: any) => (
    <div
      className={`${passenger.className} flex w-full items-center justify-center`}
    >
      <div className="border-l-solid my-6 w-[95%] border-l-[0.188rem] px-3 py-3 [border-image:linear-gradient(to_bottom,#FF0000,#EBB751,#A6EB6A)_1]">
        <div className="ml-3">
          <h1 className="text-aBlack dark:text-aWhite">{props.children}</h1>
        </div>
      </div>
    </div>
  ),
  code: ({ children, className, ...props }: any) => (
    <CodeBlock className={className} {...props}>
      {children}
    </CodeBlock>
  ),
  pre: (props: any) => (
    <pre
      className=" bg-gray-100 dark:bg-gray-800 dark:text-gray-200 my-4 overflow-x-auto rounded-lg p-4 text-sm"
      {...props}
    />
  ),

  // Math
  math: (props: any) => (
    <div className="my-4 overflow-x-auto">{props.children}</div>
  ),
  inlineMath: (props: any) => <span className="mx-1">{props.children}</span>,

  // Table elements
  table: (props: any) => (
    <div className="my-4 overflow-x-auto">
      <table
        className=" divide-gray-200 dark:divide-gray-700 min-w-full divide-y"
        {...props}
      />
    </div>
  ),
  thead: (props: any) => (
    <thead className=" bg-gray-50 dark:bg-gray-800" {...props} />
  ),
  tr: (props: any) => <tr className=" dark:border-gray-700" {...props} />,
  th: (props: any) => (
    <th
      className=" text-gray-500 dark:text-gray-300 px-6 py-3 text-left text-xs uppercase tracking-wider"
      {...props}
    />
  ),
  td: (props: any) => (
    <td
      className=" dark:text-gray-200 whitespace-nowrap px-6 py-4"
      {...props}
    />
  ),

  // Links
  a: (props: any) => (
    <a
      className=" text-blue-600 dark:text-blue-400 hover:underline"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),

  // Horizontal rule
  hr: (props: any) => (
    <hr className="border-gray-200 dark:border-gray-700 my-8" {...props} />
  ),

  // Definition lists
  dl: (props: any) => (
    <dl className=" dark:text-gray-200 my-4 space-y-4" {...props} />
  ),
  dt: (props: any) => <dt className=" dark:text-aWhite" {...props} />,
  dd: (props: any) => <dd className=" dark:text-gray-300 ml-4" {...props} />,
};

// Combine custom components with Markdown components
export const components = {
  ...MarkdownComponents,
  ImageComp,
  SideNoteComp,
  SideCitationComp,
  InTextCitationComp,
  BibliographyHolderComp,
  BibliographyItemComp,
  CitationSuperscriptComp,
};
