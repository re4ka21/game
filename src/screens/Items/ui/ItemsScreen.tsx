import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useGarageStore, useItemsStore } from "@/features/items";
import { TopItemComponent } from "@/entities";
import { ShopCategory, MiddleItemComponent } from "@/entities";
import { HonorsCard } from "@/entities";

export default function Items() {
  const { reset } = useGarageStore();
  const { resetsecond } = useItemsStore();

  const categories: ShopCategory[] = [
    {
      label: "Монеты",
      type: "coins",
      image: require("../../../../assets/images/react-logo.png"),
    },
    {
      label: "Картины",
      type: "paintings",
      image: require("../../../../assets/images/react-logo.png"),
    },
    {
      label: "Уникальные предметы",
      type: "uniqueItems",
      image: require("../../../../assets/images/react-logo.png"),
    },
    {
      label: "Ретро автомобили",
      type: "retroCars",
      image: require("../../../../assets/images/react-logo.png"),
    },
    {
      label: "Драгоценности",
      type: "jewels",
      image: require("../../../../assets/images/react-logo.png"),
    },
    {
      label: "Марки",
      type: "stamps",
      image: require("../../../../assets/images/react-logo.png"),
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <Text style={styles.title}>Предметы</Text>

      <TopItemComponent />

      <MiddleItemComponent categories={categories} />
      <HonorsCard />
      <View style={styles.resetButtons}>
        <TouchableOpacity onPress={reset} style={styles.resetBtn}>
          <Text style={styles.tabText}>RESET Garage</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={resetsecond} style={styles.resetBtn}>
          <Text style={styles.tabText}>RESET Items</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 40 },
  title: { fontSize: 26, fontWeight: "700", marginLeft: 16, marginBottom: 10 },
  resetButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  resetBtn: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tabText: { fontSize: 16, color: "#fff", fontWeight: "700" },
});
