import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../Global/Colors";
import { FontAwesome } from "@expo/vector-icons";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { addItem, removeCartItem, removeItem } from "../Features/cart/cartSlice";

const CartItem = ({ cartItem }) => {
    const dispatch = useDispatch();
    return (
        <Pressable onPress={() => { }}>
            <Card additionalStyle={styles.card}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{cartItem.title}</Text>
                    <Text style={styles.subtitle}>{cartItem.brand}</Text>
                    <Text style={styles.subtitle}>${cartItem.price}</Text>
                </View>
                <View style={styles.quantityContainer}>
                    <View style={styles.quantityCol}>
                        {cartItem.quantity > 1 &&
                            <Pressable style={styles.buttonQuantity} onPress={() => { dispatch(removeItem(cartItem.id)) }}>
                                <FontAwesome name="minus" size={20} color="black" />
                            </Pressable>
                        }
                    </View>
                    <View style={styles.quantityCol}>
                        <Text>{cartItem.quantity}</Text>
                    </View>
                    <View style={styles.quantityCol}>
                        <Pressable style={styles.buttonQuantity} onPress={() => { dispatch(addItem(cartItem.id)) }}>
                            <FontAwesome name="plus" size={20} color="black" />
                        </Pressable>
                    </View>
                </View>
                <Pressable onPress={() => { dispatch(removeCartItem(cartItem.id)) }}>
                <FontAwesome name="trash" size={30} color="black" />
                </Pressable>
            </Card>
        </Pressable>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    card: {
        height: 100,
        padding: 18,
        margin: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        width: "60%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    quantityCol: {
        flex: 1,
        alignItems:"center"
    },
    quantityContainer: {
        width: "23%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
    },
    buttonQuantity: {
        backgroundColor: colors.ocean,
        paddingVertical: 5,
        paddingHorizontal: 7,
        borderRadius: 9,
    },
    title: {
        fontFamily: "BROmega",
        fontSize: 19,
        color: colors.red,
    },
    subtitle: {
        fontFamily: "BROmega",
        fontSize: 14,
        color: colors.peach,
    },
});
