import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { colors } from "../config/theme/colors";
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "BuyCard">;

export default function BusinessCard({ business }) {
  const navigation = useNavigation<NavigationProp>();
  const viewDetails = () => {
    if (business.dependent) {
      return navigation.navigate("DetailsDependent", { business });
    }
    return navigation.navigate("DetailsInDependent", { business });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={viewDetails}>
      <View style={styles.leftColumn}>
        <View style={styles.header}>
          <View
            style={[styles.iconContainer, { backgroundColor: business.color }]}
          >
            <Ionicons
              name={business.icon}
              size={26}
              color="#000000ff"
              style={styles.icon}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>
              {business.name}
            </Text>
            <Text style={styles.type}>{business.type}</Text>
          </View>
        </View>

        <View style={styles.infoWrap}>
          <View style={styles.limitRow}>
            <Ionicons name="person" size={14} color={colors.secondary} />
            <Text style={styles.limitText}>
              {business.level || 0}/{business.maxLevel || 5}
            </Text>
          </View>

          <Text style={styles.income}>
            $ {business.incomePerHour.toFixed(2).replace(".", ",")}{" "}
            <Text style={{ color: "#9aa1ae" }}>в час</Text>
          </Text>
        </View>
      </View>

      <View style={styles.arrowContainer}>
        <FontAwesome6 name="circle-chevron-right" size={24} color="#d1d8e0" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#f5f7fa",
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftColumn: {
    flex: 1,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    marginRight: 12,
  },
  icon: {
    padding: 6,
  },
  infoWrap: {
    marginTop: 8,
  },
  info: { flex: 1 },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1b1e28",
  },
  type: {
    fontSize: 14,
    color: "#8c93a3",
    marginTop: 2,
  },
  limitRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  limitText: {
    color: "#b0b5c0",
    marginLeft: 4,
  },
  income: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: "700",
    color: "#1b1e28",
  },
  arrowContainer: {
    justifyContent: "center",
  },
});
