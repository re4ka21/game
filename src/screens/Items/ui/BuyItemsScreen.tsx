import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useItemsStore, ItemCategory, Item } from "@/features/items";
import { useCounterStore } from "@/features/counter";
import AntDesign from "@expo/vector-icons/AntDesign";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/app/navigation/AppNavigator";

type BuyItemsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "BuyItems"
>;

export default function BuyItemsScreen() {
  const navigation = useNavigation<BuyItemsNavigationProp>();
  const route = useRoute();
  const { type } = route.params as { type: ItemCategory };

  const count = useCounterStore((state) => state.count);

  const items = useItemsStore((state) => state.items);

  const [tab, setTab] = useState<"market" | "collection">("market");

  const marketItems = items.filter((i) => i.category === type && !i.owned);
  const collectionItems = items.filter((i) => i.category === type && i.owned);

  const title = type === "coins" ? "Монеты" : "Картины";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrow}
        >
          <AntDesign name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.balance}>Баланс: $ {count.toLocaleString()}</Text>

      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setTab("market")}
          style={styles.tabWrapper}
        >
          <Text
            style={[styles.tabText, tab === "market" && styles.activeTabText]}
          >
            Рынок
          </Text>
          {tab === "market" && <View style={styles.activeLine} />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTab("collection")}
          style={styles.tabWrapper}
        >
          <Text
            style={[
              styles.tabText,
              tab === "collection" && styles.activeTabText,
            ]}
          >
            Моя коллекция
          </Text>
          {tab === "collection" && <View style={styles.activeLine} />}
        </TouchableOpacity>
      </View>

      <FlatList
        data={tab === "market" ? marketItems : collectionItems}
        keyExtractor={(item) => `${item.category}-${item.id}`}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => {
          const canBuy = count >= item.price || item.owned;
          return (
            <TouchableOpacity
              disabled={!canBuy}
              style={styles.card}
              onPress={() => navigation.navigate("BuyItemsDetails", { item })}
            >
              <View style={styles.imagePlaceholder}>
                {canBuy ? (
                  <Image
                    source={require("../../../../assets/images/react-logo.png")}
                    style={{ width: 100, height: 100 }}
                  />
                ) : (
                  <Text style={{ fontSize: 40, opacity: 0.3 }}>🔒</Text>
                )}
              </View>

              <View style={styles.cardBottom}>
                <Text style={styles.lockedText}>
                  {tab === "market"
                    ? canBuy
                      ? item.title
                      : "Заблокировано"
                    : item.title}
                </Text>

                <View style={styles.priceRow}>
                  <Text style={styles.priceIcon}>🏷</Text>

                  <Text style={styles.priceText}>
                    $ {item.price.toLocaleString()}
                  </Text>
                  <Text style={styles.statusText}>
                    {tab === "collection" ? "куплено" : ""}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  arrow: {
    marginLeft: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginLeft: 16,
    marginTop: 20,
  },
  balance: {
    marginLeft: 60,
    fontSize: 16,
    color: "#777",
    marginBottom: 10,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#DDE2E8",
    paddingBottom: 6,
  },
  tabWrapper: {
    alignItems: "center",
    paddingHorizontal: 30,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#9CA3AF",
  },
  activeTabText: {
    color: "#1D4ED8",
    fontWeight: "600",
  },
  activeLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#1D4ED8",
    marginTop: 6,
    borderRadius: 20,
  },
  card: {
    backgroundColor: "#F1F4F9",
    borderRadius: 14,
    marginBottom: 20,
    overflow: "hidden",
  },
  imagePlaceholder: {
    height: 170,
    backgroundColor: "#1E3A8A",
    justifyContent: "center",
    alignItems: "center",
  },
  cardBottom: {
    backgroundColor: "#E9EDF3",
    padding: 16,
  },
  lockedText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  priceIcon: { fontSize: 18, marginRight: 4 },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
  },
  statusText: {
    color: "green",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  buyBtn: {
    backgroundColor: "#1D4ED8",
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
  },
});
