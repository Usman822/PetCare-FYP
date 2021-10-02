import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { height_screen, width_screen } from "../utils/Dimentions";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Btn from "../Components/Btn";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";
import { add } from "react-native-reanimated";

const Profile = () => {
  const [myLoading, setMyLoading] = useState(false);
  const email = firebase.auth().currentUser.email;

  const navigation = useNavigation();
  const [disable, setDisable] = useState(true);
  const handleBack = () => {
    navigation.goBack();
  };
  const [userName, setUserName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [number, setNumber] = useState("");
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
    getUrl();
    return () => {};
  }, []);

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
  const getUrl = async () => {
    console.log("image");
    const iurl = await firebase
      .storage()
      .ref(`userImages/${usermail}`)
      .getDownloadURL()
      .then((iurl) => {
        setImage(iurl);
        console.log(iurl);
      })
      .catch((e) => {
        console.log("error is ", e);
      });
  };
  const [image, setImage] = useState(
    "https://png.pngitem.com/pimgs/s/146-1468843_profile-icon-orange-png-transparent-png.png"
  );
  const editHandle = () => {
    setEdit(true);
    setDisable(false);
    console.log("edit");
  };
  const submitBtn = () => {
    console.log(userName);
    setMyLoading(true);
    uploadImageToFirebase();
    if (userName) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({ userName: userName })
        .then(() => {
          Alert.alert("Profile Updated");
          setMyLoading(false);
        })
        .catch((e) => {
          console.log("err is ", e);
          if (userName) {
            firebase
              .firestore()
              .collection("doctors")
              .doc(firebase.auth().currentUser.uid)
              .update({ userName: userName })
              .then(() => {
                Alert.alert("Profile Updated");
                setMyLoading(false);
              });
          }
        });
    }
    console.log(userName);

    if (address) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({ address: address })
        .then(() => {
          Alert.alert("Address Updated");
          setMyLoading(false);
        })
        .catch((e) => {
          console.log("err is ", e);
          if (userName) {
            firebase
              .firestore()
              .collection("doctors")
              .doc(firebase.auth().currentUser.uid)
              .update({ address: address })
              .then(() => {
                Alert.alert("Address Updated");
                setMyLoading(false);
              });
          }
        });
    }
    if (number) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({ number: number })
        .then(() => {
          Alert.alert("Phone Number Updated");
          setMyLoading(false);
        })
        .catch((e) => {
          console.log("err is ", e);
          if (userName) {
            firebase
              .firestore()
              .collection("doctors")
              .doc(firebase.auth().currentUser.uid)
              .update({ number: number })
              .then(() => {
                Alert.alert("Phone Number Updated");
                setMyLoading(false);
              });
          }
        });
    }
    setTimeout(() => {
      setMyLoading(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <TouchableOpacity
          style={{
            position: "absolute",
            right: width_screen * 0.09,
            top: height_screen * 0.01,
            zIndex: 1,
          }}
          onPress={editHandle}
        >
          <Text style={{ fontSize: height_screen * 0.025, color: "#EB712B" }}>
            EDIT
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{
              uri: image,
            }}
            style={{ height: 100, width: 100, borderRadius: 50 }}
          />
        </TouchableOpacity>

        <View style={styles.incontainer}>
          <Text style={styles.txt}>Name</Text>
          <TextInput
            placeholder={users[0]?.userName}
            editable={edit}
            onChangeText={setUserName}
          />
        </View>
        <View style={styles.incontainer}>
          <Text style={styles.txt}>Email</Text>
          <TextInput placeholder={usermail} editable={false} />
        </View>
        <View style={styles.incontainer}>
          <Text style={styles.txt}>Phone Number</Text>
          <TextInput
            placeholder={users[0]?.number}
            editable={edit}
            onChangeText={setNumber}
          />
        </View>

        <View style={styles.incontainer}>
          <Text style={styles.txt}>Gender</Text>
          <TextInput placeholder={users[0]?.Gender} editable={false} />
        </View>
        <View style={styles.incontainer}>
          <Text style={styles.txt}>Address</Text>
          <TextInput
            placeholder={users[0]?.address}
            editable={edit}
            onChangeText={setAddress}
          />
        </View>
        <View>
          <Button
            contentStyle={{ width: width_screen * 0.7 }}
            labelStyle={{ color: "#ddd" }}
            color="#EB712B"
            mode="contained"
            onPress={submitBtn}
            disabled={disable}
            loading={myLoading}
          >
            Update
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: height_screen * 0.05,
  },
  incontainer: {
    borderBottomColor: "#EB712B",
    borderBottomWidth: 2,
    width: width_screen * 0.8,
  },
  txt: {
    color: "#EB712B",
  },
});
