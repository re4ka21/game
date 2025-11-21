import { useCounterStore } from "@/features/counter";
import { useBusinessStore } from "@/features/business";
import { Alert } from "react-native";

export function useBusinessPurchase() {
  const { count, purchase } = useCounterStore();
  const { myBusinesses, addBusiness } = useBusinessStore();

  const canOpenBusiness = (businessPrice: number) => {
    if (myBusinesses.length >= 10) {
      Alert.alert("Вы достигли максимума — можно открыть только 10 бизнесов!");
      return false;
    }
    if (count < businessPrice) {
      Alert.alert("Недостаточно средств");
      return false;
    }
    return true;
  };

  const openBusiness = (business: any, customName: string) => {
    purchase(business.price);
    addBusiness({
      ...business,
      id: Date.now(),
      name: customName || business.name,
    });
  };

  return { canOpenBusiness, openBusiness };
}
