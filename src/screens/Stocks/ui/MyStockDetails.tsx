import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useStocksStore } from "@/features/stocks/model/useStocksStore";
import { StockChart } from "@/features/stocks/ui/StockChart";
import AntDesign from "@expo/vector-icons/AntDesign";
import { INITIAL_STOCKS } from "@/features/stocks/model/constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type RouteProps = RouteProp<RootStackParamList, "MyStockDetails">;
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MyStockDetails"
>;
export const MyStockDetails = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();
  const { stockId } = route.params;

  const stock = useStocksStore((s) => s.market.find((m) => m.id === stockId));
  const owned = useStocksStore((s) =>
    s.portfolio.find((p) => p.id === stockId)
  );

  if (!stock || !owned) return null;
  const initialPrices: Record<string, number> = Object.fromEntries(
    INITIAL_STOCKS.map((s) => [s.id, s.price])
  );

  const totalValue = owned.quantity * stock.price;
  const initialPrice = initialPrices[stock.id] || stock.price;
  const profit = stock.price - initialPrice;

  const profitPercent = ((profit / initialPrice) * 100).toFixed(2);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrow}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Image source={stock.logo} style={styles.logo} />
        <Text style={styles.title}>{stock.name}</Text>
      </View>

      <StockChart stockId={stock.id} />

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.sell}
          onPress={() =>
            navigation.navigate("BuySellStock", {
              stock,
              type: "sell",
            })
          }
        >
          <Text style={styles.sellText}>Продать</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buy}
          onPress={() =>
            navigation.navigate("BuySellStock", {
              stock,
              type: "buy",
            })
          }
        >
          <Text style={styles.buyText}>Купить ещё</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.section}>Сведения</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Суммарная стоимость</Text>
        <Text style={styles.value}>${totalValue.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.value, { color: profit >= 0 ? "green" : "red" }]}>
          {profit >= 0 ? "+" : ""}
          {profit.toFixed(2)} $ ({profitPercent} %)
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  arrow: {
    marginTop: 20,
  },
  back: {
    fontSize: 22,
    marginBottom: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 20,
  },
  sell: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: "#2F80FF",
    borderRadius: 10,
    alignItems: "center",
  },
  sellText: {
    color: "#fff",
    fontWeight: "600",
  },
  buy: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    alignItems: "center",
  },
  buyText: {
    fontWeight: "600",
  },
  section: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  row: {
    marginBottom: 12,
  },
  label: {
    color: "#888",
    fontSize: 14,
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
  },
});
