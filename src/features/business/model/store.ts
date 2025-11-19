import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type BusinessType = {
  id: number;
  name: string;
  type: string;
  incomePerHour: number;
  baseIncome?: number;
  price: number;
  capacity?: number;
  cars: number;
  totalEarnings: number;
  earnings: number;
  taxPercent: number;
  dependent?: boolean;
  color?: string;
  icon?: string;
  stage?: number;
  upgradeEndTime?: number;
};

type BusinessState = {
  myBusinesses: BusinessType[];
  addBusiness: (b: BusinessType) => void;
  addBusinessCapacity: (id: number, value: number) => void;
  upgradeBusinessStage: (id: number) => void;
  addBusinessCar: (id: number) => void;
  updateOfflineEarnings: () => Promise<void>;
  removeBusiness: (id: number) => void;
  closeBusiness: (id: number) => number;
  renameBusiness: (id: number, newName: string) => void;
  setUpgradeEndTime: (id: number, timestamp: number) => void;
  reset: () => void;
};

export const useBusinessStore = create<BusinessState>()(
  persist(
    (set, get) => ({
      myBusinesses: [],

      addBusiness: (b) =>
        set({
          myBusinesses: [
            ...get().myBusinesses,
            {
              ...b,
              earnings: 0,
              totalEarnings: 0,
              taxPercent: b.taxPercent || 10,
              stage: 1,
              baseIncome: b.incomePerHour,
            },
          ],
        }),

      addBusinessCapacity: (id, value) =>
        set({
          myBusinesses: get().myBusinesses.map((b) =>
            b.id === id ? { ...b, capacity: (b.capacity || 5) + value } : b
          ),
        }),

      upgradeBusinessStage: (id) =>
        set({
          myBusinesses: get().myBusinesses.map((b) =>
            b.id === id
              ? {
                  ...b,
                  stage: b.stage ? b.stage + 1 : 1,
                  incomePerHour: b.baseIncome
                    ? b.baseIncome * (1 + (b.stage || 1) * 0.25)
                    : b.incomePerHour,
                  upgradeEndTime: null,
                }
              : b
          ),
        }),

      addBusinessCar: (id) =>
        set({
          myBusinesses: get().myBusinesses.map((b) =>
            b.id === id ? { ...b, cars: b.cars + 1 } : b
          ),
        }),

      updateOfflineEarnings: async () => {
        try {
          const lastTimeStr = await AsyncStorage.getItem("lastTime2");
          const lastTime = lastTimeStr ? parseInt(lastTimeStr, 10) : Date.now();
          const now = Date.now();
          const elapsedSec = (now - lastTime) / 1000;

          set({
            myBusinesses: get().myBusinesses.map((b) => {
              const earned = (b.incomePerHour / 3600) * elapsedSec;
              const hoursPassed = Math.floor(elapsedSec / 3600);
              const tax = b.incomePerHour * (b.taxPercent / 100) * hoursPassed;

              const newEarnings = b.earnings + earned - tax;

              return {
                ...b,
                earnings: newEarnings >= 0 ? newEarnings : 0,
                totalEarnings: b.totalEarnings + earned,
              };
            }),
          });

          await AsyncStorage.setItem("lastTime2", now.toString());
        } catch (e) {
          console.log("Error calculating offline earnings", e);
        }
      },

      removeBusiness: (id) =>
        set({
          myBusinesses: get().myBusinesses.filter((b) => b.id !== id),
        }),

      closeBusiness: (id) => {
        const business = get().myBusinesses.find((b) => b.id === id);
        if (!business) return 0;

        const refund = business.price * 0.3;

        set({
          myBusinesses: get().myBusinesses.filter((b) => b.id !== id),
        });

        return refund;
      },

      renameBusiness: (id, newName) =>
        set({
          myBusinesses: get().myBusinesses.map((b) =>
            b.id === id ? { ...b, name: newName } : b
          ),
        }),

      setUpgradeEndTime: (id, timestamp) =>
        set({
          myBusinesses: get().myBusinesses.map((b) =>
            b.id === id ? { ...b, upgradeEndTime: timestamp } : b
          ),
        }),

      reset: () =>
        set({
          myBusinesses: [],
        }),
    }),
    {
      name: "business-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
