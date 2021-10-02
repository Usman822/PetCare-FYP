import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { height_screen, width_screen } from "../utils/Dimentions";
import { Button } from "react-native-paper";

const MyBtn = memo(({ text, onPress, loading }) => {
  return (
    <Button
      contentStyle={styles.container}
      labelStyle={styles.txt}
      color="#EB712B"
      loading={loading}
      mode="contained"
      onPress={onPress}
    >
      {text}
    </Button>
  );
});

export default MyBtn;

const styles = StyleSheet.create({
  container: {
    height: height_screen * 0.06,
    width: width_screen * 0.6,
    justifyContent: "center",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
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
