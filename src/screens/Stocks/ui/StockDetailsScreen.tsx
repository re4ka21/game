import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { StockChart } from "@/features/stocks";
import { useStocksStore } from "@/features/stocks/model/useStocksStore";
import { useEffect } from "react";

type StockDetailsRouteProp = RouteProp<RootStackParamList, "StockDetails">;
type StockDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StockDetails"
>;

export const StockDetails = () => {
  const navigation = useNavigation<StockDetailsNavigationProp>();
  const { stock } = useRoute<StockDetailsRouteProp>().params;

  const updatePrices = useStocksStore((s) => s.updatePrices);

  useEffect(() => {
    const interval = setInterval(() => {
      updatePrices();
    }, 10000);

    return () => clearInterval(interval);
  }, [updatePrices]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{stock.name}</Text>

      <View style={styles.chart}>
        <StockChart stockId={stock.id} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("BuyStock", { stock })}
      >
        <Text style={styles.buttonText}>Купить акции</Text>
      </TouchableOpacity>

      <Text style={styles.info}>Стоимость одной акции: ${stock.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  chart: {
    height: 200,
    backgroundColor: "#F2F5FF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#2F80FF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  info: { marginTop: 20, fontSize: 16 },
});
