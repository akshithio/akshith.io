const InlineCode: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="rounded-md bg-gray-100 px-2 py-1 font-mono text-sm text-gray-800 transition-colors duration-200 dark:bg-gray-800 dark:text-gray-200">
    {children}
  </code>
);

export { InlineCode };
