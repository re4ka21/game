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
import { useBusinessStore } from "@/features/business";
import { CAR_OPTIONS } from "@/screens/Business";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = NativeStackScreenProps<RootStackParamList, "CarsPark">;

export default function CarsParkScreen({ route, navigation }: Props) {
  const { business } = route.params;
  const [filter, setFilter] = useState<string | null>(null);

  const currentBusiness = useBusinessStore((state) =>
    state.myBusinesses.find((b) => b.id === business.id)
  );

  if (!currentBusiness) return null;

  const carsArray = (currentBusiness.carsList || [])
    .map((type, i) => {
      const carData = CAR_OPTIONS.find((c) => c.type === type);
      return carData ? { ...carData, number: i + 1 } : null;
    })
    .filter(Boolean);

  const filteredCars = filter
    ? carsArray.filter((c) => c?.type === filter)
    : carsArray;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Автопарк</Text>

      <View style={styles.filters}>
        {["economy", "comfort", "comfort_plus", "business", "premier"].map(
          (t) => (
            <TouchableOpacity
              key={t}
              style={[
                styles.filterBtn,
                filter === t ? styles.filterBtnActive : null,
              ]}
              onPress={() => setFilter(filter === t ? null : t)}
            >
              <Text
                style={
                  filter === t
                    ? styles.filterBtnTextActive
                    : styles.filterBtnText
                }
              >
                {formatCarType(t)}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {filteredCars.length === 0 ? (
        <Text style={styles.noCars}>Немає куплених авто</Text>
      ) : (
        <FlatList
          data={filteredCars}
          keyExtractor={(item) => item.number.toString()}
          renderItem={({ item }) => (
            <View style={styles.carCard}>
              <Image source={item.image} style={styles.carImage} />
              <View style={styles.carInfo}>
                <Text style={styles.carName}>{item.name}</Text>
                <Text style={styles.carIncome}>
                  ${item.income?.toFixed(2) ?? 0} в год
                </Text>
                <Text style={styles.carType}>{formatCarType(item.type)}</Text>
              </View>
            </View>
          )}
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
  backBtn: {
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 16,
  },
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
  filterBtnText: {
    color: "#333",
  },
  filterBtnTextActive: {
    color: "#000",
    fontWeight: "700",
  },
  noCars: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 30,
  },
  carCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
  },
  carImage: {
    width: 100,
    height: 60,
    resizeMode: "contain",
    marginRight: 12,
  },
  carInfo: {
    flex: 1,
  },
  carName: {
    fontSize: 16,
    fontWeight: "700",
  },
  carIncome: {
    fontSize: 14,
    color: "#555",
  },
  carType: {
    fontSize: 12,
    color: "#777",
    backgroundColor: "#FFD700",
    paddingHorizontal: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginVertical: 4,
  },
});
