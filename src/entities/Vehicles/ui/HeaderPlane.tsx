import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { GarageItem } from "@/entities/garage";

type Props = { item: GarageItem };

export default function HeaderPlane({ item }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>Цена от ${item.price}</Text>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "700" },
  price: { fontSize: 16, color: "#777", marginBottom: 10 },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "contain",
  },
});
