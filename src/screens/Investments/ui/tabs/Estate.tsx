import { View, Text, StyleSheet } from "react-native";

export const Estate = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🏠 Недвижимость</Text>
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
