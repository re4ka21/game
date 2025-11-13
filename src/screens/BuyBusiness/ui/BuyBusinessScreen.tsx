import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";

type BusinessType = {
  id: number;
  name: string;
  type: string;
  incomePerHour: number;
  price: number;
  icon: string;
  color: string;
  isChain?: boolean;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "BuyBusiness"
>;

const availableBusinesses: BusinessType[] = [
  {
    id: 1,
    name: "Продажа",
    type: "sale",
    incomePerHour: 50,
    price: 4899,
    icon: "cart-outline",
    color: "#2ecc71",
    isChain: true,
  },
  {
    id: 2,
    name: "Таксопарк",
    type: "taxi",
    incomePerHour: 100,
    price: 9999,
    icon: "car-outline",
    color: "#f1c40f",
  },
  {
    id: 3,
    name: "Перевозки",
    type: "transportation",
    incomePerHour: 200,
    price: 19899,
    icon: "cube-outline",
    color: "#e67e22",
  },
  {
    id: 4,
    name: "Производство",
    type: "production",
    incomePerHour: 400,
    price: 24999,
    icon: "business-outline",
    color: "#2980b9",
  },
  {
    id: 5,
    name: "Строительство",
    type: "construction",
    incomePerHour: 700,
    price: 35400,
    icon: "construct-outline",
    color: "#e74c3c",
  },
  {
    id: 6,
    name: "Автодилер",
    type: "cardealer",
    incomePerHour: 1000,
    price: 40000,
    icon: "car-sport-outline",
    color: "#2c3e50",
  },

  {
    id: 7,
    name: "Ресторан",
    type: "restaurant",
    incomePerHour: 1500,
    price: 55000,
    icon: "restaurant-outline",
    color: "#d35400",
  },
  {
    id: 8,
    name: "IT-компания",
    type: "itcompany",
    incomePerHour: 2500,
    price: 80000,
    icon: "laptop-outline",
    color: "#8e44ad",
  },
  {
    id: 9,
    name: "Отель",
    type: "hotel",
    incomePerHour: 4000,
    price: 120000,
    icon: "bed-outline",
    color: "#16a085",
  },
  {
    id: 10,
    name: "Авиакомпания",
    type: "airline",
    incomePerHour: 7000,
    price: 200000,
    icon: "airplane-outline",
    color: "#3498db",
  },
];

export default function BuyBusinessScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleSelectBusiness = (b: BusinessType) => {
    if (b.isChain) {
      navigation.navigate("ChooseShopSize", { baseBusiness: b });
    } else {
      navigation.navigate("BusinessDetails", { business: b });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={availableBusinesses}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListHeaderComponent={
          <Text style={styles.title}>Выберите категорию нового бизнеса</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleSelectBusiness(item)}
          >
            <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon as any} size={28} color="#fff" />
            </View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>От ${item.price.toLocaleString()}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 15,
  },
  card: {
    backgroundColor: "#f4f6fa",
    borderRadius: 16,
    width: "48%",
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 15,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#7f8c8d",
  },
});
