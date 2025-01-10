"use client";

import { useLocation } from "@/hooks/useLocation";
import { duplet } from "@/utils/fonts";

export default function LocationStatus() {
  const cityData = useLocation();

  return (
    <div>
      {cityData?.city !== undefined && cityData?.city !== null && (
        <h1
          className={`${duplet.className} text-base text-[#999] dark:text-[#999]`}
        >
          ☀️ i'm in {cityData.city.toLowerCase()} and it's 17:24
        </h1>
      )}
    </div>
  );
}
