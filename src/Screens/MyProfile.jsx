import { StyleSheet, Image, View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../Global/Colors'
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProfileImageQuery, useGetUserLocationQuery } from '../Services/shopServices';
import { logOut } from '../Features/user/userSlice';
import Card from '../Components/Card';
import ButtonProfile from '../Components/ButtonProfile';
import { deleteSession } from '../SQLite';
import ModalImageChange from '../Components/ModalImageChange';

const MyProfile = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();
    const { localId, profileImage, location } = useSelector(state => state.userReducer.value);
    const { data: image } = useGetProfileImageQuery(localId);
    const { data: locationRemote } = useGetUserLocationQuery(localId);
    const imageUser = image?.image;
    const addressUser = locationRemote?.address || location?.address;


    const onModalClose = () => {
        setIsModalVisible(false);
    };

    const singOut = async () => {
        try {
            const response = await deleteSession(localId)
            dispatch(logOut())
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View></View>
                <View style={styles.profileInfoHead}>
                    <View style={styles.imageProfileContainer}>
                        <Image
                            source={imageUser || profileImage ? { uri: profileImage || imageUser } : require("../Assets/Img/defaultProfile.png")}
                            style={styles.imageProfile}
                            resizeMode="cover"
                        />
                        <Pressable onPress={() => setIsModalVisible(true)} style={styles.buttonEditImage}>
                            <FontAwesome name="camera" size={17} color="white" />
                        </Pressable>
                    </View>
                    <Text style={styles.nameProfile}>leo43161301@gmail.com</Text>
                </View>
                <View style={styles.profileHeadBottom}>
                    <View style={styles.headBottomRight}>
                        <Pressable onPress={() => navigation.navigate('List Location')}>
                            <Card additionalStyle={styles.buttonLocation}>
                                <FontAwesome name="map-marker" size={22} color="black" />
                                <Text numberOfLines={1} style={styles.locationText}>{addressUser}</Text>
                            </Card>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.containerButtons}>
                <ButtonProfile onPress={() => navigation.navigate('Orders')} icon="list-alt" title="My Orders" color={colors.secondary} colorsIcon="#FFFFFF"></ButtonProfile>
                <ButtonProfile onPress={singOut} icon="sign-out" title="Logout" color={colors.secondary} colorsIcon="#FFFFFF"></ButtonProfile>
            </View>
            <ModalImageChange isVisible={isModalVisible} onClose={onModalClose}></ModalImageChange>
        </View>
    )
}

export default MyProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light
    },
    nameProfile: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white",
        fontFamily: "BROmega"
    },
    locationText: {
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: "BROmega"
    },
    profileInfoHead: {
        alignItems: "center",
        justifyContent: "space-between"
    },
    buttonLocation: {
        paddingVertical: 7,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        maxWidth: 250,
        backgroundColor: colors.light
    },
    profileHeadBottom: {
        width: "100%"
    },
    headBottomRight: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    headerContainer: {
        justifyContent: 'space-between',
        alignItems: "center",
        height: 320,
        width: "100%",
        backgroundColor: colors.primary,
        padding: 15
    },
    imageProfileContainer: {
        height: 110,
        width: 110,
        overflow: "hidden",
        position: "relative",
        marginBottom: 10
    },
    imageProfile: {
        borderRadius: 150,
        width: "100%",
        height: "100%",
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
        backgroundColor: colors.secondary,
        borderColor: "white",
    },
    containerButtons: {
        paddingHorizontal: 18,
        paddingTop: 18,
        gap: 18
    }
})