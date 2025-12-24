import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageSourcePropType } from "react-native";
import { useCounterStore } from "@/entities";
import { INITIAL_STOCKS } from "./constants";

export type Stock = {
  id: string;
  name: string;
  price: number;
  dividendPercent: number;
  logo: ImageSourcePropType;
};

export type OwnedStock = {
  id: string;
  quantity: number;
  buyPrice: number;
};

type StocksState = {
  market: Stock[];
  portfolio: OwnedStock[];
  priceHistory: Record<string, { time: number; price: number }[]>;
  lastPriceUpdate: number;
  lastDividendCollect: number;

  updatePrices: () => void;
  buyStock: (stockId: string, quantity: number) => boolean;
  sellStock: (stockId: string, quantity: number) => boolean;

  calculateHourlyDividends: () => number;
  collectDividends: () => void;
  collectOfflineDividends: () => void;
};

export const useStocksStore = create<StocksState>()(
  persist(
    (set, get) => ({
      market: INITIAL_STOCKS,
      portfolio: [],
      priceHistory: {},
      lastPriceUpdate: Date.now(),
      lastDividendCollect: Date.now(),

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
            const newQuantity = existing.quantity + quantity;
            const newBuyPrice =
              (existing.buyPrice * existing.quantity + stock.price * quantity) /
              newQuantity;

            return {
              portfolio: state.portfolio.map((s) =>
                s.id === stockId
                  ? {
                      ...s,
                      quantity: newQuantity,
                      buyPrice: newBuyPrice,
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

        return portfolio.reduce((acc, owned) => {
          const stock = market.find((s) => s.id === owned.id);
          if (!stock) return acc;

          return acc + owned.quantity * stock.price * stock.dividendPercent;
        }, 0);
      },

      collectDividends: () => {
        const hourly = get().calculateHourlyDividends();
        const perSecond = hourly / 3600;

        useCounterStore.getState().addCount(perSecond * 5);

        set({ lastDividendCollect: Date.now() });
      },

      collectOfflineDividends: () => {
        const now = Date.now();
        const last = get().lastDividendCollect;

        const diffSeconds = (now - last) / 1000;
        if (diffSeconds <= 0) return;

        const hourly = get().calculateHourlyDividends();
        const perSecond = hourly / 3600;

        const earned = perSecond * diffSeconds;

        if (earned > 0) {
          useCounterStore.getState().addCount(earned);
        }

        set({ lastDividendCollect: now });
      },
    }),
    {
      name: "stocks-storage-v7",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
