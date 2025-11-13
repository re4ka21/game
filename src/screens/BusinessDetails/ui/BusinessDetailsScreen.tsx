import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useCounterStore } from "@/features/counter";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type TabParamList = {
  Business: undefined;
  Earnings: undefined;
  Investments: undefined;
  Profile: undefined;
  Items: undefined;
};

type RootStackParamList = {
  Tabs: { screen?: keyof TabParamList } | undefined;
  BusinessDetails: { business: any };
  Upgrade: undefined;
  Loading: undefined;
  BuyCard: { id: string; image: any; price?: number };
  BuyBusiness: undefined;
  ChooseShopSize: { baseBusiness: any };
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "BusinessDetails"
>;
export default function BusinessDetailsScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<NavigationProp>();
  const { business } = route.params;
  const { count, purchase, addBusiness, myBusinesses } = useCounterStore();
  const [customName, setCustomName] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const handleOpenBusiness = () => {
    if (myBusinesses.length >= 10)
      return alert("Вы достигли максимума — можно открыть только 10 бизнесов!");

    if (count < business.price) return setShowWarning(true);

    if (customName.trim().length < 3)
      return alert("Название должно быть не менее 3 символов");

    purchase(business.price);
    addBusiness({
      ...business,
      id: Date.now(),
      name: customName || business.name,
    });

    navigation.navigate("Tabs", { screen: "Business" });
  };

  const getBaseCategory = (fullName: string) => {
    return fullName.split(" (")[0];
  };

  const getRandomName = (category: string) => {
    const namesByCategory: Record<string, string[]> = {
      Продажа: [
        "Market Pro",
        "Shopify Hub",
        "Deal Mart",
        "Buy&Go",
        "CityStore",
      ],
      Таксопарк: ["GoTaxi", "FastCab", "CityRide", "SpeedyTaxi", "MegaDrive"],
      Перевозки: ["CargoX", "MoveIt", "TransLine", "RoadPro", "QuickCargo"],
      Производство: [
        "BuildCore",
        "ProFactory",
        "Industro",
        "NovaPlant",
        "SteelWorks",
      ],
      Строительство: [
        "BuildMaster",
        "SkyRise",
        "Constructo",
        "DreamBuild",
        "CityMakers",
      ],
      Автодилер: ["AutoHub", "DrivePro", "SpeedMotors", "CarWorld", "AutoCity"],
    };

    const names = namesByCategory[category] || ["My Business"];
    return names[Math.floor(Math.random() * names.length)];
  };

  const handleRandomName = () => {
    const baseCategory = getBaseCategory(business.name);
    const random = getRandomName(baseCategory);

    const isNetwork = business.name.includes("(");
    if (isNetwork) {
      const suffix = business.name.match(/\((.*?)\)/)?.[0] || "";
      setCustomName(`${random} ${suffix}`);
    } else {
      setCustomName(random);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Укажите название{"\n"}магазина</Text>
      {showWarning && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          Недостаточно средств
        </Text>
      )}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.diceButton} onPress={handleRandomName}>
          <Text style={styles.diceIcon}>🎲</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Название"
          style={styles.input}
          value={customName}
          onChangeText={setCustomName}
        />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Стоимость открытия</Text>
        <Text style={styles.price}>
          $ {""}
          {business.price.toFixed(2).replace(".", ",")}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleOpenBusiness}>
        <Text style={styles.buttonText}>Открыть бизнес</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>⬅️ Назад</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  diceButton: {
    marginRight: 8,
  },
  diceIcon: {
    fontSize: 22,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  infoBox: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 12,
    paddingVertical: 12,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  back: {
    marginTop: 10,
  },
  backText: {
    textAlign: "center",
    color: "#555",
  },
});
