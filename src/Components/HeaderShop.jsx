import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../Features/user/userSlice';
import { deleteSession } from '../SQLite';
import { colors } from '../Global/Colors';

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
        <View style={[styles.containerHeader, route.name === "Home" && styles.containerHome]}>
            {
                navigation.canGoBack() ?
                    <View style={styles.containerButton}>
                        <Pressable style={styles.buttonBack} onPress={() => navigation.goBack()}>
                            <Ionicons size={19} color={colors.dark} name='arrow-back'></Ionicons>
                        </Pressable>
                    </View>
                    :
                    <View style={styles.container}>
                        <Text style={styles.textTitle}>Hello, Angel!</Text>
                        <Text style={styles.textSubtitle}>What do you want to order today?</Text>
                    </View>
            }
        </View >
    )
}

export default Header

const styles = StyleSheet.create({
    containerHeader: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
        paddingVertical: 15,
        position: "absolute",
        paddingHorizontal: 15
    },
    containerHome: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 21,
        position: "relative"
    },
    textTitle: {
        fontSize: 18,
        fontFamily: "BROmega",
        textTransform: 'capitalize',
        fontWeight: "bold",
        marginBottom: 3
    },
    textSubtitle: {
        fontSize: 12,
        fontFamily: "BROmega",
        textTransform: 'capitalize',
        color: colors.gray300
    },
    container: {
        borderWidth: 0,
        flex: 1,
        justifyContent: "center",
    },
    containerButton: {
        borderWidth: 0,
    },
    buttonBack: {
        justifyContent: "center",
        alignContent: "center",
        paddingVertical: 4,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: colors.gray300,
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
    },
    containerThird: {
        borderWidth: 0,
        flex: 1,
        borderColor: "red",
        flexDirection: "row",
        justifyContent: "center",
    }
})