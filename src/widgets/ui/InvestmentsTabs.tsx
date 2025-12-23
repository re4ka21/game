import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Tab } from "../../entities/investments/model/type";

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
}

export const InvestmentsTabs = ({ active, onChange }: Props) => {
  return (
    <View style={styles.tabsRow}>
      <TouchableOpacity
        style={styles.tabWrapper}
        onPress={() => onChange("stocks")}
      >
        <Text
          style={[styles.tabText, active === "stocks" && styles.activeTabText]}
        >
          Акции
        </Text>
        {active === "stocks" && <View style={styles.underline} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabWrapper}
        onPress={() => onChange("estate")}
      >
        <Text
          style={[styles.tabText, active === "estate" && styles.activeTabText]}
        >
          Недвижимость
        </Text>
        {active === "estate" && <View style={styles.underline} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabWrapper}
        onPress={() => onChange("crypto")}
      >
        <Text
          style={[styles.tabText, active === "crypto" && styles.activeTabText]}
        >
          Криптовалюта
        </Text>
        {active === "crypto" && <View style={styles.underline} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
  },
  tabWrapper: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 18,
    color: "#666",
  },
  activeTabText: {
    color: "#2F80ED",
    fontWeight: "500",
  },
  underline: {
    marginTop: 6,
    height: 2,
    width: 60,
    backgroundColor: "#2F80ED",
  },
});
