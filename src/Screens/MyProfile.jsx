import { StyleSheet, Image, View, Text, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const MyProfile = () => {
    const {localId, profileImage} = useSelector(state => state.userReducer.value);
    
    const cameraHandler = async () => {

    };
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.profileHeadContainer}>
                    <View style={styles.imageProfileContainer}>
                        <Image
                            source={require("../Assets/Img/defaultProfile.png")}
                            style={styles.imageProfile}
                            resizeMode="cover"
                        />
                        <Pressable onPress={cameraHandler} style={styles.buttonEditImage}>
                            <FontAwesome name="camera" size={17} color="white" />
                        </Pressable>
                    </View>
                    <Text style={styles.nameProfile}>leo43161301@gmail.com</Text>
                </View>
            </View>
        </View>
    )
}

export default MyProfile

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: colors.lightOcean
    },
    nameProfile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white",
        fontFamily:"BROmega"
    },
    profileHeadContainer: {
        alignItems: "center",
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: "center",
        height: 400,
        width: "100%",
        backgroundColor: colors.ocean
    },
    imageProfileContainer: {
        height: 120,
        width: 120,
        overflow: "hidden",
        position: "relative",
        marginBottom: 10
    },
    imageProfile: {
        borderRadius: 150,
        flex: 1,
        borderWidth: 3,
        borderColor: "white",
    },
    buttonEditImage: {
        height: 35,
        width: 35,
        borderRadius: 150,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        right: 0,
        borderWidth: 2,
        backgroundColor: colors.blue,
        borderColor: "white",
    },
})