import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { height_screen, width_screen } from "../utils/Dimentions";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import Products from "../Components/Products";
import firebase from "firebase";
import ShoppingCartIcon from "../Components/ShoppingCartIcon";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../Redux/CartItem";
import { ADD_TO_FAV } from "../Redux/FavItems";

const Accessories = () => {
  const navigation = useNavigation();
  // const [users, setUsers] = useState([]);
  // const usermail = firebase.auth().currentUser.email;
  // useEffect(() => {
  //   firebase
  //     .firestore()
  //     .collection("users")
  //     .where("email", "==", usermail)
  //     .onSnapshot((querySnapshot) => {
  //       const users = [];

  //       querySnapshot.forEach((documentSnapshot) => {
  //         users.push({
  //           ...documentSnapshot.data(),
  //           key: firebase.auth().currentUser.uid,
  //         });
  //       });

  //       setUsers(users);
  //     });
  //   return () => {};
  // }, []);

  const dispatch = useDispatch();
  const addItemToCart = (item) =>
    dispatch({ type: ADD_TO_CART, payload: item });

  const addItemToFav = (item) => dispatch({ type: ADD_TO_FAV, payload: item });

  const openDrawer = () => {
    navigation.toggleDrawer("MyDrawer");
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/6.png")}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          marginTop: height_screen * 0.05,
        }}
      >
        <View style={styles.icon}>
          <Ionicons
            name="menu"
            size={26}
            color="#ddd"
            style={styles.icon}
            onPress={openDrawer}
          />
        </View>
        <View>
          <Text style={styles.txt}>PET MANAGER</Text>
        </View>
        <View style={styles.icon2}>
          <ShoppingCartIcon />
        </View>
      </View>
      <ScrollView
        style={{
          marginTop: height_screen * 0.02,
          backgroundColor: "#ddd",
          width: width_screen,
          height: height_screen * 0.99,
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: height_screen * 0.04,
              marginLeft: width_screen * 0.08,
              marginTop: height_screen * 0.02,
            }}
          >
            Accessories
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          style={{
            flexDirection: "row",
            height: height_screen * 0.3,
            marginTop: height_screen * 0.02,
          }}
          contentContainerStyle={{
            justifyContent: "space-around",
          }}
        >
          <FlatList
            data={Products}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.box}
                onPress={() => navigation.navigate("ProdDetails", { item })}
              >
                <Image source={item.picture} style={styles.img} />
                <Text>{item.title}</Text>
                <Text style={styles.txt2}>{item.cost} </Text>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
        <View>
          <Text
            style={{
              fontSize: height_screen * 0.04,
              marginLeft: width_screen * 0.08,
              marginTop: height_screen * 0.02,
            }}
          >
            Food
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          style={{
            flexDirection: "row",
            height: height_screen * 0.3,
            marginTop: height_screen * 0.02,
          }}
          contentContainerStyle={{
            justifyContent: "space-around",
          }}
        >
          <FlatList
            data={Products}
            keyExtractor={(item) => item.id}
            horizontal={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.box}
                onPress={() => navigation.navigate("ProdDetails", { item })}
              >
                <Image source={item.picture} style={styles.img} />
                <Text>{item.title}</Text>
                <Text style={styles.txt2}>{item.cost} </Text>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
        <View>
          <Text
            style={{
              fontSize: height_screen * 0.04,
              marginLeft: width_screen * 0.08,
              marginTop: height_screen * 0.02,
            }}
          >
            Vaccines
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          style={{
            flexDirection: "row",
            height: height_screen * 0.3,
            marginTop: height_screen * 0.02,
          }}
          contentContainerStyle={{
            justifyContent: "space-around",
          }}
        >
          <FlatList
            data={Products}
            keyExtractor={(item) => item.id}
            horizontal={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.box}
                onPress={() => navigation.navigate("ProdDetails", { item })}
              >
                <Image source={item.picture} style={styles.img} />
                <Text>{item.title}</Text>
                <Text style={styles.txt2}>{item.cost} </Text>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </ScrollView>
    </ImageBackground>
  );
};

export default Accessories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
  },
  icon: {
    marginTop: height_screen * 0.004,
  },
  icon2: {
    marginTop: height_screen * 0.006,
    marginLeft: width_screen * 0.05,
  },
  txt: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    fontSize: height_screen * 0.035,
    color: "#ddd",
  },
  box: {
    marginTop: height_screen * 0.02,
    marginHorizontal: width_screen * 0.02,
    marginLeft: width_screen * 0.03,
    height: height_screen * 0.25,
    width: width_screen * 0.4,
    backgroundColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  img: {
    height: height_screen * 0.15,
    resizeMode: "contain",
    position: "relative",
  },
  txt2: {
    fontWeight: "bold",
    fontSize: height_screen * 0.03,
  },
  modaltxt: {
    color: "#ddd",
    fontSize: height_screen * 0.04,
  },
  mdltxt: {
    color: "#ddd",
    fontSize: height_screen * 0.03,
  },
});
