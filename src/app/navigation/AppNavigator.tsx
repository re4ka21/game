import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import { UpgradeScreen } from "@/screens/Upgrade";
import { LoadingScreen } from "@/screens/Loading";
import { BuyCardScreen } from "@/screens/BuyCard";
import { BuyBusinessScreen } from "@/screens/BuyBusiness";
import { BusinessDetailsScreen } from "@/screens/BusinessDetails";
import { ChooseShopSizeScreen } from "@/screens/ChooseShopSize";
import { BusinessMergerScreen } from "@/screens/BusinessMerger";
export type RootStackParamList = {
  Tabs: { screen?: string } | undefined;
  Upgrade: undefined;
  Loading: undefined;
  BuyCard: { id: string; image: any; price?: number };
  BuyBusiness: undefined;
  BusinessDetails: { business: any };
  ChooseShopSize: { baseBusiness: any };
  BusinessMerger: undefined;
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
      <Stack.Screen
        name="BuyBusiness"
        component={BuyBusinessScreen}
        options={{
          title: "Покупка бізнесу",
          headerBackTitle: "Назад",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="BusinessDetails"
        component={BusinessDetailsScreen}
        options={{
          title: "Бизнес",
          headerBackTitle: "Назад",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ChooseShopSize"
        component={ChooseShopSizeScreen}
        options={{
          title: "Бизнес",
          headerBackTitle: "Назад",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="BusinessMerger"
        component={BusinessMergerScreen}
        options={{
          title: "Бизнес",
          headerBackTitle: "Назад",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
