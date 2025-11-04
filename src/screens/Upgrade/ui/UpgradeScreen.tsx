import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCounterStore } from "@/features/counter/model/store";
import { useBackgroundStore } from "@/features/background/model/store";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Tabs: { screen?: string } | undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Tabs">;

export default function UpgradeScreen() {
  const { count, purchase } = useCounterStore();
  const formattedCount = count.toFixed(2).replace(".", ",");
  const { setBackground } = useBackgroundStore();
  const navigation = useNavigation<NavigationProp>();

  const backgrounds = [
    {
      image: require("../../../../assets/images/backgroundbox.png"),
      price: null, // базовий фон
    },
    {
      image: require("../../../../assets/images/money.png"),
      price: 5000,
    },
    {
      image: require("../../../../assets/images/react-logo.png"),
      price: 10000,
    },
  ];

  const changeBackground = (bg: any, price: number | null) => {
    if (price && count >= price) {
      purchase(price);
      setBackground(bg);
      navigation.navigate("Tabs", { screen: "Earnings" });
    } else if (price === null) {
      setBackground(bg);
      navigation.navigate("Tabs", { screen: "Earnings" });
    }
  };

  return (
    <View style={styles.container}>
      {backgrounds.map((bg, index) => {
        const locked = bg.price ? count < bg.price : false;

        return (
          <TouchableOpacity
            key={index}
            style={[styles.countBox, locked && styles.lockedBox]}
            onPress={() => changeBackground(bg.image, bg.price)}
            disabled={locked}
          >
            {locked ? (
              <View style={styles.lockedContent}>
                <Ionicons name="lock-closed-outline" size={40} color="#999" />
                <Text style={styles.lockedText}>Назбирай ${bg.price}</Text>
              </View>
            ) : (
              <ImageBackground
                source={bg.image}
                resizeMode="cover"
                imageStyle={styles.imageBackground}
                style={styles.imageWrapper}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../../../../assets/images/mastercard.png")}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                  <Text style={styles.text}>**** 7439</Text>
                  <Text style={styles.rightText}>05/26</Text>
                </View>
                <Text style={styles.text}>Balance</Text>
                <Text style={styles.countText}>
                  ${""} {index === 0 ? formattedCount : bg.price}
                </Text>
              </ImageBackground>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  countBox: {
    marginTop: 13,
    borderRadius: 35,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    height: 130,
  },
  imageWrapper: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  imageBackground: {
    opacity: 0.9,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  countText: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#fff",
  },
  text: {
    color: "#8d8d8d",
    fontSize: 16,
  },
  rightText: {
    color: "#8d8d8d",
    fontSize: 16,
    marginLeft: "auto",
  },
  lockedBox: {
    backgroundColor: "#f2f2f2",
  },
  lockedContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lockedText: {
    marginTop: 10,
    fontSize: 18,
    color: "#888",
    fontWeight: "500",
  },
});
