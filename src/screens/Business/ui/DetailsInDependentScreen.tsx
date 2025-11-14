import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/AppNavigator";

type BusinessDetailsRouteProp = RouteProp<
  RootStackParamList,
  "BusinessDetails"
>;
export default function DetailsInDependent() {
  const route = useRoute<BusinessDetailsRouteProp>();
  const { business } = route.params;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: business.color }]}>
        <Ionicons name={business.icon} size={40} color="#fff" />
        <Text style={styles.title}>{business.name}</Text>
      </View>

      <View style={styles.incomeBox}>
        <Text style={styles.income}>$ {business.incomePerHour.toFixed(2)}</Text>
        <Text style={styles.incomeText}>Доход в час</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.stage}>2 стадия</Text>
        <Text style={styles.category}>{business.type}</Text>
      </View>

      <View style={styles.openCard}>
        <Text style={styles.label}>Необходимые вложения</Text>
        <Text style={styles.cost}>$ {Math.round(business.price * 0.4)}</Text>

        <Text style={styles.label}>Ожидаемый рост прибыли</Text>
        <Text style={styles.growth}>
          + {Math.round(business.incomePerHour * 0.35)}
        </Text>
      </View>

      <TouchableOpacity style={styles.openBtn}>
        <Text style={styles.openText}>Открыть новые точки продаж</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  header: {
    height: 120,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: { color: "#fff", fontSize: 22, fontWeight: "700", marginTop: 8 },

  incomeBox: {
    backgroundColor: "#f2f3f7",
    padding: 20,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 20,
  },
  income: { fontSize: 32, fontWeight: "700" },
  incomeText: { color: "#777" },

  infoCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#eef7ee",
  },
  stage: { fontSize: 18, fontWeight: "700" },
  category: { fontSize: 16, marginTop: 4, color: "#555" },

  openCard: {
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#e8f5e9",
  },
  label: { color: "#777", marginTop: 6 },
  cost: { fontSize: 20, fontWeight: "700" },
  growth: { fontSize: 18, fontWeight: "700", color: "#32cd32" },

  openBtn: {
    marginTop: 25,
    backgroundColor: "#8acf8a",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  openText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
