import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import firebase from "firebase/app";
import { LogBox } from "react-native";
import { height_screen, width_screen } from "../utils/Dimentions";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

LogBox.ignoreLogs(["Setting a timer"]);

const Orders = () => {
  const usermail = firebase.auth().currentUser.email;

  const [data, setData] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("Orders")
      .where("mail", "==", usermail)
      .onSnapshot((querySnapshot) => {
        const mydata = [];

        querySnapshot.forEach((documentSnapshot) => {
          mydata.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setData(mydata);
      });
  }, []);

  const Press = () => {
    console.log(data);
  };
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };
  const id = Math.random();
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
      <ImageBackground
        source={require("../assets/background4.png")}
        style={styles.container2}
      >
        {data?.length ? (
          <FlatList
            keyExtractor={(item) => item.key}
            data={data}
            renderItem={({ item }) => (
              <View style={styles.box}>
                <Text>Items Orders: {item.myValue}</Text>
                <Text>Order Id: {item.myid}</Text>
                <Text>Order: {item.name}</Text>
                <Text>Order Date: {item.todayDate}</Text>
                <Text>Total Amount: {item.total}</Text>
                <Text>Status: Delivered </Text>
              </View>
            )}
          />
        ) : (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartMessage}>
              You Have No Orders Recently
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default Orders;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    flex: 1,
    resizeMode: "cover",
  },
  box: {
    width: width_screen * 0.95,
    height: height_screen * 0.3,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#ddd",

    fontSize: height_screen * 0.035,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartMessage: {
    color: "#ddd",
    fontWeight: "bold",
    fontSize: height_screen * 0.03,
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
