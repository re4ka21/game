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
import { useCounterStore } from "@/entities/counter/model/store";
import { useBackgroundStore } from "@/entities";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { colors } from "@/shared";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "BuyCard">;

export default function BackgroundsScreen() {
  const { count } = useCounterStore();
  const { purchasedBackgrounds } = useBackgroundStore();
  const formattedCount = count.toFixed(2).replace(".", ",");
  const navigation = useNavigation<NavigationProp>();

  const backgrounds = [
    {
      id: "1",
      image: require("../../../../assets/images/backgroundbox.png"),
      price: null,
    },
    {
      id: "2",
      image: require("../../../../assets/images/money.png"),
      price: 5000,
    },
    {
      id: "3",
      image: require("../../../../assets/images/react-logo.png"),
      price: 10000,
    },
  ];

  return (
    <View style={styles.container}>
      {backgrounds.map((bg, index) => {
        const isPurchased = !bg.price || purchasedBackgrounds.includes(bg.id);

        const locked = bg.price && !isPurchased && count < bg.price;

        return (
          <TouchableOpacity
            key={bg.id}
            style={[styles.countBox, locked && styles.lockedBox]}
            onPress={() =>
              navigation.navigate("BuyCard", {
                id: bg.id,
                image: bg.image,
                price: bg.price,
              })
            }
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
                <View style={styles.contentCard}>
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
                  ${" "}
                  {index === 0
                    ? formattedCount
                    : (bg.price?.toLocaleString() ?? formattedCount)}
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
    color: colors.secondary,
    fontSize: 16,
  },
  contentCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightText: {
    color: colors.secondary,
    fontSize: 16,
    marginLeft: "auto",
  },
  lockedBox: {
    backgroundColor: colors.backgroundWhite,
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
