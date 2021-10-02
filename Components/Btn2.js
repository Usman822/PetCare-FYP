import React, { memo } from "react";
import { Ionicons } from "@expo/vector-icons";

import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { height_screen, width_screen } from "../utils/Dimentions";

const Btn2 = memo(({ text, onPress, text2, text3 }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.txt}>{text}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.txt}>{text2}</Text>
        <Text style={styles.txt}>{text3}</Text>
      </View>
      <Ionicons name="cart-sharp" size={26} color="#EB712B" />
    </TouchableOpacity>
  );
});

export default Btn2;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    width: width_screen * 0.8,
    height: height_screen * 0.07,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  txt: {
    color: "#EB712B",
    fontSize: height_screen * 0.035,
  },
});
