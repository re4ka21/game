import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type BusinessType = {
  id: number;
  name: string;
  incomePerHour: number;
  price: number;
};

type CounterState = {
  count: number;
  clickValue: number;
  level: number;
  nextUpgradeCost: number;
  myBusinesses: BusinessType[];
  increment: () => void;
  clear: () => void;
  upgrade: () => void;
  purchase: (price: number) => void;
  addBusiness: (b: BusinessType) => void;
  addCount: (amount: number) => void;
  reset: () => void;
  cheat: () => void;
};

export const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,
      clickValue: 2.5,
      level: 1,
      nextUpgradeCost: 1000,
      myBusinesses: [],

      increment: () =>
        set((state) => ({ count: state.count + state.clickValue })),

      clear: () => set({ count: 0 }),

      upgrade: () =>
        set((state) => {
          if (state.count < state.nextUpgradeCost) return state;
          const newLevel = state.level + 1;
          const newClickValue = state.clickValue * 2;
          const newUpgradeCost = state.nextUpgradeCost * 4;
          return {
            count: state.count - state.nextUpgradeCost,
            clickValue: newClickValue,
            level: newLevel,
            nextUpgradeCost: newUpgradeCost,
          };
        }),

      purchase: (price) =>
        set((state) => {
          if (state.count < price) return state;
          return { ...state, count: state.count - price };
        }),

      addBusiness: (b: BusinessType) =>
        set((state) => ({ myBusinesses: [...state.myBusinesses, b] })),

      addCount: (amount: number) =>
        set((state) => ({ count: state.count + amount })),

      reset: () =>
        set({
          count: 0,
          clickValue: 2.5,
          level: 1,
          nextUpgradeCost: 1000,
          myBusinesses: [],
        }),

      cheat: () => set((state) => ({ count: state.count + 1000000 })),
    }),
    {
      name: "counter-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
