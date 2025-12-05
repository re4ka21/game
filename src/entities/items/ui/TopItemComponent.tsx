import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { LinearGradient } from "expo-linear-gradient";

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

      <View style={styles.tabsContainer}>
        <View style={styles.tabsBackground}>
          {bottomTabs.map((tab, index) => (
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
            </TouchableOpacity>
          ))}

          <LinearGradient
            colors={["#373b44", "#4484ee"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.gradientTextBackground,
              { borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
            ]}
          >
            {bottomTabs.map((tab, index) => (
              <View key={index} style={styles.gradientTextBox}>
                <Text style={styles.tabLabel}>{tab.label}</Text>
              </View>
            ))}
          </LinearGradient>
        </View>
      </View>

      <View style={styles.line} />
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

  tabsContainer: {
    marginHorizontal: 15,
    paddingTop: 8,
  },

  tabsBackground: {
    flexDirection: "row",
    backgroundColor: "#e4ecf9",
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "space-around",
    position: "relative",
    height: 125,
  },

  tabCard: {
    width: 110,
    alignItems: "center",
    justifyContent: "center",
  },

  tabIcon: {
    width: 90,
    height: 90,
    marginBottom: 23,
  },

  gradientTextBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    flexDirection: "row",
    overflow: "hidden",
  },
  gradientTextBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  tabLabel: {
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  line: {
    marginTop: 20,
    borderBottomWidth: 1.5,
    width: "40%",
    alignSelf: "center",
    borderColor: "#e4ecf9",
  },
});
