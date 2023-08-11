import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import React from "react";
import Card from "./Card";
import { colors } from "../Global/Colors";

const OrderItem = ({ order }) => {
    const total = order.items.reduce(
        (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
        0
    );

    return (
        <Pressable onPress={() => { }}>
            <Card additionalStyle={styles.card}>
                <View style={styles.textContainer}>
                    <Text style={styles.texInfo}>
                        {new Date(order.createdAt).toLocaleString()}
                    </Text>
                    <Text style={styles.textPrice}>${total}</Text>
                </View>
                <FontAwesome name="search" size={30} color="black" />
            </Card>
        </Pressable>
    );
};

export default OrderItem;

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
    texInfo: {
        fontFamily: "BROmega",
        fontSize: 18,
        color: colors.dark,
        marginBottom: 5
    },
    textPrice: {
        fontFamily: "BROmega",
        fontSize: 19,
        color: colors.secondary,
        fontWeight: "bold",
    },
});
