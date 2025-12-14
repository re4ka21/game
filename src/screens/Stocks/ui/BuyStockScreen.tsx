import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/AppNavigator";

import { useStocksStore } from "@/features/stocks/model/useStocksStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type BuyStockRouteProp = RouteProp<RootStackParamList, "BuyStock">;

type StockDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StockDetails"
>;
export const BuyStock = () => {
  const navigation = useNavigation<StockDetailsNavigationProp>();
  const { stock } = useRoute<BuyStockRouteProp>().params;
  const [count, setCount] = useState(1);
  const buyStock = useStocksStore((s) => s.buyStock);
  const handleBuy = () => {
    const success = buyStock(stock.id, count);

    if (!success) {
      Alert.alert("Недостаточно средств");
    } else {
      navigation.navigate("Tabs", { screen: "Investments" });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Покупка {stock.name}</Text>

      <Text style={styles.price}>
        ${stock.price} × {count} = ${(stock.price * count).toFixed(2)}
      </Text>

      <View style={styles.counter}>
        <TouchableOpacity onPress={() => setCount(Math.max(1, count - 1))}>
          <Text style={styles.btn}>−</Text>
        </TouchableOpacity>

        <Text style={styles.count}>{count}</Text>

        <TouchableOpacity onPress={() => setCount(count + 1)}>
          <Text style={styles.btn}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buy} onPress={handleBuy}>
        <Text style={styles.buyText}>Купить</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    marginBottom: 30,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    marginBottom: 40,
  },
  btn: {
    fontSize: 32,
  },
  count: {
    fontSize: 22,
  },
  buy: {
    backgroundColor: "#2F80FF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
