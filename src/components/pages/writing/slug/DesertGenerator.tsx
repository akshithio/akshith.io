import { useEffect, useState } from "react";
import { useTheme } from "~/hooks/useTheme";
import StarIcon from "./desert/StarIcon";
import FrogIcon from "./desert/FrogIcon";
import TurtleIcon from "./desert/TurtleIcon";
import CactusIcon from "./desert/CactusIcon";

interface DesertGeneratorInterface {
  length: number; 
  title: string;
}

interface Desert {
  type: string;
  length: number;
  height: number;
  starHeightMultiplier: number;
  specialFeaturePosition?: number;
  cactus: boolean;
  star: boolean;
  frog: boolean;
  turtle: boolean;
  id: number;
}

interface TempBlock {
  isWater: boolean;
  blockLength: number;
  hasCactus: boolean;
  hasFrog: boolean;
  hasStar: boolean;
  hasTurtle: boolean;
}

export default function DesertGenerator(props: DesertGeneratorInterface) {
  const [desert, setDesert] = useState<Desert[]>([]);
  const { theme } = useTheme();

  function hash(input: string): number {
    let hash = 5381;
    for (let i = 0; i < input.length; i++) {
      let charCode = input.charCodeAt(i);
      hash = hash * 33 + charCode;
    }
    return hash >>> 0;
  }

  function random(seed: number): () => number {
    return function () {
      seed = (seed * 16807 + 49297) % 2147483647;
      return seed / 2147483647.0;
    };
  }

  function generateDesert(title: string): Array<Desert> {
    if (!props.length) {
      console.warn("Length is zero or undefined, skipping generation");
      return [];
    }

    const seed = hash(title);
    const rng = random(seed);
    const desert: Desert[] = [];

    const MIN_BLOCK_LENGTH = 25;
    const MAX_BLOCK_LENGTH = 150;
    const MIN_BLOCK_HEIGHT = 15;
    const MAX_BLOCK_HEIGHT = 20;

    let currentId = 0;
    let accumulatedLength = 0;
    let previousSandHeight = 0;
    let nextSandHeight = 0;

    // First pass to determine next sand heights
    const tempBlocks: TempBlock[] = [];
    while (accumulatedLength < props.length) {
      const isWater = rng() < 0.35;

      // Only generate special features for sand blocks
      const lightModeFeature = rng();
      const hasCactus = !isWater && lightModeFeature < 0.25;
      const hasFrog =
        !isWater &&
        !hasCactus &&
        lightModeFeature >= 0.25 &&
        lightModeFeature < 0.5;

      const darkModeFeature = rng();
      const hasStar = !isWater && darkModeFeature < 0.95;
      const hasTurtle =
        !isWater &&
        !hasStar &&
        darkModeFeature >= 0.45 &&
        darkModeFeature < 0.7;

      // Generate block length
      let blockLength;
      const remainingLength = props.length - accumulatedLength;
      if (remainingLength <= MAX_BLOCK_LENGTH) {
        blockLength = Math.max(remainingLength, MIN_BLOCK_LENGTH);
      } else {
        blockLength =
          Math.floor(rng() * (MAX_BLOCK_LENGTH - MIN_BLOCK_LENGTH + 1)) +
          MIN_BLOCK_LENGTH;
      }

      if (!isWater) {
        const sandHeight =
          Math.floor(rng() * (MAX_BLOCK_HEIGHT - MIN_BLOCK_HEIGHT + 1)) +
          MIN_BLOCK_HEIGHT;
        nextSandHeight = sandHeight;
      }
      tempBlocks.push({
        isWater,
        blockLength,
        hasCactus,
        hasFrog,
        hasStar,
        hasTurtle,
      });
      accumulatedLength += blockLength;
    }

    // Reset for actual generation
    accumulatedLength = 0;

    // Second pass to generate actual blocks with correct heights
    for (let i = 0; i < tempBlocks.length; i++) {
      const block = tempBlocks[i];
      if (!block) continue;
      const { isWater, blockLength, hasCactus, hasFrog, hasStar, hasTurtle } =
        block;

      // Find next sand height
      nextSandHeight = 0;
      for (let j = i + 1; j < tempBlocks.length; j++) {
        const block = tempBlocks[j];
        if (block && !block.isWater) {
          nextSandHeight =
            Math.floor(rng() * (MAX_BLOCK_HEIGHT - MIN_BLOCK_HEIGHT + 1)) +
            MIN_BLOCK_HEIGHT;
          break;
        }
      }

      // Generate height considering water level
      let blockHeight;
      if (isWater) {
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

      // For sand blocks, generate a random position for the special feature
      const specialFeaturePosition = !isWater
        ? Math.floor(rng() * blockLength)
        : undefined;

      const desertObject: Desert = {
        id: currentId++,
        type: isWater ? "water" : "sand",
        length: blockLength,
        height: blockHeight,
        starHeightMultiplier: Math.floor(rng() * 5.5) + 1,
        specialFeaturePosition,
        cactus: hasCactus,
        frog: hasFrog,
        star: hasStar,
        turtle: hasTurtle,
      };

      accumulatedLength += blockLength;
      desert.push(desertObject);
    }

    return desert;
  }

  useEffect(() => {
    console.log("Effect running with length:", props.length);
    const blogTitle = props.title;
    const desertBlocks = generateDesert(blogTitle);
    setDesert(desertBlocks);
  }, [props.length]);

  return (
    <div className="absolute right-[20px] origin-right scale-x-[-1]">
      {desert.map((desertBlock) => (
        <div
          key={desertBlock.id}
          style={{
            width: `${desertBlock.height}px`,
            height: `${desertBlock.length}px`,
            backgroundColor:
              desertBlock.type === "water" ? "#C8DCE3" : "#D5B59E",
          }}
          className="relative"
        >
          {desertBlock.type === "sand" &&
            desertBlock.specialFeaturePosition !== undefined && (
              <div
                className="absolute"
                style={{
                  right: `${-36}px`,
                  top: `${desertBlock.specialFeaturePosition}px`,
                }}
              >
                {theme === "light" && (
                  <>
                    {desertBlock.cactus && <CactusIcon />}
                    {desertBlock.turtle && <TurtleIcon />}
                  </>
                )}

                {theme === "dark" && (
                  <>
                    {desertBlock.star && <StarIcon />}
                    {desertBlock.frog && <FrogIcon />}
                  </>
                )}
              </div>
            )}
        </div>
      ))}
    </div>
  );
}
