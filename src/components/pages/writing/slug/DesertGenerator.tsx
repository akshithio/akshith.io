import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import CactusIcon from "./desert/CactusIcon";
import FrogIcon from "./desert/FrogIcon";
import StarIcon from "./desert/StarIcon";
import TurtleIcon from "./desert/TurtleIcon";

import { createRng, hash } from "@/utils/random";
import {
  DesertElement,
  DesertElementType,
  DesertGeneratorProps,
} from "@/types/desert";

export default function DesertGenerator(props: DesertGeneratorProps) {
  const [desert, setDesert] = useState<DesertElement[]>([]);
  const { theme } = useTheme();

  function generateDesert(title: string): Array<DesertElement> {
    if (!props.length) {
      console.warn("Length is zero or undefined, skipping generation");
      return [];
    }

    const seed = hash(title);
    const rng = createRng(seed);

    const MIN_BLOCK_LENGTH = 25;
    const MAX_BLOCK_LENGTH = 150;
    const MIN_BLOCK_HEIGHT = 15;
    const MAX_BLOCK_HEIGHT = 20;
    const MIN_STAR_HEIGHT = 50;
    const MAX_STAR_HEIGHT = 150;

    let currentId = 0;
    let accumulatedLength = 0;
    let previousSandHeight = 0;
    let nextSandHeight = 0;

    const tempBlocks: Array<{
      type: DesertElementType;
      blockLength: number;
    }> = [];

    while (accumulatedLength < props.length) {
      const isWater = rng() < 0.35;
      const blockType = isWater ? "water" : "sand";

      let blockLength;
      const remainingLength = props.length - accumulatedLength;
      if (remainingLength <= MAX_BLOCK_LENGTH) {
        blockLength = Math.max(remainingLength, MIN_BLOCK_LENGTH);
      } else {
        blockLength =
          Math.floor(rng() * (MAX_BLOCK_LENGTH - MIN_BLOCK_LENGTH + 1)) +
          MIN_BLOCK_LENGTH;
      }

      tempBlocks.push({
        type: blockType,
        blockLength,
      });

      if (blockType === "sand") {
        if (theme === "light") {
          if (rng() < 0.5) tempBlocks.push({ type: "cactus", blockLength: 0 });
          if (rng() < 0.5) tempBlocks.push({ type: "turtle", blockLength: 0 });
        } else {
          if (rng() < 0.5) tempBlocks.push({ type: "star", blockLength: 0 });
          if (rng() < 0.5) tempBlocks.push({ type: "frog", blockLength: 0 });
        }
      }

      accumulatedLength += blockLength;
    }

    accumulatedLength = 0;
    const desert: DesertElement[] = [];

    for (let i = 0; i < tempBlocks.length; i++) {
      const block = tempBlocks[i];
      if (!block) continue;

      let blockHeight = 0;

      if (block.type === "sand" || block.type === "water") {
        nextSandHeight = 0;
        for (let j = i + 1; j < tempBlocks.length; j++) {
          const nextBlock = tempBlocks[j];
          if (nextBlock && nextBlock.type === "sand") {
            nextSandHeight =
              Math.floor(rng() * (MAX_BLOCK_HEIGHT - MIN_BLOCK_HEIGHT + 1)) +
              MIN_BLOCK_HEIGHT;
            break;
          }
        }

        if (block.type === "water") {
          const minHeight = MIN_BLOCK_HEIGHT;
          const maxHeight = Math.min(
            previousSandHeight || MAX_BLOCK_HEIGHT,
            nextSandHeight || MAX_BLOCK_HEIGHT,
          );
          blockHeight = Math.floor(rng() * (maxHeight - minHeight)) + minHeight;
        } else {
          blockHeight =
            Math.floor(rng() * (MAX_BLOCK_HEIGHT - MIN_BLOCK_HEIGHT + 1)) +
            MIN_BLOCK_HEIGHT;
          previousSandHeight = blockHeight;
        }
      }

      const desertObject: DesertElement = {
        id: currentId++,
        type: block.type,
        length: block.blockLength,
        height: blockHeight,
        starHeightMultiplier: Math.floor(rng() * 5.5) + 1,
        specialFeaturePosition:
          block.type === "sand"
            ? Math.floor(rng() * block.blockLength)
            : undefined,
        starHeight:
          block.type === "star"
            ? Math.floor(rng() * (MAX_STAR_HEIGHT - MIN_STAR_HEIGHT)) +
              MIN_STAR_HEIGHT
            : undefined,
        direction: rng() < 0.5 ? "up" : "down", // Always generate a direction
      };

      desert.push(desertObject);
    }

    console.log(desert);
    return desert;
  }

  useEffect(() => {
    const blogTitle = props.title;
    const desertBlocks = generateDesert(blogTitle);
    setDesert(desertBlocks);
  }, [props.length, theme]);

  return (
    <div className="absolute right-[20px] origin-right scale-x-[-1]">
      {desert.map((desertBlock) => {
        if (desertBlock.type === "sand" || desertBlock.type === "water") {
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
                {desert
                  .filter(
                    (special) =>
                      special.id === desertBlock.id + 1 &&
                      ["cactus", "star", "turtle", "frog"].includes(
                        special.type,
                      ),
                  )
                  .map((special) => (
                    <div
                      key={special.id}
                      className="absolute left-0"
                      style={{
                        top: `${special.specialFeaturePosition}px`,
                        left:
                          special.type === "star"
                            ? `${special.starHeight}px`
                            : `${desertBlock.height}px`,
                      }}
                    >
                      {theme === "light" && special.type === "cactus" && (
                        <CactusIcon />
                      )}
                      {theme === "light" && special.type === "turtle" && (
                        <TurtleIcon direction={special.direction} />
                      )}
                      {theme === "dark" && special.type === "star" && (
                        <StarIcon />
                      )}
                      {theme === "dark" && special.type === "frog" && (
                        <FrogIcon direction={special.direction} />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
