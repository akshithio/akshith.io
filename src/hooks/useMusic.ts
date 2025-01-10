"use client";
import { useEffect, useState } from "react";

// Custom hook to handle music status logic
export const useMusic = () => {
  const [music, setMusic] = useState("not listening to anything");
  const [lastFetchTime, setLastFetchTime] = useState(0);

  // used to split between the artist and song in the set state,
  // if this ever appears in a song title or artist's name,
  // the app would not function as expected
  const SPLITTING_STRING = "1xe3489d8das98dsa0ads"; // string length: 21

  // improved data fetching with debouncing
  useEffect(() => {
    const fetchMusicData = async () => {
      const now = Date.now();
      // Only fetch if more than 2 seconds have passed since last fetch
      if (now - lastFetchTime < 2000) return;

      try {
        setLastFetchTime(now);
        const res = await fetch(
          `https://api.lanyard.rest/v1/users/532914066558156800`,
          { cache: "no-store" }, // Disable caching to get fresh data
        );
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

          setMusic(`${songName}${SPLITTING_STRING}${artist}`);
        } else {
          setMusic("not listening to anything");
        }
      } catch (err) {
        console.error("Error fetching Music data:", err);
      }
    };

    // Initial fetch
    fetchMusicData();

    // Set up interval for periodic updates with shorter interval
    const musicInterval = setInterval(fetchMusicData, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(musicInterval);
  }, [lastFetchTime]);

  return { music, SPLITTING_STRING };
};
