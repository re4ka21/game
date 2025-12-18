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
import { useGarageStore, GarageItem } from "@/entities";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CardCar, CardPlane, CardShip } from "@/entities";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCounterStore } from "@/features/counter";
import { CARS, PLANES, SHIPS } from "../model/constants/vehicles";
type ShopScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "VechiclesShop"
>;

type ShopScreenRouteProp = RouteProp<RootStackParamList, "VechiclesShop">;

export default function VechiclesShopScreen() {
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
