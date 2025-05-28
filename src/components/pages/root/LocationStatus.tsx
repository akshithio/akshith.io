"use client";

import { useLocation } from "@/hooks/useLocation";
import { duplet } from "@/utils/fonts";
import { useEffect, useState } from "react";

const weatherEmojis: Record<string, string> = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
  Fog: "🌫️",
  Haze: "🌫️",
  Smoke: "🌫️",
  Dust: "🌫️",
  Sand: "🌫️",
  Ash: "🌫️",
  Squall: "💨",
  Tornado: "🌪️",
};

export default function LocationStatus() {
  const cityData = useLocation();
  const [localTime, setLocalTime] = useState<string>("");
  const [weatherEmoji, setWeatherEmoji] = useState<string>("🌍");
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!cityData?.city) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/weather?city=${encodeURIComponent(cityData.city)}&country=${encodeURIComponent(cityData.country)}`,
        );

        if (!response.ok) throw new Error("Weather API request failed");

        const data = await response.json();
        const weatherCondition = data.weather[0].main;

        setWeatherEmoji(weatherEmojis[weatherCondition] || "📍");
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherEmoji("📍");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();

    const weatherInterval = setInterval(fetchWeatherData, 30 * 60 * 1000);

    return () => clearInterval(weatherInterval);
  }, [cityData?.city, cityData?.country]);

  return (
    <div className="mb-5">
      {cityData?.city && localTime && (
        <h1
          className={`${duplet.className} phone-l:text-base desktop:text-xl desktop-xl:text-2xl text-sm text-[#999]`}
        >
          {isLoading ? "🔄" : weatherEmoji} i'm in {cityData.city.toLowerCase()}{" "}
          and it's {localTime}
        </h1>
      )}
    </div>
  );
}
