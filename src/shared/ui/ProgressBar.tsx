import React from "react";
import { View, StyleSheet } from "react-native";

export default function ProgressBar({
  progress,
  color,
}: {
  progress: number;
  color: string;
}) {
  return (
    <View style={styles.progressBackground}>
      <View
        style={[
          styles.progressFill,
          { width: `${progress}%`, backgroundColor: color },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBackground: {
    height: 12,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 6,
  },
});
