import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import { UpgradeScreen } from "@/screens/Upgrade";
import { LoadingScreen } from "@/screens/Loading";
import { BuyCardScreen } from "@/screens/BuyCard";
export type RootStackParamList = {
  Tabs: { screen?: string } | undefined;
  Upgrade: undefined;
  Loading: undefined;
  BuyCard: { id: number; image: any; price?: number };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      id={undefined}
      initialRouteName="Loading"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Tabs" component={BottomTabs} />
      <Stack.Screen
        name="Upgrade"
        component={UpgradeScreen}
        options={{
          title: "Покращення",
          headerBackTitle: "Назад",
          headerShown: true,
        }}
      />
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen
        name="BuyCard"
        component={BuyCardScreen}
        options={{
          title: "Покупка фону",
          headerBackTitle: "Назад",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
