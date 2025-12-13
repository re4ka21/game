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
type StockDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StocksMarket"
>;

const STOCKS = [
  { id: "1", name: "Renolt", price: 37.12, change: -0.09 },
  { id: "2", name: "Hendaji", price: 206.37, change: 2.34 },
  { id: "3", name: "Toyoda", price: 19.09, change: 0.18 },
];

export const StocksMarket = () => {
  const navigation = useNavigation<StockDetailsNavigationProp>();

  return (
    <FlatList
      data={STOCKS}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate("StockDetails", { stock: item })}
        >
          <Text style={styles.name}>{item.name}</Text>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.price}>${item.price}</Text>
            <Text
              style={{
                color: item.change >= 0 ? "green" : "red",
                fontSize: 12,
              }}
            >
              {item.change >= 0 ? "+" : ""}
              {item.change} $
            </Text>
          </View>
        </TouchableOpacity>
      )}
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
