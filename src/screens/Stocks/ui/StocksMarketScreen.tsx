import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useStocksStore } from "@/features/stocks";
import { useRef } from "react";

type StockDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StocksMarket"
>;

export const StocksMarket = () => {
  const navigation = useNavigation<StockDetailsNavigationProp>();
  const market = useStocksStore((s) => s.market);

  // Зберігаємо початкові ціни для кожної акції
  const initialPrices = useRef<Record<string, number>>(
    Object.fromEntries(market.map((s) => [s.id, s.price]))
  );

  return (
    <FlatList
      data={market}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }) => {
        const initialPrice = initialPrices.current[item.id] || item.price;
        const change = item.price - initialPrice;

        return (
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("StockDetails", { stock: item })}
          >
            <Text style={styles.name}>{item.name}</Text>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <Text
                style={{
                  color: change >= 0 ? "green" : "red",
                  fontSize: 12,
                }}
              >
                {change >= 0 ? "+" : ""}
                {change.toFixed(2)} $
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  price: {
    fontSize: 16,
  },
});
