import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { GarageItem } from "@/entities/garage";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  item: GarageItem;
  onPress: () => void;
};

export default function CardPlane({ item, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <LinearGradient colors={["#87cefa", "#f2f2f2"]} style={styles.card}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>Цена: ${item.price}</Text>
        </View>
        <Image source={item.image} style={styles.image} />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  name: { fontSize: 20, fontWeight: "700" },
  price: { fontSize: 16, marginTop: 4 },
  image: { width: 100, height: 60, resizeMode: "contain" },
});
