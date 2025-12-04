import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useGarageStore, useItemsStore } from "@/features/items";
import { TopItemComponent } from "@/entities";
import { MiddleItemComponent } from "@/entities";

export default function Items() {
  const { reset } = useGarageStore();
  const { resetsecond } = useItemsStore();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Предметы</Text>

      <TopItemComponent />
      <MiddleItemComponent />

      <TouchableOpacity onPress={reset} style={styles.resetBtn}>
        <Text style={styles.tabText}>RESET</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={resetsecond} style={styles.secondresetBtn}>
        <Text style={styles.tabText}>RESET</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "700", marginLeft: 16, marginBottom: 10 },

  upperTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  upperBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  activeTab: {
    backgroundColor: "#cfe1ff",
  },
  resetBtn: {
    position: "absolute",
    bottom: 0,
    left: 100,
    backgroundColor: "red",
    padding: 8,
    borderRadius: 20,
  },
  secondresetBtn: {
    position: "absolute",
    bottom: 0,
    left: 300,
    backgroundColor: "red",
    padding: 8,
    borderRadius: 20,
  },
  tabText: { fontSize: 16, color: "#000" },
});
