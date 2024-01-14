// @ts-nocheck
// temporary workaround till I actually understand TS :+1:
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { TextLoop } from "react-text-loop-next";
import React, { useRef, useCallback, useEffect, useState } from "react";

// import './App.css'

//@ts-ignore

// Use the x and y coordinates to generate
// rgb colors in a deterministic manner
const generateColor = (x, y) => {
  const r = Math.floor((x * y * 1234567) % 255);
  const g = Math.floor((x * y * 7654321) % 255);
  const b = Math.floor((x * y * 9876543) % 255);

  return `rgb(${r}, ${g}, ${b})`;
};

const generateColorFromGeneration = (gen) => {
  const r = Math.floor((gen * 1234567) % 255);
  const g = Math.floor((255 - gen) % 255);
  const b = Math.floor((255 * 9876543) % 255);

  return `rgb(${r}, ${g}, ${b})`;
};

const getWindowDimensions = () => {
  if (typeof window === "undefined") return { width: 0, height: 0 };

  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

// Hook to get window dimensions
const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

// Hook to get document visibility
const useWindowVisible = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let visibilityChange;
    if (typeof document.hidden !== "undefined") {
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      visibilityChange = "webkitvisibilitychange";
    }

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    document.addEventListener(visibilityChange, handleVisibilityChange);

    return () => {
      document.removeEventListener(visibilityChange, handleVisibilityChange);
    };
  }, []);

  return isVisible;
};

const greenSpectrum = [
  "#00FF00",
  "#00EE00",
  "#00CC00",
  "#00AA00",
  "#008800",
  "#006600",
  "#004400",
  "#002200",
];

const GameOfLife = () => {
  const [data, setData] = useState();
  const [widthState, setWidthState] = useState(0);
  const [time, setTime] = useState();
  const [weather, setWeather] = useState();

  useEffect(() => {
    setInterval(randomFunc, 1000);
  });

  const randomFunc = () => {
    let randomVar = new Date();
    let randVar2 =
      randomVar.getHours() +
      ":" +
      randomVar.getMinutes() +
      ":" +
      randomVar.getSeconds();
    setTime(randVar2);
  };

  // let subHeadings = [];
  // subHeadings.push(
  //   <div key={1}>
  //     <div>Junior (Year 11) at high school, IBDP</div>{" "}
  //   </div>
  // );
  // subHeadings.push(
  //   <div key={2}>
  //     <div>Full-Stack web dev (Specializing in Front-End)</div>
  //   </div>
  // );

  // subHeadings.push(
  //   <div key={3}>
  //     <div>Used to play a lottt of chess (1750 Rapid elo Lichess)</div>
  //   </div>
  // );
  // subHeadings.push(
  //   <div key={4}>
  //     <div>🌴 I&apos;ve given a TedX Speech!</div>
  //   </div>
  // );
  // subHeadings.push(
  //   <div key={5}>
  //     <div>Been doing Martial Arts for a decade now!</div>
  //   </div>
  // );
  // subHeadings.push(
  //   <div key={6}>
  //     <div>
  //       I&apos;ve Attended Over 20 Model UN Conferences in the Past 5 years!
  //     </div>
  //   </div>
  // );
  // subHeadings.push(
  //   <div key={7}>
  //     <div>Did Game Dev in a past life, currently tryna learn ML things</div>
  //   </div>
  // );
  // subHeadings.push(
  //   <div key={8}>
  //     <div>
  //       Caffeinated Animated Redstone Innovator{" "}
  //       <span className="text-[8px] font-krona">
  //         [I actually suck at redstone]
  //       </span>
  //     </div>
  //   </div>
  // );
  // subHeadings.push(
  //   <div key={9}>
  //     <div>F1&apos;s kinda cool (Merc 🛐)</div>
  //   </div>
  // );
  // subHeadings.push(
  //   <div key={10}>
  //     <div>Lofi Beats Playing 24/7</div>
  //   </div>
  // );
  // subHeadings.push(
  //   <div key={11}>
  //     <div>I sleep by 9pm and wake up at 4 👻</div>
  //   </div>
  // );

  const callWeatherAPI = async () => {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=0f67a9f79138412a982133834232801&q=Hyderabad&aqi=no`
      );

      setWeather(await res.json());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callWeatherAPI();
  }, []);
  setInterval(callWeatherAPI, 90000);

  const callAPI = async () => {
    try {
      const res = await fetch(
        `https://api.lanyard.rest/v1/users/532914066558156800`
      );

      setData(await res.json());

      setWidthState(
        (Math.floor((Date.now() - data.data.spotify.timestamps.start) / 1000) /
          Math.floor(
            (data.data.spotify.timestamps.end -
              data.data.spotify.timestamps.start) /
              1000
          )) *
          100
      );
    } catch (err) {}
  };

  callAPI();
  const { height, width } = useWindowDimensions();
  const isVisible = useWindowVisible();

  const [generation, setGeneration] = useState(0);

  // Create a ref to store the canvas element
  const canvasRef = useRef(null);

  // Set the cell size
  const cellSize = 4;

  // Initialize the grid
  const [grid, setGrid] = useState([]);
  const [cells, setCells] = useState({});

  // Initialized the grid
  useEffect(() => {
    const newGrid = [];
    for (let i = 0; i < width / cellSize; i++) {
      newGrid[i] = [];
      for (let j = 0; j < height / cellSize; j++) {
        // Randomly setting initial state here
        newGrid[i][j] = Math.random() < 0.09 ? 1 : 0;
      }
    }
    setGrid(newGrid);
  }, [width, height]);

  // Counts the number of alive neighbors for a given cell
  const countAliveNeighbors = useCallback(
    (x, y) => {
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const row = (x + i + width / cellSize) % (width / cellSize);
          const col = (y + j + height / cellSize) % (height / cellSize);
          if (grid && grid[row] && grid[row][col]) {
            count += grid[row][col] > 0 ? 1 : 0;
          }
        }
      }
      return count;
    },
    [grid]
  );

  const updateCell = useCallback(
    (x, y, alive, aliveNeighbors) => {
      const position = `${x}.${y}`;

      const newCells = { ...cells };
      const cellExistsInPosition = cells.hasOwnProperty(position);

      if (!cellExistsInPosition && alive) {
        // New cell comes alive
        const newGen = cells[position]?.gen ?? 0;
        const newColor = greenSpectrum[aliveNeighbors];

        newCells[position] = { aliveNeighbors, gen: newGen, color: "red" };
      }

      if (cellExistsInPosition) {
        // Update existing cell
        if (aliveNeighbors === 2 || aliveNeighbors === 3) {
          const newGen = cells[position]?.gen ? cells[position].gen + 1 : 0;
          newCells[position] = {
            aliveNeighbors,
            gen: newGen,
            color: cells[position]?.color,
          };
        } else if (aliveNeighbors === 3) {
          const newGen = cells[position]?.gen ? cells[position].gen + 1 : 0;
          const newColor = greenSpectrum[aliveNeighbors];
          newCells[position] = { aliveNeighbors, gen: newGen, color: "red" };
        } else {
          // Delete existing cell
          // delete newCells[position]
        }
      }
      setCells(newCells);
    },
    [cells]
  );

  // Update the grid
  const update = useCallback(() => {
    const newGrid = [];

    for (let i = 0; i < width / cellSize; i++) {
      newGrid[i] = [];
      for (let j = 0; j < height / cellSize; j++) {
        const aliveNeighbors = countAliveNeighbors(i, j);
        if (grid && grid[i] && grid[i][j] && grid[i][j] > 0) {
          // cell keeps living if it has 2 or 3 neighbours
          const alive = aliveNeighbors === 2 || aliveNeighbors === 3 ? 1 : 0;
          newGrid[i][j] = alive;
          updateCell(i, j, alive, aliveNeighbors);
        } else {
          // new cell comes alive if it has 3 neighbours
          const alive = aliveNeighbors === 3 ? 1 : 0;
          newGrid[i][j] = alive;
          updateCell(i, j, alive, aliveNeighbors);
        }
      }
    }

    setGrid(newGrid);
  }, [grid, cells]);

  // Draw the grid
  const draw = useCallback(() => {
    if (!canvasRef?.current) return;

    const ctx = canvasRef.current.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Draw the cells
    for (let i = 0; i < width / cellSize; i++) {
      for (let j = 0; j < height / cellSize; j++) {
        // we don't render cells that are older than 99 generations
        if (grid && grid[i] && grid[i][j]) {
          ctx.fillStyle = generateColor(i, j);
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
      }
    }
  }, [grid, cells, canvasRef]);

  // Allows users to download the canvas as png
  const handleDownload = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");

    // Create a download link
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = dataURL;

    // Trigger the download
    link.click();
  };

  const animate = () => {
    update();
    draw();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isVisible) return;
      setGeneration(generation + 1);
      requestAnimationFrame(() => animate());
    }, 30);

    return () => clearInterval(intervalId);
  }, [animate, isVisible]);

  return (
    <div className="w-screen h-screen bg-black overflow-x-clip overflow-y-clip text-white">
      <canvas
        width={width}
        height={height}
        className="gameOfLife"
        ref={canvasRef}
      />

      <div className="w-full flex justify-center items-center absolute top-[40px]">
        <h1 className="absolute left-[16px] font-krona  text-[24px]">
          akshith.io
        </h1>

        <div className="absolute left-[17px] mt-[65px] text-[10px] font-mono">
          <h1>{time}, GMT + 5:30</h1>
          <h1>Hyderabad, India</h1>
        </div>

        {data?.data.spotify !== undefined && (
          <div className="absolute right-[16px]">
            {data?.data.spotify !== null && (
              <div className="flex">
                <div className="mr-[8px] mt-[4px] text-right">
                  {data?.data.spotify.song.length > 15 && (
                    <h1 className="text-[11px] font-krona">
                      {data?.data.spotify.song
                        .split(" ")
                        .slice(0, 3)
                        .join(" ") + "..."}
                    </h1>
                  )}
                  {data?.data.spotify.song.length <= 15 && (
                    <h1 className="text-[11px] font-krona">
                      {data?.data.spotify.song}
                    </h1>
                  )}

                  <h1 className="text-[8px]  font-krona mt-[2px]">
                    {data?.data.spotify.artist.replaceAll(";", ",")}
                  </h1>

                  <div className="w-[75px] h-[3px] bg-[#a9a9a9] rounded-[13px] mt-[4px] absolute right-[60px]">
                    <div
                      className=" h-[2px] bg-[#FFFFFF] rounded-[13px] relative"
                      style={{ width: widthState + "%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <Image
                    className="rounded-[4px]"
                    src={data?.data.spotify.album_art_url}
                    alt=""
                    width={48}
                    height={48}
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {data?.data.activities.length >= 2 && (
          <div className="absolute right-[16px] mt-[128px]">
            {data?.data.activities[1].type === 0 && (
              <div className="flex">
                <div className="mr-[8px] mt-[4px] text-right">
                  <h1 className="text-[11px] font-krona">
                    {data?.data.activities[1].name}
                  </h1>

                  {/* prettier-ignore */}
                  <h1 className="text-[8px]  font-krona mt-[2px]">
                    {data?.data.activities[1].details} <br />
                    in {data?.data.activities[1].state}
                  </h1>
                </div>
                <div>
                  <Image
                    className="rounded-[4px] border-solid border-[5px] border-white absolute"
                    src={
                      "https://cdn.discordapp.com/app-assets/383226320970055681/" +
                      data?.data.activities[1].assets.large_image +
                      ".png"
                    }
                    alt=""
                    width={48}
                    height={48}
                  />
                </div>

                <div className="absolute right-[-6px] top-[32px]">
                  <Image
                    className="rounded-[100%]"
                    src={
                      "https://cdn.discordapp.com/app-assets/383226320970055681/" +
                      data?.data.activities[1].assets.small_image +
                      ".png"
                    }
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {data?.data.activities.length >= 2 && (
          <div className="absolute right-[16px] mt-[128px]">
            {data?.data.activities[0].type === 0 && (
              <div className="flex">
                <div className="mr-[8px] mt-[4px] text-right">
                  <h1 className="text-[11px] font-krona">
                    {data?.data.activities[0].name}
                  </h1>

                  {/* prettier-ignore */}
                  <h1 className="text-[8px]  font-krona mt-[2px]">
                    {data?.data.activities[0].details} <br />
                    in {data?.data.activities[0].state}
                  </h1>
                </div>
                <div>
                  <Image
                    className="rounded-[4px] border-solid border-[5px] border-white absolute"
                    src={
                      "https://cdn.discordapp.com/app-assets/383226320970055681/" +
                      data?.data.activities[0].assets.large_image +
                      ".png"
                    }
                    alt=""
                    width={48}
                    height={48}
                  />
                </div>

                <div className="absolute right-[-6px] top-[32px]">
                  <Image
                    className="rounded-[100%]"
                    src={
                      "https://cdn.discordapp.com/app-assets/383226320970055681/" +
                      data?.data.activities[0].assets.small_image +
                      ".png"
                    }
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {data?.data.activities.length === 1 && (
          <div className="absolute right-[16px] ">
            {data?.data.activities[0].type === 0 && (
              <div className="flex">
                <div className="mr-[8px] mt-[4px] text-right">
                  <h1 className="text-[11px]  font-krona">
                    {data?.data.activities[0].name}
                  </h1>

                  {/* prettier-ignore */}
                  <h1 className="text-[8px]  font-krona mt-[2px]">
                    {data?.data.activities[0].details} <br />
                    in {data?.data.activities[0].state.toLowerCase()}
                  </h1>
                </div>
                <div>
                  <Image
                    className="rounded-[4px] border-solid border-[5px] border-white absolute"
                    src={
                      "https://cdn.discordapp.com/app-assets/383226320970055681/" +
                      data?.data.activities[0].assets.large_image +
                      ".png"
                    }
                    alt=""
                    width={48}
                    height={48}
                  />
                </div>

                <div className="absolute right-[-6px] top-[32px]">
                  <Image
                    className="rounded-[100%]"
                    src={
                      "https://cdn.discordapp.com/app-assets/383226320970055681/" +
                      data?.data.activities[0].assets.small_image +
                      ".png"
                    }
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* <div className="left-[10%] top-[20%] relative">
        <h1 className="mb-2 text-6xl font-krona">
          Hi, I&apos;m <br className="block md:hidden" />
          <span className="relative">
            <span className="h-20 pt-2 overflow-x-hidden whitespace-nowrap text-brand-accent">
              Akshith <span className="text-[36px] md:text-5xl">👋👾</span>
            </span>
            <span className="cursor absolute -bottom-0 left-0 -top-1 inline-block bg-black w-full animate-type will-change"></span>
          </span>
        </h1>
        <div className="flex">
          <h1 className="font-mono ml-[4px] mt-[-4px] animation">
            <div>
              <div>Junior (Year 11) at high school, IBDP</div>
            </div>
            <div>
              <div>Full-Stack web dev (Specializing in Front-End)</div>
            </div>
            <div>
              <div>Used to play a lottt of chess (1750 Rapid elo Lichess)</div>
            </div>
            <div>
              <div>🌴 I&apos;ve given a TedX Speech!</div>
            </div>
            <div>
              <div>Been doing Martial Arts for a decade now!</div>
            </div>
            <div>
              <div>
                I&apos;ve Attended Over 20 Model UN Conferences in the Past 5
                years!
              </div>
            </div>
            <div>
              <div>
                Did Game Dev in a past life, currently tryna learn ML things
              </div>
            </div>
            <div>
              <div>
                Caffeinated Animated Redstone Innovator{" "}
                <span className="text-[8px] font-krona">
                  [I actually suck at redstone]
                </span>
              </div>
            </div>
            <div>
              <div>F1&apos;s kinda cool (Merc 🛐)</div>
            </div>
            <div>
              <div>Lofi Beats Playing 24/7</div>
            </div>
            <div>
              <div>I sleep by 9pm and wake up at 4 👻</div>
            </div>
          </h1>
        </div>

        <div className="ml-[10%] mt-[2.5%] ">Hello my name is</div>
      </div> */}

      <div className="text-[12px] font-mono absolute bottom-[8px] left-[8px] ml-[8px]">
        {weather !== undefined && (
          <div className="mt-[10px]">
            {/* prettier-ignore */}
            <h1 className="w-[200px]">
                {weather.current.condition.text}, Feels like {weather.current.feelslike_c}°C
              </h1>
          </div>
        )}
      </div>

      <div className="text-[12px] font-mono absolute top-[8px] right-[8px] mr-[16px] mt-[10px]">
        <a
          href="https://udara.io/game-of-life"
          target="_blank"
          className="w-[200px] underline"
        >
          What is this
        </a>
      </div>

      <div className="absolute bottom-[8px] right-0 ml-[16px] flex">
        <a
          href="https://github.com/akshithio"
          rel="noreferrer"
          className="mr-[16px]"
          target="_blank"
        >
          {" "}
          <Image src="/github.png" width={30} height={30} alt="github logo" />
        </a>
        <a
          href="https://instagram.com/akshithio"
          rel="noreferrer"
          className="mr-[16px]"
          target="_blank"
        >
          {" "}
          <Image src="/insta.png" width={30} height={30} alt="insta logo" />
        </a>
        <a
          href="https://linkedin.com/in/akshithio/"
          rel="noreferrer"
          className="mr-[16px]"
          target="_blank"
        >
          {" "}
          <Image
            src="/linkedin.png"
            width={30}
            height={30}
            alt="linkedin logo"
          />
        </a>
        <a
          href="https://reddit.com/u/akshithio"
          rel="noreferrer"
          className="mr-[16px]"
          target="_blank"
        >
          {" "}
          <Image src="/reddit.png" width={30} height={30} alt="reddit logo" />
        </a>
        <a
          href="https://twitch.com/akshithio"
          rel="noreferrer"
          className="mr-[16px]"
          target="_blank"
        >
          {" "}
          <Image src="/twitch.png" width={30} height={30} alt="twitch logo" />
        </a>
        <a
          href="https://twitter.com/akshithio"
          rel="noreferrer"
          className="mr-[16px]"
          target="_blank"
        >
          {" "}
          <Image src="/twitter.png" width={30} height={30} alt="twitter logo" />
        </a>
      </div>
    </div>
  );
};

// return (
//   <div
//     style={{
//       position: "relative",
//     }}
//   >
//     <canvas
//       width={width}
//       height={height}
//       className="gameOfLife"
//       ref={canvasRef}
//     />
//     <div
//       style={{
//         position: "absolute",
//         left: 20,
//         bottom: 24,
//         color: "#fff",
//         background: "rgba(64,64,64,0.9)",
//         padding: "3px 6px",
//         borderRadius: "8px",
//         fontSize: "0.9em",
//         fontFamily: "Helvitica, sans-serif",
//       }}
//     >
//       Generation {generation}
//     </div>
//     <div
//       onClick={handleDownload}
//       style={{
//         position: "absolute",
//         right: 20,
//         bottom: 24,
//         color: "#fff",
//         background: "rgba(64,64,64,0.9)",
//         padding: "3px 6px",
//         borderRadius: "8px",
//         fontSize: "0.9em",
//         fontFamily: "Helvitica, sans-serif",
//         zIndex: 999,
//         cursor: "pointer",
//       }}
//     >
//       📸
//     </div>
//   </div>
// );

export default GameOfLife;
