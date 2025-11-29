import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/navigation/AppNavigator";
import { useGarageStore } from "@/features/items";

type ItemsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Garage"
>;
export default function Items() {
  const navigation = useNavigation<ItemsScreenNavigationProp>();
  const { reset } = useGarageStore();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Предметы</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.itemCard}
          onPress={() => navigation.navigate("Garage", { type: "cars" })}
        >
          <Image
            source={require("../../../../assets/images/react-logo.png")}
            style={styles.bgImage}
          />
          <Text style={styles.itemText}>Гараж</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemCard}
          onPress={() => navigation.navigate("Garage", { type: "planes" })}
        >
          <Image
            source={require("../../../../assets/images/react-logo.png")}
            style={styles.bgImage}
          />
          <Text style={styles.itemText}>Ангар</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemCard}
          onPress={() => navigation.navigate("Garage", { type: "ships" })}
        >
          <Image
            source={require("../../../../assets/images/react-logo.png")}
            style={styles.bgImage}
          />
          <Text style={styles.itemText}>Причал</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Shop", { type: "cars" })}
        >
          <Text style={styles.tabText}>Автосалон</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Shop", { type: "planes" })}
        >
          <Text style={styles.tabText}>Авиамагазин</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Shop", { type: "ships" })}
        >
          <Text style={styles.tabText}>Яхт-шоп</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={reset} style={styles.resetBtn}>
        <Text style={styles.tabText}>RESET</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "700", marginLeft: 16, marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-around" },
  itemCard: {
    width: 110,
    height: 110,
    borderRadius: 18,
    overflow: "hidden",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    opacity: 0.85,
  },
  itemText: {
    position: "absolute",
    bottom: 10,
    left: 8,
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textShadowColor: "black",
    textShadowRadius: 6,
  },
  tabs: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    marginHorizontal: 10,
  },
  tabText: { fontSize: 16, color: "#000" },
  resetBtn: {
    position: "absolute",
    bottom: 20,
    left: 100,
    backgroundColor: "red",
    padding: 8,
    borderRadius: 20,
  },
});
