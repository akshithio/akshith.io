"use client";

import { duplet } from "@/helpers/fonts";
import { useEffect, useState } from "react";

export default function SpotifyStatus() {
  const [spotify, setSpotify] = useState("not listening to anything");
  const [lastFetchTime, setLastFetchTime] = useState(0);

  // Improved Spotify data fetching with debouncing
  useEffect(() => {
    const fetchSpotifyData = async () => {
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

          let songString = songName + artist + "  •  ";

          if (songString.length > 55) {
            artist = data.data.spotify.artist
              .replaceAll(";", ",")
              .toLowerCase()
              .split(",")
              .slice(0, 1);
          }

          setSpotify(`${songName}1xe34${artist}`);
        } else {
          setSpotify("not listening to anything");
        }
      } catch (err) {
        console.error("Error fetching Spotify data:", err);
      }
    };

    // Initial fetch
    fetchSpotifyData();

    // Set up interval for periodic updates with shorter interval
    const spotifyInterval = setInterval(fetchSpotifyData, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(spotifyInterval);
  }, [lastFetchTime]);

  return (
    <div>
      {spotify !== "not listening to anything" && (
        <div className="absolute bottom-[-48px]">
          <h1
            className={`${duplet.className} whitespace-nowrap text-[16px] text-[#999] dark:text-[#999]`}
          >
            listening to {spotify.substring(0, spotify.indexOf("1xe34"))}
            {"  "}•{"  "}
            {spotify.substring(spotify.indexOf("1xe34") + 5)} {"            "}
          </h1>
        </div>
      )}
    </div>
  );
}
