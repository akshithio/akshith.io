export function hash(input: string): number {
  let hash = 2166136261 >>> 0; // FNV offset basis
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = (hash * 16777619) >>> 0; // FNV prime
  }
  return hash;
}

export function createRng(seed: number) {
  return () => {
    seed = (seed * 16807 + 49297) % 2147483647;
    return seed / 2147483647.0;
  };
}
