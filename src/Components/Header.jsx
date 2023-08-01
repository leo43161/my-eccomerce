import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const Header = ({ route, navigation }) => {
    const routes = {
        "Home": "Home",
        "CartScreen": "Cart",
        "OrdersScreen": "Orders",
        "Login": "Login",
        "Signup": "Signup",
        "Category": route.params ? route.params.category : "",
        "Product": route.params ? route.params.title : "",
    }
    return (
        <View style={styles.containerHeader}>
            {(route.name !== 'Home' && route.name !== 'Login') ?
                <Pressable style={styles.containerButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
                :
                <View style={styles.containerButton}></View>
            }
            <View style={styles.containerTitle}>
                <Text numberOfLines={1} style={[styles.text]}>{routes[route.name]}</Text>
            </View>
            <View style={styles.containerThird}></View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    containerHeader: {
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        paddingVertical: 13
    },
    text: {
        fontSize: 22,
        fontFamily: "BROmega",
        textTransform: 'capitalize',
        textAlign: "center"
    },
    containerButton: {
        borderWidth: 0,
        flex: 1,
        borderColor: "red",
        flexDirection: "row",
        justifyContent: "center",
    },
    containerTitle: {
        flex: 4,
    },
    containerThird: {
        borderWidth: 0,
        flex: 1,
        borderColor: "blue"
    }
})