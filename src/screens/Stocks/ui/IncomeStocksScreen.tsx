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

type StockDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "IncomeStocks"
>;

export const IncomeStocks = () => {
  const navigation = useNavigation<StockDetailsNavigationProp>();
  const market = useStocksStore((s) => s.market);
  const sortedMarket = [...market].sort(
    (a, b) => b.dividendPercent - a.dividendPercent
  );
  return (
    <FlatList
      data={sortedMarket}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("StockDetails", { stock: item })}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={item.logo} style={styles.logo} />
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <Text style={styles.dividend}>
              {(item.dividendPercent * 100).toFixed(2)} %
            </Text>
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
  dividend: {
    fontSize: 16,
    color: "blue",
    fontWeight: "600",
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
