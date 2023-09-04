import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../Global/Colors';
import * as ImagePicker from 'expo-image-picker';
import { saveImage } from '../Features/user/userSlice';
import * as MediaLibrary from 'expo-media-library';
import { useDispatch, useSelector } from 'react-redux';
import { usePostProfileImageMutation } from '../Services/shopServices';


const ModalImageChange = ({ isVisible, onClose }) => {
    const [triggerSaveImage] = usePostProfileImageMutation();
    const { localId } = useSelector(state => state.userReducer.value);
    const dispatch = useDispatch()

    const verifyMediaPermissions = async (galery) => {
        const { granted } = galery ? await ImagePicker.requestMediaLibraryPermissionsAsync() : await ImagePicker.requestCameraPermissionsAsync();
        if (!granted) {
            return false;
        }
        return true;
    };

    const mediaHandler = async (galery) => {
        const isMediaPermissed = await verifyMediaPermissions(galery);
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (isMediaPermissed && status === "granted") {
            const config = {
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            }
            let resultMedia = galery ? await ImagePicker.launchImageLibraryAsync(config) : await ImagePicker.launchCameraAsync(config)
            if (!resultMedia.canceled) {
                const imagePick = resultMedia.assets[0].uri
                const response = await MediaLibrary.createAssetAsync(imagePick);
                triggerSaveImage({
                    image: response.uri,
                    localId: localId
                });
                onClose()
                dispatch(saveImage(response.uri));
            }
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <Pressable onPress={onClose} style={styles.exitBackground}>
            </Pressable>
            <View style={styles.modalContent}>
                <View style={styles.buttonsContainer}>
                    <Pressable onPress={() => mediaHandler(false)} style={styles.buttons}>
                        <FontAwesome name="camera" color="#000000" size={22} />
                        <Text>Camara</Text>
                    </Pressable>
                    <Pressable onPress={() => mediaHandler(true)} style={styles.buttons}>
                        <FontAwesome name="photo" color="#000000" size={22} />
                        <Text>Galeria</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

export default ModalImageChange

const styles = StyleSheet.create({
    buttonsContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    closeButton: {
        width: '80%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: colors.primary,
        borderRadius: 10
    },
    buttons: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1
    },
    exitBackground: {
        height: '85%',
        width: '100%',
    },
    modalContent: {
        height: '15%',
        width: '100%',
        backgroundColor: "white",
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        paddingVertical: 20
    },
    closeContainer: {
        height: '45%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 16,
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50,
        paddingVertical: 20,
    },
});