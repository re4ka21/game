import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";

import { AVAILABLE_BUSINESSES, BusinessType } from "@/screens/Business";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "BuyBusiness"
>;

export default function BuyBusinessScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleSelectBusiness = (b: BusinessType) => {
    if (b.isChain) {
      navigation.navigate("ChooseShopSize", { baseBusiness: b });
    } else {
      navigation.navigate("BusinessDetails", { business: b });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={AVAILABLE_BUSINESSES}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListHeaderComponent={
          <Text style={styles.title}>Виберіть категорію нового бізнесу</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleSelectBusiness(item)}
          >
            <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon as any} size={28} color="#fff" />
            </View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>От ${item.price.toLocaleString()}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 15,
  },
  card: {
    backgroundColor: "#f4f6fa",
    borderRadius: 16,
    width: "48%",
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 15,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#7f8c8d",
  },
});
