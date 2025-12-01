import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useGarageStore } from "@/features/items";
import { TopItemComponent } from "@/entities";

export default function Items() {
  const { reset } = useGarageStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Предметы</Text>

      <TopItemComponent />

      <TouchableOpacity onPress={reset} style={styles.resetBtn}>
        <Text style={styles.tabText}>RESET</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "700", marginLeft: 16, marginBottom: 10 },
  resetBtn: {
    position: "absolute",
    bottom: 20,
    left: 100,
    backgroundColor: "red",
    padding: 8,
    borderRadius: 20,
  },
  tabText: { fontSize: 16, color: "#000" },
});
