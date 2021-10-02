import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { height_screen, width_screen } from "../utils/Dimentions";
import { Ionicons } from "@expo/vector-icons";
import Btn from "../Components/Btn";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import MyTextInput from "../Components/TextInput";
import { Picker } from "@react-native-picker/picker";
import firebase from "firebase";
import * as ImagePicker from "expo-image-picker";

const EditProfile = () => {
  const [users, setUsers] = useState([]);
  const [OldPassword, setOldPassword] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confPass, setConfPass] = useState("");

  const usermail = firebase.auth().currentUser.email;

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .where("email", "==", usermail)
      .onSnapshot((querySnapshot) => {
        const users = [];

        querySnapshot.forEach((documentSnapshot) => {
          users.push({
            ...documentSnapshot.data(),
            key: firebase.auth().currentUser.uid,
          });
        });

        setUsers(users);
        // console.log("user is", users);
        console.log("username = ", users[0]?.userName);
        if (users[0] == null || undefined) {
          firebase
            .firestore()
            .collection("doctors")
            .where("email", "==", usermail)
            .onSnapshot((querySnapshot) => {
              const users = [];

              querySnapshot.forEach((documentSnapshot) => {
                users.push({
                  ...documentSnapshot.data(),
                  key: firebase.auth().currentUser.uid,
                });
              });

              setUsers(users);
              console.log("doctor is", users[0]?.userName);
            });
        }
      });
    // getUrl();
    return () => {};
  }, []);

  // const getUrl = async () => {
  //   console.log("image");
  //   const iurl = await firebase
  //     .storage()
  //     .ref(`userImages/${usermail}`)
  //     .getDownloadURL()
  //     .then((iurl) => {
  //       setImage(iurl);
  //       console.log(iurl);
  //     })
  //     .catch((e) => {
  //       console.log("error is ", e);
  //     });
  // };

  // const uploadImageToFirebase = async (uri, userUID) => {
  //   const blob = await new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.onload = () => {
  //       resolve(xhr.response);
  //     };
  //     xhr.responseType = "blob";
  //     xhr.open("GET", image, true);
  //     xhr.send(null);
  //   });

  //   const ref = firebase.storage().ref().child(`userImages/${usermail}`);

  //   let snapshot = await ref.put(blob);

  //   return await snapshot.ref.getDownloadURL();
  // };

  const submitBtn = () => {
    // uploadImageToFirebase().then(() => Alert.alert("Profile Pic Updated"));
    // if (userName) {
    //   firebase
    //     .firestore()
    //     .collection("users")
    //     .doc(firebase.auth().currentUser.uid)
    //     .update({ userName: userName })
    //     .then(() => {
    //       Alert.alert("User Name Updated");
    //     })
    //     .catch(() => {
    //       firebase
    //         .firestore()
    //         .collection("doctors")
    //         .doc(firebase.auth().currentUser.uid)
    //         .update({ userName: userName })
    //         .then(() => {
    //           Alert.alert("User Name Updated");
    //         });
    //     });
    // } else {
    //   console.log("Enter userName");
    // }
    if (OldPassword && newPass) {
      if (newPass.length >= 6) {
        if (newPass === confPass) {
          const emailCred = firebase.auth.EmailAuthProvider.credential(
            firebase.auth().currentUser.email,
            OldPassword
          );
          firebase
            .auth()
            .currentUser.reauthenticateWithCredential(emailCred)
            .then(() => {
              console.log("Password Changed");
              firebase
                .auth()
                .signOut()
                .then(() => console.log("User signed out!"));
              return firebase.auth().currentUser.updatePassword(newPass);
            })
            .catch((error) => {
              Alert.alert("Error : ", error.message);
            });
        } else {
          Alert.alert("Password Doesn't Match");
        }
      } else {
        Alert.alert("Password Must be 6 Letters Long");
      }
    } else {
      Alert.alert("Enter PAss");
    }
  };
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
  const [secure, setSecure] = useState(true);

  // const [image, setImage] = useState(
  //   "https://png.pngitem.com/pimgs/s/146-1468843_profile-icon-orange-png-transparent-png.png"
  // );

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //   }
  // };
  const handleSecure = () => {
    setSecure(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back-sharp"
          size={33}
          color="#ddd"
          onPress={handleBack}
        />
        <Text style={styles.headertxt}>Edit Profile</Text>
      </View>

      {/* <TouchableOpacity
        onPress={pickImage}
        style={{ marginTop: height_screen * 0.01 }}
      >
        <Image
          source={{
            uri: image,
          }}
          style={{ height: 100, width: 100 ,border}}
        />
      </TouchableOpacity> */}
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <View style={{ marginVertical: height_screen * 0.04 }}>
          <Text style={styles.txt}>Old Password</Text>
          <View style={styles.input2}>
            <TextInput
              secureTextEntry={secure}
              onChangeText={setOldPassword}
              style={{
                fontSize: height_screen * 0.025,
                marginLeft: width_screen * 0.03,
                width: width_screen * 0.5,
              }}
            />
            <Ionicons name="eye-outline" size={25} onPress={handleSecure} />
          </View>
        </View>
        <View>
          <Text style={styles.txt}>New Password</Text>
          <View style={styles.input2}>
            <TextInput
              secureTextEntry={secure}
              onChangeText={setNewPass}
              style={{
                fontSize: height_screen * 0.025,
                marginLeft: width_screen * 0.03,
                width: width_screen * 0.5,
              }}
            />
            <Ionicons name="eye-outline" size={25} onPress={handleSecure} />
          </View>
        </View>
        <View style={{ marginVertical: height_screen * 0.04 }}>
          <Text style={styles.txt}>Confirm Password</Text>
          <View style={styles.input2}>
            <TextInput
              secureTextEntry={secure}
              onChangeText={setConfPass}
              style={{
                fontSize: height_screen * 0.025,
                marginLeft: width_screen * 0.03,
                width: width_screen * 0.5,
              }}
            />
            <Ionicons name="eye-outline" size={25} onPress={handleSecure} />
          </View>
        </View>
        <View style={{ marginVertical: height_screen * 0.04 }}>
          <Btn text="Submit" onPress={submitBtn} />
        </View>
      </ScrollView>
    </ScrollView>
  );
};
export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
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
  txt: {
    fontSize: height_screen * 0.025,
    marginLeft: width_screen * 0.03,
  },
  input2: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width_screen * 0.75,
    height: height_screen * 0.065,
    alignItems: "center",
    borderRadius: 19,
    backgroundColor: "#ddd",
  },
});
