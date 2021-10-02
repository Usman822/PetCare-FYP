import React from "react";
import { View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Accessories from "../Screens/Accessories";
import { Ionicons } from "@expo/vector-icons";
import Cart from "../Screens/Cart";
import Settings from "../Screens/Settings";
import Profile from "../Screens/Profile";

const BottomTab = () => {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Accessories"
      activeColor="#272727"
      barStyle={{ backgroundColor: "#EB712B" }}
      tabBarOptions={{
        activeBackgroundColor: "#fff",
      }}
    >
      <Tab.Screen
        name="Accessories"
        component={Accessories}
        options={{
          activeBackgroundColor: "#272727",
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-outline"
              color={"#ddd"}
              size={26}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          activeBackgroundColor: "#272727",
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="cart-sharp"
              color={"#ddd"}
              size={26}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          activeBackgroundColor: "#272727",
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              color={"#ddd"}
              size={26}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Settings}
        options={{
          activeBackgroundColor: "#272727",
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings-sharp"
              color={"#ddd"}
              size={26}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
