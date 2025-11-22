import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../config/theme/colors";

type InfoCardProps = {
  icon: React.ReactNode;
  mainText: string | number;
  secondaryText: string;
  style?: object;
};

export default function InfoCard({
  icon,
  mainText,
  secondaryText,
  style,
}: InfoCardProps) {
  return (
    <View style={[styles.container, style]}>
      {icon}
      <Text style={styles.mainText}>{mainText}</Text>
      <Text style={styles.secondaryText}>{secondaryText}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundWhite,
    padding: 6,
    borderRadius: 12,
    minHeight: 90,
    justifyContent: "flex-start",
  },
  mainText: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "600",
  },
  secondaryText: {
    fontSize: 12,
    marginTop: 2,
    color: "#777",
  },
});
