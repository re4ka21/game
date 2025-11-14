import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCounterStore } from "@/features/counter";
import { BusinessCard } from "@/shared";

export default function Business() {
  const navigation = useNavigation();
  const { myBusinesses, addCount, updateOfflineEarnings } = useCounterStore();
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    updateOfflineEarnings();

    const income = myBusinesses.reduce((acc, b) => acc + b.incomePerHour, 0);
    setTotalIncome(income);

    const interval = setInterval(() => {
      addCount((income / 3600) * 60);
    }, 60000);

    return () => clearInterval(interval);
  }, [myBusinesses]);

  const renderBusiness = ({ item }: { item: (typeof myBusinesses)[0] }) => (
    <BusinessCard key={item.id} business={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Бізнес</Text>

      <TouchableOpacity style={styles.capitalBox}>
        <Text style={styles.incomeNumber}>
          $ {totalIncome.toFixed(2).replace(".", ",")}
        </Text>
        <Text style={styles.incomeText}>Дохід за годину</Text>
      </TouchableOpacity>

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.buttonBase, styles.firstButton]}
          onPress={() => navigation.navigate("BuyBusiness" as never)}
        >
          <Text style={styles.firstButtonText}>Відкрити бізнес</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonBase, styles.secondButton]}
          onPress={() => navigation.navigate("BusinessMerger" as never)}
        >
          <Text style={styles.secondButtonText}>Злиття{"\n"}бізнесів</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Мої компанії</Text>
        <Text style={styles.counterText}>{myBusinesses.length}/10</Text>
      </View>

      <FlatList
        data={myBusinesses}
        renderItem={renderBusiness}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>У вас ще немає бізнесів</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  capitalBox: {
    backgroundColor: "#eef1f6",
    borderRadius: 35,
    width: "100%",
    height: 130,
    marginBottom: 20,
    justifyContent: "center",
  },
  incomeNumber: {
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 20,
  },
  incomeText: {
    fontSize: 15,
    marginLeft: 20,
    marginTop: 5,
    color: "#60f078",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  buttonBase: {
    width: "45%",
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  firstButton: {
    backgroundColor: "#2196f3",
  },
  secondButton: {
    backgroundColor: "#eef1f6",
  },
  firstButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  secondButtonText: {
    color: "#2196f3",
    fontSize: 16,
    textAlign: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  counterText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2196f3",
  },
  emptyText: {
    color: "#888",
    marginTop: 10,
    textAlign: "center",
  },
});
