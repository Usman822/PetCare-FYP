import React, { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import Btn from "../Components/Btn";
import { height_screen, width_screen } from "../utils/Dimentions";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, ADD_TO_FAVOURITE } from "../Redux/CartItem";
import ShoppingCartIcon from "../Components/ShoppingCartIcon";
import Products from "../Components/Products";

const ProdDetails = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);
  const { saved } = useSelector((state) => state);

  console.log({ cart });
  const addItemToCart = (item) => {
    if (cart) {
      const cartArr = cart;
      if (cartArr.some((x) => x.id === item.id) === false) {
        cartArr.push(item);
        dispatch({ type: ADD_TO_CART, payload: cartArr });
        Alert.alert("Product added to cart");
      } else {
        Alert.alert("Server Response", "This Product is Already in your Cart");
      }
    } else {
      dispatch({ type: ADD_TO_CART, payload: [item] });
      Alert.alert("Product added to cart");
      console.log("Full");
    }
  };
  const addItemToSaved = (item) => {
    if (saved) {
      const savedArr = saved;
      if (savedArr.some((y) => y.id === item.id) === false) {
        savedArr.push(item);
        dispatch({ type: ADD_TO_FAVOURITE, payload: savedArr });
        Alert.alert("Product Added To Saved");
      } else {
        Alert.alert("Server Response", "This Product is Already in your Cart");
      }
    } else {
      dispatch({ type: ADD_TO_FAVOURITE, payload: [item] });
      Alert.alert("Product Added To Saved");
      console.log("Full");
    }
  };
  const { item } = route.params;
  const { navigate } = useNavigation();
  const images = [
    item.picture,
    "https://i.pinimg.com/originals/ba/85/49/ba854984ea411226333292f484640058.jpg",
    "https://www.ipackdesign.com/wp-content/uploads/2020/08/cat-food-packaging.jpg",
    "https://source.unsplash.com/1024x768/?tree",
  ];

  const btnPress = () => {
    navigate("Cart");
  };

  return (
    <ImageBackground
      source={require("../assets/background4.png")}
      style={{ flex: 1, justifyContent: "space-evenly" }}
    >
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <View
          style={{
            alignSelf: "flex-end",
            marginTop: height_screen * 0.05,
          }}
        >
          <ShoppingCartIcon />
        </View>
        <SliderBox
          dotColor="#EB712B"
          inactiveDotColor="#838383"
          images={images}
          onCurrentImagePressed={(index) =>
            console.log(`image ${index} pressed`)
          }
          resizeMethod={"resize"}
          resizeMode={"contain"}
          ImageComponentStyle={{
            borderRadius: 15,
            width: width_screen,
            // marginTop: height_screen * 0.0,
          }}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={styles.heading}>Product Details:</Text>
          <Text style={{ fontSize: height_screen * 0.022 }}>
            Name: {item.title}
          </Text>
          <Text style={{ fontSize: height_screen * 0.022 }}>
            Expiry Date: {item.expirydate}
          </Text>
          <Text style={{ fontSize: height_screen * 0.022 }}>
            Company: {item.company}
          </Text>
          <Text style={{ fontSize: height_screen * 0.022 }}>
            Price: {item.cost}
          </Text>
          <TouchableOpacity
            style={styles.container}
            onPress={() => addItemToCart(item)}
          >
            <Text style={styles.txtbtn}>Add To Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.container2}
            onPress={() => addItemToSaved(item)}
          >
            <Text style={styles.txtbtn}>Add To Favourites</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={styles.heading}>Related Products:</Text>
        <View
          horizontal={true}
          style={{
            flexDirection: "row",
            height: height_screen * 0.3,
            marginTop: height_screen * 0.02,
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
        </View>
      </View>
    </ImageBackground>
  );
};

export default ProdDetails;

const styles = StyleSheet.create({
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
  heading: {
    fontWeight: "bold",
    fontSize: height_screen * 0.03,
    color: "#000",
  },
  container: {
    marginTop: height_screen * 0.01,
    backgroundColor: "#EB712B",
    width: width_screen * 0.35,
    height: height_screen * 0.06,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  container2: {
    marginTop: height_screen * 0.01,
    backgroundColor: "#EB712B",
    width: width_screen * 0.5,
    height: height_screen * 0.06,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  txtbtn: {
    color: "#ddd",
    fontSize: height_screen * 0.025,
    fontWeight: "bold",
  },
});
