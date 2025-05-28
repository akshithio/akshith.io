export const DESERT_CONFIG = {
  BLOCK: {
    MIN_LENGTH: 25,
    MAX_LENGTH: 60,
    MIN_HEIGHT: 10,
    MAX_HEIGHT: 25,
  },
  STAR: {
    MIN_HEIGHT: 50,
    MAX_HEIGHT: 150,
  },
  WATER_PROBABILITY: 0.25,
  FEATURES_PROBABILITY: {
    CACTUS: 0.2,
    STAR: 0.25,
    TURTLE: 0.2,
    FROG: 0.1,
  },
  STAR_MULTIPLIER: 4.0,
} as const;
