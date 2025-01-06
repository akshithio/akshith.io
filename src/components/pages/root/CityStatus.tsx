"use client";

import { useEffect, useState } from "react";
import { duplet } from "~/helpers/fonts";

export default function () {
  const [cityData, setCityData] = useState<{ city?: string }>();

  // Location data fetching
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const res = await fetch(
          `https://akshith-io-git-dev-akshith-garapatis-projects.vercel.app/api`,
          { cache: "no-store" },
        );
        const data = await res.json();
        setCityData(data);
      } catch (err) {
        console.error("Error fetching location data:", err);
      }
    };

    // Initial fetch
    fetchLocationData();

    // Update location every minute
    const locationInterval = setInterval(fetchLocationData, 60000);

    return () => clearInterval(locationInterval);
  }, []);

  return (
    <div>
      {cityData?.city !== undefined && cityData?.city !== null && (
        <h1
          className={`${duplet.className} text-[16px] text-[#999] dark:text-[#999]`}
        >
          ☀️ i'm in {cityData.city.toLowerCase()} and it's 17:24
        </h1>
      )}
    </div>
  );
}
