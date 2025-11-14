import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useCounterStore } from "@/features/counter";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "BuyCard">;
type BusinessDetailsRouteProp = RouteProp<
  RootStackParamList,
  "BusinessDetails"
>;

export default function DetailsDependent() {
  const route = useRoute<BusinessDetailsRouteProp>();
  const { business } = route.params;
  const navigation = useNavigation<NavigationProp>();

  const currentBusiness = useCounterStore((state) =>
    state.myBusinesses.find((b) => b.id === business.id)
  );

  const addBusinessCapacity = useCounterStore(
    (state) => state.addBusinessCapacity
  );

  const purchase = useCounterStore((state) => state.purchase);
  const count = useCounterStore((state) => state.count);

  if (!currentBusiness) return null;

  const handleAddCapacity = (value: number) => {
    const costMap: { [key: number]: number } = {
      5: 17500,
      10: 50000,
      20: 140000,
    };
    const cost = costMap[value];

    purchase(cost);
    addBusinessCapacity(currentBusiness.id, value);
  };

  const handleBuyCar = () => {
    navigation.navigate("Tabs", { screen: "Earnings" });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: business.color }]}>
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
        <View style={styles.btnRow}>
          {[5, 10, 20].map((value) => {
            const costMap: { [key: number]: number } = {
              5: 17500,
              10: 50000,
              20: 140000,
            };
            const cost = costMap[value];
            const isDisabled = count < cost;
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

        <View style={styles.parkBox}>
          <Text style={styles.parkTitle}>Автопарк</Text>
          <Text style={styles.value}>
            Автомобилей: {currentBusiness.cars || 0}
          </Text>
          <Text style={styles.value}>
            Вместимость: {currentBusiness.capacity || 5}
          </Text>
        </View>

        <TouchableOpacity style={styles.buyBtn} onPress={handleBuyCar}>
          <Text style={styles.buyBtnText}>Приобрести новый автомобиль</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  secondContainer: {
    padding: 20,
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
    padding: 12,
    borderRadius: 12,
    width: "30%",
    alignItems: "center",
  },

  parkBox: {
    backgroundColor: "#f2f3f7",
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
  },
  parkTitle: { fontSize: 16, fontWeight: "700" },
  value: { fontSize: 16, marginTop: 6 },

  buyBtn: {
    marginTop: 25,
    backgroundColor: "#ffde59",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buyBtnText: { fontSize: 16, fontWeight: "700" },
});
