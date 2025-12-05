import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { ImageSourcePropType } from "react-native";
import { useItemsStore } from "@/features/items";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "BuyItems">;

export type ShopCategory = {
  label: string;
  type:
    | "coins"
    | "paintings"
    | "uniqueItems"
    | "retroCars"
    | "jewels"
    | "stamps";
  image: ImageSourcePropType;
};

type Props = {
  categories: ShopCategory[];
};

export default function MiddleItemComponent({ categories }: Props) {
  const navigation = useNavigation<NavigationProp>();
  const itemsStore = useItemsStore();

  const goTo = (type: ShopCategory["type"]) => {
    navigation.navigate("BuyItems", { type });
  };

  return (
    <View style={{ marginTop: 20 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Колекции</Text>
      </View>

      <View style={styles.container}>
        {categories.map((cat) => {
          const total = itemsStore.getByCategory(cat.type).length;
          const owned = itemsStore.getCollectionByCategory(cat.type).length;

          return (
            <TouchableOpacity
              key={cat.type}
              style={styles.itemCard}
              onPress={() => goTo(cat.type)}
            >
              <Image
                source={cat.image}
                style={styles.bgImage}
                resizeMode="contain"
              />

              <Text style={styles.itemText}>{cat.label}</Text>

              <Text style={styles.counterText}>
                {owned}/{total}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 40) / 2;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  itemCard: {
    width: cardWidth,
    height: 160,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "#e4ecf9",
    alignItems: "center",
    paddingVertical: 8,
  },
  bgImage: {
    width: "100%",
    height: 100,
    borderRadius: 12,
  },
  itemText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    color: "#000",
  },
  counterText: {
    marginTop: 4,
    fontSize: 12,
    color: "gray",
    textAlign: "center",
  },
});
