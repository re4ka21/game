import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import { UpgradeScreen } from "@/screens/Upgrade";
import LoadingScreen from "@/screens/Loading/ui/LoadingScreen";
export type RootStackParamList = {
  Tabs: undefined;
  Upgrade: undefined;
  Loading: undefined;
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
    </Stack.Navigator>
  );
}
