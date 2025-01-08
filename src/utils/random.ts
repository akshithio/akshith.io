export function hash(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = hash * 33 + input.charCodeAt(i);
  }
  return hash >>> 0;
}

export function createRng(seed: number) {
  return () => {
    seed = (seed * 16807 + 49297) % 2147483647;
    return seed / 2147483647.0;
  };
}
