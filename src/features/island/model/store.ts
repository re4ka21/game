import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ISLANDS } from "../constants/islands";
import { useCounterStore } from "@/features/counter";

export type Island = {
  id: number;
  name: string;
  price: number;
  image: any;
  owned?: boolean;
  description: string;
};

type IslandStore = {
  islands: Island[];
  buyIsland: (id: number) => void;
  resetIslands: () => void;
};

export const useIslandStore = create<IslandStore>()(
  persist(
    (set, get) => ({
      islands: ISLANDS.map((i) => ({ ...i, owned: false })),

      buyIsland: (id) => {
        const { islands } = get();
        const island = islands.find((i) => i.id === id);

        if (!island || island.owned) return;

        const balance = useCounterStore.getState().count;
        if (balance < island.price) return;

        useCounterStore.getState().purchase(island.price);

        set({
          islands: islands.map((i) =>
            i.id === id ? { ...i, owned: true } : i
          ),
        });
      },

      resetIslands: () =>
        set({
          islands: ISLANDS.map((i) => ({ ...i, owned: false })),
        }),
    }),
    {
      name: "islands-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
