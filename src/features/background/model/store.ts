import { create } from "zustand";
import { ImageSourcePropType } from "react-native";
type BackgroundStore = {
  background: ImageSourcePropType;
  setBackground: (bg: ImageSourcePropType) => void;
};

export const useBackgroundStore = create<BackgroundStore>((set) => ({
  background: require("../../../../assets/images/backgroundbox.png"),
  setBackground: (bg) => set({ background: bg }),
}));
