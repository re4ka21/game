import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCounterStore } from "@/features/counter/model/store";
import { useBackgroundStore } from "@/entities";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { colors } from "@/shared";

type BuyCardRouteProp = RouteProp<RootStackParamList, "BuyCard">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "BuyCard">;

export default function BuyCard() {
  const route = useRoute<BuyCardRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { id, image, price } = route.params;

  const { count, purchase } = useCounterStore();
  const { purchasedBackgrounds, addPurchasedBackground, setBackground } =
    useBackgroundStore();

  const isPurchased = purchasedBackgrounds.includes(id);

  const handleBuy = () => {
    if (!isPurchased && price && count >= price) {
      purchase(price);
      addPurchasedBackground(id);
    }
  };

  const handleSetBackground = () => {
    setBackground(image);
    navigation.navigate("Tabs", { screen: "Earnings" });
  };

  const formattedCount = count.toFixed(2).replace(".", ",");

  return (
    <View style={styles.container}>
      <View style={styles.countBox}>
        <ImageBackground
          source={image}
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
          <Text style={styles.countText}>$ {formattedCount}</Text>
        </ImageBackground>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isPurchased ? "#4CAF50" : "#007AFF" },
          ]}
          onPress={isPurchased || !price ? handleSetBackground : handleBuy}
        >
          <Text style={styles.buttonText}>
            {isPurchased || !price
              ? "Встановити"
              : price
                ? `Купити за $ ${price}`
                : "Купити"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Назад</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  countBox: {
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
  rightText: {
    color: colors.secondary,
    fontSize: 16,
    marginLeft: "auto",
  },
  buttonsContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 10,
  },
  backButton: {
    backgroundColor: "#555",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
