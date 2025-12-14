import { ShopCategory } from "@/entities";
import { ItemCategory } from "@/features/items";
export const categories: ShopCategory[] = [
  {
    label: "Монеты",
    type: "coins",
    image: require("../../../../../assets/images/coin.png"),
  },
  {
    label: "Картины",
    type: "paintings",
    image: require("../../../../../assets/images/react-logo.png"),
  },
  {
    label: "Уникальные предметы",
    type: "uniqueItems",
    image: require("../../../../../assets/images/react-logo.png"),
  },
  {
    label: "Ретро автомобили",
    type: "retroCars",
    image: require("../../../../../assets/images/react-logo.png"),
  },
  {
    label: "Драгоценности",
    type: "jewels",
    image: require("../../../../../assets/images/react-logo.png"),
  },
  {
    label: "Марки",
    type: "stamps",
    image: require("../../../../../assets/images/react-logo.png"),
  },
];
export const titles: Record<ItemCategory, string> = {
  coins: "Монеты",
  paintings: "Картины",
  uniqueItems: "Уникальные предметы",
  retroCars: "Ретро автомобили",
  jewels: "Драгоценности",
  stamps: "Марки",
};
