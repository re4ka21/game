import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCounterStore } from "@/entities";
import { INITIAL_STOCKS } from "./constants";

export type Stock = {
  id: string;
  name: string;
  price: number;
  dividendPercent: number;
};

export type OwnedStock = {
  id: string;
  quantity: number;
  buyPrice: number;
};

type StocksState = {
  market: Stock[];
  portfolio: OwnedStock[];
  lastPriceUpdate: number;
  priceHistory: Record<string, { time: number; price: number }[]>;
  updatePrices: () => void;
  buyStock: (stockId: string, quantity: number) => boolean;
  sellStock: (stockId: string, quantity: number) => boolean;
  calculateHourlyDividends: () => number;
  collectDividends: () => void;
};
export const useStocksStore = create<StocksState>()(
  persist(
    (set, get) => ({
      market: INITIAL_STOCKS,
      portfolio: [],
      lastPriceUpdate: Date.now(),
      priceHistory: {},

      updatePrices: () => {
        const now = Date.now();
        const prevHistory = get().priceHistory;

        const newMarket = get().market.map((stock) => {
          const changePercent = (Math.random() * 2 - 1) / 100;
          const newPrice = Number(
            (stock.price * (1 + changePercent)).toFixed(2)
          );
          return { ...stock, price: newPrice };
        });

        const newHistory: StocksState["priceHistory"] = { ...prevHistory };
        newMarket.forEach((stock) => {
          newHistory[stock.id] = [
            ...(newHistory[stock.id] || []),
            { time: now, price: stock.price },
          ].slice(-60);
        });

        set({
          market: newMarket,
          priceHistory: newHistory,
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
                s.id === stockId
                  ? {
                      ...s,
                      quantity: s.quantity + quantity,
                      buyPrice:
                        (s.buyPrice * s.quantity + stock.price * quantity) /
                        (s.quantity + quantity),
                    }
                  : s
              ),
            };
          }
          return {
            portfolio: [
              ...state.portfolio,
              { id: stockId, quantity, buyPrice: stock.price },
            ],
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

      calculateHourlyDividends: () => {
        const { portfolio, market } = get();
        return portfolio.reduce((acc, ownedStock) => {
          const marketStock = market.find((s) => s.id === ownedStock.id);
          if (!marketStock) return acc;
          return (
            acc +
            ownedStock.quantity *
              marketStock.price *
              marketStock.dividendPercent
          );
        }, 0);
      },

      collectDividends: () => {
        const dividends = get().calculateHourlyDividends();
        useCounterStore.getState().addCount((dividends / 3600) * 5);
      },
    }),
    {
      name: "stocks-storage-v2",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
