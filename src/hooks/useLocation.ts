import { useEffect, useState } from "react";

export const useLocation = () => {
  const [locationData, setLocationData] = useState<LocationData | undefined>();

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const res = await fetch("/api/location", { cache: "no-store" });
        const responseData: ApiResponse = await res.json();

        if (responseData.data && responseData.data.length > 0) {
          setLocationData(responseData.data[0]);
        }
      } catch (err) {
        console.error("Error fetching location data:", err);
      }
    };

    fetchLocationData();

    const locationInterval = setInterval(fetchLocationData, 60000);

    return () => clearInterval(locationInterval);
  }, []);

  return locationData;
};
