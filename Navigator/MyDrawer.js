import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StackNavigator from "./StackNavigator";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { height_screen, width_screen } from "../utils/Dimentions";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Btn from "../Components/Btn";
import firebase from "firebase";
import BottomTab from "./BottomTab";

export default function MyDrawer({ navigation }) {
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
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="Bottom"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home-Drawer"
        component={BottomTab}
        options={{ drawerLabel: "Home" }}
      />
    </Drawer.Navigator>
  );
}
function CustomDrawerContent(props) {
  const [users, setUsers] = useState([]);
  const usermail = firebase.auth().currentUser.email;
  useEffect(() => {
    // getUrl();

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
  const LogoutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("User signed out!"));
  };
  return (
    <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
        }}
      >
        <View style={styles.profsec}>
          <TouchableOpacity style={{ alignSelf: "center" }}>
            <Image
              source={{
                uri: image,
              }}
              style={{ height: 100, width: 100, borderRadius: 50 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: height_screen * 0.025,
              color: "#EB712B",
              alignSelf: "center",
              fontWeight: "bold",
            }}
          >
            {users[0]?.userName}
          </Text>
        </View>
        <View style={styles.line2} />

        <View
          style={{
            flex: 1,
            marginTop: height_screen * 0.05,
          }}
        >
          <TouchableOpacity
            onPress={() => props.navigation.navigate("FindaDoc")}
            style={styles.drawer}
          >
            <Ionicons name="search" size={22} color="#EB712B" />
            <Text style={styles.txt}>Find a Doctor</Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => props.navigation.navigate("MyOrders")}
            style={styles.drawer}
          >
            <Ionicons name="bookmark-outline" size={22} color="#EB712B" />
            <Text style={styles.txt}>Saved Products</Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Orders")}
            style={styles.drawer}
          >
            <Ionicons name="cart-outline" size={22} color="#EB712B" />
            <Text style={styles.txt}>My Orders</Text>
          </TouchableOpacity>
          <View style={styles.line} />

          <TouchableOpacity style={styles.drawer}>
            <Ionicons name="book-outline" size={22} color="#EB712B" />

            <Text style={styles.txt}>Privacy Policy</Text>
          </TouchableOpacity>
          <View style={styles.line} />

          <TouchableOpacity style={styles.drawer}>
            <Ionicons
              name="information-circle-outline"
              size={22}
              color="#EB712B"
            />

            <Text style={styles.txt}>Legal Information</Text>
          </TouchableOpacity>
          <View style={styles.line} />

          <TouchableOpacity style={styles.drawer}>
            <Ionicons
              name="phone-landscape-outline"
              size={22}
              color="#EB712B"
            />
            <Text style={styles.txt}>About Us</Text>
          </TouchableOpacity>
          <View style={styles.line} />
        </View>
      </View>
      <View style={{ alignSelf: "center" }}>
        <Btn text="Sign Out" onPress={LogoutPress} />
      </View>
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  txt: {
    fontSize: height_screen * 0.025,
    color: "#808080",
    marginHorizontal: width_screen * 0.03,
  },
  line: {
    borderBottomWidth: 1,
    width: width_screen * 0.5,
    alignSelf: "center",
    marginVertical: height_screen * 0.018,
    borderBottomColor: "#d3d3d3",
  },
  line2: {
    borderBottomWidth: 1,
    width: width_screen * 0.75,
    alignSelf: "center",
    borderBottomColor: "#d3d3d3",
  },
  drawer: {
    marginTop: height_screen * 0.025,
    flexDirection: "row",
    marginLeft: width_screen * 0.035,
  },
  profsec: {
    width: width_screen * 0.75,
    alignSelf: "center",
    height: height_screen * 0.2,
  },
});
