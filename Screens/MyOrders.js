import React from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  ADD_TO_FAVOURITE,
  REMOVE_FROM_FAV,
  REMOVE_FROM_SAVED,
} from "../Redux/CartItem";
import { Ionicons } from "@expo/vector-icons";
import { height_screen, width_screen } from "../utils/Dimentions";
import Btn2 from "../Components/Btn2";
import { useNavigation } from "@react-navigation/core";
import { IconButton, Colors } from "react-native-paper";

const MyOrders = () => {
  const { cart } = useSelector((state) => state);

  const addItemToCart = (item) => {
    if (cart) {
      const cartArr = cart;
      cartArr.push(item);
      dispatch({ type: ADD_TO_CART, payload: cartArr });
      Alert.alert("Product added to cart");
    } else {
      dispatch({ type: ADD_TO_CART, payload: [item] });
      Alert.alert("Product added to cart");
      console.log("Full");
    }
  };
  const navigation = useNavigation();

  const { saved } = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log({ saved });

  const removeItemFromSaved = (item) => {
    let savedArr = saved;
    savedArr = savedArr.filter((saved) => saved.id !== item.id);
    console.log("Deleted Arr:,", savedArr);
    dispatch({ type: ADD_TO_FAVOURITE, payload: savedArr });
  };

  return (
    <View style={styles.container}>
      {saved?.length ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginTop: height_screen * 0.05,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: height_screen * 0.03, fontWeight: "bold" }}>
            MY SAVED PRODUCTS
          </Text>
          <FlatList
            data={saved}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  marginVertical: height_screen * 0.01,
                }}
              >
                <View style={styles.boxcart}>
                  <Image
                    source={item.picture}
                    style={{
                      resizeMode: "center",
                      width: width_screen * 0.3,
                      height: height_screen * 0.2,
                    }}
                  />
                  <View>
                    <Text style={{ color: "#000" }}>{item.company}</Text>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: height_screen * 0.035,
                      }}
                    >
                      {item.cost} Rs
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <IconButton
                        icon="plus"
                        color={Colors.red500}
                        size={30}
                        onPress={() => addItemToCart(item)}
                      />
                      <IconButton
                        icon="delete"
                        size={30}
                        onPress={() => removeItemFromSaved(item)}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartMessage}>
            You Have No Saved Products
          </Text>

          <Btn2
            text="Go To Shop Now"
            onPress={() => navigation.navigate("Bottom")}
          />
        </View>
      )}
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  boxcart: {
    backgroundColor: "#ddd",
    width: width_screen * 0.93,
    height: height_screen * 0.22,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartMessage: {
    color: "#8c8c8c",
    fontWeight: "bold",
    fontSize: height_screen * 0.03,
  },
});
