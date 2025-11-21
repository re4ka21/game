import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBusinessSelection } from "@/shared/hooks/useBusinessSelection";
import { useMergeBusinesses } from "@/shared/hooks/useMergeBusinesses";

export default function BusinessMergerScreen() {
  const {
    myBusinesses,
    selectedIds,
    toggleSelect,
    selected,
    types,
    differentTypes,
    mergeCost,
    potentialEffect,
    setSelectedIds,
  } = useBusinessSelection();

  const { performMerge } = useMergeBusinesses();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Злиття бізнесів</Text>

      {myBusinesses.length === 0 ? (
        <Text style={styles.emptyText}>У вас ще немає бізнесів</Text>
      ) : (
        <FlatList
          data={myBusinesses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <TouchableOpacity
                style={[styles.businessCard, isSelected && styles.selectedCard]}
                onPress={() => toggleSelect(item.id)}
              >
                <View style={styles.row}>
                  <View style={styles.leftRow}>
                    <Ionicons
                      name={item.icon as any}
                      size={24}
                      color={item.color}
                    />
                    <Text
                      style={[
                        styles.businessName,
                        isSelected && styles.whiteText,
                      ]}
                    >
                      {item.name}
                    </Text>
                  </View>
                  {isSelected ? (
                    <Ionicons name="checkmark-circle" size={26} color="#fff" />
                  ) : (
                    <Ionicons
                      name="ellipse-outline"
                      size={26}
                      color="#2196f3"
                    />
                  )}
                </View>
                <Text style={[styles.subText, isSelected && styles.whiteText]}>
                  Дохід: +{item.incomePerHour}$/год
                </Text>
                <Text style={[styles.subText, isSelected && styles.whiteText]}>
                  Вартість: {item.price.toLocaleString()}$
                </Text>
                <Text style={[styles.subText, isSelected && styles.whiteText]}>
                  Тип: {item.type || "—"}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      )}

      <View style={styles.effectBox}>
        <Text style={styles.effectTitle}>Потенційний ефект</Text>
        <Text
          style={[
            styles.effectText,
            differentTypes && { color: "#e74c3c", fontWeight: "600" },
          ]}
        >
          {potentialEffect}
        </Text>
        <TouchableOpacity
          style={[
            styles.mergeButton,
            (selectedIds.length < 2 || differentTypes) && { opacity: 0.5 },
          ]}
          disabled={
            selectedIds.length < 2 || differentTypes || selected.length > 5
          }
          onPress={() => performMerge(selected, mergeCost, types)}
        >
          <Text style={styles.mergeButtonText}>Злити вибрані бізнеси</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    marginTop: 40,
    textAlign: "center",
  },
  businessCard: {
    backgroundColor: "#eef1f6",
    padding: 20,
    borderRadius: 35,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  selectedCard: {
    backgroundColor: "#2196f3",
  },
  businessName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 15,
    color: "#555",
    marginTop: 4,
  },
  whiteText: { color: "#fff" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  effectBox: {
    marginTop: 25,
    backgroundColor: "#eef1f6",
    padding: 16,
    borderRadius: 14,
  },
  effectTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  effectText: {
    fontSize: 15,
    color: "#333",
    marginBottom: 15,
  },
  mergeButton: {
    backgroundColor: "#2196f3",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  mergeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
