import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { GarageItem } from "@/features/items";

type Props = {
  item: GarageItem;
  onPress: () => void;
};

export default function CardCar({ item, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color || "#eee" }]}
      onPress={onPress}
    >
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>Цена: ${item.price}</Text>
      </View>
      <Image source={item.image} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 16,
    padding: 20,
    paddingBottom: 100,
    marginBottom: 50,
    alignItems: "flex-end",
    minHeight: 180,
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  name: { fontSize: 20, fontWeight: "700", color: "#fff" },
  price: { fontSize: 16, marginTop: 8, color: "#fff" },
  image: {
    width: 140,
    height: 100,
    resizeMode: "contain",
    marginBottom: -140,
  },
});
