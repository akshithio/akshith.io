// @ts-nocheck
// temporary workaround till I actually understand TS :+1:
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [data, setData] = useState();
  let testData;
  const [widthState, setWidthState] = useState(0);
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
    } catch (err) {
      console.log(err);
    }
  };

  callAPI();

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-[#020202] overflow-x-clip overflow-y-clip">
      <div className="absolute left-[24px] top-[36px] ">
        <h1 className="font-krona text-white text-[24px]">akshith.io</h1>
      </div>

      {data?.data.spotify !== undefined && (
        <div className="absolute bottom-[16px] left-[16px]">
          {data?.data.spotify !== null && (
            <div className="flex">
              <div>
                <Image
                  className="rounded-[5px]"
                  src={data?.data.spotify.album_art_url}
                  alt=""
                  width={48}
                  height={48}
                />
              </div>
              <div className="ml-[8px] mt-[4px]">
                <h1 className="text-[12px] text-white font-krona">
                  {data?.data.spotify.song}
                </h1>
                <h1 className="text-[8px] text-white font-krona">
                  {data?.data.spotify.artist.replaceAll(";", ",")}
                </h1>

                <div className="text-white w-[125px] h-[3px] bg-[#a9a9a9] rounded-[13px] relative mt-[4px]">
                  <div
                    className="text-white h-[2px] bg-[#FFFFFF] rounded-[13px] relative"
                    style={{ width: widthState + "%" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <h1 className="text-[64px] ">🏗</h1>
      <h1 className="text-white font-krona text-[20px] mt-[-12px]">WIP™️</h1>

      <div className="absolute bottom-5">
        <a
          href="https://github.com/akshithio"
          rel="noreferrer"
          className="mr-[24px]"
          target="_blank"
        >
          {" "}
          <Image src="/github.png" width={36} height={36} alt="github logo" />
        </a>
        <a
          href="https://instagram.com/akshithio"
          rel="noreferrer"
          className="mr-[24px]"
          target="_blank"
        >
          {" "}
          <Image src="/insta.png" width={36} height={36} alt="insta logo" />
        </a>
        <a
          href="https://linkedin.com/in/akshithio/"
          rel="noreferrer"
          className="mr-[24px]"
          target="_blank"
        >
          {" "}
          <Image
            src="/linkedin.png"
            width={36}
            height={36}
            alt="linkedin logo"
          />
        </a>
        <a
          href="https://reddit.com/u/akshithio"
          rel="noreferrer"
          className="mr-[24px]"
          target="_blank"
        >
          {" "}
          <Image src="/reddit.png" width={36} height={36} alt="reddit logo" />
        </a>
        <a
          href="https://twitch.com/akshithio"
          rel="noreferrer"
          className="mr-[24px]"
          target="_blank"
        >
          {" "}
          <Image src="/twitch.png" width={36} height={36} alt="twitch logo" />
        </a>
        <a
          href="https://twitter.com/akshithio"
          rel="noreferrer"
          className="mr-[24px]"
          target="_blank"
        >
          {" "}
          <Image src="/twitter.png" width={36} height={36} alt="twitter logo" />
        </a>
      </div>
    </div>
  );
};

export default Home;
