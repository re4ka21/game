import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useNftStore } from "@/entities";

import AntDesign from "@expo/vector-icons/AntDesign";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "NftConfirmBuy"
>;
type NftDetailsRouteProp = RouteProp<RootStackParamList, "NftDetails">;

export default function NftDetailsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NftDetailsRouteProp>();
  const { title, key } = route.params as { title: string; key: string };

  const nfts = useNftStore((s) => s.collections[key] || []);

  const [tab, setTab] = useState<"purchase" | "collection">("purchase");

  const displayedNfts =
    tab === "purchase"
      ? nfts.filter((n) => !n.owned)
      : nfts.filter((n) => n.owned);

  const windowWidth = Dimensions.get("window").width;
  const cardSize = (windowWidth - 48) / 2;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={() => setTab("purchase")}
          style={[styles.tab, tab === "purchase" && styles.activeTab]}
        >
          <Text>Purchase</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab("collection")}
          style={[styles.tab, tab === "collection" && styles.activeTab]}
        >
          <Text>Collection</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayedNfts}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.nftCard, { width: cardSize, height: cardSize }]}
            onPress={() =>
              navigation.navigate("NftConfirmBuy", {
                nft: item,
                collection: key,
              })
            }
          >
            <Text style={styles.price}>{item.price} 💰</Text>
            <Image source={item.image} style={styles.nftImage} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center" },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    marginTop: 15,
    marginLeft: 20,
  },
  tabBar: { flexDirection: "row", marginBottom: 16 },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: { borderBottomColor: "blue" },
  nftCard: {
    backgroundColor: "#eef3fa",
    borderRadius: 16,
    marginBottom: 16,
    alignItems: "center",
    padding: 8,
    justifyContent: "space-between",
  },
  price: { fontWeight: "700", fontSize: 14, color: "#555" },
  nftImage: { width: "100%", height: "70%", resizeMode: "contain" },
  buyButton: {
    backgroundColor: "blue",
    padding: 6,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  ownedText: { color: "green", fontWeight: "700" },
});
