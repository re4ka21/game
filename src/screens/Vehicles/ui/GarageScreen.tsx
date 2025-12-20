import React, { useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useGarageStore } from "@/entities";
import { useCounterStore } from "@/entities";

type GarageRoute = RouteProp<RootStackParamList, "Garage">;

export default function GarageScreen() {
  const route = useRoute<GarageRoute>();
  const type = route.params.type;
  const navigation = useNavigation();

  const items = useGarageStore((s) => s.items);
  const balance = useCounterStore((s) => s.count);

  const filteredItems = useMemo(() => {
    return items.filter((i) => i.type === type);
  }, [items, type]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrow-left" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {type === "cars"
              ? "Мои машины"
              : type === "planes"
                ? "Мои самолеты"
                : "Мои корабли"}
          </Text>
          <Text style={styles.balance}>Баланс: {balance.toFixed(2)}</Text>
        </View>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>

              {item.type === "cars" && (
                <>
                  <Text>Двигатель: {item.engine || "DF"}</Text>
                  <Text>
                    Комплектация:{" "}
                    {item.packageType === "premium" ? "Премиум" : "Стандарт"}
                  </Text>
                </>
              )}

              {(item.type === "planes" || item.type === "ships") && (
                <>
                  <Text>
                    Класс:{" "}
                    {item.packageType === "premium" ? "Премиум" : "Стандарт"}
                  </Text>
                  {item.team && <Text>Команда: {item.team}</Text>}
                </>
              )}

              <Text>Цена: ${item.price.toLocaleString()}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff", marginTop: 40 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  titleContainer: { marginLeft: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 4 },
  balance: { fontSize: 18, fontWeight: "500", color: "#333" },
  card: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 10,
  },
  image: { width: 100, height: 60, borderRadius: 6 },
  info: { marginLeft: 12, justifyContent: "center" },
  name: { fontSize: 18, fontWeight: "bold" },
});
