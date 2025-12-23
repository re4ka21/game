import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { InvestmentsTabs } from "@/widgets";
import { Tab } from "@/entities";
import { Stocks, Estate, Crypto } from "@/widgets";
export default function Investments() {
  const [active, setActive] = useState<Tab>("stocks");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Инвестиции</Text>

      <InvestmentsTabs active={active} onChange={setActive} />

      <View style={styles.content}>
        {active === "stocks" && <Stocks />}
        {active === "estate" && <Estate />}
        {active === "crypto" && <Crypto />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 25,
  },
  content: {
    marginTop: 30,
  },
});
