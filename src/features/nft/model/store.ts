import { create } from "zustand";

export type NftItem = {
  id: number;
  image: any;
  price: number;
  owned?: boolean;
};

type NftState = {
  collections: Record<string, NftItem[]>;
  initCollection: (key: string, items: NftItem[]) => void;
  buyNft: (collection: string, id: number) => void;
};
export const useNftStore = create<NftState & { reset: () => void }>(
  (set, get) => ({
    collections: {},
    initCollection: (key, items) => {
      const exists = get().collections[key];
      if (!exists) {
        set({ collections: { ...get().collections, [key]: items } });
      }
    },
    buyNft: (collection, id) => {
      const current = get().collections[collection] || [];
      const updated = current.map((nft) =>
        nft.id === id ? { ...nft, owned: true } : nft
      );
      set({ collections: { ...get().collections, [collection]: updated } });
    },
    reset: () => {
      const newCollections = Object.fromEntries(
        Object.entries(get().collections).map(([key, items]) => [
          key,
          items.map((nft) => ({ ...nft, owned: false })),
        ])
      );
      set({ collections: newCollections });
    },
  })
);
