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
      className="dark:text-a-white my-6 text-4xl font-semibold md:text-5xl"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="dark:text-a-white my-5 text-3xl font-semibold md:text-4xl"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="dark:text-a-white my-4 text-2xl font-semibold md:text-3xl"
      {...props}
    />
  ),
  h4: (props: any) => (
    <h4
      className="dark:text-a-white my-3 text-xl font-semibold md:text-2xl"
      {...props}
    />
  ),
  h5: (props: any) => (
    <h5
      className="dark:text-a-white my-2 text-lg font-semibold md:text-xl"
      {...props}
    />
  ),
  h6: (props: any) => (
    <h6
      className="dark:text-a-white my-2 text-base font-semibold md:text-lg"
      {...props}
    />
  ),

  // Text elements
  p: (props: any) => (
    <p className="my-4 leading-relaxed dark:text-gray-200" {...props} />
  ),
  strong: (props: any) => <strong className="dark:text-a-white" {...props} />,
  em: (props: any) => <em className="italic dark:text-gray-200" {...props} />,

  // Lists
  ul: (props: any) => (
    <ul
      className="my-4 ml-6 list-disc space-y-2 dark:text-gray-200"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="my-4 ml-6 list-decimal space-y-2 dark:text-gray-200"
      {...props}
    />
  ),
  li: (props: any) => <li className="my-1" {...props} />,
  blockquote: (props: any) => (
    <div
      className={`${passenger.className} flex w-full items-center justify-center`}
    >
      <div className="border-l-solid my-6 w-[95%] border-l-[0.188rem] px-3 py-3 [border-image:linear-gradient(to_bottom,#FF0000,#EBB751,#A6EB6A)_1]">
        <div className="ml-3">
          <h1 className="text-a-black dark:text-a-white">{props.children}</h1>
        </div>
      </div>
    </div>
  ),

  code: ({ children, className, ...props }: any) => {
    if (className) {
      // This is a code block (```code```)
      return (
        <CodeBlock className={className} {...props}>
          {children}
        </CodeBlock>
      );
    } else {
      // This is inline formatting (`@something`)
      return (
        <code
          className="rounded bg-[#CCC] dark:bg-[#444] px-1 font-semibold py-0.5 font-mono text-[12px]"
          {...props}
        >
          {children}
        </code>
      );
    }
  },

  pre: (props: any) => (
    <pre
      className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm dark:bg-gray-800 dark:text-gray-200"
      {...props}
    />
  ),
  table: (props: any) => (
    <div className="my-4 overflow-x-auto">
      <table
        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
        {...props}
      />
    </div>
  ),
  thead: (props: any) => (
    <thead className="bg-gray-50 dark:bg-gray-800" {...props} />
  ),
  tr: (props: any) => <tr className="dark:border-gray-700" {...props} />,
  th: (props: any) => (
    <th
      className="px-6 py-3 text-left text-xs tracking-wider text-gray-500 uppercase dark:text-gray-300"
      {...props}
    />
  ),
  td: (props: any) => (
    <td className="px-6 py-4 whitespace-nowrap dark:text-gray-200" {...props} />
  ),

  // Links
  a: (props: any) => (
    <a
      className="text-blue-600 underline dark:text-blue-400"
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
    <dl className="my-4 space-y-4 dark:text-gray-200" {...props} />
  ),
  dt: (props: any) => <dt className="dark:text-a-white" {...props} />,
  dd: (props: any) => <dd className="ml-4 dark:text-gray-300" {...props} />,
};

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
