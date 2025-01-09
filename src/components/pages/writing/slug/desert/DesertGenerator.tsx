import { useDesertGeneration } from "@/hooks/useDesertGeneration";
import { DesertGeneratorProps } from "@/types/desert";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import DesertFeature from "./DesertFeature";

export default function DesertGenerator({
  length,
  title,
}: DesertGeneratorProps) {
  const { theme } = useTheme();
  const [systemTheme, setSystemTheme] = useState("light");
  const desert = useDesertGeneration(title, length);

  useEffect(() => {
    // Detect the system theme once when the component mounts
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Set the system theme based on the media query
    setSystemTheme(mediaQuery.matches ? "dark" : "light");

    // Listener for changes in system theme (for future use if needed)
    const handleThemeChange = (e) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    // Cleanup on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  // Check if theme is set to system, then use the system theme detected
  const currentTheme = theme === "system" ? systemTheme : theme;

  if (currentTheme === "dark") {
    return (
      <div className="absolute right-[20px] origin-right scale-x-[-1] bg-[#111]">
        {desert.dark.map((desertBlock) => {
          if (desertBlock.type !== "sand" && desertBlock.type !== "water") {
            return null;
          }
          return (
            <div key={desertBlock.id}>
              <div
                style={{
                  width: `${desertBlock.height}px`,
                  height: `${desertBlock.length}px`,
                  backgroundColor:
                    desertBlock.type === "sand" ? "#D5B59E" : "#C8DCE3",
                }}
                className="relative"
              >
                {desert.dark
                  .filter(
                    (special) =>
                      special.id === desertBlock.id + 1 &&
                      ["cactus", "star", "turtle", "frog"].includes(
                        special.type,
                      ),
                  )
                  .map((special) => (
                    <DesertFeature
                      key={special.id}
                      special={special}
                      blockHeight={desertBlock.height}
                    />
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  } else if (currentTheme === "light") {
    return (
      <div className="absolute right-[20px] origin-right scale-x-[-1] bg-[#eee]">
        {desert.light.map((desertBlock) => {
          if (desertBlock.type !== "sand" && desertBlock.type !== "water") {
            return null;
          }
          return (
            <div key={desertBlock.id}>
              <div
                style={{
                  width: `${desertBlock.height}px`,
                  height: `${desertBlock.length}px`,
                  backgroundColor:
                    desertBlock.type === "sand" ? "#D5B59E" : "#C8DCE3",
                }}
                className="relative"
              >
                {desert.light
                  .filter(
                    (special) =>
                      special.id === desertBlock.id + 1 &&
                      ["cactus", "star", "turtle", "frog"].includes(
                        special.type,
                      ),
                  )
                  .map((special) => (
                    <DesertFeature
                      key={special.id}
                      special={special}
                      blockHeight={desertBlock.height}
                    />
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
