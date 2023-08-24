import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../Features/user/userSlice';
import { deleteSession } from '../SQLite';

const Header = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { email, localId } = useSelector((state) => state.userReducer.value);
    const routes = {
        "Category": route.params ? route.params.category : "",
        "Product": route.params ? route.params.title : "",
    }
    const singOut = async () => {
        try {
            console.log("Deleting session...");
            const response = await deleteSession(localId)
            console.log("Session deleted: ")
            console.log(response)
            dispatch(logOut())
        } catch (error) {
            console.log('Error while sign out:')
            console.log(error.message);
        }
    }
    return (
        <View style={styles.containerHeader}>
            {navigation.canGoBack() ?
                <Pressable style={styles.containerButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
                :
                <View style={styles.containerButton}></View>
            }
            <View style={styles.containerTitle}>
                <Text numberOfLines={1} style={[styles.text]}>{routes[route.name] ? routes[route.name] : route.name}</Text>
            </View>
            <View style={styles.containerThird}>
                {email ? <Pressable onPress={singOut} style={styles.containerButton}>
                    <FontAwesome name="sign-out" size={24} color="black" />
                </Pressable>
                    : null}

            </View>
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
        borderColor: "red",
        flexDirection: "row",
        justifyContent: "center",
    }
})