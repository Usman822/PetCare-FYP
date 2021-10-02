import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native";
import MyTextInput from "../Components/TextInput";
import { height_screen, width_screen } from "../utils/Dimentions";
import { Picker } from "@react-native-picker/picker";
import Btn from "../Components/Btn";
import firebase from "firebase";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { EMPTY_CART } from "../Redux/CartItem";

const CheckOut = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState("City");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [code, setCode] = useState("");
  const [address, setAddress] = useState("");
  const [checked, setChecked] = useState(true);

  const onSignUp = (item) => {
    if (userName && email && number && code && address) {
      navigation.replace("MyDrawer");
      dispatch({
        type: EMPTY_CART,
        payload: item,
      });
      Alert.alert("Items Booked Thanks For Shopping");
    } else {
      Alert.alert("Please Enter All Info");
    }
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((result) => {
    //     firebase
    //       .firestore()
    //       .collection("users")
    //       .doc(firebase.auth().currentUser.uid)
    //       .set({ userName, email, image });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <ImageBackground
      source={require("../assets/background4.png")}
      style={styles.image}
    >
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "space-between",
          marginTop: height_screen * 0.1,
        }}
      >
        <View>
          <MyTextInput
            text="Name"
            placeholder="Enter Name"
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
        <View>
          <MyTextInput
            text="Postal Code"
            placeholder="*****"
            onChangeText={setCode}
          />
        </View>
        <View>
          <MyTextInput
            text="Address"
            placeholder="Enter Your Address"
            onChangeText={setAddress}
          />
        </View>
        <View
          style={{
            alignSelf: "center",
            marginVertical: height_screen * 0.025,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Checkbox
              color="#EB712B"
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={{ fontSize: height_screen * 0.02 }}>
              Cash On Delivery
            </Text>
          </View>
          <Btn text="Book" onPress={onSignUp} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default CheckOut;
const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },
});
