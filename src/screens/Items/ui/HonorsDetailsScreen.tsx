import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { HonorItem } from "@/screens/Items";

type InvestmentsRouteProp = RouteProp<RootStackParamList, "HonorsDetails">;

export default function HonorsDetailsScreen() {
  const route = useRoute<InvestmentsRouteProp>();
  const { item } = route.params;

  return (
    <View style={styles.screen}>
      <LinearGradient colors={item.colors} style={styles.iconWrapper}>
        <Image source={item.image} style={styles.icon} />
      </LinearGradient>

      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  iconWrapper: {
    width: 140,
    height: 140,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  icon: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111",
    textAlign: "center",
  },
});
