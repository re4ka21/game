import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useGarageStore, GarageItem } from "@/features/items";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CardCar, CardPlane, CardShip } from "@/entities";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCounterStore } from "@/features/counter";
type ShopScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Shop"
>;

const CARS: GarageItem[] = [
  {
    id: 1,
    name: "Honta Ciwic Old",
    price: 2250,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
    color: "#b0b0b0",
  },
  {
    id: 2,
    name: "Ford Mustang",
    price: 8000,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
    color: "#b0b0b0",
  },
  {
    id: 3,
    name: "Aston Martin DB11",
    price: 25000,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
    color: "#b0b0b0",
  },
  {
    id: 4,
    name: "Koenigsegg Jesko",
    price: 180000,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
    color: "#b0b0b0",
  },

  {
    id: 5,
    name: "Chevrolet Sonni",
    price: 3000,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
    color: "#87cefa",
  },
  {
    id: 6,
    name: "Chevrolet Camaro",
    price: 8500,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
    color: "#87cefa",
  },
  {
    id: 7,
    name: "Bentley Continental",
    price: 30000,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
    color: "#87cefa",
  },
  {
    id: 8,
    name: "Lotus Evija",
    price: 200000,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
    color: "#87cefa",
  },

  {
    id: 9,
    name: "Fort Focas Old",
    price: 3500,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
    color: "#1e90ff",
  },
  {
    id: 10,
    name: "Lamborghini Aventador",
    price: 12000,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
    color: "#1e90ff",
  },
  {
    id: 11,
    name: "Rolls-Royce Phantom",
    price: 50000,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
    color: "#1e90ff",
  },

  {
    id: 12,
    name: "Toyota Corolla",
    price: 4000,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
    color: "#ff69b4",
  },
  {
    id: 13,
    name: "Ferrari F8",
    price: 15000,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
    color: "#ff69b4",
  },
  {
    id: 14,
    name: "Bugatti Chiron",
    price: 100000,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
    color: "#ff69b4",
  },

  {
    id: 15,
    name: "Honda Accord",
    price: 5000,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
    color: "#ff0000",
  },
  {
    id: 16,
    name: "Porsche 911",
    price: 20000,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
    color: "#ff0000",
  },
  {
    id: 17,
    name: "McLaren 720S",
    price: 120000,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
    color: "#ff0000",
  },

  {
    id: 18,
    name: "Nissan Altima",
    price: 5500,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
    color: "#ffd700",
  },
  {
    id: 19,
    name: "Maserati GranTurismo",
    price: 22000,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
    color: "#ffd700",
  },
  {
    id: 20,
    name: "Pagani Huayra",
    price: 150000,
    image: require("../../../../assets/images/react-logo.png"),
    type: "cars",
    color: "#ffd700",
  },
];

const PLANES: GarageItem[] = [
  {
    id: 21,
    name: "Cessna 172",
    price: 5000,
    image: require("../../../../assets/images/react-logo.png"),
    type: "planes",
  },
];

const SHIPS: GarageItem[] = [
  {
    id: 22,
    name: "Yacht",
    price: 10000,
    image: require("../../../../assets/images/airport.png"),
    type: "ships",
  },
];

type ShopScreenRouteProp = RouteProp<RootStackParamList, "Shop">;

export default function ShopScreen() {
  const route = useRoute<ShopScreenRouteProp>();
  const type = route.params.type;
  const navigation = useNavigation<ShopScreenNavigationProp>();
  const boughtItems = useGarageStore((s) => s.items);
  const balance = useCounterStore((s) => s.count);
  const allItems = type === "cars" ? CARS : type === "planes" ? PLANES : SHIPS;

  const items = allItems.filter(
    (item) => !boughtItems.some((b) => b.id === item.id)
  );
  const confirmBuy = (item: GarageItem) => {
    if (item.type === "planes" || item.type === "ships") {
      navigation.navigate("ConfirmBuyShipPlane", { item });
    } else {
      navigation.navigate("ConfirmBuyCar", { item });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {type === "cars"
              ? "Автосалон"
              : type === "planes"
                ? "Авиамагазин"
                : "Яхт-шоп"}
          </Text>
          <Text style={styles.balance}>Баланс: {balance.toFixed(2)}</Text>
        </View>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        renderItem={({ item }) => {
          if (type === "cars")
            return <CardCar item={item} onPress={() => confirmBuy(item)} />;
          if (type === "planes")
            return <CardPlane item={item} onPress={() => confirmBuy(item)} />;
          return <CardShip item={item} onPress={() => confirmBuy(item)} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  titleContainer: { marginLeft: 10 },
  title: {
    fontSize: 26,
    marginLeft: 10,
    marginBottom: 3,
    fontWeight: "700",
  },
  balance: { fontSize: 18, fontWeight: "500", color: "#333", marginLeft: 11 },
});
