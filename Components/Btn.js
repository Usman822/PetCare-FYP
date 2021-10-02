import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { height_screen, width_screen } from "../utils/Dimentions";

const Btn = memo(({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.txt}>{text}</Text>
    </TouchableOpacity>
  );
});

export default Btn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EB712B",
    width: width_screen * 0.4,
    height: height_screen * 0.07,
    justifyContent: "center",
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
    color: "#ddd",
    fontSize: height_screen * 0.03,
  },
});
