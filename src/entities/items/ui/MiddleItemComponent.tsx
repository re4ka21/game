import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      <TouchableOpacity style={styles.tabWrapper} onPress={() => goTo("coins")}>
        <Text style={[styles.tabText, styles.activeText]}>Монеты</Text>
        <View style={styles.activeLine} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabWrapper}
        onPress={() => goTo("paintings")}
      >
        <Text style={[styles.tabText]}>Картины</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginTop: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#DDE2E8",
    paddingBottom: 6,
  },

  tabWrapper: {
    alignItems: "center",
    paddingHorizontal: 30,
  },

  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#9CA3AF", // сірий текст як на твоєму UI
  },

  activeText: {
    color: "#1D4ED8", // синій текст
  },

  activeLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#1D4ED8", // синя лінія
    marginTop: 6,
    borderRadius: 20,
  },
});
