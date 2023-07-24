import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import React from "react";
import Card from "./Card";

const OrderItem = ({ order }) => {
    const total = order.items.reduce(
        (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
        0
    );

    return (
        <Pressable onPress={() => { }}>
            <Card additionalStyle={styles.card}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        {new Date(order.createdAt).toLocaleString()}
                    </Text>
                    <Text style={styles.text2}>${total}</Text>
                </View>
                <Feather name="search" size={30} color="black" />
            </Card>
        </Pressable>
    );
};

export default OrderItem;

const styles = StyleSheet.create({
    card: {
        height: 100,
        padding: 10,
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
    text: {
        fontFamily: "BROmega",
        fontSize: 17,
        color: "black",
    },
    text2: {
        fontFamily: "BROmega",
        fontSize: 19,
        color: "gray",
    },
});
