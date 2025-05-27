import { DesertElement, DesertElementType } from "@/types/desert";
import { DESERT_CONFIG } from "@/utils/constants";
import { useCallback, useEffect, useRef, useState } from "react";
import { createRng, hash } from "../utils/random";

function calculateBlockLength(
  remainingLength: number,
  rng: () => number,
): number {
  const { MIN_LENGTH, MAX_LENGTH } = DESERT_CONFIG.BLOCK;

  if (remainingLength <= MAX_LENGTH) {
    return Math.max(remainingLength, MIN_LENGTH);
  }

  return Math.floor(rng() * (MAX_LENGTH - MIN_LENGTH + 1)) + MIN_LENGTH;
}

function addSpecialFeatures(
  blocks: Array<{ type: DesertElementType; blockLength: number }>,
  rng: () => number,
  type: "light" | "dark",
): void {
  const features =
    type === "light"
      ? [
          {
            type: "cactus" as const,
            prob: DESERT_CONFIG.FEATURES_PROBABILITY.CACTUS,
          },
          {
            type: "turtle" as const,
            prob: DESERT_CONFIG.FEATURES_PROBABILITY.TURTLE,
          },
        ]
      : [
          {
            type: "star" as const,
            prob: DESERT_CONFIG.FEATURES_PROBABILITY.STAR,
          },
          {
            type: "frog" as const,
            prob: DESERT_CONFIG.FEATURES_PROBABILITY.FROG,
          },
        ];

  const roll = rng();
  let cumulativeProb = 0;

  for (const { type: featureType, prob } of features) {
    cumulativeProb += prob;
    if (roll < cumulativeProb) {
      blocks.push({ type: featureType, blockLength: 0 });
      break;
    }
  }
}

function convertToDesertElements(
  tempBlocks: Array<{ type: DesertElementType; blockLength: number }>,
  rng: () => number,
): DesertElement[] {
  let currentId = 0;
  let previousSandHeight = 0;

  return tempBlocks.map((block, i) => {
    let blockHeight = 0;
    let nextSandHeight = 0;

    if (block.type === "sand" || block.type === "water") {
      for (let j = i + 1; j < tempBlocks.length; j++) {
        if (tempBlocks[j]?.type === "sand") {
          nextSandHeight = calculateHeight(rng);
          break;
        }
      }

      if (block.type === "water") {
        const minHeight = DESERT_CONFIG.BLOCK.MIN_HEIGHT;
        const maxHeight = Math.min(
          previousSandHeight || DESERT_CONFIG.BLOCK.MAX_HEIGHT,
          nextSandHeight || DESERT_CONFIG.BLOCK.MAX_HEIGHT,
        );
        blockHeight = Math.floor(rng() * (maxHeight - minHeight)) + minHeight;
      } else {
        blockHeight = calculateHeight(rng);
        previousSandHeight = blockHeight;
      }
    }

    return {
      id: currentId++,
      type: block.type,
      length: block.blockLength,
      height: blockHeight,
      starHeightMultiplier: Math.floor(rng() * DESERT_CONFIG.STAR_MULTIPLIER) + 1,
      specialFeaturePosition:
        block.type === "sand"
          ? Math.floor(rng() * block.blockLength)
          : undefined,
      starHeight:
        block.type === "star"
          ? Math.floor(
              rng() *
                (DESERT_CONFIG.STAR.MAX_HEIGHT - DESERT_CONFIG.STAR.MIN_HEIGHT),
            ) + DESERT_CONFIG.STAR.MIN_HEIGHT
          : undefined,
      direction: rng() < 0.5 ? "up" : "down",
    };
  });
}

function calculateHeight(rng: () => number): number {
  const { MIN_HEIGHT, MAX_HEIGHT } = DESERT_CONFIG.BLOCK;
  return Math.floor(rng() * (MAX_HEIGHT - MIN_HEIGHT + 1)) + MIN_HEIGHT;
}

export function useDesert(title: string, length: number) {
  const [desert, setDesert] = useState<{
    light: DesertElement[];
    dark: DesertElement[];
  }>({ light: [], dark: [] });

  const seedRef = useRef<number | null>(null);
  const rngRef = useRef<(() => number) | null>(null);

  // memoize the generation function
  const generateDesertWithSeed = useCallback(
    (title: string, length: number) => {
      if (!length) {
        console.warn("Length is zero or undefined, skipping generation");
        return;
      }

      const newSeed = hash(title);
      if (seedRef.current !== newSeed) {
        seedRef.current = newSeed;
        rngRef.current = createRng(newSeed);
      }

      if (!rngRef.current) {
        console.error("RNG not initialized");
        return;
      }

      const lightBlocks = generateDesert(length, rngRef.current, "light");
      const darkBlocks = generateDesert(length, rngRef.current, "dark");

      setDesert({ light: lightBlocks, dark: darkBlocks });
    },
    [],
  );

  useEffect(() => {
    generateDesertWithSeed(title, length);
  }, [title, length, generateDesertWithSeed]);

  return desert;
}

function generateDesert(
  length: number,
  rng: () => number,
  theme: "light" | "dark",
): DesertElement[] {
  const tempBlocks = generateTempBlocks(length, rng, theme);
  return convertToDesertElements(tempBlocks, rng);
}

function generateTempBlocks(
  length: number,
  rng: () => number,
  theme: "light" | "dark",
) {
  const blocks: Array<{ type: DesertElementType; blockLength: number }> = [];
  let accumulatedLength = 0;

  while (accumulatedLength < length) {
    const isWater = rng() < DESERT_CONFIG.WATER_PROBABILITY;
    const blockType = isWater ? "water" : "sand";

    const remainingLength = length - accumulatedLength;
    const blockLength = calculateBlockLength(remainingLength, rng);

    blocks.push({ type: blockType, blockLength });

    if (blockType === "sand") {
      addSpecialFeatures(blocks, rng, theme);
    }

    accumulatedLength += blockLength;
  }

  return blocks;
}
