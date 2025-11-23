import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { ImageSourcePropType } from "react-native";
type BackgroundStore = {
  background: ImageSourcePropType;
  purchasedBackgrounds: string[];
  setBackground: (bg: ImageSourcePropType) => void;
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
