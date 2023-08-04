import { StyleSheet, Image, View, Text, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProfileImageQuery, usePostProfileImageMutation } from '../Services/shopServices';
import * as ImagePicker from 'expo-image-picker';
import { saveImage } from '../Features/user/userSlice';
import * as MediaLibrary from 'expo-media-library';

const MyProfile = ({ navigation }) => {
    const dispatch = useDispatch();
    const [triggerSaveImage, resultSaveImage] = usePostProfileImageMutation()
    const { localId, profileImage } = useSelector(state => state.userReducer.value);
    const { data: image } = useGetProfileImageQuery(localId);
    const imageUser = image?.image;

    const verifyCameraPermissions = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if (!granted) {
            return false;
        }
        return true;
    };

    const cameraHandler = async () => {
        //Permission for camera
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
                // Set image on redux state
                dispatch(saveImage(response.uri));
            }
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.profileHeadContainer}>
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
        fontFamily: "BROmega"
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
        backgroundColor: colors.blue,
        borderColor: "white",
    },
})