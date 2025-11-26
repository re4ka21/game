import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useCounterStore } from "@/features/counter";
import { useBusinessStore, CarType } from "@/features/business/model/store";
import { CAR_OPTIONS, CAR_TYPE_COLORS } from "@/screens/Business";

type Props = NativeStackScreenProps<RootStackParamList, "BuyCars">;

export default function BuyCarsScreen({ route, navigation }: Props) {
  const { business } = route.params;
  const currentBusiness = useBusinessStore((state) =>
    state.myBusinesses.find((b) => b.id === business.id)
  );

  const addBusinessCar = useBusinessStore((state) => state.addBusinessCar);
  const purchase = useCounterStore((state) => state.purchase);
  const balance = useCounterStore((state) => state.count) ?? 0;

  const [selectedType, setSelectedType] = useState<CarType | null>(null);

  if (!currentBusiness) return null;

  const filteredCars =
    selectedType === null
      ? CAR_OPTIONS
      : CAR_OPTIONS.filter((c) => c.type === selectedType);

  const handleBuy = (car: (typeof CAR_OPTIONS)[number]) => {
    if (balance < car.price) return;
    purchase(car.price);
    addBusinessCar(currentBusiness.id, car.type);
    navigation.goBack();
  };

  const toggleFilter = (type: CarType) => {
    setSelectedType((prev) => (prev === type ? null : type));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.balance}>
        Баланс: $ {balance?.toFixed(2) ?? "0.00"}
      </Text>

      <View style={styles.filterRow}>
        {(
          [
            "economy",
            "comfort",
            "comfort_plus",
            "business",
            "premier",
          ] as CarType[]
        ).map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeButton,
              selectedType === type && styles.typeButtonActive,
            ]}
            onPress={() => toggleFilter(type)}
          >
            <Text style={styles.typeButtonText}>{formatCarType(type)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredCars}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.carCard}>
            <Image source={item.image} style={styles.carImage} />
            <View style={styles.carInfo}>
              <Text style={styles.carName}>{item.name}</Text>
              <Text
                style={[
                  styles.carType,
                  { backgroundColor: CAR_TYPE_COLORS[item.type] },
                ]}
              >
                {formatCarType(item.type)}
              </Text>
              <Text style={styles.carResource}>Ресурс: {item.resource}</Text>
              <Text style={styles.carIncome}>
                Доход в год: $ {item.income ?? 0}
              </Text>
              <Text style={styles.carPrice}>
                $ {item.price?.toLocaleString() ?? 0}
              </Text>
              <TouchableOpacity
                style={[
                  styles.buyButton,
                  balance < item.price && styles.buyButtonDisabled,
                ]}
                disabled={balance < item.price}
                onPress={() => handleBuy(item)}
              >
                <Text style={styles.buyText}>Купити</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

function formatCarType(type: CarType) {
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
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  balance: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  typeButton: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 5,
    marginBottom: 8,
    backgroundColor: "#ddd",
  },
  typeButtonActive: {
    backgroundColor: "yellow",
  },
  typeButtonText: {
    fontSize: 14,
  },
  carCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
  },
  carImage: {
    width: 120,
    height: 80,
    resizeMode: "contain",
    margin: 8,
  },
  carInfo: {
    flex: 1,
    padding: 8,
  },
  carName: {
    fontSize: 16,
    fontWeight: "700",
  },
  carType: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 4,
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    borderRadius: 8,
  },
  carResource: {
    fontSize: 12,
    color: "#555",
  },
  carIncome: {
    fontSize: 12,
    color: "#555",
    marginVertical: 4,
  },
  carPrice: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  buyButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  buyButtonDisabled: {
    backgroundColor: "#888",
  },
  buyText: {
    color: "#fff",
    fontWeight: "700",
  },
});
