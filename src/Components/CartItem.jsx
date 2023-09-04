import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../Global/Colors";
import { FontAwesome } from "@expo/vector-icons";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { addItem, removeCartItem, removeItem } from "../Features/cart/cartSlice";

const CartItem = ({ cartItem }) => {
    const dispatch = useDispatch();
    return (
            <Card additionalStyle={styles.card}>
                <View style={styles.imgContainer}>
                    <Image
                        resizeMode='cover'
                        style={styles.image}
                        source={{uri: cartItem.images[0]}}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.textContainer}>
                        <View>
                            <Text style={styles.title}>{cartItem.title}</Text>
                            <Text style={styles.subtitle}>{cartItem.brand}</Text>
                        </View>
                        <Pressable style={styles.buttonTrash} onPress={() => { dispatch(removeCartItem(cartItem.id)) }}>
                            <FontAwesome name="trash" size={20} color={"black"} />
                        </Pressable>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${cartItem.price}</Text>
                        <View style={styles.quantityContainer}>
                            <View style={styles.quantityCol}>
                                {cartItem.quantity > 1 ?
                                    <Pressable style={[styles.buttonQuantity, styles.buttonMine]} onPress={() => { dispatch(removeItem(cartItem.id)) }}>
                                        <FontAwesome name="minus" size={11} color="black" />
                                    </Pressable>
                                    : null
                                }
                            </View>
                            <View style={styles.quantityCol}>
                                <Text>{cartItem.quantity}</Text>
                            </View>
                            <View style={styles.quantityCol}>
                                <Pressable style={[styles.buttonQuantity, styles.buttonPlus]} onPress={() => { dispatch(addItem(cartItem.id)) }}>
                                    <FontAwesome name="plus" size={11} color="black" />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Card>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    card: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        alignSelf: "stretch",
        height: 120,
        marginBottom: 15
    },
    imgContainer: {
        flex: 2,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    infoContainer: {
        flex: 6,
        justifyContent: "space-between",
        paddingLeft: 10
    },
    textContainer: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 5
    },
    quantityCol: {
        flex: 1,
        alignItems: "center"
    },
    priceContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonQuantity: {
        backgroundColor: colors.primary,
        paddingVertical: 5,
        paddingHorizontal: 7,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonTrash: {
        paddingVertical: 4,
        paddingHorizontal: 5,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonPlus: {
        backgroundColor: colors.primary,
    },
    buttonMine: {
        borderColor: colors.primary,
        backgroundColor: "transparent",
    },
    title: {
        fontFamily: "BROmega",
        fontSize: 19,
        color: colors.red,
    },
    subtitle: {
        fontFamily: "BROmega",
        fontSize: 14,
        color: colors.gray300,
    },
    price: {
        fontFamily: "BROmega",
        fontSize: 17,
        fontWeight: "bold",
        color: colors.dark,
    },
    quantityContainer: {
        flexDirection: "row",
        backgroundColor: colors.gray200,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 3,
        paddingHorizontal: 2,
        width: "35%",
        borderRadius: 15,
    }
});
