import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useIslandStore } from "@/entities";
import { useCounterStore } from "@/features/counter";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type Nav = NativeStackNavigationProp<RootStackParamList, "Island">;

export default function IslandScreen() {
  const navigation = useNavigation<Nav>();

  const balance = useCounterStore((s) => s.count);
  const islands = useIslandStore((s) => s.islands);

  const [tab, setTab] = useState<"offers" | "my">("offers");

  const shownIslands =
    tab === "offers"
      ? islands.filter((i) => !i.owned)
      : islands.filter((i) => i.owned);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrow-left" size={24} color="black" />
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>Острова</Text>
          <Text style={styles.balance}>
            Баланс: ${balance.toLocaleString()}
          </Text>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === "offers" && styles.activeTab]}
          onPress={() => setTab("offers")}
        >
          <Text
            style={[styles.tabText, tab === "offers" && styles.activeTabText]}
          >
            Предложения
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, tab === "my" && styles.activeTab]}
          onPress={() => setTab("my")}
        >
          <Text style={[styles.tabText, tab === "my" && styles.activeTabText]}>
            Мои острова
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={{ paddingBottom: 40 }}
        data={shownIslands}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate("IslandDetails", {
                islandId: item.id,
              });
            }}
          >
            <Image source={item.image} style={styles.img} />

            <Text style={styles.cardTitle}>{item.name}</Text>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>
                ${item.price.toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 10,
    marginTop: 5,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
  },

  balance: {
    fontSize: 14,
    color: "#555",
  },

  tabs: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 20,
  },

  tab: {
    flex: 1,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    alignItems: "center",
  },

  activeTab: {
    borderBottomColor: "#2bb1fc",
  },

  tabText: {
    color: "#888",
    fontSize: 16,
  },

  activeTabText: {
    color: "#2bb1fc",
  },

  card: {
    marginBottom: 20,
    backgroundColor: "#eef3fa",
    borderRadius: 16,
    overflow: "hidden",
  },

  img: {
    width: "100%",
    height: 180,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    padding: 12,
    color: "#222",
  },

  priceTag: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },

  priceText: {
    color: "#fff",
    fontWeight: "700",
  },
});
