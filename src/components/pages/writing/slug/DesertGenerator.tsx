export default function DesertGenerator() {
  function hashStringToSeed(input: string): number {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = (hash << 5) - hash + input.charCodeAt(i);
      hash |= 0; // Convert to 32-bit integer
    }
    return hash >>> 0; // Convert to unsigned
  }

  function random(seed: number): () => number {
    return function () {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280.0;
    };
  }

  function generateDesert(title: string, numBlocks: number): Array<any> {
    const seed = hashStringToSeed(title);
    const rng = random(seed);

    const desert = [];
    for (let i = 0; i < numBlocks; i++) {
      const isWater = rng() < 0.35;
      const hasCactusOrStar = rng() < 0.45;
      const hasFrogOrRabbit = rng() < 0.25;

      desert.push({
        type: isWater ? "water" : "sand",
        length: isWater ? undefined : Math.floor(rng() * 5) + 1, // 1-5 units for sand
        height: isWater ? undefined : Math.floor(rng() * 3) + 1, // 1-3 units for sand
        cactusOrStar: isWater ? false : hasCactusOrStar,
        frogOrRabbit: hasFrogOrRabbit,
      });
    }
    return desert;
  }

  // Example usage:
  const blogTitle = "A top level understanding of vector embeddings";
  const desertBlocks = generateDesert(blogTitle, 10);
  console.log(desertBlocks);
}
