import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useCounterStore } from "@/features/counter";
import { useNftStore } from "@/features/nft";
import AntDesign from "@expo/vector-icons/AntDesign";

type RouteProps = RouteProp<RootStackParamList, "NftConfirmBuy">;

export default function NftConfirmBuyScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();

  const { nft, collection } = route.params;

  const balance = useCounterStore((s) => s.count);
  const spend = useCounterStore((s) => s.purchase);

  const buyNft = useNftStore((s) => s.buyNft);

  const handleBuy = () => {
    if (balance < nft.price) {
      alert("Недостатньо коштів!");
      return;
    }

    spend(nft.price);

    buyNft(collection, nft.id);

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrow-left" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.balance}>Баланс: {balance.toFixed(2)} ETH</Text>
      </View>

      <Image source={nft.image} style={styles.nftImage} />

      <View style={styles.topRow}>
        <Text style={styles.name}>{collection}</Text>

        <View style={styles.priceBadge}>
          <Text style={styles.priceBadgeText}>💠 {nft.price} ETH</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
        <Text style={styles.buyButtonText}>Купить</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 20,
  },

  balance: {
    fontSize: 16,
    fontWeight: "600",
  },

  nftImage: {
    width: "100%",
    height: 260,
    borderRadius: 20,
    marginBottom: 20,
    resizeMode: "cover",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: { fontSize: 20, fontWeight: "700" },

  priceBadge: {
    backgroundColor: "#f2f4ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  priceBadgeText: {
    fontSize: 14,
    color: "#4a4aff",
    fontWeight: "600",
  },

  buyButton: {
    marginTop: 30,
    backgroundColor: "#297bff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  buyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
