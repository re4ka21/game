import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNftStore, NftItem } from "@/features/nft";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Nft">;

const COLLECTIONS = [
  {
    id: 1,
    title: "Nothing like that just neo",
    key: "neo",
    nfts: [
      {
        id: 1,
        image: require("../../../../assets/images/react-logo.png"),
        price: 100,
      },
      {
        id: 2,
        image: require("../../../../assets/images/react-logo.png"),
        price: 120,
      },
    ],
  },
  {
    id: 2,
    title: "Community pack #1",
    key: "community",
    nfts: [
      {
        id: 3,
        image: require("../../../../assets/images/react-logo.png"),
        price: 50,
      },
      {
        id: 4,
        image: require("../../../../assets/images/react-logo.png"),
        price: 80,
      },
    ],
  },
];

export default function NftScreen() {
  const { reset } = useNftStore();
  const navigation = useNavigation<NavigationProp>();
  const collections = useNftStore((s) => s.collections);
  const initCollection = useNftStore((s) => s.initCollection);

  useEffect(() => {
    COLLECTIONS.forEach((c) => initCollection(c.key, c.nfts));
  }, []);

  const goToDetails = (key: string, title: string) => {
    navigation.navigate("NftDetails", { title, key });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NFT</Text>
      </View>

      {COLLECTIONS.map((c) => {
        const ownedCount =
          collections[c.key]?.filter((n) => n.owned).length || 0;
        return (
          <TouchableOpacity
            key={c.id}
            style={styles.card}
            onPress={() => goToDetails(c.key, c.title)}
          >
            <Image source={c.nfts[0].image} style={styles.image} />
            <View style={styles.textBlock}>
              <Text style={styles.collection}>Колекція</Text>
              <Text style={styles.title}>{c.title}</Text>
              <Text style={styles.counter}>
                {ownedCount} із {c.nfts.length}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity style={styles.resetButton} onPress={reset}>
        <Text style={{ color: "#fff" }}>reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", marginVertical: 15 },
  headerTitle: { fontWeight: "600", fontSize: 23, marginLeft: 20 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef3fa",
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
  },
  image: { width: 80, height: 80, marginRight: 16 },
  textBlock: { flex: 1, flexDirection: "column" },
  collection: { fontSize: 14, color: "gray" },
  title: { fontSize: 20, fontWeight: "700", color: "#1a1a1a" },
  counter: { marginTop: 8, fontSize: 16, color: "#555" },
  resetButton: {
    backgroundColor: "red",
    position: "absolute",
    bottom: 20,
    left: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
