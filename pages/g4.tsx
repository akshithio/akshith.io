// @ts-nocheck
// temporary workaround till I actually understand TS :+1:
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TextLoop } from "react-text-loop-next";

const Home: NextPage = () => {
  const [time, setTime] = useState();
  const [weather, setWeather] = useState();
  const [ldr1, setldr1] = useState();
  const [ldr2, setldr2] = useState();
  const [pos, setpos] = useState();
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

  const callUbidotsAPI = async () => {
    try {
      const res = await fetch(
        `http://industrial.api.ubidots.com/api/v1.6/devices/solarsprout/ldr1/values/?page_size=1`,
        {
          headers: {
            "X-Auth-Token": "BBFF-FH3hM0vmQMlJPyCmolhcl9f5kVvX8s",
            // "Content-Type": "application/json",
          },
        }
      );
      const res1 = await fetch(
        `http://industrial.api.ubidots.com/api/v1.6/devices/solarsprout/ldr2/values/?page_size=1`,
        {
          headers: {
            "X-Auth-Token": "BBFF-FH3hM0vmQMlJPyCmolhcl9f5kVvX8s",
            // "Content-Type": "application/json",
          },
        }
      );
      const res2 = await fetch(
        `http://industrial.api.ubidots.com/api/v1.6/devices/solarsprout/pos/values/?page_size=1`,
        {
          headers: {
            "X-Auth-Token": "BBFF-FH3hM0vmQMlJPyCmolhcl9f5kVvX8s",
            // "Content-Type": "application/json",
          },
        }
      );

      let test = await res.json();
      let test1 = await res1.json();
      let test2 = await res2.json();
      setldr1(test);
      setldr2(test1);
      setpos(test2);
      console.log(ldr1);

      console.log(test);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callWeatherAPI();
    callUbidotsAPI();
  }, []);

  setInterval(callWeatherAPI, 90000);
  setInterval(callUbidotsAPI, 10000);

  return (
    <div className="w-screen h-screen bg-[#070707] overflow-x-clip overflow-y-clip text-white">
      <div className="w-full flex justify-center items-center absolute top-[40px]">
        <h1 className="absolute left-[16px] font-krona  text-[24px]">
          akshith.io
        </h1>

        <div className="absolute left-[17px] mt-[65px] text-[10px] font-mono">
          <h1>{time}, GMT + 5:30</h1>
          <h1>Hyderabad, India</h1>
        </div>
      </div>

      <div className="w-full h-full flex justify-center items-center text-[32px] font-mono">
        {ldr1 !== undefined && (
          <h1 className="mr-[40px]">{ldr1.results[0].value}</h1>
        )}
        {ldr2 !== undefined && (
          <h1 className="mr-[40px]">{ldr2.results[0].value}</h1>
        )}
        {pos !== undefined && <h1>{pos.results[0].value}</h1>}
      </div>
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
    </div>
  );
};

export default Home;
