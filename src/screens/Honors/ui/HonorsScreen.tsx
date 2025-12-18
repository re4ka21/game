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
import { useHonorsStore } from "@/entities";
import { DATA_HONORS } from "../model/constants/honors";
import { HonorItem } from "../model/type/honors";
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Honors">;

export default function HonorsScreen() {
  const { reset } = useHonorsStore();
  const navigation = useNavigation<NavigationProp>();
  const received = useHonorsStore((s) => s.received);

  const renderItem = ({ item }: { item: HonorItem }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate("HonorsDetails", { item })}
    >
      <LinearGradient colors={item.colors} style={styles.iconWrapper}>
        <Image source={item.image} style={styles.icon} />
      </LinearGradient>

      <View style={styles.textWrapper}>
        <View style={styles.textBackground}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          {received.includes(item.id) && (
            <Ionicons
              name="checkmark-circle"
              size={22}
              color="green"
              style={{ marginLeft: 10 }}
            />
          )}
        </View>
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
        data={DATA_HONORS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8 }}
      />

      <TouchableOpacity style={styles.resetButton} onPress={reset}>
        <Text style={{ color: "#fff" }}>reset</Text>
      </TouchableOpacity>
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
    paddingVertical: 12,
    paddingRight: 20,
    borderRadius: 24,
    marginBottom: 14,
  },

  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginRight: -20,
    zIndex: 1,
  },

  icon: {
    width: 42,
    height: 42,
  },

  textWrapper: {
    flex: 1,
    justifyContent: "center",
    zIndex: 0,
  },

  textBackground: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef1f6",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 18,
    overflow: "hidden",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    textAlign: "left",
    marginLeft: 10,
  },

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
