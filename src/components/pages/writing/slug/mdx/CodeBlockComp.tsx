"use client";

import CopyIcon from "@/icons/CopyIcon";
import SuccessIcon from "@/icons/SuccessIcon";
import Prism from "prismjs";
import { useEffect, useRef, useState } from "react";

const languageCache = new Set();

const loadLanguage = async (language) => {
  if (languageCache.has(language)) {
    return;
  }

  try {
    if (Prism.languages[language]) {
      languageCache.add(language);
      return;
    }

    const languageMap = {
      tsx: "tsx",
      jsx: "jsx",
      js: "javascript",
      python: "python",
      css: "css",
      html: "markup",
      rust: "rust",
    };

    const languageModule = languageMap[language] || language;

    if (language === "tsx" || language === "jsx") {
      await import("prismjs/components/prism-javascript");
      await import("prismjs/components/prism-jsx");
      if (language === "tsx") {
        await import("prismjs/components/prism-typescript");
      }
    }

    await import(`prismjs/components/prism-${languageModule}`);

    if (Prism.languages[language]) {
      languageCache.add(language);
    } else {
      throw new Error(
        `Language ${language} not found in Prism.languages after import`,
      );
    }
  } catch (err) {
    console.error(`Failed to load language: ${language}`, err);
    throw err;
  }
};

export default function CodeBlock({ children, className = "", ...props }) {
  const codeRef = useRef(null);
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const language = className?.replace(/^language-/, "") || "plaintext";

  // Fix for hydration mismatch - only render client-specific content after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let mounted = true;

    const initPrism = async () => {
      try {
        if (language !== "plaintext") {
          await loadLanguage(language);

          if (!mounted) {
            return;
          }
        }

        setIsLanguageLoaded(true);

        requestAnimationFrame(() => {
          if (!mounted) {
            return;
          }

          if (codeRef.current) {
            try {
              Prism.highlightElement(codeRef.current);
            } catch (highlightError) {
              console.error("Error during highlighting:", highlightError);
              setError("Highlighting failed");
            }
          }
        });
      } catch (err) {
        console.error("Error in initPrism:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    initPrism();

    return () => {
      mounted = false;
    };
  }, [language, children, isClient]);

  const handleCopy = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(children).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      });
    }
  };

  if (error) {
    return (
      <pre className="rounded-lg bg-[#fef2f2] p-4 dark:bg-[#7f1d1d]">
        <code className="text-[#dc2626] dark:text-[#f87171]">
          Error: {error}
        </code>
      </pre>
    );
  }

  // Use a static string for the className to ensure server/client match
  const preClassName =
    "group relative my-4 overflow-x-auto rounded-lg bg-[#6b7280] p-4 text-sm";

  return (
    <pre className={preClassName} tabIndex={0} suppressHydrationWarning={true}>
      {isClient && (
        <button
          onClick={handleCopy}
          className="bg-gray-800 text-white hover:bg-gray-700 absolute right-2 top-2 hidden rounded-sm px-2 py-1 text-xs focus:outline-hidden group-hover:block"
        >
          {copySuccess ? (
            <div className="flex items-center justify-center">
              <SuccessIcon /> <h1 className="ml-1">Copied!</h1>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <CopyIcon /> <h1 className="ml-1">Copy</h1>
            </div>
          )}
        </button>
      )}
      <code
        ref={codeRef}
        className={className || `language-${language}`}
        data-prism-loaded={isLanguageLoaded}
        suppressHydrationWarning={true}
        {...props}
      >
        {children}
      </code>
    </pre>
  );
}
