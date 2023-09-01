import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ModalImageChange = ({ isVisible, children, onClose }) => {
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <Pressable onPress={onClose} style={styles.exitBackground}>
            </Pressable>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Choose a sticker</Text>
                    <Pressable onPress={onClose}>
                        <FontAwesome name="close" color="#fff" size={22} />
                    </Pressable>
                </View>
                {children}
            </View>
        </Modal>
    );
}

export default ModalImageChange

const styles = StyleSheet.create({
    exitBackground: {
        height: '75%',
        width: '100%',
        backgroundColor: "transparent",
    },
    modalContent: {
        height: '25%',
        width: '100%',
        backgroundColor: "white",
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
    },
    titleContainer: {
        height: '16%',
        backgroundColor: '#464C55',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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