import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useBusinessStore } from "@/entities";
import { useCounterStore } from "@/features/counter";

type SettingsRouteProp = RouteProp<RootStackParamList, "Settings">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Settings">;

export default function Settings() {
  const route = useRoute<SettingsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const business = route.params?.business;

  const currentBusiness = useBusinessStore((state) =>
    state.myBusinesses.find((b) => b.id === business?.id)
  );

  const addCount = useCounterStore((state) => state.addCount);
  const closeBusiness = useBusinessStore((state) => state.closeBusiness);

  const formatMoney = (value: number) =>
    `$ ${value?.toFixed(2).replace(".", ",")}`;

  const handleCloseBusiness = () => {
    if (!currentBusiness) return;
    const refund = closeBusiness(currentBusiness.id);
    addCount(refund);
    navigation.navigate("Tabs", { screen: "Business" });
  };

  if (!business) {
    return (
      <View style={styles.container}>
        <Text>Business not provided</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.arrow}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.header}>
        <View>
          <View
            style={[styles.iconCircle, { backgroundColor: business.color }]}
          >
            <Ionicons name={business.icon} size={32} color="#000" />
          </View>
          <Text style={styles.businessName}>{business.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ChangeName", { business })}
        >
          <Ionicons name="pencil" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.TopCard}>
        <View style={styles.card}>
          <View style={styles.iconRowCenter}>
            <Ionicons name="cash-outline" size={28} color={business.color} />
            <Text style={styles.cardTitleInline}>Заробіток за весь час</Text>
          </View>
          <Text style={styles.moneyEarnings}>
            {currentBusiness ? formatMoney(currentBusiness.earnings) : "$ 0,00"}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.iconRow}>
          <Ionicons name="wallet-outline" size={28} color={business.color} />
          <View style={styles.textGroup}>
            <Text style={styles.cardTitle}>Капіталізація</Text>
            <Text style={styles.money}>
              {currentBusiness ? formatMoney(currentBusiness.price) : "$ 0,00"}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.iconRow}>
          <Ionicons
            name="trending-up-outline"
            size={28}
            color={business.color}
          />
          <View style={styles.textGroup}>
            <Text style={styles.cardTitle}>Дохід в годину</Text>
            <Text style={styles.money}>
              {currentBusiness
                ? formatMoney(currentBusiness.incomePerHour)
                : "$ 0,00"}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.grayLine} />

      <Text style={styles.sectionTitle}>Податкова інформація</Text>
      <View style={styles.card}>
        <View style={styles.iconRow}>
          <Ionicons name="arrow-up-outline" size={28} color={business.color} />
          <View style={styles.textGroup}>
            <Text style={styles.cardTitle}>Сума податку в годину</Text>
            <Text style={styles.money}>
              {currentBusiness
                ? formatMoney(
                    currentBusiness.incomePerHour *
                      (currentBusiness.taxPercent / 100)
                  )
                : "$ 0,00"}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.description}>
        При закритті бізнесу ви отримаєте назад 30% від капіталізації.
      </Text>

      <TouchableOpacity
        style={styles.closeButton}
        onPress={handleCloseBusiness}
      >
        <Text style={styles.closeButtonText}>Закрити бізнес (+30%)</Text>
      </TouchableOpacity>

      <View style={styles.space} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  arrow: { marginBottom: 15 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  iconRowCenter: { flexDirection: "row", marginBottom: 10 },
  cardTitleInline: {
    fontSize: 16,
    color: "#777",
    fontWeight: "500",
    marginLeft: 8,
  },
  moneyEarnings: { fontSize: 40, fontWeight: "700" },
  businessName: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  TopCard: {
    marginBottom: 30,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  textGroup: {
    marginLeft: 12,
    justifyContent: "center",
  },
  grayLine: {
    height: 1,
    width: "60%",
    alignSelf: "center",
    backgroundColor: "#E0E0E0",
    borderRadius: 1,
    marginVertical: 8,
  },
  cardTitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 2,
  },
  money: {
    fontSize: 28,
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginTop: 5,
    marginBottom: 20,
  },
  closeButton: {
    borderWidth: 2,
    borderColor: "#FF5C5C",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FF5C5C",
    fontSize: 16,
    fontWeight: "700",
  },
  space: { height: 100 },
});
