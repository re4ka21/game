import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { SHOP_SIZES } from "@/screens/Business";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ChooseShopSize"
>;
type RoutePropType = RouteProp<RootStackParamList, "ChooseShopSize">;
export default function ChooseShopSizeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { business } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Виберіть розмір вашого бізнесу</Text>

      {SHOP_SIZES.map((size) => (
        <TouchableOpacity
          key={size.id}
          style={styles.option}
          onPress={() =>
            navigation.navigate("BusinessDetails", {
              business: {
                ...business,
                price: Math.round(business.price * size.multiplier),
                incomePerHour: Math.round(
                  business.incomePerHour * size.multiplier
                ),
              },
            })
          }
        >
          <Text style={styles.optionText}>{size.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  option: {
    backgroundColor: "#f4f6fa",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
});
