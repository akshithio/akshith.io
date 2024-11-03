"use client";

import { useEffect, useState } from "react";
import { duplet, erika, passenger } from "../../helpers/fonts";

export default function HomePage() {
  const [theme, setTheme] = useState("light");

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <body className="h-screen w-screen overflow-x-hidden overflow-y-hidden bg-[#eee] p-[24px] dark:bg-[#111]">
      <div
        className={`${erika.className} flex gap-x-[48px] text-[18px] text-[#111] underline dark:text-[#eee]`}
      >
        <a href="/">
          <h1>home</h1>
        </a>

        <a href="/writing">
          <h1>writing</h1>
        </a>

        <a href="/work">
          <h1>work</h1>
        </a>

        <a href="/reach-out">
          <h1>reach out!</h1>
        </a>
      </div>
      <div className="absolute right-[16px] top-[16px]">
        <button onClick={toggleTheme}>
          {theme === "dark" && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.00004 12.6667C10.5774 12.6667 12.6667 10.5774 12.6667 8.00004C12.6667 5.42271 10.5774 3.33337 8.00004 3.33337C5.42271 3.33337 3.33337 5.42271 3.33337 8.00004C3.33337 10.5774 5.42271 12.6667 8.00004 12.6667Z"
                fill="#999999"
              />
              <path
                d="M7.99996 15.3066C7.63329 15.3066 7.33329 15.0333 7.33329 14.6666V14.6133C7.33329 14.2466 7.63329 13.9466 7.99996 13.9466C8.36663 13.9466 8.66663 14.2466 8.66663 14.6133C8.66663 14.98 8.36663 15.3066 7.99996 15.3066ZM12.76 13.4266C12.5866 13.4266 12.42 13.36 12.2866 13.2333L12.2 13.1466C11.94 12.8866 11.94 12.4666 12.2 12.2066C12.46 11.9466 12.88 11.9466 13.14 12.2066L13.2266 12.2933C13.4866 12.5533 13.4866 12.9733 13.2266 13.2333C13.1 13.36 12.9333 13.4266 12.76 13.4266ZM3.23996 13.4266C3.06663 13.4266 2.89996 13.36 2.76663 13.2333C2.50663 12.9733 2.50663 12.5533 2.76663 12.2933L2.85329 12.2066C3.11329 11.9466 3.53329 11.9466 3.79329 12.2066C4.05329 12.4666 4.05329 12.8866 3.79329 13.1466L3.70663 13.2333C3.57996 13.36 3.40663 13.4266 3.23996 13.4266ZM14.6666 8.66663H14.6133C14.2466 8.66663 13.9466 8.36663 13.9466 7.99996C13.9466 7.63329 14.2466 7.33329 14.6133 7.33329C14.98 7.33329 15.3066 7.63329 15.3066 7.99996C15.3066 8.36663 15.0333 8.66663 14.6666 8.66663ZM1.38663 8.66663H1.33329C0.966626 8.66663 0.666626 8.36663 0.666626 7.99996C0.666626 7.63329 0.966626 7.33329 1.33329 7.33329C1.69996 7.33329 2.02663 7.63329 2.02663 7.99996C2.02663 8.36663 1.75329 8.66663 1.38663 8.66663ZM12.6733 3.99329C12.5 3.99329 12.3333 3.92663 12.2 3.79996C11.94 3.53996 11.94 3.11996 12.2 2.85996L12.2866 2.77329C12.5466 2.51329 12.9666 2.51329 13.2266 2.77329C13.4866 3.03329 13.4866 3.45329 13.2266 3.71329L13.14 3.79996C13.0133 3.92663 12.8466 3.99329 12.6733 3.99329ZM3.32663 3.99329C3.15329 3.99329 2.98663 3.92663 2.85329 3.79996L2.76663 3.70663C2.50663 3.44663 2.50663 3.02663 2.76663 2.76663C3.02663 2.50663 3.44663 2.50663 3.70663 2.76663L3.79329 2.85329C4.05329 3.11329 4.05329 3.53329 3.79329 3.79329C3.66663 3.92663 3.49329 3.99329 3.32663 3.99329ZM7.99996 2.02663C7.63329 2.02663 7.33329 1.75329 7.33329 1.38663V1.33329C7.33329 0.966626 7.63329 0.666626 7.99996 0.666626C8.36663 0.666626 8.66663 0.966626 8.66663 1.33329C8.66663 1.69996 8.36663 2.02663 7.99996 2.02663Z"
                fill="#999999"
              />
            </svg>
          )}

          {theme !== "dark" && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.3533 10.62C14.2466 10.44 13.9466 10.16 13.1999 10.2933C12.7866 10.3667 12.3666 10.4 11.9466 10.38C10.3933 10.3133 8.98659 9.6 8.00659 8.5C7.13993 7.53333 6.60659 6.27333 6.59993 4.91333C6.59993 4.15333 6.74659 3.42 7.04659 2.72666C7.33993 2.05333 7.13326 1.7 6.98659 1.55333C6.83326 1.4 6.47326 1.18666 5.76659 1.48C3.03993 2.62666 1.35326 5.36 1.55326 8.28666C1.75326 11.04 3.68659 13.3933 6.24659 14.28C6.85993 14.4933 7.50659 14.62 8.17326 14.6467C8.27993 14.6533 8.38659 14.66 8.49326 14.66C10.7266 14.66 12.8199 13.6067 14.1399 11.8133C14.5866 11.1933 14.4666 10.8 14.3533 10.62Z"
                fill="#999999"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="flex h-full w-full">
        {/* no scrollbar is room for a11y issues */}
        <div className="scrollbar-hidden mt-[45px] h-[100%] w-[372px] overflow-y-scroll border-r-2 border-dotted border-r-[#999] pr-[36px]">
          <div className="w-[336px] text-[#111] dark:text-[#eee]">
            <h1 className={`${passenger.className} text-[24px] italic `}>
              the ✨ microblog ✨
            </h1>
            <h1 className={`${erika.className} mt-[4px] w-[323px] text-[14px]`}>
              these are meant to be notes / drafts tweets / shower thoughts /
              whatever else tbh. inspired from{" "}
              <a
                href="https://udara.io"
                className={`${duplet.className} font-semibold underline`}
              >
                udara.io
              </a>
            </h1>
          </div>

          <div className="mt-[24px] w-[336px] text-[#111] dark:text-[#eee]">
            <div>
              <h1
                className={`${duplet.className} right-0 ml-[82%] text-[12px] text-[#999]`}
              >
                19:10, tue
              </h1>
              <div
                className={` ${erika.className} flex items-center justify-center rounded-[24px] border-[1px] border-solid border-[#111] px-[8px] py-[6px] dark:border-[#eee]`}
              >
                <h1>call me king kong the way i be ding-donging</h1>
              </div>
            </div>

            <div className="mt-[24px]">
              <h1
                className={`${duplet.className} right-0 ml-[82%] text-[12px] text-[#999]`}
              >
                14:23, tue
              </h1>
              <div
                className={` ${erika.className} flex items-center justify-center rounded-[24px] border-[1px] border-solid border-[#111] px-[8px] py-[6px] dark:border-[#eee]`}
              >
                <h1>
                  some semi-serious thought about why i think startups are cool
                  and stuff like that. idk bro i’m just yappin and shi ✨ wanna
                  talk to me? don’t. i’m just a bazooka man doing bazooka thing,
                  all that and all that ykwim?
                </h1>
              </div>
            </div>

            <div className="mt-[24px]">
              <h1
                className={`${duplet.className} right-0 ml-[82%] text-[12px] text-[#999]`}
              >
                23:17, mon
              </h1>
              <div
                className={` ${erika.className} flex items-center justify-center rounded-[24px] border-[1px] border-solid border-[#111] px-[8px] py-[6px] dark:border-[#eee]`}
              >
                <h1>
                  hackclub is a very very cool place. theoretically just built
                  my first programming language cuz of em?
                </h1>
              </div>
            </div>

            <div className="mt-[24px]">
              <h1
                className={`${duplet.className} right-0 ml-[82%] text-[12px] text-[#999]`}
              >
                07:12, mon
              </h1>
              <div
                className={` ${erika.className} flex items-center justify-center rounded-[24px] border-[1px] border-solid border-[#111] px-[8px] py-[6px] dark:border-[#eee]`}
              >
                <h1>
                  perfectionism as a quality that is under-appreciated in
                  building things. for example clay: today they announced a
                  duplicate harmonizer system that gets rid of all duplicate
                  contacts. one of the main factors that disillusioned me with
                  that product is the fact that i spent hours trying to get rid
                  of duplicates so i’m now not as interested to go back and try
                  it
                </h1>
              </div>
            </div>

            <div className="mt-[24px]">
              <h1
                className={`${duplet.className} right-0 ml-[82%] text-[12px] text-[#999]`}
              >
                07:12, mon
              </h1>
              <div
                className={` ${erika.className} flex items-center justify-center rounded-[24px] border-[1px] border-solid border-[#111] px-[8px] py-[6px] dark:border-[#eee]`}
              >
                <h1>
                  perfectionism as a quality that is under-appreciated in
                  building things. for example clay: today they announced a
                  duplicate harmonizer system that gets rid of all duplicate
                  contacts. one of the main factors that disillusioned me with
                  that product is the fact that i spent hours trying to get rid
                  of duplicates so i’m now not as interested to go back and try
                  it
                </h1>
              </div>
            </div>

            <div className="mt-[24px]">
              <h1
                className={`${duplet.className} right-0 ml-[82%] text-[12px] text-[#999]`}
              >
                07:12, mon
              </h1>
              <div
                className={` ${erika.className} flex items-center justify-center rounded-[24px] border-[1px] border-solid border-[#111] px-[8px] py-[6px] dark:border-[#eee]`}
              >
                <h1>
                  perfectionism as a quality that is under-appreciated in
                  building things. for example clay: today they announced a
                  duplicate harmonizer system that gets rid of all duplicate
                  contacts. one of the main factors that disillusioned me with
                  that product is the fact that i spent hours trying to get rid
                  of duplicates so i’m now not as interested to go back and try
                  it
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* issue with flex center i think? */}
        <div className="ml-[130px] mt-[24px] text-[#111] dark:text-[#eee]">
          <h1 className={`${passenger.className} mt-[36px] text-[24px] italic`}>
            stuff.
          </h1>

          <div className="mt-[38px]">
            <div className="mt-[4px] flex">
              <div className="relative mt-[4px] w-[800px]">
                <p className={`${duplet.className} text-[16px] font-semibold`}>
                  a top level understanding of chess algorithms.
                </p>

                <div className="absolute right-0 top-0 flex items-center justify-center ">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.7139 4.95915C14.1832 5.46811 13.7171 6.16668 13.0248 6.16668H2.33325C1.78097 6.16668 1.33325 5.71896 1.33325 5.16668V4.28001C1.33325 2.65334 2.65325 1.33334 4.27992 1.33334H5.82659C6.91325 1.33334 7.25325 1.68668 7.68659 2.26668L8.61992 3.50668C8.82659 3.78001 8.85325 3.81334 9.23992 3.81334H11.0999C12.1329 3.81334 13.064 4.2543 13.7139 4.95915Z"
                      fill="#999999"
                    />
                    <path
                      d="M13.6566 7.16649C14.2076 7.16648 14.6548 7.61213 14.6566 8.1631L14.6666 11.1C14.6666 13.0667 13.0666 14.6667 11.0999 14.6667H4.89992C2.93325 14.6667 1.33325 13.0667 1.33325 11.1V8.16664C1.33325 7.61436 1.78096 7.16665 2.33324 7.16664L13.6566 7.16649Z"
                      fill="#999999"
                    />
                  </svg>
                </div>
              </div>

              <h1
                className={`${duplet.className} ml-[6px] mt-[-2px] text-[16px] font-semibold text-[#999]`}
              >
                technical
              </h1>
            </div>

            <div className="mt-[4px] flex">
              <div className="relative mt-[4px] w-[800px]">
                <p className={`${duplet.className} text-[16px] font-semibold`}>
                  on competition & friendship.
                </p>

                <div className="absolute right-0 top-0 flex items-center justify-center ">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.7139 4.95915C14.1832 5.46811 13.7171 6.16668 13.0248 6.16668H2.33325C1.78097 6.16668 1.33325 5.71896 1.33325 5.16668V4.28001C1.33325 2.65334 2.65325 1.33334 4.27992 1.33334H5.82659C6.91325 1.33334 7.25325 1.68668 7.68659 2.26668L8.61992 3.50668C8.82659 3.78001 8.85325 3.81334 9.23992 3.81334H11.0999C12.1329 3.81334 13.064 4.2543 13.7139 4.95915Z"
                      fill="#999999"
                    />
                    <path
                      d="M13.6566 7.16649C14.2076 7.16648 14.6548 7.61213 14.6566 8.1631L14.6666 11.1C14.6666 13.0667 13.0666 14.6667 11.0999 14.6667H4.89992C2.93325 14.6667 1.33325 13.0667 1.33325 11.1V8.16664C1.33325 7.61436 1.78096 7.16665 2.33324 7.16664L13.6566 7.16649Z"
                      fill="#999999"
                    />
                  </svg>
                </div>
              </div>

              <h1
                className={`${duplet.className} ml-[6px] mt-[-2px] text-[16px] font-semibold text-[#999]`}
              >
                non-technical
              </h1>
            </div>

            <div className="mt-[4px] flex">
              <div className="relative mt-[4px] w-[800px]">
                <p className={`${duplet.className} text-[16px] font-semibold`}>
                  all you will ever need to know about embeddings.
                </p>

                <div className="absolute right-0 top-0 flex items-center justify-center ">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.7139 4.95915C14.1832 5.46811 13.7171 6.16668 13.0248 6.16668H2.33325C1.78097 6.16668 1.33325 5.71896 1.33325 5.16668V4.28001C1.33325 2.65334 2.65325 1.33334 4.27992 1.33334H5.82659C6.91325 1.33334 7.25325 1.68668 7.68659 2.26668L8.61992 3.50668C8.82659 3.78001 8.85325 3.81334 9.23992 3.81334H11.0999C12.1329 3.81334 13.064 4.2543 13.7139 4.95915Z"
                      fill="#999999"
                    />
                    <path
                      d="M13.6566 7.16649C14.2076 7.16648 14.6548 7.61213 14.6566 8.1631L14.6666 11.1C14.6666 13.0667 13.0666 14.6667 11.0999 14.6667H4.89992C2.93325 14.6667 1.33325 13.0667 1.33325 11.1V8.16664C1.33325 7.61436 1.78096 7.16665 2.33324 7.16664L13.6566 7.16649Z"
                      fill="#999999"
                    />
                  </svg>
                </div>
              </div>

              <h1
                className={`${duplet.className} ml-[6px] mt-[-2px] text-[16px] font-semibold text-[#999]`}
              >
                deep-dive
              </h1>
            </div>

            <div className="mt-[4px] flex">
              <div className="relative mt-[4px] w-[800px]">
                <p className={`${duplet.className} text-[16px] font-semibold`}>
                  building a calendar scheduling system in under 48 hrs.
                </p>

                <div className="absolute right-0 top-0 flex items-center justify-center ">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.7139 4.95915C14.1832 5.46811 13.7171 6.16668 13.0248 6.16668H2.33325C1.78097 6.16668 1.33325 5.71896 1.33325 5.16668V4.28001C1.33325 2.65334 2.65325 1.33334 4.27992 1.33334H5.82659C6.91325 1.33334 7.25325 1.68668 7.68659 2.26668L8.61992 3.50668C8.82659 3.78001 8.85325 3.81334 9.23992 3.81334H11.0999C12.1329 3.81334 13.064 4.2543 13.7139 4.95915Z"
                      fill="#999999"
                    />
                    <path
                      d="M13.6566 7.16649C14.2076 7.16648 14.6548 7.61213 14.6566 8.1631L14.6666 11.1C14.6666 13.0667 13.0666 14.6667 11.0999 14.6667H4.89992C2.93325 14.6667 1.33325 13.0667 1.33325 11.1V8.16664C1.33325 7.61436 1.78096 7.16665 2.33324 7.16664L13.6566 7.16649Z"
                      fill="#999999"
                    />
                  </svg>
                </div>
              </div>

              <h1
                className={`${duplet.className} ml-[6px] mt-[-2px] text-[16px] font-semibold text-[#999]`}
              >
                experiments
              </h1>
            </div>

            <div className="mt-[4px] flex">
              <div className="relative mt-[4px] w-[800px]">
                <p className={`${duplet.className} text-[16px] font-semibold`}>
                  understanding ownership & referencing in rust for a
                  non-systems programmer.
                </p>

                <div className="absolute right-0 top-0 flex items-center justify-center ">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.7139 4.95915C14.1832 5.46811 13.7171 6.16668 13.0248 6.16668H2.33325C1.78097 6.16668 1.33325 5.71896 1.33325 5.16668V4.28001C1.33325 2.65334 2.65325 1.33334 4.27992 1.33334H5.82659C6.91325 1.33334 7.25325 1.68668 7.68659 2.26668L8.61992 3.50668C8.82659 3.78001 8.85325 3.81334 9.23992 3.81334H11.0999C12.1329 3.81334 13.064 4.2543 13.7139 4.95915Z"
                      fill="#999999"
                    />
                    <path
                      d="M13.6566 7.16649C14.2076 7.16648 14.6548 7.61213 14.6566 8.1631L14.6666 11.1C14.6666 13.0667 13.0666 14.6667 11.0999 14.6667H4.89992C2.93325 14.6667 1.33325 13.0667 1.33325 11.1V8.16664C1.33325 7.61436 1.78096 7.16665 2.33324 7.16664L13.6566 7.16649Z"
                      fill="#999999"
                    />
                  </svg>
                </div>
              </div>

              <h1
                className={`${duplet.className} ml-[6px] mt-[-2px] text-[16px] font-semibold text-[#999]`}
              >
                technical
              </h1>
            </div>

            <div className="mt-[4px] flex">
              <div className="relative mt-[4px] w-[800px]">
                <p className={`${duplet.className} text-[16px] font-semibold`}>
                  the cuda gpu system for the uninitiated.
                </p>

                <div className="absolute right-0 top-0 flex items-center justify-center ">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.7139 4.95915C14.1832 5.46811 13.7171 6.16668 13.0248 6.16668H2.33325C1.78097 6.16668 1.33325 5.71896 1.33325 5.16668V4.28001C1.33325 2.65334 2.65325 1.33334 4.27992 1.33334H5.82659C6.91325 1.33334 7.25325 1.68668 7.68659 2.26668L8.61992 3.50668C8.82659 3.78001 8.85325 3.81334 9.23992 3.81334H11.0999C12.1329 3.81334 13.064 4.2543 13.7139 4.95915Z"
                      fill="#999999"
                    />
                    <path
                      d="M13.6566 7.16649C14.2076 7.16648 14.6548 7.61213 14.6566 8.1631L14.6666 11.1C14.6666 13.0667 13.0666 14.6667 11.0999 14.6667H4.89992C2.93325 14.6667 1.33325 13.0667 1.33325 11.1V8.16664C1.33325 7.61436 1.78096 7.16665 2.33324 7.16664L13.6566 7.16649Z"
                      fill="#999999"
                    />
                  </svg>
                </div>
              </div>

              <h1
                className={`${duplet.className} ml-[6px] mt-[-2px] text-[16px] font-semibold text-[#999]`}
              >
                technical
              </h1>
            </div>

            <div className="mt-[4px] flex">
              <div className="relative mt-[4px] w-[800px]">
                <p className={`${duplet.className} text-[16px] font-semibold`}>
                  startups & venture funding.
                </p>

                <div className="absolute right-0 top-0 flex items-center justify-center ">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.7139 4.95915C14.1832 5.46811 13.7171 6.16668 13.0248 6.16668H2.33325C1.78097 6.16668 1.33325 5.71896 1.33325 5.16668V4.28001C1.33325 2.65334 2.65325 1.33334 4.27992 1.33334H5.82659C6.91325 1.33334 7.25325 1.68668 7.68659 2.26668L8.61992 3.50668C8.82659 3.78001 8.85325 3.81334 9.23992 3.81334H11.0999C12.1329 3.81334 13.064 4.2543 13.7139 4.95915Z"
                      fill="#999999"
                    />
                    <path
                      d="M13.6566 7.16649C14.2076 7.16648 14.6548 7.61213 14.6566 8.1631L14.6666 11.1C14.6666 13.0667 13.0666 14.6667 11.0999 14.6667H4.89992C2.93325 14.6667 1.33325 13.0667 1.33325 11.1V8.16664C1.33325 7.61436 1.78096 7.16665 2.33324 7.16664L13.6566 7.16649Z"
                      fill="#999999"
                    />
                  </svg>
                </div>
              </div>

              <h1
                className={`${duplet.className} ml-[6px] mt-[-2px] text-[16px] font-semibold text-[#999]`}
              >
                non-technical
              </h1>
            </div>

            <div className="mt-[4px] flex">
              <div className="relative mt-[4px] w-[800px]">
                <p className={`${duplet.className} text-[16px] font-semibold`}>
                  accountability as a service.
                </p>

                <div className="absolute right-0 top-0 flex items-center justify-center ">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.7139 4.95915C14.1832 5.46811 13.7171 6.16668 13.0248 6.16668H2.33325C1.78097 6.16668 1.33325 5.71896 1.33325 5.16668V4.28001C1.33325 2.65334 2.65325 1.33334 4.27992 1.33334H5.82659C6.91325 1.33334 7.25325 1.68668 7.68659 2.26668L8.61992 3.50668C8.82659 3.78001 8.85325 3.81334 9.23992 3.81334H11.0999C12.1329 3.81334 13.064 4.2543 13.7139 4.95915Z"
                      fill="#999999"
                    />
                    <path
                      d="M13.6566 7.16649C14.2076 7.16648 14.6548 7.61213 14.6566 8.1631L14.6666 11.1C14.6666 13.0667 13.0666 14.6667 11.0999 14.6667H4.89992C2.93325 14.6667 1.33325 13.0667 1.33325 11.1V8.16664C1.33325 7.61436 1.78096 7.16665 2.33324 7.16664L13.6566 7.16649Z"
                      fill="#999999"
                    />
                  </svg>
                </div>
              </div>

              <h1
                className={`${duplet.className} ml-[6px] mt-[-2px] text-[16px] font-semibold text-[#999]`}
              >
                non-technical
              </h1>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
