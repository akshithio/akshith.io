// what type of element is being generated
// based on asgigned probabilities
export type DesertElementType =
  | "sand"
  | "water"
  | "cactus"
  | "star"
  | "turtle"
  | "frog";

// what direction the frog / turtle is going
// 50% probability for either
export type Direction = "up" | "down";

// mapped by the DesertComponent to keep track of all the components
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

// the props that are passed from ContentHeightTracker
// to the DesertComponent, the title is needed to generate the seed
export interface DesertProps {
  length: number;
  title: string;
}

// since special features are rendered essentially after the basic ground,
// the blockHeight gives information in terms of the number of pixels down 
// that the viewport needs to go before it starts rendering this component
export interface DesertFeatureProps {
  special: DesertElement;
  blockHeight: number;
}
