import { StyleSheet, Image, View, Text, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProfileImageQuery, useGetUserLocationQuery, usePostProfileImageMutation } from '../Services/shopServices';
import * as ImagePicker from 'expo-image-picker';
import { logOut, saveImage } from '../Features/user/userSlice';
import * as MediaLibrary from 'expo-media-library';
import Card from '../Components/Card';
import ButtonProfile from '../Components/ButtonProfile';
import { deleteSession } from '../SQLite';

const MyProfile = ({ navigation }) => {
    const dispatch = useDispatch();
    const [triggerSaveImage, resultSaveImage] = usePostProfileImageMutation()
    const { localId, profileImage, location } = useSelector(state => state.userReducer.value);
    const { data: image } = useGetProfileImageQuery(localId);
    const { data: locationRemote } = useGetUserLocationQuery(localId);
    const imageUser = image?.image;
    const addressUser = locationRemote?.address || location?.address;

    const verifyCameraPermissions = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if (!granted) {
            return false;
        }
        return true;
    };

    const cameraHandler = async () => {
        const isCameraPermissed = await verifyCameraPermissions();
        const { status } = await MediaLibrary.requestPermissionsAsync();
        console.log(isCameraPermissed)
        if (isCameraPermissed && status === "granted") {
            let resultShot = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            })
            console.log(resultShot.assets);
            if (!resultShot.canceled) {
                const imagePick = resultShot.assets[0].uri
                const response = await MediaLibrary.createAssetAsync(imagePick);
                triggerSaveImage({
                    image: response.uri,
                    localId: localId
                });
                console.log(response)
                dispatch(saveImage(response.uri));
            }
        }
    };

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
                        <Pressable onPress={cameraHandler} style={styles.buttonEditImage}>
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
                <ButtonProfile onPress={""} icon="user" title="My Profile" color={colors.secondary} colorsIcon="#FFFFFF"></ButtonProfile>
                <ButtonProfile onPress={singOut} icon="list-alt" title="My Orders" color={colors.secondary} colorsIcon="#FFFFFF"></ButtonProfile>
                <ButtonProfile onPress={singOut} icon="sign-out" title="Logout" color={colors.secondary} colorsIcon="#FFFFFF"></ButtonProfile>
            </View>
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