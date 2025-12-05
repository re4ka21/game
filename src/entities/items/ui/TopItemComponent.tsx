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
              source={require("../../../../assets/images/airport.png")}
              style={styles.bgImage}
            />
            <Text style={styles.itemText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tabs}>
        {bottomTabs.map((tab, index) => {
          const isFirst = index === 0;
          const isLast = index === bottomTabs.length - 1;

          return (
            <TouchableOpacity
              key={index}
              style={styles.tabCard}
              onPress={() => navigation.navigate("Shop", { type: tab.type })}
            >
              <Image
                source={require("../../../../assets/images/react-logo.png")}
                style={styles.tabIcon}
                resizeMode="contain"
              />

              <View
                style={[
                  styles.tabLabelBox,
                  isFirst && { borderBottomLeftRadius: 20 },
                  isLast && { borderBottomRightRadius: 20 },
                ]}
              >
                <Text style={styles.tabLabel}>{tab.label}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export default TopItemComponent;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    marginHorizontal: 15,
  },
  itemCard: {
    width: 120,
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
    marginHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#e4ecf9",
    borderRadius: 20,
  },

  tabCard: {
    width: 110,
    height: 125,
    alignItems: "center",
  },

  tabIcon: {
    width: 90,
    height: 90,
    marginBottom: 6,
  },

  tabLabelBox: {
    width: "116%",
    height: "30%",
    backgroundColor: "#1E88E5",
    paddingVertical: 6,
  },

  tabLabel: {
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  tabText: { fontSize: 16, color: "#000" },
});
