"use client";

import { useLocation } from "@/hooks/useLocation";
import { useEffect, useState } from "react";

const STATE_ABBREVIATIONS: Record<string, string> = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
  "District of Columbia": "DC",
};

function formatLocation(city: string, region: string, country: string): string {
  if (country.toUpperCase() === "US") {
    const state =
      STATE_ABBREVIATIONS[region] ??
      STATE_ABBREVIATIONS[region.toUpperCase()] ??
      region;
    return `${city}, ${state}`;
  }

  return `${city}, ${country}`;
}

export default function LocationStatus() {
  const cityData = useLocation();
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    const updateLocalTime = () => {
      if (cityData?.timezone) {
        try {
          const options: Intl.DateTimeFormatOptions = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: cityData.timezone,
          };

          const timeString = new Date().toLocaleTimeString("en-US", options);
          setLocalTime(timeString);
        } catch (error) {
          console.error("Error formatting time:", error);
          setLocalTime("");
        }
      }
    };

    updateLocalTime();

    const intervalId = setInterval(updateLocalTime, 60000);

    return () => clearInterval(intervalId);
  }, [cityData?.timezone]);

  if (!cityData?.city || !localTime) {
    return null;
  }

  return (
    <span>
      Right now, I&apos;m in{" "}
      {formatLocation(cityData.city, cityData.region, cityData.country)}, where
      it&apos;s {localTime}.
    </span>
  );
}
