import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useItemsStore, ItemCategory, Item } from "@/features/items";
import { useCounterStore } from "@/features/counter";

export default function BuyItemsScreen() {
  const route = useRoute();
  const { type } = route.params as { type: ItemCategory };

  const count = useCounterStore((state) => state.count);
  const purchase = useCounterStore((state) => state.purchase);

  const items = useItemsStore((state) => state.items);
  const addItem = useItemsStore((state) => state.addItem);

  const [tab, setTab] = useState<"market" | "collection">("market");

  const marketItems = items.filter((i) => i.category === type && !i.owned);
  const collectionItems = items.filter((i) => i.category === type && i.owned);

  const title = type === "coins" ? "Монеты" : "Картины";

  const handleBuy = (item: Item) => {
    if (count >= item.price) {
      purchase(item.price);
      addItem({ ...item, owned: true });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
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
            <View style={styles.card}>
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
                      ? ""
                      : "Заблокировано"
                    : "Куплено"}
                </Text>

                <View style={styles.priceRow}>
                  <Text style={styles.priceIcon}>🏷</Text>
                  <Text style={styles.priceText}>
                    $ {item.price.toLocaleString()}
                  </Text>
                </View>

                {tab === "market" && !item.owned && canBuy && (
                  <TouchableOpacity
                    onPress={() => handleBuy(item)}
                    style={styles.buyBtn}
                  >
                    <Text style={{ color: "#fff", fontSize: 14 }}>Купить</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginLeft: 16,
    marginTop: 20,
  },
  balance: {
    marginLeft: 16,
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
  buyBtn: {
    backgroundColor: "#1D4ED8",
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
  },
});
