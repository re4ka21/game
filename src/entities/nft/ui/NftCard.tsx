import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useNftStore } from "@/entities";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Nft">;

export default function NftCard() {
  const navigation = useNavigation<NavigationProp>();

  const collections = useNftStore((s) => s.collections);

  const allNfts = Object.values(collections).flat();

  const total = allNfts.length;
  const owned = allNfts.filter((n) => n.owned).length;

  const goTo = () => {
    navigation.navigate("Nft");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.itemCard} onPress={goTo}>
        <Image
          source={require("../../../../assets/images/react-logo.png")}
          style={styles.icon}
          resizeMode="contain"
        />

        <View style={styles.textBlock}>
          <Text style={styles.itemText}>NFT</Text>
          <Text style={styles.counterText}>
            {owned} із {total}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  itemCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef3fa",
    paddingVertical: 22,
    paddingHorizontal: 22,
    borderRadius: 26,
  },

  icon: {
    width: 100,
    height: 100,
    marginRight: 22,
  },

  textBlock: {
    flexDirection: "column",
  },

  itemText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
  },

  counterText: {
    marginTop: 6,
    fontSize: 15,
    color: "#8a8a8a",
  },
});
