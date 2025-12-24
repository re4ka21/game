import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
} from "react-native";
import { useState } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useStocksStore } from "@/features/stocks/model/useStocksStore";
import { useCounterStore } from "@/entities";
import { INITIAL_STOCKS } from "@/features/stocks/model/constants";

type BuyStockRouteProp = RouteProp<RootStackParamList, "BuyStock">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const BuyStock = () => {
  const navigation = useNavigation<NavigationProp>();
  const { stock } = useRoute<BuyStockRouteProp>().params;

  const balance = useCounterStore((s) => s.count);
  const buyStock = useStocksStore((s) => s.buyStock);

  const [count, setCount] = useState<number>(0);

  const market = useStocksStore((s) => s.market);

  const initialPrice =
    INITIAL_STOCKS.find((s) => s.id === stock.id)?.price || stock.price;

  const currentPrice =
    market.find((s) => s.id === stock.id)?.price || stock.price;

  const maxCount = Math.floor(balance / currentPrice);
  const total = currentPrice * count;

  const change = currentPrice - initialPrice;
  const changePercent = ((change / initialPrice) * 100).toFixed(2);

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
      <Text style={styles.title}>Покупка акций</Text>

      <Text style={styles.balance}>
        Баланс: <Text style={styles.balanceValue}>${balance.toFixed(2)}</Text>
      </Text>

      <View style={styles.stockRow}>
        <View style={styles.leftRow}>
          <Image source={stock.logo} style={styles.logo} />
          <View>
            <Text style={styles.stockName}>{stock.name}</Text>
            <Text style={styles.available}>Доступно</Text>
          </View>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.stockPrice}>${currentPrice.toFixed(2)}</Text>
          <Text
            style={{
              color: change >= 0 ? "green" : "red",
              fontSize: 13,
            }}
          >
            {change >= 0 ? "+" : ""}
            {change.toFixed(2)} $ ({changePercent}%)
          </Text>
        </View>
      </View>

      <Text style={styles.label}>Количество:</Text>
      <View style={styles.countRow}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={count.toString()}
          onChangeText={(text) => {
            const num = Math.max(0, Math.min(Number(text) || 0, maxCount));
            setCount(num);
          }}
        />
        <TouchableOpacity
          style={styles.maxBtn}
          onPress={() => setCount(maxCount)}
        >
          <Text style={styles.maxText}>Макс.</Text>
        </TouchableOpacity>
      </View>

      {/* TOTAL */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Итого:</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={[styles.buyBtn, count === 0 && { opacity: 0.5 }]}
        disabled={count === 0}
        onPress={handleBuy}
      >
        <Text style={styles.buyText}>Купить</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  balance: { fontSize: 16, marginBottom: 24 },
  balanceValue: { fontWeight: "600" },
  stockName: { fontSize: 18, fontWeight: "600" },
  available: { color: "#8E8E93", marginTop: 4 },
  stockPrice: { fontSize: 18, fontWeight: "600" },
  label: { fontSize: 16, marginBottom: 8 },
  countRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
  },
  stockRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center", // вирівнювання по центру відносно тексту
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10, // ближче до тексту
  },
  maxBtn: {
    marginLeft: 10,
    backgroundColor: "#E8F0FF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  maxText: { color: "#2F80FF", fontWeight: "600" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  totalLabel: { fontSize: 18 },
  totalValue: { fontSize: 18, fontWeight: "600" },
  buyBtn: {
    backgroundColor: "#2F80FF",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buyText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
