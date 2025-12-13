import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCounterStore } from "@/features/counter";
import { INITIAL_STOCKS } from "./constants";

export type Stock = {
  id: string;
  name: string;
  price: number;
};

export type OwnedStock = {
  id: string;
  quantity: number;
};

type StocksState = {
  market: Stock[];
  portfolio: OwnedStock[];
  lastPriceUpdate: number;

  updatePrices: () => void;
  buyStock: (stockId: string, quantity: number) => boolean;
  sellStock: (stockId: string, quantity: number) => boolean;
};

export const useStocksStore = create<StocksState>()(
  persist(
    (set, get) => ({
      market: INITIAL_STOCKS,
      portfolio: [],
      lastPriceUpdate: Date.now(),

      updatePrices: () => {
        const now = Date.now();
        const ONE_HOUR = 1000 * 60 * 60;

        if (now - get().lastPriceUpdate < ONE_HOUR) return;

        set({
          market: get().market.map((stock) => {
            const changePercent = (Math.random() * 10 - 5) / 100;
            const newPrice = stock.price * (1 + changePercent);

            return {
              ...stock,
              price: Number(newPrice.toFixed(2)),
            };
          }),
          lastPriceUpdate: now,
        });
      },

      buyStock: (stockId, quantity) => {
        const stock = get().market.find((s) => s.id === stockId);
        if (!stock) return false;

        const total = stock.price * quantity;
        const balance = useCounterStore.getState().count;

        if (balance < total) return false;

        useCounterStore.getState().purchase(total);

        set((state) => {
          const existing = state.portfolio.find((s) => s.id === stockId);

          if (existing) {
            return {
              portfolio: state.portfolio.map((s) =>
                s.id === stockId ? { ...s, quantity: s.quantity + quantity } : s
              ),
            };
          }

          return {
            portfolio: [...state.portfolio, { id: stockId, quantity }],
          };
        });

        return true;
      },

      sellStock: (stockId, quantity) => {
        const stock = get().market.find((s) => s.id === stockId);
        const owned = get().portfolio.find((s) => s.id === stockId);

        if (!stock || !owned || owned.quantity < quantity) return false;

        const total = stock.price * quantity;

        useCounterStore.getState().addCount(total);

        set({
          portfolio:
            owned.quantity === quantity
              ? get().portfolio.filter((s) => s.id !== stockId)
              : get().portfolio.map((s) =>
                  s.id === stockId
                    ? { ...s, quantity: s.quantity - quantity }
                    : s
                ),
        });

        return true;
      },
    }),
    {
      name: "stocks-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
