import React, { memo } from "react";
import {
  Text,
  View,
  TextInput,
  TextInputComponent,
  StyleSheet,
} from "react-native";
import { height_screen, width_screen } from "../utils/Dimentions";

const MyTextInput = memo(({ text, placeholder, onChangeText }) => {
  return (
    <View style={{ marginVertical: height_screen * 0.009 }}>
      <Text style={styles.txt}>{text}</Text>
      <View style={styles.inputTxt}>
        <TextInput
          placeholder={placeholder}
          style={{
            fontSize: height_screen * 0.025,
            marginLeft: width_screen * 0.03,
          }}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
});

export default MyTextInput;
const styles = StyleSheet.create({
  inputTxt: {
    borderWidth: 1,
    borderColor: "#000",
    width: width_screen * 0.75,
    height: height_screen * 0.061,
    borderRadius: 10,
    justifyContent: "center",
    marginLeft: width_screen * 0.03,
  },
  txt: {
    fontSize: height_screen * 0.025,
    marginLeft: width_screen * 0.03,
  },
});
