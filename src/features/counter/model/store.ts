import { create } from "zustand";

type CounterState = {
  count: number;
  clickValue: number;
  level: number;
  nextUpgradeCost: number;
  increment: () => void;
  clear: () => void;
  upgrade: () => void;
  purchase: (price: number) => void;
};

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  clickValue: 2.5,
  level: 1,
  nextUpgradeCost: 1000,

  increment: () => set((state) => ({ count: state.count + state.clickValue })),

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
      if (state.count < price) {
        // недостатньо грошей — нічого не міняємо
        return state;
      }
      return {
        ...state,
        count: state.count - price, // віднімаємо суму покупки
      };
    }),
}));
