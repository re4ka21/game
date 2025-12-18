import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useBusinessStore } from "@/entities";
import { CAR_OPTIONS } from "@/screens/Business";
import { AIRLINE_OPTIONS } from "@/screens/Business";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = NativeStackScreenProps<RootStackParamList, "CarsPark">;

export default function CarsParkScreen({ route, navigation }: Props) {
  const { business } = route.params;
  const isCardealer = business.type === "cardealer";
  const isAirline = business.type === "airline";

  const currentBusiness = useBusinessStore((state) =>
    state.myBusinesses.find((b) => b.id === business.id)
  );

  if (!currentBusiness) return null;

  const OPTIONS = isAirline ? AIRLINE_OPTIONS : CAR_OPTIONS;

  const itemsArray = (currentBusiness.carsList || [])
    .map((item, i) => {
      const itemData = OPTIONS.find((c) => c.type === item.type);
      if (!itemData) return null;

      return {
        number: i + 1,
        name: itemData.name,
        image: itemData.image,
        type: item.type,
        income: item.income ?? 0,
        mileage: item.mileage ?? 0,
        resource: item.resource ?? itemData.resource,
        price: item.price ?? itemData.price,
        boughtAt: item.boughtAt ?? Date.now(),
      };
    })
    .filter((c) => c !== null);

  const displayedItems = isCardealer ? itemsArray : itemsArray;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>
        {isAirline ? "Авіапарк" : isCardealer ? "Автосалон" : "Автопарк"}
      </Text>

      {displayedItems.length === 0 ? (
        <Text style={styles.noCars}>
          {isAirline
            ? "Немає куплених літаків"
            : isCardealer
              ? "Немає куплених авто"
              : "Немає куплених авто"}
        </Text>
      ) : (
        <FlatList
          data={displayedItems}
          keyExtractor={(item) => item.number.toString()}
          renderItem={({ item }) => {
            const elapsedMin = (Date.now() - item.boughtAt) / 1000 / 60;
            const shouldAutoSell = isCardealer && elapsedMin >= 10;

            if (shouldAutoSell) return null;

            return (
              <View style={styles.carCard}>
                <Image source={item.image} style={styles.carImage} />
                <View style={styles.carInfo}>
                  <Text style={styles.carName}>{item.name}</Text>

                  {!isAirline && !isCardealer && (
                    <Text style={styles.carType}>
                      {formatCarType(item.type)}
                    </Text>
                  )}

                  {isCardealer ? (
                    <Text style={styles.carIncome}>
                      {`Вартість продажу: $${((item.price ?? 0) * 1.1).toFixed(
                        2
                      )}`}
                    </Text>
                  ) : (
                    <Text style={styles.carIncome}>
                      ${item.income.toFixed(2)} в год
                    </Text>
                  )}

                  {!isCardealer && (
                    <Text style={styles.carMileage}>
                      Пробіг: {item.mileage} км / {item.resource}
                    </Text>
                  )}
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

function formatCarType(type: string) {
  switch (type) {
    case "economy":
      return "Економ";
    case "comfort":
      return "Комфорт";
    case "comfort_plus":
      return "Комфорт+";
    case "business":
      return "Бізнес";
    case "premier":
      return "Прем’єр";
    default:
      return type;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
    marginTop: 40,
  },
  backBtn: { marginBottom: 15 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 16 },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  filterBtn: {
    backgroundColor: "#ddd",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  filterBtnActive: {
    backgroundColor: "#FFD700",
  },
  filterBtnText: { color: "#333" },
  filterBtnTextActive: { color: "#000", fontWeight: "700" },
  noCars: { fontSize: 18, textAlign: "center", marginTop: 30 },
  carCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
  },
  carImage: { width: 100, height: 60, resizeMode: "contain", marginRight: 12 },
  carInfo: { flex: 1 },
  carName: { fontSize: 16, fontWeight: "700" },
  carType: {
    fontSize: 12,
    color: "#777",
    backgroundColor: "#FFD700",
    paddingHorizontal: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginVertical: 4,
  },
  carIncome: { fontSize: 14, color: "#000000ff" },
  carMileage: { fontSize: 12, color: "#555", marginTop: 2 },
});
