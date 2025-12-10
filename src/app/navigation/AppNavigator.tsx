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
import { BuyItemsScreen, BuyItemsDetailsScreen } from "@/screens/Items";
import {
  VechiclesShopScreen,
  GarageScreen,
  ConfirmBuyCarScreen,
  VehiclesScreen,
} from "@/screens/Vehicles";
import { IslandDetailsScreen, IslandScreen } from "@/screens/Island";
import { HonorsScreen, HonorsDetailsScreen, HonorItem } from "@/screens/Honors";
import {
  NftScreen,
  NftDetailsScreen,
  NftConfirmBuyScreen,
} from "@/screens/NFT";
import { GarageItem } from "@/features/garage";
import { NftItem } from "@/features/nft";
import { ImageSourcePropType } from "react-native";
import { Item } from "@/features/items";

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
  Garage: { type: "cars" | "planes" | "ships" };
  VechiclesShop: { type: "cars" | "planes" | "ships" };
  ConfirmBuyCar: { item: GarageItem };
  ConfirmBuyShipPlane: { item: GarageItem };
  BuyItems: {
    type:
      | "coins"
      | "paintings"
      | "uniqueItems"
      | "retroCars"
      | "jewels"
      | "stamps";
  };
  Honors: undefined;
  HonorsDetails: { item: HonorItem };
  Nft: undefined;
  NftDetails: { title: string; key: string };
  NftConfirmBuy: { nft: NftItem; collection: string };
  Island: undefined;
  IslandDetails: { islandId: number };
  BuyItemsDetails: { item: Item };
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
        name="VechiclesShop"
        component={VechiclesShopScreen}
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
      <Stack.Screen
        name="BuyItems"
        component={BuyItemsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Honors"
        component={HonorsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HonorsDetails"
        component={HonorsDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Nft"
        component={NftScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NftDetails"
        component={NftDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NftConfirmBuy"
        component={NftConfirmBuyScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Island"
        component={IslandScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="IslandDetails"
        component={IslandDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BuyItemsDetails"
        component={BuyItemsDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
