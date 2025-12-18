import { ImageSourcePropType } from "react-native";

export type GarageItem = {
  id: number;
  name: string;
  price: number;
  image: ImageSourcePropType;
  color?: string;
  type: "cars" | "planes" | "ships";
  engine?: "DF" | "BST" | "S+";
  packageType?: "standard" | "premium";
  team?: string;
};
