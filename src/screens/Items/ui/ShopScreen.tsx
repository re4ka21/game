import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useGarageStore, GarageItem } from "@/features/items";
import { useCounterStore } from "@/features/counter";
const CARS: GarageItem[] = [
  {
    id: 1,
    name: "Honta Ciwic Old",
    price: 2250,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
  },
  {
    id: 2,
    name: "Chevrolet Sonni",
    price: 3000,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
  },
  {
    id: 3,
    name: "Fort Focas Old",
    price: 3500,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
  },
];

const PLANES: GarageItem[] = [
  {
    id: 4,
    name: "Cessna 172",
    price: 5000,
    image: require("../../../../assets/images/react-logo.png"),
    type: "planes",
  },
];

const SHIPS: GarageItem[] = [
  {
    id: 5,
    name: "Yacht",
    price: 10000,
    image: require("../../../../assets/images/react-logo.png"),
    type: "ships",
  },
];

type ShopScreenRouteProp = RouteProp<RootStackParamList, "Shop">;

export default function ShopScreen() {
  const route = useRoute<ShopScreenRouteProp>();
  const type = route.params.type;

  const boughtItems = useGarageStore((s) => s.items);

  const allItems = type === "cars" ? CARS : type === "planes" ? PLANES : SHIPS;
  // фільтруємо вже куплені
  const items = allItems.filter(
    (item) => !boughtItems.some((b) => b.id === item.id)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === "cars"
          ? "Автосалон"
          : type === "planes"
            ? "Авиамагазин"
            : "Яхт-шоп"}
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>Цена: ${item.price}</Text>
              <TouchableOpacity
                style={styles.buyBtn}
                onPress={() => {
                  const counter = useCounterStore.getState();
                  if (counter.count >= item.price) {
                    useGarageStore.getState().addItem(item); // додаємо в гараж
                    useCounterStore.getState().purchase(item.price); // знімаємо гроші
                  }
                }}
              >
                <Text style={styles.buyText}>Купить</Text>
              </TouchableOpacity>
            </View>
            <Image source={item.image} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 50 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    backgroundColor: "#eee",
    alignItems: "center",
  },
  name: { fontSize: 20, fontWeight: "700" },
  price: { fontSize: 16, marginTop: 4 },
  image: { width: 100, height: 60, resizeMode: "contain" },
  buyBtn: {
    marginTop: 10,
    backgroundColor: "#4c6ef5",
    padding: 8,
    borderRadius: 10,
  },
  buyText: { color: "#fff", fontWeight: "700", textAlign: "center" },
});
