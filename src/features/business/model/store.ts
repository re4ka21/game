import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type BusinessType = {
  id: number;
  name: string;
  type: string;
  incomePerHour: number;
  price: number;
  capacity?: number;
  cars: number;
  dependent?: boolean;
};

type BusinessState = {
  myBusinesses: BusinessType[];
  addBusiness: (b: BusinessType) => void;
  addBusinessCapacity: (id: number, value: number) => void;
  updateOfflineEarnings: () => void;
};

export const useBusinessStore = create<BusinessState>()(
  persist(
    (set, get) => ({
      myBusinesses: [],

      addBusiness: (b) =>
        set({
          myBusinesses: [...get().myBusinesses, b],
        }),

      addBusinessCapacity: (id, value) =>
        set({
          myBusinesses: get().myBusinesses.map((b) =>
            b.id === id ? { ...b, capacity: (b.capacity || 5) + value } : b
          ),
        }),

      updateOfflineEarnings: async () => {
        try {
          const lastTimeStr = await AsyncStorage.getItem("lastTime2");
          const lastTime = lastTimeStr ? parseInt(lastTimeStr, 10) : Date.now();
          const now = Date.now();
          const elapsedSec = (now - lastTime) / 1000;

          const incomePerHour = get().myBusinesses.reduce(
            (acc, b) => acc + b.incomePerHour,
            0
          );

          const earned = (incomePerHour / 3600) * elapsedSec;

          console.log("Offline earned:", earned);

          await AsyncStorage.setItem("lastTime2", now.toString());
        } catch (e) {
          console.log("Error calculating offline earnings", e);
        }
      },
    }),
    {
      name: "business-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
