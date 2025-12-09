import { ImageSourcePropType, ColorValue } from "react-native";

export type HonorItem = {
  id: number;
  title: string;
  colors: readonly [ColorValue, ColorValue];
  image: ImageSourcePropType;
  conditions: string;
  hidden?: boolean;
};
