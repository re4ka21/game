import { useEffect } from "react";
import { useStocksStore } from "@/features/stocks/model/useStocksStore";

export const StocksAutoUpdater = () => {
  const updatePrices = useStocksStore((s) => s.updatePrices);
  const collectDividends = useStocksStore((s) => s.collectDividends);
  const collectOfflineDividends = useStocksStore(
    (s) => s.collectOfflineDividends
  );

  useEffect(() => {
    collectOfflineDividends();

    updatePrices();

    const interval = setInterval(() => {
      updatePrices();
      collectDividends();
    }, 5000);

    return () => clearInterval(interval);
  }, [updatePrices, collectDividends, collectOfflineDividends]);

  return null;
};
