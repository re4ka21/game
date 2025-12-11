import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { InvestmentsTabs } from "@/entities";
import { Tab } from "@/entities";
export default function Investments() {
  const [active, setActive] = useState<Tab>("stocks");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Инвестиции</Text>

      <InvestmentsTabs active={active} onChange={setActive} />

      <View style={styles.content}>
        {active === "stocks" && (
          <Text style={styles.contentText}>📈 Акции</Text>
        )}
        {active === "estate" && (
          <Text style={styles.contentText}>🏠 Недвижимость</Text>
        )}
        {active === "crypto" && (
          <Text style={styles.contentText}>💰 Криптовалюта</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 40 },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 25,
  },
  content: { marginTop: 30, alignItems: "center" },
  contentText: { fontSize: 22 },
});
