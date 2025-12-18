import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useCounterStore } from "@/features/counter";
import { useBusinessStore } from "@/entities";
import { useItemsStore } from "@/features/items";
import { useHonorsStore } from "@/entities";
import AntDesign from "@expo/vector-icons/AntDesign";
type InvestmentsRouteProp = RouteProp<RootStackParamList, "HonorsDetails">;

export default function HonorsDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<InvestmentsRouteProp>();
  const { item } = route.params;
  const received = useHonorsStore((s) => s.received);
  const markReceived = useHonorsStore((s) => s.markReceived);

  const alreadyReceived = received.includes(item.id);
  const conditionChecks: Record<number, () => boolean> = {
    1: () => {
      const items = useItemsStore.getState().items;
      const ownedCount = items.filter((i) => i.owned).length;
      return ownedCount >= 30;
    },

    2: () => {
      const businessCount = useBusinessStore.getState().myBusinesses.length;
      const assets = useCounterStore.getState().count;
      return businessCount >= 10 && assets >= 500_000_000_000;
    },

    3: () => {
      const businessCount = useBusinessStore.getState().myBusinesses.length;
      return businessCount >= 10;
    },

    4: () => {
      return useBusinessStore.getState().myBusinesses.length > 0;
    },

    5: () => {
      return useCounterStore.getState().count >= 1_000_000;
    },
  };
  const isCompleted = conditionChecks[item.id]();
  const handleGet = () => {
    if (isCompleted && !alreadyReceived) {
      markReceived(item.id);
    }
  };
  return (
    <View style={styles.screen}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.arrow}
      >
        <AntDesign name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.header}>
        <LinearGradient colors={item.colors} style={styles.iconWrapper}>
          <Image source={item.image} style={styles.icon} />
        </LinearGradient>

        <Text style={styles.title}>{item.title}</Text>
      </View>

      <View style={styles.line} />

      <Text style={styles.conditionsTitle}>Условия</Text>

      <Text style={styles.conditions}>
        {item.hidden && !isCompleted && !alreadyReceived
          ? "info hidden"
          : item.conditions}
      </Text>
      <TouchableOpacity
        disabled={!isCompleted || alreadyReceived}
        onPress={handleGet}
        style={[
          styles.getButton,
          { backgroundColor: alreadyReceived ? "gray" : "blue" },
        ]}
      >
        <Text style={styles.buttonText}>
          {alreadyReceived
            ? "Получено"
            : isCompleted
              ? "Получить"
              : "Недоступно"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  arrow: {
    marginTop: 30,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
  },
  iconWrapper: {
    width: 140,
    height: 140,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  icon: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111",
    textAlign: "center",
  },
  line: {
    marginTop: 20,
    borderBottomWidth: 2,
    width: "95%",
    alignSelf: "center",
    borderColor: "#e4ecf9",
  },
  conditionsTitle: {
    fontWeight: "600",
    fontSize: 20,
    marginTop: 20,
  },
  conditions: {
    marginTop: 20,
    fontSize: 14,
  },
  getButton: {
    marginTop: 100,
    paddingHorizontal: 140,
    borderRadius: 20,
    paddingVertical: 23,
    backgroundColor: "blue",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
  },
});
