"use client"

import { useEffect, useState } from "react";
import { duplet, erika, passenger } from "~/helpers/fonts";

export default function HomePage() {
  const [theme, setTheme] = useState("light");
  const posts = {} // TODO: fix pls
  // console.log(posts);

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
                href="https://udara.io/microblog"
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
          <div className="relative mt-[36px] flex items-center">
            <div className="justify-start">
              <h1 className={`${passenger.className} text-[24px] italic`}>
                stuff.
              </h1>
            </div>

            <div className="absolute right-0 flex items-center justify-end">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.25854 15.4834C7.41211 15.4834 6.73084 14.8022 6.71019 13.9764C6.64826 11.1894 4.81091 9.35198 2.02389 9.29005C1.17746 9.2694 0.49617 8.56745 0.516815 7.70037C0.537459 6.85395 1.21873 6.19336 2.06516 6.19336C2.0858 6.19336 2.08578 6.19336 2.10643 6.19336C6.54501 6.29658 9.7243 9.45516 9.80688 13.8938C9.82753 14.7402 9.14623 15.4628 8.2998 15.4834C8.27916 15.4834 8.27918 15.4834 8.25854 15.4834Z"
                  fill="#999999"
                />
                <path
                  d="M14.4519 15.4834C13.6055 15.4834 12.9036 14.8022 12.9036 13.9558C12.8829 12.5932 12.6558 11.2926 12.2429 10.0746C11.19 7.06046 8.93978 4.83072 5.92567 3.7572C4.70764 3.32367 3.40702 3.09669 2.04448 3.09669C1.19805 3.09669 0.496157 2.39475 0.516802 1.52768C0.516802 0.681251 1.21872 0 2.06515 0H2.08581C3.79931 0.0206446 5.4302 0.309739 6.9579 0.846499C10.8597 2.22969 13.7706 5.14051 15.1538 9.04234C15.6906 10.57 15.9796 12.2216 16.0002 13.9144C16.0002 14.7815 15.319 15.4834 14.4519 15.4834C14.4725 15.4834 14.4519 15.4834 14.4519 15.4834Z"
                  fill="#999999"
                />
                <path
                  d="M2.06446 15.9995C0.908362 15.9995 0 15.0705 0 13.9351C0 12.7996 0.929007 11.8706 2.06446 11.8706C3.19991 11.8706 4.12892 12.7996 4.12892 13.9351C4.12892 15.0705 3.22056 15.9995 2.06446 15.9995Z"
                  fill="#999999"
                />
              </svg>

              <div className="ml-[16px]" />

              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.4225 0.75H8.52C9.03 0.75 9.4425 1.17 9.4425 1.6875V2.715C9.4425 3.09 9.21 3.555 8.9775 3.7875L6.9975 5.5725C6.72 5.805 6.54 6.27 6.54 6.645V8.655C6.54 8.9325 6.3525 9.3075 6.1275 9.45L5.475 9.8775C4.875 10.2525 4.0425 9.8325 4.0425 9.0825V6.6C4.0425 6.27 3.855 5.85 3.675 5.6175L1.92 3.7425C1.6875 3.51 1.5 3.09 1.5 2.8125V1.7325C1.5 1.17 1.9125 0.75 2.4225 0.75Z"
                  fill="#999999"
                />
                <path
                  d="M12.75 1.5H10.95C10.74 1.5 10.575 1.665 10.575 1.875C10.575 2.235 10.575 2.715 10.575 2.715C10.575 3.4575 10.1775 4.185 9.7875 4.5825L7.7475 6.405C7.725 6.4575 7.6875 6.5325 7.665 6.5925V8.655C7.665 9.3375 7.26 10.08 6.705 10.4175L6.09 10.815C5.745 11.0325 5.3625 11.1375 4.98 11.1375C4.635 11.1375 4.29 11.0475 3.975 10.875C3.62013 10.6785 3.34475 10.3905 3.16331 10.0517C3.02805 9.79905 3 9.50701 3 9.22047V7.6575C3 7.56 2.9625 7.4625 2.8875 7.395L2.1375 6.645C1.905 6.405 1.5 6.57 1.5 6.9075V12.75C1.5 14.82 3.18 16.5 5.25 16.5H12.75C14.82 16.5 16.5 14.82 16.5 12.75V5.25C16.5 3.18 14.82 1.5 12.75 1.5ZM13.5 13.3125H8.25C7.9425 13.3125 7.6875 13.0575 7.6875 12.75C7.6875 12.4425 7.9425 12.1875 8.25 12.1875H13.5C13.8075 12.1875 14.0625 12.4425 14.0625 12.75C14.0625 13.0575 13.8075 13.3125 13.5 13.3125ZM13.5 10.3125H9.75C9.4425 10.3125 9.1875 10.0575 9.1875 9.75C9.1875 9.4425 9.4425 9.1875 9.75 9.1875H13.5C13.8075 9.1875 14.0625 9.4425 14.0625 9.75C14.0625 10.0575 13.8075 10.3125 13.5 10.3125Z"
                  fill="#999999"
                />
              </svg>
            </div>
          </div>

          <div className="mt-[38px]">
            <div className="mt-[4px] flex">
              <div className="relative mt-[4px] w-[800px]">
                <a
                  href="/writing/a-top-level-understanding-of-chess-algorithms"
                  className={`${duplet.className} text-[16px] font-semibold`}
                >
                  a top level understanding of chess algorithms.
                </a>

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
                <a
                  href="/writing/on-competition-and-friendship"
                  className={`${duplet.className} text-[16px] font-semibold`}
                >
                  on competition & friendship.
                </a>

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
                <a
                  href="/writing/all-you-will-ever-need-to-know-about-embeddings"
                  className={`${duplet.className} text-[16px] font-semibold`}
                >
                  all you will ever need to know about embeddings.
                </a>

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
                <a
                  href="/writing/building-a-calendar-scheduling-system-in-under-48-hrs"
                  className={`${duplet.className} text-[16px] font-semibold`}
                >
                  building a calendar scheduling system in under 48 hrs.
                </a>

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
                <a
                  href="understanding-ownership-and-referencing-in-rust-for-a-non-systems-programmer"
                  className={`${duplet.className} text-[16px] font-semibold`}
                >
                  understanding ownership & referencing in rust for a
                  non-systems programmer.
                </a>

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
                <a
                  href="/writing/the-cuda-gpu-system-for-the-uninitiated"
                  className={`${duplet.className} text-[16px] font-semibold`}
                >
                  the cuda gpu system for the uninitiated.
                </a>

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
                <a
                  href="/writing/startups-and-venture-funding"
                  className={`${duplet.className} text-[16px] font-semibold`}
                >
                  startups & venture funding.
                </a>

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
                <a
                  href="/writing/accountability-as-a-service"
                  className={`${duplet.className} text-[16px] font-semibold`}
                >
                  accountability as a service.
                </a>

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
