import React, { useEffect } from "react";
import { useState } from "react";
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { height_screen, width_screen } from "../utils/Dimentions";
import { Ionicons } from "@expo/vector-icons";
import Btn from "../Components/Btn";
import { useNavigation } from "@react-navigation/core";
import firebase from "firebase";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MyDrawer from "../Navigator/MyDrawer";
import MyBtn from "../Components/MyBtn";

const Login = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser({ user });
      if (user) {
        navigation.replace("MyDrawer");
      }
    });

    return () => {};
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const handleSecure = () => {
    setSecure(false);
  };
  const handlePress = () => {
    setLoaded(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(() => {
        Alert.alert("Please Enter Correct Email & Password");
        setLoaded(false);
      });
  };
  const SignPress = () => {
    navigation.navigate("SignUpAs");
    // console.log(firebase.auth().currentUser.uid);
  };
  const handleSkip = () => {
    console.log("Skip");
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <ImageBackground
        source={require("../assets/background2.png")}
        style={styles.image}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: height_screen * 0.1,
          }}
        >
          <View style={{ marginTop: height_screen * 0.03 }}>
            <Text style={styles.txt}>Email</Text>
            <View style={styles.input}>
              <TextInput
                onChangeText={setEmail}
                style={{
                  fontSize: height_screen * 0.025,
                  marginLeft: width_screen * 0.03,
                }}
              />
            </View>
          </View>

          <View style={{ marginTop: height_screen * 0.03 }}>
            <Text style={styles.txt}>Password</Text>
            <View style={styles.input2}>
              <TextInput
                secureTextEntry={secure}
                onChangeText={setPassword}
                style={{
                  fontSize: height_screen * 0.025,
                  marginLeft: width_screen * 0.03,
                  width: width_screen * 0.5,
                }}
              />
              <Ionicons
                name="eye-outline"
                size={25}
                onPress={handleSecure}
                style={{ marginRight: width_screen * 0.02 }}
              />
            </View>
          </View>
          <View style={{ marginTop: height_screen * 0.05 }}>
            <MyBtn text="Login" loading={loaded} onPress={handlePress} />
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: height_screen * 0.03,
          }}
        >
          <Text style={{ fontSize: height_screen * 0.026, color: "#ddd" }}>
            Don't have account?
          </Text>
          <Text
            onPress={SignPress}
            style={{
              fontSize: height_screen * 0.025,
              textDecorationLine: "underline",
            }}
          >
            Sign Up
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    fontSize: height_screen * 0.026,
    color: "#000",
  },
  input: {
    width: width_screen * 0.75,
    height: height_screen * 0.065,
    borderColor: "#ddd",
    backgroundColor: "#ddd",
    borderRadius: 19,
    justifyContent: "center",
  },
  input2: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width_screen * 0.75,
    height: height_screen * 0.065,
    alignItems: "center",
    borderRadius: 19,
    backgroundColor: "#ddd",
  },
  skip: {
    position: "absolute",
    left: width_screen * 0.79,
    bottom: height_screen * 0.95,
  },
  skiptxt: {
    textDecorationLine: "underline",
    fontSize: height_screen * 0.032,
  },
});
