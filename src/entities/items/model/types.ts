import { ImageSourcePropType } from "react-native";
export type VehicleType = "cars" | "planes" | "ships";

export type ItemCategory =
  | "coins"
  | "paintings"
  | "uniqueItems"
  | "retroCars"
  | "jewels"
  | "stamps";

export type Item = {
  id: number;
  title: string;
  price: number;
  image?: ImageSourcePropType;
  category: ItemCategory;
  owned?: boolean;
};
