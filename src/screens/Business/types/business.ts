import { Ionicons } from "@expo/vector-icons";

export type IoniconsNames = React.ComponentProps<typeof Ionicons>["name"];

export type BusinessType = {
  id: number;
  name: string;
  type: string;
  incomePerHour: number;
  price: number;
  icon: IoniconsNames;
  color: string;
  isChain?: boolean;
  dependent?: boolean;
};

export type ShopSizeType = {
  id: number;
  name: string;
  multiplier: number;
};

export type CapacityValue = number;
export type CapacityCostMap = Record<CapacityValue, number>;

export type CarType =
  | "economy"
  | "comfort"
  | "comfort_plus"
  | "business"
  | "premier";

export type CarOption = {
  name: string;
  image: any;
  resource: string;
  income: number;
  price: number;
  type: CarType;
};
