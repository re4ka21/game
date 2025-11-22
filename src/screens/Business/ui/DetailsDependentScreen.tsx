import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useCounterStore } from "@/features/counter";
import { useBusinessStore } from "@/features/business";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import ProgressBar from "@/shared/ui/ProgressBar";
import CapacityButtons from "@/shared/ui/CapacityButtons";
import { CAPACITY_COST_MAP } from "@/constants/capacity";
import { colors } from "@/shared";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "BuyCard">;

export default function DetailsDependent() {
  const route = useRoute<any>();
  const { business } = route.params;
  const navigation = useNavigation<NavigationProp>();

  const currentBusiness = useBusinessStore((state) =>
    state.myBusinesses.find((b) => b.id === business.id)
  );
  const addBusinessCapacity = useBusinessStore(
    (state) => state.addBusinessCapacity
  );
  const purchase = useCounterStore((state) => state.purchase);
  const count = useCounterStore((state) => state.count);

  if (!currentBusiness) return null;

  const capacity = currentBusiness.capacity ?? 5;
  const cars = currentBusiness.cars ?? 0;
  const busColor = business.color;
  const formattedCount = count.toFixed(2).replace(".", ",");

  const handleAddCapacity = (value: number) => {
    const cost = CAPACITY_COST_MAP[value];
    if (capacity + value > 40) {
      alert("Максимальна місткість — 40!");
      return;
    }
    purchase(cost);
    addBusinessCapacity(currentBusiness.id, value);
  };

  const handleBuyCar = () =>
    navigation.navigate("Tabs", { screen: "Earnings" });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrow}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settings}
        onPress={() => navigation.navigate("Settings", { business })}
      >
        <Feather name="settings" size={24} color="black" />
      </TouchableOpacity>

      <View style={[styles.header, { backgroundColor: busColor }]}>
        <Ionicons name={business.icon} size={40} color="#000000ff" />
        <Text style={styles.title}>{business.name}</Text>
      </View>

      <View style={styles.incomeBox}>
        <Text style={styles.income}>
          $ {currentBusiness.incomePerHour.toFixed(2)}
        </Text>
        <Text style={styles.incomeText}>Доход в час</Text>
      </View>

      <View style={styles.secondContainer}>
        <Text style={styles.sectionTitle}>Расширить вместимость автопарка</Text>
        <Text style={styles.balance}>Баланс: $ {formattedCount}</Text>

        <CapacityButtons
          currentCapacity={capacity}
          count={count}
          onPress={handleAddCapacity}
        />

        <View style={styles.info}>
          <View style={styles.parkBox}>
            <Text style={styles.parkTitle}>Автопарк</Text>
            <ProgressBar progress={(cars / capacity) * 100} color={busColor} />
            <LinearGradient
              colors={[busColor, "#f2f2f2"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.carsBox}
            >
              <Text style={styles.value}>
                Автомобилей: {"\n"}
                {cars}
              </Text>
            </LinearGradient>
          </View>

          <View style={styles.capacityBox}>
            <Image
              source={require("../../../../assets/images/parking.png")}
              style={styles.parkingImage}
            />
            <Text style={styles.value}>Вместимость:</Text>
            <Text style={styles.valueNumber}>{capacity}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.buyBtn, { backgroundColor: busColor }]}
          onPress={handleBuyCar}
        >
          <Text style={styles.buyBtnText}>Приобрести новый автомобиль</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  arrow: { position: "absolute", top: 40, left: 20, zIndex: 3 },
  settings: { position: "absolute", top: 40, right: 20, zIndex: 3 },
  header: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  title: { fontSize: 22, fontWeight: "700", color: "#000000ff", marginTop: 6 },
  incomeBox: {
    backgroundColor: colors.backgroundWhite,
    padding: 20,
    borderRadius: 13,
    alignItems: "center",
    position: "absolute",
    top: 150,
    alignSelf: "center",
    width: "80%",
    zIndex: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  income: { fontSize: 34, fontWeight: "700" },
  incomeText: { color: "#777", marginTop: 4 },
  secondContainer: { padding: 20 },
  sectionTitle: { marginTop: 16, fontSize: 18, fontWeight: "700" },
  balance: { color: "#777" },
  info: { flexDirection: "row", paddingVertical: 20 },
  parkBox: {
    backgroundColor: colors.backgroundWhite,
    padding: 10,
    borderRadius: 16,
    flex: 1.4,
    justifyContent: "flex-end",
    marginTop: 20,
  },
  capacityBox: {
    backgroundColor: colors.backgroundWhite,
    padding: 30,
    borderRadius: 16,
    marginTop: 20,
    flex: 0.8,
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: 5,
  },
  parkTitle: { fontSize: 16, fontWeight: "700" },
  carsBox: {
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  parkingImage: {
    position: "absolute",
    width: 160,
    height: 245,
    resizeMode: "contain",
  },
  value: { fontSize: 15, marginTop: 4, textAlign: "center" },
  valueNumber: { fontSize: 30, fontWeight: "700" },
  buyBtn: {
    marginTop: 25,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buyBtnText: { fontSize: 16, fontWeight: "700" },
});
