import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useItemsStore } from "@/entities";
import { useGarageStore } from "@/entities";
import { NftCard, TopItemComponent } from "@/entities";
import { MiddleItemComponent } from "@/entities";
import { HonorsCard } from "@/entities";
import { IslandCard } from "@/entities";
import { useIslandStore } from "@/entities";
import { categories } from "../model/constants/categories";
export default function Items() {
  const { reset } = useGarageStore();
  const { resetsecond } = useItemsStore();
  const { resetIslands } = useIslandStore();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <Text style={styles.title}>Предметы</Text>

      <TopItemComponent />

      <MiddleItemComponent categories={categories} />
      <HonorsCard />
      <NftCard />
      <IslandCard />
      <View style={styles.resetButtons}>
        <TouchableOpacity onPress={reset} style={styles.resetBtn}>
          <Text style={styles.tabText}>RESET Garage</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={resetsecond} style={styles.resetBtn}>
          <Text style={styles.tabText}>RESET Items</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetIslands} style={styles.resetBtn}>
          <Text style={styles.tabText}>RESET Island</Text>
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
