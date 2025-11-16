import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useCounterStore } from "@/features/counter";
import { useBusinessStore } from "@/features/business";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "BuyCard">;
type BusinessDetailsRouteProp = RouteProp<
  RootStackParamList,
  "BusinessDetails"
>;

export default function DetailsDependent() {
  const route = useRoute<BusinessDetailsRouteProp>();
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

  const formattedCount = count.toFixed(2).replace(".", ",");
  if (!currentBusiness) return null;
  const handleAddCapacity = (value: number) => {
    const costMap: { [key: number]: number } = {
      5: 17500,
      10: 50000,
      20: 140000,
    };
    const cost = costMap[value];

    if ((currentBusiness.capacity || 5) + value > 40) {
      alert("Максимальна місткість — 40!");
      return;
    }

    purchase(cost);
    addBusinessCapacity(currentBusiness.id, value);
  };

  const handleBuyCar = () => {
    navigation.navigate("Tabs", { screen: "Earnings" });
  };
  const busColor = business.color;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrow}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrow-left" size={24} color="black" />
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

        <View style={styles.btnRow}>
          {[5, 10, 20].map((value) => {
            const costMap: { [key: number]: number } = {
              5: 17500,
              10: 50000,
              20: 140000,
            };
            const cost = costMap[value];

            const currentCapacity = currentBusiness.capacity || 5;
            const isDisabled = count < cost || currentCapacity + value > 40;

            return (
              <TouchableOpacity
                key={value}
                style={[
                  styles.capacityBtn,
                  isDisabled && styles.capacityBtnDisabled,
                ]}
                onPress={() => handleAddCapacity(value)}
                disabled={isDisabled}
              >
                <Text>
                  +{value} місць{"\n"}${cost.toLocaleString()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.info}>
          <View style={styles.parkBox}>
            <Text style={styles.parkTitle}>Автопарк</Text>

            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  { backgroundColor: busColor },
                  {
                    width: `${
                      ((currentBusiness.cars || 0) /
                        (currentBusiness.capacity || 5)) *
                      100
                    }%`,
                  },
                ]}
              />
            </View>

            <LinearGradient
              colors={[busColor, "#f2f2f2"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.carsBox}
            >
              <Text style={styles.value}>
                Автомобилей: {`\n`}
                {currentBusiness.cars || 0}
              </Text>
            </LinearGradient>
          </View>
          <View style={styles.capacityBox}>
            <Image
              source={require("../../../../assets/images/parking.png")}
              style={styles.parkingImage}
            />
            <Text style={styles.value}>Вместимость:</Text>
            <Text style={styles.valueNumber}>
              {currentBusiness.capacity || 5}
            </Text>
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
  arrow: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 3,
  },
  header: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  secondContainer: {
    padding: 20,
  },
  parkingImage: {
    position: "absolute",
    width: 160,
    height: 245,
    resizeMode: "contain",
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000000ff",
    marginTop: 6,
  },
  capacityBtnDisabled: {
    backgroundColor: "#ccc",
  },
  progressBackground: {
    height: 12,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",

    borderRadius: 6,
  },
  incomeBox: {
    backgroundColor: "#f2f3f7",
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
  balance: {
    color: "#777",
  },
  sectionTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "700",
  },

  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  capacityBtn: {
    backgroundColor: "#eef1f6",
    padding: 4,
    borderRadius: 12,
    width: "30%",
    height: 45,
    alignItems: "center",
  },
  info: {
    flexDirection: "row",
    paddingVertical: 20,
  },
  parkBox: {
    backgroundColor: "#f2f3f7",
    padding: 10,
    borderRadius: 16,
    flex: 1.4,
    justifyContent: "flex-end",
    marginTop: 20,
  },

  capacityBox: {
    backgroundColor: "#f2f3f7",
    padding: 30,
    borderRadius: 16,
    marginTop: 20,
    flex: 0.8,
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: 5,
  },
  parkTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  value: {
    fontSize: 15,
    marginTop: 4,
    textAlign: "center",
  },
  valueNumber: {
    fontSize: 30,
    fontWeight: "700",
  },
  carsBox: {
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 4,
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  cars: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000ff",
  },
  buyBtn: {
    marginTop: 25,

    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buyBtnText: { fontSize: 16, fontWeight: "700" },
});
