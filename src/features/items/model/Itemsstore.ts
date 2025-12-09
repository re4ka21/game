import { create } from "zustand";

import { ITEMS } from "./constants";
import { ItemCategory, Item } from "./types";

type ItemsStore = {
  items: Item[];
  addItem: (item: Item) => void;
  resetsecond: () => void;
  getByCategory: (category: ItemCategory) => Item[];
  getMarketByCategory: (category: ItemCategory) => Item[];
  getCollectionByCategory: (category: ItemCategory) => Item[];
};

export const useItemsStore = create<ItemsStore>((set, get) => ({
  items: ITEMS,

  addItem: (item) => {
    const exists = get().items.some(
      (i) => i.id === item.id && i.category === item.category
    );
    if (!exists) {
      set({ items: [...get().items, { ...item, owned: true }] });
    } else {
      set({
        items: get().items.map((i) =>
          i.id === item.id && i.category === item.category
            ? { ...i, owned: true }
            : i
        ),
      });
    }
  },

  resetsecond: () =>
    set({
      items: get().items.map((i) => ({ ...i, owned: false })),
    }),

  getByCategory: (category) =>
    get().items.filter((i) => i.category === category),

  getMarketByCategory: (category) =>
    get().items.filter((i) => i.category === category && !i.owned),

  getCollectionByCategory: (category) =>
    get().items.filter((i) => i.category === category && i.owned),
}));
