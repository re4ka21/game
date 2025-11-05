import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CounterState = {
  count: number;
  clickValue: number;
  level: number;
  nextUpgradeCost: number;
  increment: () => void;
  clear: () => void;
  upgrade: () => void;
  purchase: (price: number) => void;
  reset: () => void;
};

export const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,
      clickValue: 2.5,
      level: 1,
      nextUpgradeCost: 1000,

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
      reset: () =>
        set({
          count: 0,
          clickValue: 2.5,
          level: 1,
          nextUpgradeCost: 1000,
        }),
      purchase: (price) =>
        set((state) => {
          if (state.count < price) {
            return state;
          }
          return {
            ...state,
            count: state.count - price,
          };
        }),
    }),
    {
      name: "counter-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
