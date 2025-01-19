"use client";

import Prism from "prismjs";
import { useEffect, useRef } from "react";

const loadLanguages = async () => {
  // Define the languages you want to load
  const languages = ["javascript", "typescript", "jsx", "tsx", "css", "python"];

  // Load each language
  await Promise.all(
    languages.map((lang) =>
      import(`prismjs/components/prism-${lang}`).catch((err) =>
        console.warn(`Failed to load language: ${lang}`, err),
      ),
    ),
  );
};

export default function CodeBlock({ children, className }) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Load languages and highlight
    const initPrism = async () => {
      await loadLanguages();
      if (codeRef.current) {
        Prism.highlightElement(codeRef.current);
      }
    };

    initPrism().catch(console.error);
  }, [children]);

  const language = className ? className.replace("language-", "") : "plaintext";

  return (
    <code ref={codeRef} className={`language-${language}`}>
      {children}
    </code>
  );
}
