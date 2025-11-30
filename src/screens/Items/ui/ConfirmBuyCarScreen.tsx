import React, { useState, useMemo } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useGarageStore } from "@/features/items";
import { useCounterStore } from "@/features/counter";
import AntDesign from "@expo/vector-icons/AntDesign";
type ConfirmRoute = RouteProp<RootStackParamList, "ConfirmBuyCar">;

export default function ConfirmBuyCarScreen() {
  const route = useRoute<ConfirmRoute>();
  const navigation = useNavigation();

  const item = route.params.item;

  const basePrice = item.price;

  const [engine, setEngine] = useState<"DF" | "BST" | "S+">("DF");
  const [packageType, setPackageType] = useState<"standard" | "premium">(
    "standard"
  );

  const enginePercents = {
    DF: 0,
    BST: 0.15,
    "S+": 0.35,
  };

  const packagePercents = {
    standard: 0,
    premium: 0.4,
  };

  const finalPrice = useMemo(() => {
    return (
      basePrice +
      basePrice * enginePercents[engine] +
      basePrice * packagePercents[packageType]
    );
  }, [engine, packageType]);

  const handleBuy = () => {
    const money = useCounterStore.getState().count;
    if (money < finalPrice) return;

    useGarageStore.getState().addItem({
      ...item,
      price: finalPrice,
      engine,
      packageType,
    });

    useCounterStore.getState().purchase(finalPrice);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrow}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>Цена от ${item.price}</Text>

      <Image source={item.image} style={styles.image} resizeMode="contain" />

      <Text style={styles.sectionTitle}>Двигатель</Text>
      <View style={styles.row}>
        {renderOption("DF", engine, setEngine, "0%", "DF")}
        {renderOption("BST", engine, setEngine, "+15%", "BST")}
        {renderOption("S+", engine, setEngine, "+35%", "S+")}
      </View>

      <Text style={styles.sectionTitle}>Комплектация</Text>
      <View style={styles.row}>
        {renderOption(
          "Стандарт",
          packageType,
          () => setPackageType("standard"),
          "0%",
          "standard"
        )}
        {renderOption(
          "Премиум",
          packageType,
          () => setPackageType("premium"),
          "+40%",
          "premium"
        )}
      </View>

      <Text style={styles.total}>
        Итого: $
        {finalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </Text>

      <TouchableOpacity style={styles.buyBtn} onPress={handleBuy}>
        <Text style={styles.buyText}>Купить</Text>
      </TouchableOpacity>
    </View>
  );
}

function renderOption(label, selected, onPress, percent, value) {
  const active = selected === value;

  return (
    <TouchableOpacity
      style={[styles.option, active && styles.optionActive]}
      onPress={() => onPress(value)}
    >
      <Text style={[styles.optionText, active && styles.optionTextActive]}>
        {label}
      </Text>
      <Text style={[styles.percent, active && styles.optionTextActive]}>
        {percent}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  arrow: { marginTop: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
  subtitle: { textAlign: "center", color: "#666" },
  image: { width: "100%", height: 220, marginVertical: 20 },
  sectionTitle: { fontSize: 18, marginBottom: 10, fontWeight: "600" },
  row: { flexDirection: "row", gap: 10, marginBottom: 20 },
  option: {
    width: 110,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#eee",
    alignItems: "center",
  },
  optionActive: {
    backgroundColor: "#ccc",
  },
  optionText: { fontSize: 16, fontWeight: "600" },
  optionTextActive: { color: "#000" },
  percent: { marginTop: 4, fontSize: 12 },
  total: { fontSize: 20, fontWeight: "700", marginTop: 10, marginBottom: 20 },
  buyBtn: {
    backgroundColor: "#4c6ef5",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buyText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
