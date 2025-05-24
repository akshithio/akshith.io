"use client";
import { useEffect, useRef, useState } from "react";

// Custom hook to handle music status logic
export const useMusic = () => {
  const [music, setMusic] = useState("not listening to anything");
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // used to split between the artist and song in the set state,
  // if this ever appears in a song title or artist's name,
  // the app would not function as expected
  const SPLITTING_STRING = "1xe3489d8das98dsa0ads"; // string length: 21

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // improved data fetching with debouncing and retry logic
  useEffect(() => {
    const fetchMusicData = async (retryCount = 0) => {
      const now = Date.now();
      const maxRetries = 3;
      const retryDelay = Math.min(1000 * Math.pow(2, retryCount), 10000); // Exponential backoff, max 10s

      // Only fetch if more than 2 seconds have passed since last fetch and we're online
      if (now - lastFetchTime < 2000 || !isOnline) return;

      try {
        setLastFetchTime(now);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const res = await fetch(
          `https://api.lanyard.rest/v1/users/532914066558156800`,
          {
            cache: "no-store", // Disable caching to get fresh data
            signal: controller.signal,
            headers: {
              Accept: "application/json",
            },
          },
        );

        clearTimeout(timeoutId);

        // Check if response is ok
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (data?.data?.spotify) {
          const song = data.data.spotify.song.toLowerCase();
          const songName = song.includes("(")
            ? song.substring(0, song.indexOf("(")).trim()
            : song;

          let artist = data.data.spotify.artist
            .replaceAll(";", ",")
            .toLowerCase()
            .split(",")
            .slice(0, 2)
            .join(",");

          let songString = songName + artist + " • ";
          if (songString.length > 55) {
            artist = data.data.spotify.artist
              .replaceAll(";", ",")
              .toLowerCase()
              .split(",")
              .slice(0, 1);
          }
          // TODO: feat in the name of the song like "LOVE FEAT.ZACARI - Kendrick Lamar, Zacari"

          setMusic(`${songName}${SPLITTING_STRING}${artist}`);
        } else {
          setMusic("not listening to anything");
        }
      } catch (err) {
        console.error(
          `Error fetching Music data (attempt ${retryCount + 1}):`,
          err,
        );

        // Only retry if we haven't exceeded max retries and we're still online
        if (retryCount < maxRetries && isOnline) {
          console.log(`Retrying in ${retryDelay}ms...`);

          // Clear any existing retry timeout
          if (retryTimeoutRef.current) {
            clearTimeout(retryTimeoutRef.current);
          }

          retryTimeoutRef.current = setTimeout(() => {
            fetchMusicData(retryCount + 1);
          }, retryDelay);
        } else {
          setMusic("not listening to anything");
        }
      }
    };

    // Initial fetch
    fetchMusicData();

    // Set up interval for periodic updates with shorter interval
    intervalRef.current = setInterval(() => fetchMusicData(), 3000);

    // Cleanup interval and timeout on component unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [lastFetchTime, isOnline]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { music, SPLITTING_STRING, isOnline };
};
