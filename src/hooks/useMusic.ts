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

  useEffect(() => {
    const fetchMusicData = async (retryCount = 0) => {
      const now = Date.now();
      const maxRetries = 3;
      const retryDelay = Math.min(1000 * Math.pow(2, retryCount), 10000);

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

        if (retryCount < maxRetries && isOnline) {
          console.log(`Retrying in ${retryDelay}ms...`);

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

    fetchMusicData();
    intervalRef.current = setInterval(() => fetchMusicData(), 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [lastFetchTime, isOnline]);

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
