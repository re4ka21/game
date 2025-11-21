import React from "react";
import { View, Text } from "react-native";

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
    <View
      style={[
        {
          backgroundColor: "#f2f3f7",
          padding: 6,
          borderRadius: 12,
          minHeight: 90,
          justifyContent: "flex-start",
        },
        style,
      ]}
    >
      {icon}
      <Text style={{ fontSize: 18, marginTop: 20, fontWeight: "600" }}>
        {mainText}
      </Text>
      <Text style={{ fontSize: 12, marginTop: 2, color: "#777" }}>
        {secondaryText}
      </Text>
    </View>
  );
}
