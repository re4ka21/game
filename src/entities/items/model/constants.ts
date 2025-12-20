import { VehicleType } from "./types";
import { ImageSourcePropType } from "react-native";
import { Item } from "./types";

export const ITEMS: Item[] = [
  { id: 1, title: "Монета 1", price: 414000, category: "coins" },
  { id: 2, title: "Монета 2", price: 520000, category: "coins" },
  { id: 3, title: "Монета 3", price: 300000, category: "coins" },

  { id: 1, title: "Картина 1", price: 1100000, category: "paintings" },
  { id: 2, title: "Картина 2", price: 1800000, category: "paintings" },
  { id: 3, title: "Картина 3", price: 750000, category: "paintings" },

  {
    id: 1,
    title: "Унікальний предмет 1",
    price: 5000000,
    category: "uniqueItems",
  },
  {
    id: 2,
    title: "Унікальний предмет 2",
    price: 7500000,
    category: "uniqueItems",
  },

  { id: 1, title: "Ретро авто 1", price: 1200000, category: "retroCars" },
  { id: 2, title: "Ретро авто 2", price: 1500000, category: "retroCars" },

  { id: 1, title: "Дорогоцінність 1", price: 3000000, category: "jewels" },
  { id: 2, title: "Дорогоцінність 2", price: 4500000, category: "jewels" },

  { id: 1, title: "Марка 1", price: 200000, category: "stamps" },
  { id: 2, title: "Марка 2", price: 350000, category: "stamps" },
];

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
