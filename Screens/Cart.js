import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART } from "../Redux/CartItem";
import { height_screen, width_screen } from "../utils/Dimentions";
import { Ionicons } from "@expo/vector-icons";
import NumericInput from "react-native-numeric-input";
import Btn from "../Components/Btn";
import Btn2 from "../Components/Btn2";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";

const Cart = () => {
  const [valuee, setValuee] = useState(1);
  const [myValue, setMyValue] = useState(1);
  const [total, setTotal] = useState(0);
  const [cartQty, setcartQty] = useState(0);
  const navigation = useNavigation();
  const { cart: cartItems } = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(cartItems?.length);

  const removeItemFromCart = (item) => {
    let cartAr = cartItems;
    cartAr = cartAr.filter((cartItem) => cartItem.id !== item.id);
    console.log("Deleted Arr:,", cartAr);
    dispatch({ type: ADD_TO_CART, payload: cartAr });
  };

  const BookPress = () => {
    cartItems?.map((item) => {
      const myid = item.id;
      const name = item.title;
      const cost = item.cost;
      const mail = firebase.auth().currentUser.email;
      const todayDate = new Date().toLocaleString() + "";

      firebase
        .firestore()
        .collection("Orders")
        .doc()
        .set({ myid, name, total, cartQty, mail, todayDate, myValue });
      console.log(name);
    });

    navigation.navigate("CheckOut");
  };

  const a = cartItems?.reduce(
    (sum, i) => (sum = cartItems?.length * myValue),
    0
  );
  useEffect(() => {
    getTotalPrice();
  }, []);
  const getTotalPrice = () => {
    let totalPrice = 0;
    let qty = 0;
    cartItems?.map((item, id) => {
      totalPrice = totalPrice + Number(item.cost) * Number(item.quantity);
      qty = qty + Number(item.quantity);
    });
    console.log("Product Price:", totalPrice, qty);
    setcartQty(qty);
    setTotal(totalPrice);
  };

  // const qtyPrice = cartItems?.reduce((sum, i) => (sum += myValue * i.cost), 0);
  // const Price = qtyPrice;

  const handlePrice = async (value, id) => {
    setMyValue(value);
    console.log(a, cartItems?.length, value);
    console.log("id", id);
    addCart(id, value);
  };

  const addCart = (id, click) => {
    let Cart = cartItems;
    const elementsIndex = Cart.findIndex((element) => element.id === id);
    console.log("ID", elementsIndex);
    Cart[elementsIndex] = { ...Cart[elementsIndex], quantity: click };
    dispatch({ type: ADD_TO_CART, payload: Cart });
    console.log("NEW ARRAY CART:", Cart);
    getTotalPrice();
  };

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: height_screen * 0.01,
          width: width_screen,
          backgroundColor: "#EB712B",
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: height_screen * 0.045,
        }}
      >
        <Text
          style={{
            color: "#ddd",
            fontSize: height_screen * 0.035,
            fontWeight: "bold",
            marginLeft: width_screen * 0.04,
          }}
        >
          Cart({cartItems?.length})
        </Text>
      </View>
      {cartItems?.length ? (
        <ScrollView>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={FlatListItemSeparator}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
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
                  </View>
                  <View>
                    <NumericInput
                      value={item.quantity}
                      minValue={1}
                      maxValue={5}
                      onChange={(value) => {
                        handlePrice(value, item.id);
                      }}
                      rounded={true}
                      onLimitReached={() => Alert.alert("Limit Reached")}
                      editable={true}
                    />
                    <Ionicons
                      name="trash-bin-outline"
                      size={26}
                      color="#EB712B"
                      style={{ alignSelf: "flex-end" }}
                      onPress={() => removeItemFromCart(item)}
                    />
                  </View>
                </View>
              </View>
            )}
          />
          <View
            style={{ alignItems: "center", marginTop: height_screen * 0.015 }}
          >
            <Text style={styles.num}>Products: {cartQty} </Text>
            <Text style={styles.num}>Total Price: {total}</Text>
            <Text style={styles.num}>Delivery Charges: Free</Text>
          </View>
          <View
            style={{
              alignSelf: "center",
              marginTop: height_screen * 0.01,
              marginBottom: height_screen * 0.02,
            }}
          >
            <Btn2
              text="CHECKOUT"
              text2={total}
              text3="Rs"
              onPress={BookPress}
            />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartMessage}>Your Cart Is Empty</Text>

          <Btn2 text="Shop Now" onPress={() => navigation.navigate("Bottom")} />
        </View>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EB712B",
  },
  count: {
    fontSize: height_screen * 0.05,
  },
  incrbox: {
    borderWidth: 1,
    height: height_screen * 0.05,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  incre: {
    fontSize: height_screen * 0.06,
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
  num: {
    color: "#ddd",
    fontSize: height_screen * 0.022,
  },
});
