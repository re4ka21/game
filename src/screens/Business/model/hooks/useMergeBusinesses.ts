import { useNavigation } from "@react-navigation/native";
import { useBusinessStore } from "@/features/business";
import { useCounterStore } from "@/features/counter";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "BusinessDetails"
>;

export function useMergeBusinesses() {
  const navigation = useNavigation<NavigationProp>();
  const { count } = useCounterStore();

  const performMerge = (
    selected: any[],
    mergeCost: number,
    types: string[]
  ) => {
    if (count < mergeCost) {
      alert(`Недостатньо коштів: потрібно $${mergeCost}, у вас $${count}`);
      return;
    }

    const totalIncome = selected.reduce((acc, b) => acc + b.incomePerHour, 0);
    const totalPrice = selected.reduce((acc, b) => acc + b.price, 0);

    const mergedName =
      selected.length === 1
        ? selected[0].name
        : `Merged: ${selected
            .map((s) => s.name)
            .slice(0, 3)
            .join(" + ")}`;

    const mergedIncome = Math.round(totalIncome * 1.2);

    const mergedBusiness = {
      id: Date.now(),
      name: mergedName,
      incomePerHour: mergedIncome,
      price: Math.round(totalPrice),
      icon: "layers-outline",
      color: "#34495e",
      type: types[0],
      dependent: selected[0]?.dependent || false,
      stage: 1,
      taxPercent: selected[0]?.taxPercent || 10,
    };

    useBusinessStore.setState((state: any) => {
      const remaining = state.myBusinesses.filter(
        (b) => !selected.map((s) => s.id).includes(b.id)
      );
      return { myBusinesses: [...remaining, mergedBusiness] };
    });

    useCounterStore.setState((state) => ({
      count: state.count - mergeCost,
    }));

    navigation.navigate("Tabs", { screen: "Business" });
  };

  return { performMerge };
}
