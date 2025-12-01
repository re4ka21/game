import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";

type ItemsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Garage"
>;

const TopItemComponent: React.FC = () => {
  const navigation = useNavigation<ItemsScreenNavigationProp>();

  const topItems: { label: string; type: "cars" | "planes" | "ships" }[] = [
    { label: "Гараж", type: "cars" },
    { label: "Ангар", type: "planes" },
    { label: "Причал", type: "ships" },
  ];

  const bottomTabs: { label: string; type: "cars" | "planes" | "ships" }[] = [
    { label: "Автосалон", type: "cars" },
    { label: "Авиамагазин", type: "planes" },
    { label: "Яхт-шоп", type: "ships" },
  ];

  return (
    <>
      <View style={styles.row}>
        {topItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.itemCard}
            onPress={() => navigation.navigate("Garage", { type: item.type })}
          >
            <Image
              source={require("../../../../assets/images/react-logo.png")}
              style={styles.bgImage}
            />
            <Text style={styles.itemText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tabs}>
        {bottomTabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate("Shop", { type: tab.type })}
          >
            <Text style={styles.tabText}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default TopItemComponent;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
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
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    marginHorizontal: 10,
  },
  tabText: { fontSize: 16, color: "#000" },
});
