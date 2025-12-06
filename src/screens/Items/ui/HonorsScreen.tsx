import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { ImageSourcePropType, ColorValue } from "react-native";
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Honors">;
export type HonorItem = {
  id: number;
  title: string;
  colors: readonly [ColorValue, ColorValue];
  image: ImageSourcePropType;
};
const DATA: HonorItem[] = [
  {
    id: 1,
    title: "The Owner",
    colors: ["#ff9966", "#5f5f5f"] as const,
    image: require("../../../../assets/images/react-logo.png"),
  },
  {
    id: 2,
    title: "Monopoly",
    colors: ["#00c6ff", "#0072ff"] as const,
    image: require("../../../../assets/images/react-logo.png"),
  },
  {
    id: 3,
    title: "Business Empire",
    colors: ["#ff5757", "#ff8c00"] as const,
    image: require("../../../../assets/images/react-logo.png"),
  },
  {
    id: 4,
    title: "Investor",
    colors: ["#6a6a6a", "#b3b3b3"] as const,
    image: require("../../../../assets/images/react-logo.png"),
  },
  {
    id: 5,
    title: "RichMan",
    colors: ["#00c48c", "#00835f"] as const,
    image: require("../../../../assets/images/react-logo.png"),
  },
];

export default function HonorsScreen() {
  const navigation = useNavigation<NavigationProp>();

  const renderItem = ({ item }: { item: HonorItem }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate("HonorsDetails", { item })}
    >
      <LinearGradient colors={item.colors} style={styles.iconWrapper}>
        <Image source={item.image} style={styles.icon} />
      </LinearGradient>

      <View style={styles.textWrapper}>
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Знаки отличия</Text>

        <View style={{ width: 26 }} />
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 20,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginLeft: 20,
  },

  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef3fa",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  icon: {
    width: 42,
    height: 42,
  },

  textWrapper: {
    justifyContent: "center",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
});
