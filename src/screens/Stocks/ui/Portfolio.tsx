import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useStocksStore } from "@/features/stocks/model/useStocksStore";

export const Portfolio = () => {
  const portfolio = useStocksStore((s) => s.portfolio);
  const market = useStocksStore((s) => s.market);
  const sellStock = useStocksStore((s) => s.sellStock);

  const data = portfolio.map((owned) => {
    const stock = market.find((s) => s.id === owned.id)!;

    return {
      ...stock,
      quantity: owned.quantity,
      total: stock.price * owned.quantity,
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
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>

          <Text>
            {item.quantity} шт · ${item.total.toFixed(2)}
          </Text>

          <TouchableOpacity onPress={() => sellStock(item.id, 1)}>
            <Text style={styles.sell}>Продать 1</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
  },
  sell: {
    color: "red",
    marginTop: 6,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
