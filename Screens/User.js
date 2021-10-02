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
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";
import MyBtn from "../Components/MyBtn";
import storage from "@react-native-firebase/storage";

const User = () => {
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
  const [selectedLanguage, setSelectedLanguage] = useState("City");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [selectedCity, setSelectedCity] = useState("Islamabad");
  const [loaded, setLoaded] = useState(false);
  const [address, setAddress] = useState("");
  const [Gender, setGender] = useState("Male");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const uploadImageToFirebase = async (uri, userUID) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const ref = firebase.storage().ref().child(`userImages/${email}`);

    let snapshot = await ref.put(blob);

    return await snapshot.ref.getDownloadURL();
  };
  const upload = async () => {
    const reference = firebase.storage().ref(email);
    // path to existing file on filesystem
    const pathToFile = image;
    // uploads file
    await reference.put(pathToFile);
  };

  const onSignUp = () => {
    if (userName && email && number && password && confirmPass && image) {
      if (email == email.toLowerCase()) {
        if (password.length >= 6) {
          if (password === confirmPass) {
            setLoaded(true);
            uploadImageToFirebase();
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then((result) => {
                firebase
                  .firestore()
                  .collection("users")
                  .doc(firebase.auth().currentUser.uid)
                  .set({ userName, email, address, Gender, number });
              })
              .catch((error) => {
                Alert.alert(
                  "Error: Please Rewrite and check for the spaces in the end of email"
                );
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
      Alert.alert("Please Enter all Fields and Upload Image");
      setLoaded(false);
    }
    console.log(selectedCity);
  };

  return (
    <ImageBackground
      source={require("../assets/background4.png")}
      style={styles.image}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: height_screen * 0.06,
          flex: 1,
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
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
          <View>
            <MyTextInput
              text="Address"
              placeholder="Address"
              onChangeText={setAddress}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: height_screen * 0.025,
                marginLeft: width_screen * 0.03,
              }}
            >
              Gender
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
              selectedValue={Gender}
              onValueChange={(itemValue, itemIndex) => {
                setGender(itemValue);
              }}
            >
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Felmale" />
            </Picker>
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
            <MyBtn text="Sign Up" loading={loaded} onPress={onSignUp} />
          </View>
        </ScrollView>
      </ScrollView>
    </ImageBackground>
  );
};

export default User;
const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
