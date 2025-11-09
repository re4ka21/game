import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Business } from "@/screens/Business";
import { Earnings } from "@/screens/Earnings";
import { Investments } from "@/screens/Investments";
import { Profile } from "@/screens/Profile";
import { Items } from "@/screens/Items";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Earnings"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          backgroundColor: "#fff",
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8e8e93",
      }}
    >
      <Tab.Screen
        name="Investments"
        component={Investments}
        options={{
          tabBarLabel: "Investments",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trending-up-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Business"
        component={Business}
        options={{
          tabBarLabel: "Business",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="business-sharp" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Earnings"
        component={Earnings}
        options={{
          tabBarLabel: "Earnings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="logo-usd" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Items"
        component={Items}
        options={{
          tabBarLabel: "Items",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
