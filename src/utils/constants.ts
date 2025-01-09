export const DESERT_CONFIG = {
  BLOCK: {
    MIN_LENGTH: 25,
    MAX_LENGTH: 150,
    MIN_HEIGHT: 15,
    MAX_HEIGHT: 20,
  },
  STAR: {
    MIN_HEIGHT: 50,
    MAX_HEIGHT: 150,
  },
  WATER_PROBABILITY: 0.25,
  FEATURES_PROBABILITY: {
    CACTUS: 0.3,
    STAR: 0.5,
    TURTLE: 0.3,
    FROG: 0.3,
  },
  STAR_MULTIPLIER: 4.0,
} as const;
