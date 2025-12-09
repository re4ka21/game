import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  CAPACITY_VALUES,
  CAPACITY_COST_MAP,
} from "@/entities/business/model/capacity";
import { colors } from "@/shared";

export default function CapacityButtons({
  currentCapacity,
  count,
  onPress,
}: {
  currentCapacity: number;
  count: number;
  onPress: (value: number) => void;
}) {
  return (
    <View style={styles.btnRow}>
      {CAPACITY_VALUES.map((value) => {
        const cost = CAPACITY_COST_MAP[value];
        const isDisabled = count < cost || currentCapacity + value > 40;

        return (
          <TouchableOpacity
            key={value}
            style={[
              styles.capacityBtn,
              isDisabled && styles.capacityBtnDisabled,
            ]}
            onPress={() => onPress(value)}
            disabled={isDisabled}
          >
            <Text>
              +{value} місць{"\n"}${cost.toLocaleString()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  capacityBtn: {
    backgroundColor: colors.backgroundWhite,
    padding: 4,
    borderRadius: 12,
    width: "30%",
    height: 45,
    alignItems: "center",
  },
  capacityBtnDisabled: { backgroundColor: "#ccc" },
});
