import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/Login";
import SignUpAs from "../Screens/SignUpAs";
import User from "../Screens/User";
import Doctor from "../Screens/Doctor";
import Accessories from "../Screens/Accessories";
import BottomTab from "./BottomTab";
import MyDrawer from "./MyDrawer";
import EditProfile from "../Screens/EditProfile";
import PrivacyPolicy from "../Screens/PrivacyPolicy";
import LegalInfo from "../Screens/LegalInfo";
import FindaDoctor from "../Screens/FindaDoctor";
import ProdDetails from "../Screens/ProdDetails";
import Cart from "../Screens/Cart";
import Splash from "../Screens/Splash";
import CheckOut from "../Screens/CheckOut";
import MyOrders from "../Screens/MyOrders";
import Orders from "../Screens/Orders";

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUpAs" component={SignUpAs} />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Doctor" component={Doctor} />
      <Stack.Screen name="Accessories" component={Accessories} />
      <Stack.Screen name="Bottom" component={BottomTab} />
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Privacy" component={PrivacyPolicy} />
      <Stack.Screen name="LegalInfo" component={LegalInfo} />
      <Stack.Screen name="FindaDoc" component={FindaDoctor} />
      <Stack.Screen name="ProdDetails" component={ProdDetails} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="CheckOut" component={CheckOut} />
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="Orders" component={Orders} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
