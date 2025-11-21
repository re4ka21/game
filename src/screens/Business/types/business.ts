export type BusinessType = {
  id: number;
  name: string;
  type: string;
  incomePerHour: number;
  price: number;
  icon: string;
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
