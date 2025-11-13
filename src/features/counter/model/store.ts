import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type BusinessType = {
  id: number;
  name: string;
  type: string;
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
  updateOfflineEarnings: () => void; // нова функція
};

export const useCounterStore = create<CounterState>()(
  persist(
    (set, get) => ({
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

      updateOfflineEarnings: async () => {
        try {
          const lastTimeStr = await AsyncStorage.getItem("lastTime");
          const lastTime = lastTimeStr ? parseInt(lastTimeStr, 10) : Date.now();
          const now = Date.now();
          const elapsedSec = (now - lastTime) / 1000;

          const incomePerHour = get().myBusinesses.reduce(
            (acc, b) => acc + b.incomePerHour,
            0
          );
          const earned = (incomePerHour / 3600) * elapsedSec;

          if (earned > 0) set({ count: get().count + earned });

          await AsyncStorage.setItem("lastTime", now.toString());
        } catch (e) {
          console.log("Error calculating offline earnings", e);
        }
      },
    }),
    {
      name: "counter-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
