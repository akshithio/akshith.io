import ImageComp from "@/components/blog/standard/ImageComp";
import InTextCitationComp from "@/components/blog/standard/InTextCitationComp";
import SideCitationComp from "@/components/blog/standard/SideCitationComp";
import SideNoteComp from "@/components/blog/standard/SideNoteComp";
import CodeBlock from "../../../blog/standard/CodeBlockComp";

import { passenger } from "../../../../utils/fonts";

const MarkdownComponents = {
  h1: (props: any) => (
    <h1
      className=" my-6 text-4xl font-semibold md:text-5xl dark:text-white"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className=" my-5 text-3xl font-semibold md:text-4xl dark:text-white"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className=" my-4 text-2xl font-semibold md:text-3xl dark:text-white"
      {...props}
    />
  ),
  h4: (props: any) => (
    <h4
      className=" my-3 text-xl font-semibold md:text-2xl dark:text-white"
      {...props}
    />
  ),
  h5: (props: any) => (
    <h5
      className=" my-2 text-lg font-semibold md:text-xl dark:text-white"
      {...props}
    />
  ),
  h6: (props: any) => (
    <h6
      className=" my-2 text-base font-semibold md:text-lg dark:text-white"
      {...props}
    />
  ),

  // Text elements
  p: (props: any) => (
    <p className=" my-4 leading-relaxed dark:text-gray-200" {...props} />
  ),
  strong: (props: any) => <strong className=" dark:text-white" {...props} />,
  em: (props: any) => <em className=" italic dark:text-gray-200" {...props} />,

  // Lists
  ul: (props: any) => (
    <ul
      className=" my-4 ml-6 list-disc space-y-2 dark:text-gray-200"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className=" my-4 ml-6 list-decimal space-y-2 dark:text-gray-200"
      {...props}
    />
  ),
  li: (props: any) => <li className=" my-1 " {...props} />,

  // Quotes and citations
  blockquote: (props: any) => (
    <div
      className={`${passenger.className} flex w-full items-center justify-center`}
    >
      <div className="border-l-solid my-6 w-[95%] border-l-[3px] px-[12px] py-[12px] [border-image:linear-gradient(to_bottom,#FF0000,#EBB751,#A6EB6A)_1]">
        <div className="ml-[12px]">
          <h1 className="text-[#111]">{props.children}</h1>
        </div>
      </div>
    </div>
  ),

  // Code elements
  code: ({ children, className, ...props }: any) => {
    if (className) {
      return (
        <CodeBlock className={className} {...props}>
          {children}
        </CodeBlock>
      );
    }
    return (
      <code
        className="rounded-md bg-gray-100 px-2 py-1 font-mono text-sm"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: (props: any) => (
    <pre
      className=" my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm dark:bg-gray-800 dark:text-gray-200"
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
        className=" min-w-full divide-y divide-gray-200 dark:divide-gray-700"
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
      className=" px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500 dark:text-gray-300"
      {...props}
    />
  ),
  td: (props: any) => (
    <td
      className=" whitespace-nowrap px-6 py-4 dark:text-gray-200"
      {...props}
    />
  ),

  // Links
  a: (props: any) => (
    <a
      className=" text-blue-600 hover:underline dark:text-blue-400"
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
    <dl className=" my-4 space-y-4 dark:text-gray-200" {...props} />
  ),
  dt: (props: any) => <dt className=" dark:text-white" {...props} />,
  dd: (props: any) => <dd className=" ml-4 dark:text-gray-300" {...props} />,
};

// Combine custom components with Markdown components
export const components = {
  ...MarkdownComponents,
  ImageComp,
  SideNoteComp,
  SideCitationComp,
  InTextCitationComp,
};
