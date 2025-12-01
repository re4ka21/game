import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useGarageStore } from "@/features/items";
import { useCounterStore } from "@/features/counter";

type ScreenRouteProp = RouteProp<RootStackParamList, "ConfirmBuyShipPlane">;

export default function ConfirmBuyShipPlane() {
  const { params } = useRoute<ScreenRouteProp>();
  const navigation = useNavigation();
  const addItem = useGarageStore((s) => s.addItem);
  const item = params.item;
  const { count } = useCounterStore();
  const [team, setTeam] = useState(false);
  const [premium, setPremium] = useState(false);

  const base = item.price;
  const teamExtra = team ? base * 0.1 : 0;
  const premiumExtra = premium ? base * 0.25 : 0;

  const total = base + teamExtra + premiumExtra;

  const handleBuy = () => {
    addItem({
      ...item,
      price: total,
      team: team ? "Есть" : "Нету",
      packageType: premium ? "premium" : "standard",
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>Цена от ${item.price}</Text>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.section}>
        {item.type === "planes"
          ? "Пилот, бортпроводники, персонал"
          : item.type === "ships"
            ? "Капитан, техники, обслуживающий персонал"
            : "Команда"}
      </Text>
      <TouchableOpacity
        style={[styles.option, team && styles.active]}
        onPress={() => setTeam(!team)}
      >
        <Text style={styles.optionText}>Нанять команду</Text>
        <Text style={styles.optionSub}>+10%</Text>
      </TouchableOpacity>
      <Text style={styles.section}>Оформление</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.smallOption, !premium && styles.active]}
          onPress={() => setPremium(false)}
        >
          <Text style={styles.optionText}>Стандарт</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.smallOption, premium && styles.active]}
          onPress={() => setPremium(true)}
        >
          <Text style={styles.optionText}>Премиум</Text>
          <Text style={styles.optionSub}>+25%</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.total}>Итого: ${total.toFixed(2)}</Text>
      <TouchableOpacity
        style={[styles.buyBtn, count < total && { backgroundColor: "#999" }]}
        onPress={handleBuy}
        disabled={count < total}
      >
        <Text style={styles.buyText}>Купить</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40 },
  title: { fontSize: 28, fontWeight: "700" },
  price: { fontSize: 16, color: "#777", marginBottom: 20 },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "contain",
    marginBottom: 20,
  },

  section: { fontSize: 18, marginTop: 10, marginBottom: 10 },

  option: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#eee",
    marginBottom: 12,
  },

  smallOption: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#eee",
    marginRight: 10,
  },

  active: {
    backgroundColor: "#d7e3ff",
  },

  optionText: {
    fontSize: 18,
    fontWeight: "600",
  },

  optionSub: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },

  row: {
    flexDirection: "row",
  },

  total: {
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 20,
  },

  buyBtn: {
    backgroundColor: "#4c6ef5",
    padding: 16,
    borderRadius: 14,
  },

  buyText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
});
