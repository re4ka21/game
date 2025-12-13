import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const Stocks = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("StocksMarket")}
      >
        <Text style={styles.title}>Фондовый рынок</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, styles.secondary]}
        onPress={() => navigation.navigate("Portfolio")}
      >
        <Text style={styles.title}>Мой портфель</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 14,
  },
  card: {
    backgroundColor: "#4A8DFF",
    borderRadius: 14,
    padding: 18,
  },
  secondary: {
    backgroundColor: "#2F80FF",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
