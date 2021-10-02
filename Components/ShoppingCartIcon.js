import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { width_screen } from "../utils/Dimentions";

function ShoppingCartIcon() {
  const navigation = useNavigation();
  const { cart: cartItems } = useSelector((state) => state);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Cart")}
      style={styles.button}
    >
      <View style={styles.itemCountContainer}>
        <Text style={styles.itemCountText}>{cartItems?.length}</Text>
      </View>
      <Ionicons name="cart-outline" size={26} color="#000" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: width_screen * 0.05,
  },
  itemCountContainer: {
    position: "absolute",
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "#FF7D7D",
    right: 22,
    bottom: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  itemCountText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ShoppingCartIcon;
