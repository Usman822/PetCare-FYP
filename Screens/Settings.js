import React, { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { height_screen, width_screen } from "../utils/Dimentions";
import { Ionicons } from "@expo/vector-icons";
import Btn from "../Components/Btn";
import { useNavigation } from "@react-navigation/core";
import firebase from "firebase";

const Settings = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };
  const EditHandle = () => {
    navigation.navigate("EditProfile");
  };
  const LogoutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("User signed out!"));
  };
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

      <View style={styles.views}>
        <TouchableOpacity onPress={EditHandle}>
          <Text style={styles.txt}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Text style={styles.txt}>Notification</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#EB712BAB" }}
            thumbColor={isEnabled ? "#EB712B" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.txt}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.txt}>Legal Information</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.txt}>Version</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.views2}>
        <Btn text="Sign Out" onPress={LogoutPress} />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.txt2}>PET MANAGER</Text>
          <Text>@ 2021 All Rights Reserved</Text>
          <Text>Pet Manager Rights</Text>
        </View>
      </View>
    </View>
  );
};

export default Settings;

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
  views: {
    backgroundColor: "#ddd",
    justifyContent: "space-evenly",
    flex: 1,
  },
  txt: {
    fontSize: height_screen * 0.028,
    marginLeft: width_screen * 0.08,
    color: "#000",
  },
  views2: {
    width: width_screen,
    height: height_screen * 0.3,
    backgroundColor: "#808080",
    alignItems: "center",
    justifyContent: "space-around",
  },
  txt2: {
    color: "#EB712B",
    fontSize: height_screen * 0.03,
    fontWeight: "bold",
  },
});
