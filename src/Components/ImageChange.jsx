import { StyleSheet, Image, View, Text, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { saveImage } from '../Features/user/userSlice';
import * as MediaLibrary from 'expo-media-library';

const ImageChange = () => {

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
        if (isCameraPermissed && status === "granted") {
            let resultShot = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            })
            if (!resultShot.canceled) {
                const imagePick = resultShot.assets[0].uri
                const response = await MediaLibrary.createAssetAsync(imagePick);
                triggerSaveImage({
                    image: response.uri,
                    localId: localId
                });
                dispatch(saveImage(response.uri));
            }
        }
    };

    return (
        <Pressable onPress={cameraHandler} style={styles.buttonEditImage}>
            <FontAwesome name="camera" size={17} color="white" />
        </Pressable>
    )
}

export default ImageChange

const styles = StyleSheet.create({
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
})