// @ts-nocheck
// temporary workaround till I actually understand TS :+1:
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
// import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [definition, setDefinition] = useState(false);

  const definitionHandler = () => {
    setDefinition(true);
  };

  return (
    <div className="w-screen h-screen overflow-clip bg-[#070707] text-white p-[24px] font-serif text-[16px]">
      {/* <div classNahme="absolute top-[10%] left-[7.5%]">
        <h1 className="font-krona text-[42px] ">First Impressions Matter.</h1>
      </div> */}
      <div className="flex">
        <button onClick={definitionHandler} className="underline fade-in">
          Sandboxes.{"   "}
        </button>

        {definition && (
          <>
            <h1 className="ml-[4px] fade-in">
              Fascinating things aren&apos;t they?
            </h1>
{/* 
            <motion.button
              animate={{ y: 8 }}
              className="ml-[25px] absolute bottom-[16px] right-[16px] text-[16px] bg-white text-black px-[4px] py-[2px] rounded-sm"
            >
              Whatchu on about?
            </motion.button> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
