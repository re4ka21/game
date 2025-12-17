import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStocksStore } from "@/features/stocks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export const Stocks = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const market = useStocksStore((s) => s.market);
  const portfolio = useStocksStore((s) => s.portfolio);
  const updatePrices = useStocksStore((s) => s.updatePrices);

  useEffect(() => {
    const interval = setInterval(() => {
      updatePrices();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const portfolioValue = portfolio.reduce((acc, stock) => {
    const marketStock = market.find((s) => s.id === stock.id);
    return acc + (marketStock?.price || 0) * stock.quantity;
  }, 0);

  const portfolioBuyValue = portfolio.reduce(
    (acc, stock) => acc + stock.buyPrice * stock.quantity,
    0
  );

  const change = portfolioValue - portfolioBuyValue;
  const changePercent = portfolioBuyValue
    ? (change / portfolioBuyValue) * 100
    : 0;

  const hourlyDividend = portfolio.length * 10;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("StocksMarket")}
      >
        <Text style={styles.title}>Фондовый рынок</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, styles.portfolioCard]}
        onPress={() => navigation.navigate("Portfolio")}
      >
        <Text style={styles.portfolioTitle}>Мой портфель</Text>

        <Text style={styles.portfolioValue}>
          $
          {portfolioValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>

        <Text
          style={[styles.changeText, { color: change >= 0 ? "green" : "red" }]}
        >
          {change >= 0 ? "+" : ""}$
          {change.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          ({changePercent.toFixed(2)}%) за все время
        </Text>

        <Text style={styles.dividend}>Дивидендная доходность в час</Text>
        <Text style={styles.dividendValue}>
          $ {hourlyDividend.toLocaleString()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, gap: 14 },
  card: { backgroundColor: "#4A8DFF", borderRadius: 14, padding: 18 },
  portfolioCard: { backgroundColor: "#E0F0FF", padding: 20 },
  title: { color: "#fff", fontSize: 18, fontWeight: "600" },
  portfolioTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D4ED8",
    marginBottom: 8,
  },
  portfolioValue: { fontSize: 28, fontWeight: "700", color: "#111827" },
  changeText: { fontSize: 16, marginVertical: 4 },
  dividend: { fontSize: 14, color: "#6B7280", marginTop: 8 },
  dividendValue: { fontSize: 18, fontWeight: "600", color: "#111827" },
});
