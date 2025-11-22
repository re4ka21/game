import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";

import { useCounterStore } from "@/features/counter";
import { useBusinessStore } from "@/features/business";

import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import InfoCard from "@/shared/ui/InfoCard";
import { useUpgradeTimer } from "@/shared/hooks/useUpgradeTimer";
import { colors } from "@/shared";
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "BuyCard">;
type DetailsDependentRouteProp = RouteProp<
  RootStackParamList,
  "DetailsDependent"
>;

export default function DetailsDependent() {
  const route = useRoute<DetailsDependentRouteProp>();
  const { business } = route.params;
  const navigation = useNavigation<NavigationProp>();

  const currentBusiness = useBusinessStore((state) =>
    state.myBusinesses.find((b) => b.id === business.id)
  );

  const upgradeStage = useBusinessStore((state) => state.upgradeBusinessStage);
  const purchase = useCounterStore((state) => state.purchase);
  const count = useCounterStore((state) => state.count);
  const setUpgradeEndTime = useBusinessStore(
    (state) => state.setUpgradeEndTime
  );

  if (!currentBusiness) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Бізнес не знайдено</Text>
      </View>
    );
  }

  const stage = currentBusiness.stage ?? 1;
  const nextPointIncomeIncrease = currentBusiness.incomePerHour * 0.1;
  const nextPointCost = currentBusiness.price * (1 + 0.25 * stage);
  const formattedCount = count.toFixed(2).replace(".", ",");
  const busColor = business.color;
  const upgradeEndTime = currentBusiness.upgradeEndTime ?? null;
  const isUpgrading = !!upgradeEndTime;

  const timer = useUpgradeTimer(upgradeEndTime, () => {
    purchase(nextPointCost);
    upgradeStage(currentBusiness.id);
    setUpgradeEndTime(currentBusiness.id, null);
  });

  const handleUpgradeStage = () => {
    if (stage >= 5) return Alert.alert("Досягнуто максимальної стадії!");
    if (count < nextPointCost) return Alert.alert("Недостатньо грошей!");
    if (!upgradeEndTime) {
      const endTime = Date.now() + 60 * 1000;
      setUpgradeEndTime(currentBusiness.id, endTime);
    }
  };

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
        <Text style={styles.incomeText}>Дохід на годину</Text>
      </View>

      <View style={styles.secondContainer}>
        <View style={styles.info}>
          <InfoCard
            icon={<AntDesign name="stock" size={24} color="black" />}
            mainText={stage}
            secondaryText="Стадия"
            style={{ flex: 0.7 }}
          />
          <InfoCard
            icon={<MaterialIcons name="category" size={24} color={busColor} />}
            mainText={business.type}
            secondaryText="Категория"
            style={{ flex: 1.3 }}
          />
        </View>

        <View style={styles.newPointsSale}>
          <View style={styles.headerBox}>
            <AntDesign name="shop" size={24} color={busColor} />
            <Text style={styles.headerText}>Розширення</Text>
          </View>

          {isUpgrading ? (
            <Text style={styles.mainText}>Оновлення... {timer} секунд</Text>
          ) : stage < 5 ? (
            <>
              <Text style={styles.mainText}>${nextPointCost.toFixed(2)}</Text>
              <Text style={styles.secondaryText}>Необхідні вкладення</Text>
              <View style={styles.arrowRow}>
                <AntDesign name="arrow-up" size={18} color={busColor} />
                <Text style={styles.moneyText}>
                  +${nextPointIncomeIncrease.toFixed(2)}
                </Text>
              </View>
              <Text style={styles.secondaryText}>
                Приріст прибутку на годину
              </Text>
              <TouchableOpacity
                style={[styles.buyBtn, { backgroundColor: busColor }]}
                onPress={handleUpgradeStage}
              >
                <Text style={styles.buyBtnText}>
                  Відкрити нові точки продажу
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.mainText}>Максимальної стадії досягнуто</Text>
          )}
        </View>

        <Text style={[styles.balance, { color: busColor }]}>
          Баланс: $ {formattedCount}
        </Text>
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
  secondContainer: { padding: 20 },
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
  balance: { alignSelf: "center", marginTop: 10, fontWeight: "600" },
  info: { flexDirection: "row", paddingVertical: 6 },
  newPointsSale: {
    backgroundColor: colors.backgroundWhite,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginTop: 20,
    marginLeft: 5,
    minHeight: 90,
  },
  headerBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    paddingTop: 4,
  },
  headerText: { marginLeft: 6 },
  mainText: { fontSize: 18, marginTop: 20, fontWeight: "600" },
  secondaryText: { fontSize: 12, marginTop: 2, color: "#777" },
  moneyText: { fontSize: 18, fontWeight: "600", marginLeft: 6 },
  arrowRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  buyBtn: {
    marginTop: 15,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buyBtnText: { fontSize: 16, fontWeight: "700", color: "#fff" },
});
