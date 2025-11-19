import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useCounterStore } from "@/features/counter";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useBusinessStore } from "@/features/business";
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "BusinessDetails"
>;
export default function BusinessMergerScreen() {
  const { myBusinesses } = useBusinessStore();
  const { count } = useCounterStore();
  const navigation = useNavigation<NavigationProp>();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const selected = myBusinesses.filter((b) => selectedIds.includes(b.id));
  const totalIncome = selected.reduce((acc, b) => acc + b.incomePerHour, 0);
  const totalPrice = selected.reduce((acc, b) => acc + b.price, 0);
  const mergeCost = Math.round(totalPrice * 0.8);

  const types = [...new Set(selected.map((b) => b.type))];
  const differentTypes = selected.length >= 2 && types.length > 1;

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const potentialEffect = (() => {
    if (selectedIds.length < 2) return "Виберіть хоча б 2 бізнеси для злиття";
    if (differentTypes) return "Можна зливати лише бізнеси одного типу";

    return `Якщо злити ${
      selected.length
    } бізнесів, потенційний прибуток може зрости до ~${(
      totalIncome * 1.5
    ).toFixed(0)}$/год`;
  })();

  const performMerge = () => {
    if (count < mergeCost) {
      Alert.alert(
        "Недостатньо коштів",
        `Для злиття потрібно $${mergeCost.toLocaleString()}\nУ вас лише $${count.toLocaleString()}.`
      );
      return;
    }

    const mergedName =
      selected.length === 1
        ? selected[0].name
        : `Merged: ${selected
            .map((s) => s.name)
            .slice(0, 3)
            .join(" + ")}`;

    const mergedIncome = Math.round(totalIncome * 1.2);

    const mergedBusiness = {
      id: Date.now(),
      name: mergedName,
      incomePerHour: mergedIncome,
      price: Math.round(totalPrice),
      icon: "layers-outline",
      color: "#34495e",
      type: types[0],
      dependent: selected[0]?.dependent || false,
      stage: 1,
    };

    useBusinessStore.setState((state: any) => {
      const remaining = state.myBusinesses.filter(
        (b) => !selectedIds.includes(b.id)
      );
      return {
        myBusinesses: [...remaining, mergedBusiness],
      };
    });

    useCounterStore.setState((state) => ({
      count: state.count - mergeCost,
    }));
    setSelectedIds([]);
    navigation.navigate("Tabs", { screen: "Business" });
  };

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
          onPress={performMerge}
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
