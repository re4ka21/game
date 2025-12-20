import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useItemsStore, Item } from "@/entities";
import { useCounterStore } from "@/entities";

type RouteProps = RouteProp<RootStackParamList, "BuyItemsDetails">;

export default function BuyItemsDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();

  const { item } = route.params as { item: Item };

  const count = useCounterStore((s) => s.count);
  const purchase = useCounterStore((s) => s.purchase);

  const addItem = useItemsStore((s) => s.addItem);

  const handleBuy = () => {
    if (!item.owned && count >= item.price) {
      purchase(item.price);
      addItem({ ...item, owned: true });
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrow-left" size={26} color="#000" />
      </TouchableOpacity>

      <Image
        source={require("../../../../assets/images/react-logo.png")}
        style={styles.image}
      />

      <Text style={styles.title}>
        {item.category === "coins" ? "Монета" : "Картина"} #{item.id}
      </Text>

      <View style={styles.bottomBlock}>
        <View style={styles.priceBox}>
          <Text style={styles.priceLabel}>$ {item.price.toLocaleString()}</Text>
        </View>

        {!item.owned ? (
          <TouchableOpacity
            style={[
              styles.buyBtn,
              count < item.price && { backgroundColor: "#9CA3AF" },
            ]}
            onPress={handleBuy}
            disabled={count < item.price}
          >
            <Text style={styles.buyText}>Купить</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.boughtBtn}>
            <Text style={styles.buyText}>Куплено</Text>
          </View>
        )}
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  backBtn: {
    position: "absolute",
    left: 16,
    top: 16,
    zIndex: 10,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 40,
  },

  image: {
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 16,
    marginHorizontal: 16,
    color: "#1a1a1a",
  },

  bottomBlock: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },

  priceBox: {
    backgroundColor: "#eef3fa",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
  },

  priceLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },

  buyBtn: {
    backgroundColor: "#2bb1fc",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },

  boughtBtn: {
    backgroundColor: "#2ecc71",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },

  buyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
