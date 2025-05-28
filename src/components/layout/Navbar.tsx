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
        className={`${erika.className} laptop:mt-0 mt-4 text-a-black dark:text-a-white desktop:text-2xl phone-l:gap-x-6 tablet:gap-x-12 phone-l:text-lg flex items-center justify-between text-sm underline`}
      >
        <div className="flex gap-x-5 phone-l:gap-x-6 tablet:gap-x-12">
          <a href="/">
            <h1>home</h1>
          </a>
          <a href="/writing">
            <h1>writing</h1>
          </a>
          <a href="/work">
            <h1>work</h1>
          </a>
          <a href="mailto:mail@akshith.io">
            <h1>reach out!</h1>
          </a>
        </div>

        <div>
          {currentTheme === "dark" ? (
            <button
              className="p-2"
              aria-label="Switch to light mode"
              onClick={() => setTheme("light")}
            >
              <SunIcon />
            </button>
          ) : (
            <button
              className="p-2"
              aria-label="Switch to dark mode"
              onClick={() => setTheme("dark")}
            >
              <MoonIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
