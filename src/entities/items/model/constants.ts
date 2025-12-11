import { VehicleType } from "./type";
import { ImageSourcePropType } from "react-native";

export const TOP_ITEMS: {
  label: string;
  type: VehicleType;
  image: ImageSourcePropType;
}[] = [
  {
    label: "Гараж",
    type: "cars",
    image: require("../../../../assets/images/garage.png"),
  },
  {
    label: "Ангар",
    type: "planes",
    image: require("../../../../assets/images/hangar.png"),
  },
  {
    label: "Причал",
    type: "ships",
    image: require("../../../../assets/images/berth.png"),
  },
];

export const BOTTOM_TABS: {
  label: string;
  type: VehicleType;
  icon: string;
}[] = [
  {
    label: "Автосалон",
    type: "cars",
    icon: "car-sport-outline",
  },
  {
    label: "Авиамагазин",
    type: "planes",
    icon: "airplane-outline",
  },
  {
    label: "Яхт-шоп",
    type: "ships",
    icon: "boat-outline",
  },
];
