import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../Global/Colors";
import { FontAwesome } from "@expo/vector-icons";
import Card from "./Card";

const CartItem = ({ cartItem }) => {
    return (
        <Pressable onPress={() => { }}>
            <Card additionalStyle={styles.card}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{cartItem.title} ({cartItem.quantity})</Text>
                    <Text style={styles.subtitle}>{cartItem.brand}</Text>
                    <Text style={styles.subtitle}>${cartItem.price}</Text>
                </View>
                <FontAwesome name="trash" size={30} color="black" />
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
        width: "70%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
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
