import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'
import { Ionicons } from '@expo/vector-icons';

const Header = ({ categorySelected, setCategorySelected }) => {
    const goBack = () => {
        setCategorySelected("")
    }
    return (
        <View style={styles.containerHeader}>
            {categorySelected && <Pressable onPress={goBack}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>}
            <Text style={styles.text}>{categorySelected ? categorySelected : 'HOME'}</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    containerHeader: {
        height: '10%',
        backgroundColor: colors.ocean,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    text: {
        fontSize: 22,
        fontFamily: "BROmega",
        textTransform: 'uppercase',
        textAlign: "center",
        flex: 1
    }
})