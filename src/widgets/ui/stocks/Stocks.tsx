import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStocksStore } from "@/features/stocks";
import { useCounterStore } from "@/entities";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stock } from "@/features/stocks/model/useStocksStore";

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Stocks = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const market = useStocksStore((s) => s.market);
  const portfolio = useStocksStore((s) => s.portfolio);

  const hourlyDividend = portfolio.reduce((acc, ownedStock) => {
    const stock = market.find((s) => s.id === ownedStock.id);
    if (!stock) return acc;
    return acc + ownedStock.quantity * stock.price * stock.dividendPercent;
  }, 0);

  const topDividendStock = market.reduce(
    (best, stock) => {
      if (!best || stock.dividendPercent > best.stock.dividendPercent) {
        return { stock, dividend: stock.dividendPercent };
      }
      return best;
    },
    null as null | { stock: Stock; dividend: number }
  );

  const portfolioValue = portfolio.reduce((acc, ownedStock) => {
    const stock = market.find((s) => s.id === ownedStock.id);
    return acc + (stock?.price || 0) * ownedStock.quantity;
  }, 0);

  const portfolioBuyValue = portfolio.reduce(
    (acc, stock) => acc + stock.buyPrice * stock.quantity,
    0
  );

  const change = portfolioValue - portfolioBuyValue;
  const changePercent = portfolioBuyValue
    ? (change / portfolioBuyValue) * 100
    : 0;

  useEffect(() => {
    const store = useStocksStore.getState();

    store.updatePrices();
    store.collectDividends();

    const interval = setInterval(() => {
      store.updatePrices();
      store.collectDividends();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.portfolioCard}
          onPress={() => navigation.navigate("Portfolio")}
          activeOpacity={0.9}
        >
          <View style={styles.portfolioHeader}>
            <View style={styles.headerLeft}>
              <Ionicons name="briefcase-outline" size={22} color="#fff" />
              <Text style={styles.portfolioTitle}>Мой портфель</Text>
            </View>

            <View style={styles.arrowCircle}>
              <Ionicons name="chevron-forward" size={18} color="#2563EB" />
            </View>
          </View>

          <View style={styles.portfolioBody}>
            <Text style={styles.CostTitle}>Стоимость портфеля</Text>
            <Text style={styles.portfolioValue}>
              $
              {portfolioValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>

            <Text
              style={[
                styles.changeText,
                { color: change >= 0 ? "green" : "red" },
              ]}
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
              ${" "}
              {hourlyDividend.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.marketCard}
          onPress={() => navigation.navigate("StocksMarket")}
          activeOpacity={0.9}
        >
          <View>
            <Text style={styles.title}>Фондовый рынок</Text>
            <Text style={styles.subTitle}>Посмотреть все предложения</Text>
          </View>

          <MaterialIcons name="arrow-forward-ios" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.line} />
      {topDividendStock && (
        <View style={styles.incomeCard}>
          <Text style={styles.incomeTitle}>Стабильный доход</Text>
          <Text style={styles.incomeSubtitle}>
            Акции с наибольшими дивидендами
          </Text>

          <View style={styles.incomeRow}>
            <View style={styles.incomeLeft}>
              <View style={styles.incomeLogo}>
                <Text>{topDividendStock.stock.name[0]}</Text>
              </View>
              <View>
                <Text style={styles.stockName}>
                  {topDividendStock.stock.name}
                </Text>
                <Text style={styles.stockDividend}>
                  {(topDividendStock.stock.dividendPercent * 100).toFixed(2)}%
                </Text>
              </View>
            </View>

            <View style={styles.incomeButtons}>
              <TouchableOpacity
                style={styles.buyButton}
                onPress={() =>
                  navigation.navigate("StockDetails", {
                    stock: topDividendStock.stock,
                  })
                }
              >
                <Text style={styles.buyText}>Купить</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("IncomeStocks")}
              >
                <Text style={styles.viewAllText}>Посмотреть все →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, gap: 14 },

  title: { color: "#fff", fontSize: 22, fontWeight: "600" },
  subTitle: {
    color: "#E0E0E0",
    fontSize: 14,
    marginTop: 6,
  },
  portfolioCard: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#E0F0FF",
  },

  portfolioHeader: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  portfolioTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },

  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  portfolioBody: {
    padding: 20,
  },

  portfolioValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  CostTitle: { fontSize: 14, color: "#6B7280", marginBottom: 6 },
  changeText: {
    fontSize: 16,
    marginVertical: 4,
  },

  dividend: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
  },

  marketCard: {
    backgroundColor: "#4A8DFF",
    borderRadius: 14,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  line: {
    height: 3,
    backgroundColor: "#E5E7EB",
    width: "100%",
  },
  dividendCard: {
    backgroundColor: "#ECFDF5",
    marginTop: 20,
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dividendLabel: {
    fontSize: 13,
    color: "#065F46",
    marginBottom: 4,
  },

  dividendName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#064E3B",
  },

  dividendValue: {
    fontSize: 14,
    color: "#16A34A",
    marginTop: 2,
  },
  incomeCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    gap: 10,
  },

  incomeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  incomeSubtitle: {
    fontSize: 13,
    color: "#6B7280",
  },

  incomeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  incomeLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  incomeLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#D0EFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  stockName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  stockDividend: {
    fontSize: 14,
    color: "#2563EB",
  },

  incomeButtons: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginRight: 10,
  },

  buyButton: {
    backgroundColor: "#2563EB",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 35,
    marginBottom: 4,
  },

  buyText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  viewAllText: {
    color: "#2563EB",
    fontSize: 13,
  },
});
