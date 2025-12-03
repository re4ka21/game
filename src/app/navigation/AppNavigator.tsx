import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import { UpgradeScreen } from "@/screens/Upgrade";
import { LoadingScreen } from "@/screens/Loading";
import { BuyCardScreen } from "@/screens/BuyCard";
import {
  BusinessType,
  BuyBusinessScreen,
  BusinessDetailsScreen,
  ChooseShopSizeScreen,
  BusinessMergerScreen,
  DetailsDependentScreen,
  DetailsInDependentScreen,
  SettingsScreen,
  ChangeNameScreen,
  CarsParkScreen,
  BuyCarsScreen,
} from "@/screens/Business";
import {
  ShopScreen,
  GarageScreen,
  ConfirmBuyCarScreen,
  VehiclesScreen,
} from "@/screens/Items";
import { GarageItem } from "@/features/items";
import { ImageSourcePropType } from "react-native";
export type RootStackParamList = {
  Tabs: { screen?: string } | undefined;
  Upgrade: undefined;
  Loading: undefined;
  BuyCard: { id: string; image: ImageSourcePropType; price?: number };
  BuyBusiness: undefined;
  BusinessDetails: { business: BusinessType };
  ChooseShopSize: { business: BusinessType };
  BusinessMerger: undefined;
  DetailsDependent: { business: BusinessType };
  DetailsInDependent: { business: BusinessType };
  Settings: { business: BusinessType };
  ChangeName: { business: BusinessType };
  CarsPark: { business: BusinessType };
  BuyCars: { business: BusinessType };
  Shop: { type: "cars" | "planes" | "ships" };
  Garage: { type: "cars" | "ships" | "planes" };
  ConfirmBuyCar: { item: GarageItem };
  ConfirmBuyShipPlane: { item: GarageItem };
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
      <Stack.Screen
        name="DetailsDependent"
        component={DetailsDependentScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailsInDependent"
        component={DetailsInDependentScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangeName"
        component={ChangeNameScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CarsPark"
        component={CarsParkScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BuyCars"
        component={BuyCarsScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Garage"
        component={GarageScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConfirmBuyCar"
        component={ConfirmBuyCarScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConfirmBuyShipPlane"
        component={VehiclesScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
