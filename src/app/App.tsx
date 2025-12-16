import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { StocksAutoUpdater } from "@/features/stocks";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      <StocksAutoUpdater />
    </NavigationContainer>
  );
}
