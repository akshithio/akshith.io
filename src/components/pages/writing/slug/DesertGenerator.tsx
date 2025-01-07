import { useState } from "react";

export default function DesertGenerator() {
  const [desert, setDesert] = useState<Desert[]>([]);
  interface Desert {
    type: string;
    length: number;
    height: number;
    cactus: boolean;
    star: boolean;
    frog: boolean;
    rabbit: boolean;
  }

  // djb2
  function hash(input: string): number {
    let hash = 5381;
    for (let i = 0; i < input.length; i++) {
      let charCode = input.charCodeAt(i);
      hash = hash * 33 + charCode;
    }
    return hash >>> 0;
  }

  // Lehmer / Park-Miller RNG / LCG
  function random(seed: number): () => number {
    return function () {
      seed = (seed * 16807 + 49297) % 2147483647;
      return seed / 2147483647.0;
    };
  }

  function generateDesert(title: string, numBlocks: number): Array<any> {
    const seed = hash(title);
    const rng = random(seed);

    const desert: Desert[] = [];
    for (let i = 0; i < numBlocks; i++) {
      const isWater = rng() < 0.35;
      const hasCactus = rng() < 0.25;
      const hasStar = rng() < 0.45;
      const hasFrog = rng() < 0.25;
      const hasRabbit = rng() < 0.25;

      const desertObject: Desert = {
        type: isWater ? "water" : "sand",
        length: Math.floor(rng() * 5) + 1,
        height: Math.floor(rng() * 3) + 1,
        cactus: isWater ? false : hasCactus, // light-mode specific
        frog: hasFrog, // light-mode specific
        star: hasStar ? false : hasStar, // dark-mode specific
        rabbit: hasRabbit, // dark-mode specific
      };

      desert.push(desertObject);
    }

    return desert;
  }

  const blogTitle = "A top level understanding of vector embeddings";
  const desertBlocks = generateDesert(blogTitle, 10);
  console.log(desertBlocks);
  setDesert(desertBlocks);

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
