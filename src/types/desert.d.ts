export type DesertElementType =
  | "sand"
  | "water"
  | "cactus"
  | "star"
  | "turtle"
  | "frog";

export type Direction = "up" | "down";

export interface DesertElement {
  type: DesertElementType;
  length: number;
  height: number;
  starHeightMultiplier: number;
  specialFeaturePosition?: number;
  starHeight?: number;
  direction: Direction;
  id: number;
}

export interface DesertProps {
  length: number;
  title: string;
}

export interface DesertFeatureProps {
  special: DesertElement;
  blockHeight: number;
  theme: "light" | "dark";
}
