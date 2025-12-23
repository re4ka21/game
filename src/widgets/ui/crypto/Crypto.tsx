import { View, Text, StyleSheet } from "react-native";

export const Crypto = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>💰 Криптовалюта</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    fontSize: 22,
  },
});
