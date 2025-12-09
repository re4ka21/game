import { create } from "zustand";
import { GarageItem } from "./types";

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
