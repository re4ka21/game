import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CounterZone } from "@/features/counter";
import { useCounterStore } from "@/features/counter/model/store";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useBackgroundStore } from "@/features/background/model/store";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Tabs">;

export default function Earnings() {
  const navigation = useNavigation<NavigationProp>();

  const {
    count,
    clickValue,
    level,
    nextUpgradeCost,
    upgrade: upgradeStore,
  } = useCounterStore();

  const { background } = useBackgroundStore();

  const formattedCount = count.toFixed(2).replace(".", ",");
  const formattedClickValue = clickValue.toFixed(2);

  const progress = Math.min(count / nextUpgradeCost, 1);
  const canUpgrade = count >= nextUpgradeCost;

  const handleUpgrade = () => {
    upgradeStore();
  };

  return (
    <View style={styles.container}>
      <View style={styles.gradientWrapper}>
        <LinearGradient
          colors={["#45c5ac", "#1e2059"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientTop}
        />
      </View>

      <TouchableOpacity
        style={styles.countBox}
        onPress={() => navigation.navigate("Upgrade")}
      >
        <ImageBackground
          source={background}
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
            <Text style={styles.text}>**** {""} 7439</Text>
            <Text style={styles.rightText}>05/26</Text>
          </View>
          <Text style={styles.text}>Balance</Text>
          <Text style={styles.countText}>$ {formattedCount}</Text>
        </ImageBackground>
      </TouchableOpacity>

      <View style={styles.progressBox}>
        <Text style={styles.priceText}>${formattedClickValue} за клік</Text>
        <Text style={styles.levelText}>{level} рівень</Text>

        {!canUpgrade ? (
          <>
            <View style={styles.progressBarWrapper}>
              <View
                style={[styles.progressBar, { width: `${progress * 100}%` }]}
              />
            </View>

            <View style={styles.progressInfo}>
              <Text style={styles.increaseText}>
                ▲ ${formattedClickValue} за клік
              </Text>
              <Text style={styles.targetText}>
                ${nextUpgradeCost.toFixed(2)}
              </Text>
            </View>
          </>
        ) : (
          <TouchableOpacity
            style={[
              styles.upgradeButton,
              !canUpgrade && styles.upgradeButtonDisabled,
            ]}
            onPress={handleUpgrade}
            activeOpacity={0.9}
          >
            <Text style={styles.upgradeText}>Покращити рівень</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <CounterZone />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  gradientWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    zIndex: 0,
  },
  gradientTop: {
    flex: 1,
  },
  countBox: {
    marginTop: 90,
    borderRadius: 35,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    height: 130,
    zIndex: 2,
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
  progressBox: {
    marginTop: 25,
    backgroundColor: "rgba(77, 105, 127, 0.9)",
    borderRadius: 20,
    padding: 20,
  },
  priceText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  levelText: {
    color: "#b8b8b8",
    fontSize: 16,
    marginTop: 4,
  },
  progressBarWrapper: {
    height: 6,
    backgroundColor: "#3a3f75",
    borderRadius: 3,
    marginVertical: 15,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#45c5ac",
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  increaseText: {
    color: "#45c5ac",
    fontWeight: "600",
  },
  targetText: {
    color: "#b8b8b8",
  },
  upgradeButton: {
    marginTop: 20,
    backgroundColor: "#45c5ac",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  upgradeButtonDisabled: {
    opacity: 0.6,
  },
  upgradeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
