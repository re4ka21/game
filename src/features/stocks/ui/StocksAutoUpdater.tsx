// StocksAutoUpdater.tsx
import { useEffect } from "react";
import { useStocksStore } from "@/features/stocks/model/useStocksStore";

export const StocksAutoUpdater = () => {
  const updatePrices = useStocksStore((s) => s.updatePrices);

  useEffect(() => {
    updatePrices();

    const interval = setInterval(() => {
      updatePrices();
    }, 10000);

    return () => clearInterval(interval);
  }, [updatePrices]);

  return null;
};
