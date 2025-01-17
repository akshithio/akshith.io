"use client";

import MoonIcon from "@/icons/MoonIcon";
import SunIcon from "@/icons/SunIcon";
import { erika } from "@/utils/fonts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [systemTheme, setSystemTheme] = useState("light");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    setSystemTheme(mediaQuery.matches ? "dark" : "light");

    const handleThemeChange = (e) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="w-full">
      <div
        className={`${erika.className} text-aBlack dark:text-aWhite flex gap-x-12 text-lg underline`}
      >
        <a href="/">
          <h1>home</h1>
        </a>
        <a href="/writing">
          <h1>writing</h1>
          {/* i/o */}
        </a>
        <a href="/work">
          <h1>work</h1>
        </a>
        <a href="/reach-out">
          <h1>reach out!</h1>
          {/* say hi! */}
        </a>
      </div>

      <div className="">
        {currentTheme === "dark" && (
          <button
            className="absolute right-2 top-2 p-3"
            aria-label="Switch to light mode"
            onClick={() => setTheme("light")}
          >
            <SunIcon />
          </button>
        )}

        {currentTheme === "light" && (
          <button
            className="absolute right-2 top-2 p-3"
            aria-label="Switch to dark mode"
            onClick={() => setTheme("dark")}
          >
            <MoonIcon />
          </button>
        )}
      </div>
    </div>
  );
}
