import { create } from "zustand";
import { ImageSourcePropType } from "react-native";

export type ItemCategory = "coins" | "paintings";

export type Item = {
  id: number;
  title: string;
  price: number;
  image?: ImageSourcePropType;
  category: ItemCategory;
  owned?: boolean;
};

type ItemsStore = {
  items: Item[];
  addItem: (item: Item) => void;
  resetsecond: () => void;

  getByCategory: (category: ItemCategory) => Item[];
  getMarketByCategory: (category: ItemCategory) => Item[];
  getCollectionByCategory: (category: ItemCategory) => Item[];
};

export const useItemsStore = create<ItemsStore>((set, get) => ({
  items: [
    { id: 1, title: "Монета 1", price: 414000, category: "coins" },
    { id: 2, title: "Монета 2", price: 520000, category: "coins" },
    { id: 3, title: "Монета 3", price: 300000, category: "coins" },

    { id: 1, title: "Картина 1", price: 1100000, category: "paintings" },
    { id: 2, title: "Картина 2", price: 1800000, category: "paintings" },
    { id: 3, title: "Картина 3", price: 750000, category: "paintings" },
  ],

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
