import { useEffect, useRef, useState } from "react";

/** How long a fetched location is considered fresh. Matches the route's CDN cache. */
const MAX_AGE_MS = 60 * 60 * 1000;

export const useLocation = () => {
  const [locationData, setLocationData] = useState<LocationData | undefined>();
  const fetchedAt = useRef(0);

  useEffect(() => {
    const fetchLocationData = async () => {
      fetchedAt.current = Date.now();

      try {
        const res = await fetch("/api/location");
        const responseData: ApiResponse = await res.json();

        if (responseData.data && responseData.data.length > 0) {
          setLocationData(responseData.data[0]);
        }
      } catch (err) {
        console.error("Error fetching location data:", err);
      }
    };

    fetchLocationData();

    /* My location changes about once a day, so there's nothing to poll for.
       A tab left open for days refreshes when it's looked at again. */
    const refetchIfStale = () => {
      if (
        document.visibilityState === "visible" &&
        Date.now() - fetchedAt.current > MAX_AGE_MS
      ) {
        fetchLocationData();
      }
    };

    document.addEventListener("visibilitychange", refetchIfStale);
    return () =>
      document.removeEventListener("visibilitychange", refetchIfStale);
  }, []);

  return locationData;
};
