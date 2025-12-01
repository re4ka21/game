import { create } from "zustand";
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

type GarageStore = {
  items: GarageItem[];
  addItem: (item: GarageItem) => void;
  reset: () => void;
};

export const useGarageStore = create<GarageStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const exists = get().items.some((i) => i.id === item.id);
    if (!exists) {
      set({ items: [...get().items, item] });
    }
  },
  reset: () => set({ items: [] }),
}));
