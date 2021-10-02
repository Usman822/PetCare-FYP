import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import MyDrawer from "../MyDrawer";
import StackNavigator from "../StackNavigator";

const Main = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default Main;
