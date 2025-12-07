import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface HonorsStore {
  received: number[];
  markReceived: (id: number) => void;
  reset: () => void;
}

export const useHonorsStore = create<HonorsStore>()(
  persist(
    (set) => ({
      received: [],

      markReceived: (id) =>
        set((state) => ({
          received: [...state.received, id],
        })),

      reset: () =>
        set({
          received: [],
        }),
    }),
    {
      name: "honors-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
