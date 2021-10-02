import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Btn2 from "../Components/Btn2";
import { height_screen, width_screen } from "../utils/Dimentions";

import { LogBox } from "react-native";
import Btn from "../Components/Btn";
import firebase from "firebase/app";
import "firebase/firestore";
import { Linking } from "react-native";
import { IconButton, Colors } from "react-native-paper";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

LogBox.ignoreLogs(["Setting a timer"]);

const FindaDoctor = () => {
  // useEffect(() => {
  //   const subscriber = firebase
  //     .firestore()
  //     .collection("doctors")
  //     .onSnapshot((querySnapshot) => {
  //       const users = [];

  //       querySnapshot.forEach((documentSnapshot) => {
  //         users.push({
  //           ...documentSnapshot.data(),
  //           key: firebase.auth().currentUser.email,
  //         });
  //       });

  //       setUsers(users);
  //       setLoading(false);
  //     });

  //   // Unsubscribe from events when no longer in use
  //   return () => subscriber();
  // }, []);

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]);
  const [City, setCity] = useState("");

  // Create a reference to the cities collection
  const citiesRef = firebase.firestore().collection("doctors");

  // Create a query against the collection
  const allCapitalsRes = citiesRef
    .where("selectedCity", "==", "Islamabad")
    .get();

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: height_screen * 0.01,
          width: width_screen,
          backgroundColor: "#FFFFFF",
        }}
      />
    );
  };
  const handlePress = async () => {
    if (City) {
      firebase
        .firestore()
        .collection("doctors")
        .where("selectedCity", "==", City)
        .onSnapshot((querySnapshot) => {
          const users = [];

          querySnapshot.forEach((documentSnapshot) => {
            users.push({
              ...documentSnapshot.data(),
              key: firebase.auth().uid,
              // key: firebase.auth().currentUser.uid,
            });
          });

          setUsers(users);
          setLoading(false);
        });
    } else {
      Alert.alert("Please Enter a City to Continue");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background4.png")}
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: height_screen * 0.07,
        }}
      >
        <View>
          <Text style={{ color: "#000", fontSize: height_screen * 0.04 }}>
            Select the City
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 10,
            width: width_screen * 0.8,
            height: height_screen * 0.065,
            marginLeft: width_screen * 0.025,
            marginVertical: height_screen * 0.05,
          }}
        >
          <Picker
            style={styles.pickerStyle}
            selectedValue={City}
            onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
          >
            <Picker.Item label="None" value="None" />
            <Picker.Item label="Islamabad" value="Islamabad" />
            <Picker.Item label="Lahore" value="Lahore" />
            <Picker.Item label="Karachi" value="Karachi" />
            <Picker.Item label="Faislabad" value="Faislabad" />
          </Picker>
        </View>
        <View>
          <Btn text="Search" onPress={handlePress} />
        </View>
        <FlatList
          keyExtractor={(item) => item.key}
          data={users}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "space-evenly",
                backgroundColor: "#FFFFFF",
                borderWidth: 0,
                marginTop: 10,
                width: width_screen * 0.93,
                shadowColor: "#000",
                shadowOffset: {
                  width: 12,
                  height: 12,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.0,

                elevation: 24,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: height_screen * 0.03 }}>
                  {item.userName}
                </Text>
                <Text style={{ fontSize: height_screen * 0.023 }}>
                  {item.experience ? item.experience : "(2 Years)"}
                </Text>
                <View
                  style={{
                    marginTop: height_screen * 0.03,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Ionicons
                      name="call"
                      color="#EB712B"
                      size={15}
                      style={{
                        marginTop: height_screen * 0.0085,
                        marginRight: width_screen * 0.02,
                      }}
                    />
                    <Text style={{ fontSize: height_screen * 0.023 }}>
                      {item.phone ? item.phone : "0324478587"}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Ionicons
                      name="mail"
                      color="#EB712B"
                      size={15}
                      style={{
                        marginTop: height_screen * 0.0085,
                        marginRight: width_screen * 0.02,
                      }}
                    />
                    <Text style={{ fontSize: height_screen * 0.023 }}>
                      {item.email}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Ionicons
                      name="location"
                      color="#EB712B"
                      size={15}
                      style={{
                        marginTop: height_screen * 0.0085,
                        marginRight: width_screen * 0.02,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: height_screen * 0.023,
                      }}
                    >
                      {item.clinicAdd}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  alignSelf: "center",
                  marginVertical: height_screen * 0.02,
                }}
              >
                <Button
                  labelStyle={{ color: "#FFFFFF" }}
                  color="#EB712B"
                  icon="phone"
                  mode="contained"
                  onPress={() => Linking.openURL(`tel:${item.phone}`)}
                >
                  Book Apointment
                </Button>
              </View>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default FindaDoctor;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  pickerStyle: {
    fontWeight: "bold",
    color: "#000",
  },
});
