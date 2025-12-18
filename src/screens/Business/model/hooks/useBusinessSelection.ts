import { useState } from "react";
import { useBusinessStore } from "@/entities";

export function useBusinessSelection() {
  const { myBusinesses } = useBusinessStore();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selected = myBusinesses.filter((b) => selectedIds.includes(b.id));
  const totalIncome = selected.reduce((acc, b) => acc + b.incomePerHour, 0);
  const totalPrice = selected.reduce((acc, b) => acc + b.price, 0);
  const types = [...new Set(selected.map((b) => b.type))];
  const differentTypes = selected.length >= 2 && types.length > 1;
  const mergeCost = Math.round(totalPrice * 0.8);

  const potentialEffect = (() => {
    if (selectedIds.length < 2) return "Виберіть хоча б 2 бізнеси для злиття";
    if (differentTypes) return "Можна зливати лише бізнеси одного типу";
    return `Якщо злити ${
      selected.length
    } бізнесів, потенційний прибуток може зрости до ~${(
      totalIncome * 1.5
    ).toFixed(0)}$/год`;
  })();

  return {
    myBusinesses,
    selectedIds,
    toggleSelect,
    selected,
    totalIncome,
    totalPrice,
    types,
    differentTypes,
    mergeCost,
    potentialEffect,
    setSelectedIds,
  };
}
