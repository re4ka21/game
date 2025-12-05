import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "BuyItems">;

export default function MiddleItemComponent() {
  const navigation = useNavigation<NavigationProp>();

  const goTo = (type: "coins" | "paintings") => {
    navigation.navigate("BuyItems", { type });
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.itemCard} onPress={() => goTo("coins")}>
        <Image
          source={require("../../../../assets/images/react-logo.png")}
          style={styles.bgImage}
        />
        <Text style={styles.itemText}>Монеты</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.itemCard}
        onPress={() => goTo("paintings")}
      >
        <Image
          source={require("../../../../assets/images/react-logo.png")}
          style={styles.bgImage}
        />
        <Text style={styles.itemText}>Картины</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  itemCard: {
    width: 110,
    height: 110,
    borderRadius: 18,
    overflow: "hidden",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    opacity: 0.85,
  },
  itemText: {
    position: "absolute",
    bottom: 10,
    left: 8,
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textShadowColor: "black",
    textShadowRadius: 6,
  },
});
