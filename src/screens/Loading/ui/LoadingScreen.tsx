import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Tabs");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#1da085", "#1e2059"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Business Empire</Text>
        <Text style={styles.subtitle}>RichMan</Text>
      </View>

      <Image
        source={require("../../../../assets/images/money.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#40E0D0" />
        <Text style={styles.loadingText}>Загрузка...</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 90,
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
  },
  subtitle: {
    color: "#45c5ac",
    fontSize: 34,
    fontWeight: "700",
    marginTop: 4,
  },
  image: {
    width: 180,
    height: 180,
    marginTop: 60,
  },
  loaderContainer: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
  },
  loadingText: {
    color: "#B8B8B8",
    fontSize: 14,
    marginTop: 10,
  },
});

export default LoadingScreen;
