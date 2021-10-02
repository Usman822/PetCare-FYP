import React from "react";
import { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { height_screen, width_screen } from "../utils/Dimentions";
import { Ionicons } from "@expo/vector-icons";
import Btn from "../Components/Btn";
import { useNavigation } from "@react-navigation/core";

const SignUpAs = () => {
  const { navigate } = useNavigation();
  const handlePress = () => {
    navigate("User");
  };
  const handlePressDoc = () => {
    navigate("Doctor");
  };
  return (
    <ImageBackground
      source={require("../assets/background2.png")}
      style={styles.image}
    >
      <View style={{ marginTop: height_screen * 0.25 }}>
        <View>
          <Text
            style={{
              fontSize: height_screen * 0.04,
              fontWeight: "bold",
              color: "#ddd",
            }}
          >
            Sign Up As
          </Text>
        </View>
        <View style={{ marginVertical: height_screen * 0.08 }}>
          <Btn text="User" onPress={handlePress} />
        </View>
        <View style={{}}>
          <Btn text="Doctor" onPress={handlePressDoc} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignUpAs;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});
