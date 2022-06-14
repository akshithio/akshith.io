import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  // const [data, setData] = useState();
  // const callAPI = async () => {
  //   try {
  //     const res = await fetch(
  //       `https://api.lanyard.rest/v1/users/532914066558156800`
  //     );
  //     setData(await res.json());
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // callAPI();

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-[#020202]">
      <h1 className="text-[64px] ">🏗</h1>

      {/* {data?.data !== undefined && (
        <div>
          <h1 className="text-[64px] text-white">{data.data.spotify.song}</h1>
          <Image
            src={data.data.spotify.album_art_url}
            alt=""
            width={320}
            height={320}
          />
        </div>
      )} */}

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
