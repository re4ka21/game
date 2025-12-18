import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
} from "react-native";
import { GarageItem } from "@/entities/garage";

type Props = {
  item: GarageItem;
  onPress: () => void;
};

export default function CardShip({ item, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <ImageBackground
        source={item.image}
        style={styles.card}
        imageStyle={{ borderRadius: 16 }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>Цена: ${item.price}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 8,
    borderRadius: 10,
  },
  name: { fontSize: 20, fontWeight: "700", color: "#fff" },
  price: { fontSize: 16, color: "#fff", marginTop: 4 },
});
