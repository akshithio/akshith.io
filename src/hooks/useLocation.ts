import { useEffect, useState } from "react";

export const useLocation = () => {
  const [cityData, setCityData] = useState<{ city?: string }>();

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

  return cityData;
};
