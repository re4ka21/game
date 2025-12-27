import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useStocksStore } from "@/features/stocks";
import { Stock } from "@/features/stocks/model/useStocksStore";
import { BackButton } from "@/shared";

type StockDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "GrowthStocks"
>;

export const GrowthStocks = () => {
  const navigation = useNavigation<StockDetailsNavigationProp>();
  const market = useStocksStore((s) => s.market);

  const growthStocks = market
    .map((stock) => {
      if (typeof stock.targetPrice !== "number" || stock.price === 0)
        return null;
      const growth = ((stock.targetPrice - stock.price) / stock.price) * 100;
      return { ...stock, growth };
    })
    .filter(
      (stock): stock is Stock & { growth: number } =>
        stock !== null && stock.growth > 0
    )
    .sort((a, b) => b.growth - a.growth);

  return (
    <>
      <BackButton style={styles.arrow} />
      <FlatList
        data={growthStocks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("StockDetails", { stock: item })}
          >
            <View style={styles.rowLeft}>
              <Image source={item.logo} style={styles.logo} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.available}>Доступно</Text>
                <View style={styles.separator} />
              </View>
            </View>
            <Text style={styles.growth}>+{item.growth.toFixed(2)}%</Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 30,
  },
  arrow: {
    marginTop: 40,
    marginLeft: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    flex: 1,
  },
  textContainer: {
    flexDirection: "column",
    flex: 1,
  },
  name: { fontSize: 16, fontWeight: "500" },
  available: { fontSize: 14, color: "#888", marginTop: 2 },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginTop: 6,
    marginRight: -80,
  },
  growth: { fontSize: 16, color: "green", fontWeight: "600" },
  logo: { width: 40, height: 40, borderRadius: 20 },
});
