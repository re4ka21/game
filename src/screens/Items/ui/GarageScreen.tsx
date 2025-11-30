import React, { useMemo } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useGarageStore } from "@/features/items";

type GarageRoute = RouteProp<RootStackParamList, "Garage">;

export default function GarageScreen() {
  const route = useRoute<GarageRoute>();
  const type = route.params.type;

  const items = useGarageStore((s) => s.items);
  const filteredItems = useMemo(() => {
    return items.filter((i) => i.type === type);
  }, [items, type]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === "cars"
          ? "Мои машины"
          : type === "planes"
            ? "Мои самолеты"
            : "Мои корабли"}
      </Text>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Двигатель: {item.engine || "DF"}</Text>
              <Text>
                Комплектация:{" "}
                {item.packageType === "premium" ? "Премиум" : "Стандарт"}
              </Text>
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
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
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
