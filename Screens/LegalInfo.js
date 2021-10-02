import React from "react";
import { StyleSheet } from "react-native";
import { height_screen, width_screen } from "../utils/Dimentions";

const LegalInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back-sharp"
          size={33}
          color="#ddd"
          onPress={handleBack}
        />
        <Text style={styles.headertxt}>Settings</Text>
      </View>
    </View>
  );
};

export default LegalInfo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  header: {
    backgroundColor: "#EB712B",
    width: width_screen,
    height: height_screen * 0.1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  headertxt: {
    fontSize: height_screen * 0.03,
    color: "#ddd",
    marginBottom: height_screen * 0.009,
  },
});
