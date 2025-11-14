import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";

const sizes = [
  { id: 1, name: "Невеликий магазин", multiplier: 1 },
  { id: 2, name: "Середня мережа", multiplier: 1.5 },
  { id: 3, name: "Крупна мережа", multiplier: 2 },
];

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ChooseShopSize"
>;

export default function ChooseShopSizeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<any>();
  const { baseBusiness } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Виберіть розмір вашого бізнесу</Text>

      {sizes.map((size) => (
        <TouchableOpacity
          key={size.id}
          style={styles.option}
          onPress={() =>
            navigation.navigate("BusinessDetails", {
              business: {
                ...baseBusiness,
                name: `${baseBusiness.name}`,
                price: Math.round(baseBusiness.price * size.multiplier),
                incomePerHour: Math.round(
                  baseBusiness.incomePerHour * size.multiplier
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
