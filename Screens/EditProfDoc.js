import React, { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { height_screen, width_screen } from "../utils/Dimentions";
import { Ionicons } from "@expo/vector-icons";
import Btn from "../Components/Btn";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import MyTextInput from "../Components/TextInput";
import { Picker } from "@react-native-picker/picker";

const EditProfDoc = () => {
  <StatusBar style="inverted" />;
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };
  const [selectedLanguage, setSelectedLanguage] = useState("City");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [clinicAdd, setClinicAdd] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back-sharp"
          size={33}
          color="#ddd"
          onPress={handleBack}
        />
        <Text style={styles.headertxt}>Edit Profile</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <View>
          <MyTextInput
            text="User Name"
            placeholder="Name"
            onChangeText={setUserName}
          />
        </View>
        <View>
          <MyTextInput
            text="Email"
            placeholder="Email"
            onChangeText={setEmail}
          />
        </View>
        <View>
          <MyTextInput
            text="Phone No."
            placeholder="+92********"
            onChangeText={setNumber}
          />
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: "#000",
            borderRadius: 10,

            width: width_screen * 0.75,
            height: height_screen * 0.061,
            marginLeft: width_screen * 0.025,
            justifyContent: "center",
          }}
        >
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(setCity)
            }
          >
            <Picker.Item label="Islamabad" value="Islamabad" />
            <Picker.Item label="Lahore" value="Lahore" />
            <Picker.Item label="Karachi" value="Karachi" />
            <Picker.Item label="Faislabad" value="Faislabad" />
          </Picker>
        </View>
        <View>
          <MyTextInput
            text="Password"
            placeholder="*****"
            onChangeText={setPassword}
          />
        </View>
        <View>
          <Btn text="Submit" />
        </View>
      </View>
    </View>
  );
};
export default EditProfDoc;

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
