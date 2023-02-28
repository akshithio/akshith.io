// @ts-nocheck
// temporary workaround till I actually understand TS :+1:
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TextLoop } from "react-text-loop-next";

const Home: NextPage = () => {
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

  return (
    <div className="w-screen h-screen bg-black overflow-x-clip overflow-y-clip text-white">
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

      <div className="text-[10px] font-mono absolute bottom-[8px] left-[8px] ml-[8px]">
        {weather !== undefined && (
          <div className="mt-[10px]">
            {/* prettier-ignore */}
            <h1 className="w-[200px]">
                {weather.current.condition.text}, Feels like {weather.current.feelslike_c}°C
              </h1>
          </div>
        )}
      </div>

      <div className="absolute bottom-[8px] right-0 ml-[16px]">
        <a
          href="https://github.com/akshithio"
          rel="noreferrer"
          className="mr-[12px]"
          target="_blank"
        >
          {" "}
          <Image src="/github.png" width={24} height={24} alt="github logo" />
        </a>
        <a
          href="https://instagram.com/akshithio"
          rel="noreferrer"
          className="mr-[12px]"
          target="_blank"
        >
          {" "}
          <Image src="/insta.png" width={24} height={24} alt="insta logo" />
        </a>
        <a
          href="https://linkedin.com/in/akshithio/"
          rel="noreferrer"
          className="mr-[12px]"
          target="_blank"
        >
          {" "}
          <Image
            src="/linkedin.png"
            width={24}
            height={24}
            alt="linkedin logo"
          />
        </a>
        <a
          href="https://reddit.com/u/akshithio"
          rel="noreferrer"
          className="mr-[12px]"
          target="_blank"
        >
          {" "}
          <Image src="/reddit.png" width={24} height={24} alt="reddit logo" />
        </a>
        <a
          href="https://twitch.com/akshithio"
          rel="noreferrer"
          className="mr-[12px]"
          target="_blank"
        >
          {" "}
          <Image src="/twitch.png" width={24} height={24} alt="twitch logo" />
        </a>
        <a
          href="https://twitter.com/akshithio"
          rel="noreferrer"
          className="mr-[12px]"
          target="_blank"
        >
          {" "}
          <Image src="/twitter.png" width={24} height={24} alt="twitter logo" />
        </a>
      </div>
    </div>
  );
};

export default Home;
