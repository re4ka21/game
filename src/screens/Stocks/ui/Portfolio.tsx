import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useStocksStore } from "@/features/stocks/model/useStocksStore";
import { INITIAL_STOCKS } from "@/features/stocks/model/constants";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type StockDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Portfolio"
>;

export const Portfolio = () => {
  const navigation = useNavigation<StockDetailsNavigationProp>();
  const portfolio = useStocksStore((s) => s.portfolio);
  const market = useStocksStore((s) => s.market);

  const initialPrices: Record<string, number> = Object.fromEntries(
    INITIAL_STOCKS.map((s) => [s.id, s.price])
  );

  const data = portfolio.map((owned) => {
    const stock = market.find((s) => s.id === owned.id)!;
    const initialPrice = initialPrices[stock.id] || stock.price;

    const change = stock.price - initialPrice;
    const changePercent = ((change / initialPrice) * 100).toFixed(2);

    return {
      ...stock,
      quantity: owned.quantity,
      total: stock.price * owned.quantity,
      change,
      changePercent,
    };
  });

  if (data.length === 0) {
    return (
      <View style={styles.empty}>
        <Text>У вас пока нет акций</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.arrow}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Мои акции</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() =>
              navigation.navigate("MyStockDetails", { stockId: item.id })
            }
          >
            <View style={styles.left}>
              <Image source={item.logo} style={styles.logo} />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.quantity}>
                  {item.quantity} шт · ${item.total.toFixed(2)}
                </Text>
              </View>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <Text
                style={{
                  color: item.change >= 0 ? "green" : "red",
                  fontSize: 12,
                }}
              >
                {item.change >= 0 ? "+" : ""}
                {item.changePercent}%
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  arrow: {
    marginLeft: 20,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  quantity: {
    fontSize: 13,
    color: "#8E8E93",
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
