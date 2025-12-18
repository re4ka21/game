import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBusinessStore } from "@/entities";

type CounterState = {
  count: number;
  clickValue: number;
  level: number;
  nextUpgradeCost: number;

  increment: () => void;
  clear: () => void;
  upgrade: () => void;
  addCount: (amount: number) => void;
  purchase: (price: number) => void;
  reset: () => void;
  cheat: () => void;
  updateOfflineEarnings: () => Promise<void>;
};

export const useCounterStore = create<CounterState>()(
  persist(
    (set, get) => ({
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

          return {
            count: state.count - state.nextUpgradeCost,
            clickValue: state.clickValue * 2,
            level: state.level + 1,
            nextUpgradeCost: state.nextUpgradeCost * 4,
          };
        }),

      purchase: (price) =>
        set((state) => {
          if (state.count < price) return state;
          return { count: state.count - price };
        }),

      addCount: (amount) => set((state) => ({ count: state.count + amount })),

      reset: () =>
        set({
          count: 0,
          clickValue: 2.5,
          level: 1,
          nextUpgradeCost: 1000,
        }),

      cheat: () => set((state) => ({ count: state.count + 1_000_000 })),

      updateOfflineEarnings: async () => {
        try {
          const lastStr = await AsyncStorage.getItem("lastTime");
          const lastTime = lastStr ? Number(lastStr) : Date.now();
          const now = Date.now();
          const elapsedSec = (now - lastTime) / 1000;

          const businesses = useBusinessStore.getState().myBusinesses;

          const incomePerHour = businesses.reduce(
            (acc, b) => acc + b.incomePerHour,
            0
          );

          const earned = (incomePerHour / 3600) * elapsedSec;

          if (earned > 0) {
            set({ count: get().count + earned });
          }

          await AsyncStorage.setItem("lastTime", String(now));
        } catch (e) {
          console.log("Offline earnings error:", e);
        }
      },
    }),
    {
      name: "counter-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
