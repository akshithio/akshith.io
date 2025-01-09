import { DesertFeatureProps } from "@/types/desert";
import CactusIcon from "./icons/CactusIcon";
import FrogIcon from "./icons/FrogIcon";
import StarIcon from "./icons/StarIcon";
import TurtleIcon from "./icons/TurtleIcon";

const FEATURE_ICONS = {
  cactus: CactusIcon,
  turtle: (props: { direction: "up" | "down" }) => <TurtleIcon {...props} />,
  star: StarIcon,
  frog: (props: { direction: "up" | "down" }) => <FrogIcon {...props} />,
} as const;

export function DesertFeature({
  special,
  blockHeight,
}: Omit<DesertFeatureProps, "theme">) {
  const style = {
    position: "absolute",
    left:
      special.type === "star" ? `${special.starHeight}px` : `${blockHeight}px`,
    top: `${special.specialFeaturePosition}px`,
  } as const;

  const FeatureIcon = FEATURE_ICONS[special.type];

  if (!FeatureIcon) {
    return null;
  }

  return (
    <div style={style}>
      <FeatureIcon direction={special.direction} />
    </div>
  );
}

export default DesertFeature;
