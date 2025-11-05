import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

type BackgroundStore = {
  background: any;
  purchasedBackgrounds: string[];
  setBackground: (bg: any) => void;
  addPurchasedBackground: (bg: string) => void;
};

export const useBackgroundStore = create<BackgroundStore>()(
  persist(
    (set) => ({
      background: require("../../../../assets/images/backgroundbox.png"),
      purchasedBackgrounds: [],
      setBackground: (bg) => set({ background: bg }),
      addPurchasedBackground: (bg) =>
        set((state) => ({
          purchasedBackgrounds: [...state.purchasedBackgrounds, bg],
        })),
    }),
    {
      name: "background-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
