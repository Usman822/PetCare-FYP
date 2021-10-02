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
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import MyBtn from "../Components/MyBtn";

const Doctor = () => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const [image, setImage] = useState(
    "https://png.pngitem.com/pimgs/s/146-1468843_profile-icon-orange-png-transparent-png.png"
  );

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [clinicAdd, setClinicAdd] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedCity, setSelectedCity] = useState("Islamabad");
  const [loaded, setLoaded] = useState(false);

  const { navigate } = useNavigation();

  const handlePress = () => {
    if (userName && email && phone && password && confirmPass) {
      if (email == email.toLowerCase()) {
        if (password.length >= 6) {
          if (password === confirmPass) {
            setLoaded(true);
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then((result) => {
                firebase
                  .firestore()
                  .collection("doctors")
                  .doc(firebase.auth().currentUser.uid)
                  .set({
                    userName,
                    email,
                    selectedCity,
                    clinicAdd,
                    image,
                    phone,
                    experience,
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            Alert.alert("Password did not match confirm password");
            setLoaded(false);
          }
        } else {
          Alert.alert("Password should be of 6 or more characters");
        }
      } else {
        Alert.alert("Please Enter Correct Email");
        setLoaded(false);
      }
    } else {
      Alert.alert("Please Enter all Fields");
      setLoaded(false);
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background4.png")}
      style={styles.image}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: height_screen * 0.06,
          }}
        >
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{
                uri: image,
              }}
              style={{ height: 100, width: 100, borderRadius: 50 }}
            />
          </TouchableOpacity>

          <View
            style={{
              justifyContent: "space-evenly",
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
                onChangeText={setPhone}
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: height_screen * 0.025,
                  marginLeft: width_screen * 0.03,
                }}
              >
                City
              </Text>
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
                selectedValue={selectedCity}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedCity(itemValue);
                }}
              >
                <Picker.Item label="Islamabad" value="Islamabad" />
                <Picker.Item label="Lahore" value="Lahore" />
                <Picker.Item label="Karachi" value="Karachi" />
                <Picker.Item label="Faislabad" value="Faislabad" />
              </Picker>
            </View>
            <View>
              <MyTextInput
                text="Clinic Address"
                placeholder="xyz"
                onChangeText={setClinicAdd}
              />
            </View>
            <View>
              <MyTextInput
                text="Experience"
                placeholder="xyz"
                onChangeText={setExperience}
              />
            </View>
            <View>
              <MyTextInput
                text="Password"
                placeholder="*****"
                onChangeText={setPassword}
              />
            </View>
            <View>
              <MyTextInput
                text="Confirm Password"
                placeholder="*****"
                onChangeText={setConfirmPass}
              />
            </View>
            <View
              style={{
                alignSelf: "center",
                marginVertical: height_screen * 0.025,
              }}
            >
              <MyBtn text="Sign Up" onPress={handlePress} loading={loaded} />
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Doctor;
const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
