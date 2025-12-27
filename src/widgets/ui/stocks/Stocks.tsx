import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useStocksStore } from "@/features/stocks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
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

  const topGrowthStock = market.reduce(
    (best, stock) => {
      if (
        typeof stock.targetPrice !== "number" ||
        typeof stock.price !== "number" ||
        stock.price === 0
      ) {
        return best;
      }
      const growth = ((stock.targetPrice - stock.price) / stock.price) * 100;
      if (!best || growth > best.growth) {
        return { stock, growth };
      }
      return best;
    },
    null as null | { stock: Stock; growth: number }
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Портфель */}
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
              {portfolioValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              ({changePercent.toFixed(2)}%) за все время
            </Text>
            <Text style={styles.dividend}>Дивидендная доходность в час</Text>
            <Text style={styles.dividendValue}>
              $
              {hourlyDividend.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Рынок */}
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
          <View style={styles.incomeHeader}>
            <FontAwesome name="balance-scale" size={24} color="black" />
            <Text style={styles.incomeTitle}>Стабильный доход</Text>
          </View>
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

          <View style={styles.growthCard}>
            <View style={styles.growthHeader}>
              <Text style={styles.growthIcon}>🔥</Text>
              <Text style={styles.growthTitle}>Потенциал роста</Text>
            </View>
            <Text style={styles.growthSubtitle}>
              Акции, которые могут вырасти
            </Text>
            {topGrowthStock && (
              <View style={styles.growthRow}>
                <View style={styles.growthLeft}>
                  <View style={styles.growthLogo}>
                    <Text style={styles.growthLogoText}>
                      {topGrowthStock.stock.name[0]}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.growthStockName}>
                      {topGrowthStock.stock.name}
                    </Text>
                    <Text style={styles.growthPercent}>
                      +{topGrowthStock.growth.toFixed(2)}%
                    </Text>
                  </View>
                </View>
                <View style={styles.growthButtons}>
                  <TouchableOpacity
                    style={styles.growthBuyButton}
                    onPress={() =>
                      navigation.navigate("StockDetails", {
                        stock: topGrowthStock.stock,
                      })
                    }
                  >
                    <Text style={styles.growthBuyText}>Купить</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("GrowthStocks")}
                  >
                    <Text style={styles.growthViewAll}>Посмотреть все →</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { paddingBottom: 180 },
  container: { padding: 20, gap: 14 },
  title: { color: "#fff", fontSize: 22, fontWeight: "600" },
  subTitle: { color: "#E0E0E0", fontSize: 14, marginTop: 6 },
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
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  portfolioTitle: { fontSize: 16, fontWeight: "600", color: "#fff" },
  arrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  portfolioBody: { padding: 20 },
  portfolioValue: { fontSize: 28, fontWeight: "700", color: "#111827" },
  CostTitle: { fontSize: 14, color: "#6B7280", marginBottom: 6 },
  changeText: { fontSize: 16, marginVertical: 4 },
  dividend: { fontSize: 14, color: "#6B7280", marginTop: 8 },
  dividendValue: { fontSize: 14, color: "#16A34A", marginTop: 2 },
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
    marginVertical: 10,
  },
  incomeCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    gap: 6,
  },
  incomeHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  incomeTitle: { fontSize: 20, fontWeight: "600", color: "#111827" },
  incomeSubtitle: { fontSize: 15, color: "#6B7280" },
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
    backgroundColor: "#e0dede",
    padding: 6,
    paddingRight: 30,
    borderLeftWidth: 2,
    borderLeftColor: "#2563EB",
  },
  incomeLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#D0EFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  stockName: { fontSize: 16, fontWeight: "600", color: "#111827" },
  stockDividend: { fontSize: 14, color: "#2563EB" },
  incomeButtons: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginRight: 10,
  },
  buyButton: {
    backgroundColor: "#2563EB",
    borderRadius: 16,
    paddingVertical: 7,
    paddingHorizontal: 36,
    marginBottom: 4,
  },
  buyText: { color: "#fff", fontSize: 14, fontWeight: "600" },
  viewAllText: { color: "#2563EB", fontSize: 13 },
  growthCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,

    marginTop: 20,
    gap: 6,
  },
  growthHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  growthIcon: { fontSize: 20 },
  growthTitle: { fontSize: 20, fontWeight: "600", color: "#111827" },
  growthSubtitle: { fontSize: 15, color: "#6B7280" },
  growthRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  growthLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFF7ED",
    padding: 6,
    paddingRight: 30,
    borderLeftWidth: 2,
    borderLeftColor: "#F97316",
  },
  growthLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFE4C7",
    alignItems: "center",
    justifyContent: "center",
  },
  growthLogoText: { fontSize: 18, fontWeight: "600" },
  growthStockName: { fontSize: 16, fontWeight: "600", color: "#111827" },
  growthPercent: { fontSize: 14, color: "#F97316" },
  growthButtons: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginRight: 10,
  },
  growthBuyButton: {
    backgroundColor: "#F97316",
    borderRadius: 16,
    paddingVertical: 7,
    paddingHorizontal: 36,
    marginBottom: 4,
  },
  growthBuyText: { color: "#fff", fontSize: 14, fontWeight: "600" },
  growthViewAll: { color: "#F97316", fontSize: 13 },
});
