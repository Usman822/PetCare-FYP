import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { ImageBackground, Text } from "react-native";
import firebase from "firebase";

const Splash = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser({ user });
      if (user) {
        navigation.replace("MyDrawer");
      } else {
        navigation.replace("Login");
      }
    });

    return () => {};
  }, []);

  return (
    <ImageBackground
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      source={require("../assets/Splash.png")}
    ></ImageBackground>
  );
};

export default Splash;
