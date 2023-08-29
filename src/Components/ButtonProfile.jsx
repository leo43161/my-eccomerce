import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../Global/Colors';

const ButtonProfile = ({ icon, title, colorsIcon, color }) => {
    return (
        <Pressable style={styles.buttonEditProfile}>
            <View style={styles.titleEditProfile}>
                <View style={{ backgroundColor: color, ...styles.iconEditProfile }}>
                    <FontAwesome name={icon} size={22} color={colorsIcon} />
                </View>
                <Text style={styles.nameConfig}>{title}</Text>
            </View>
            <View>
                <FontAwesome name="chevron-right" size={15} color={colors.dark} />
            </View>
        </Pressable>
    )
}

export default ButtonProfile

const styles = StyleSheet.create({
    buttonEditProfile: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    titleEditProfile: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14
    },
    iconEditProfile: {
        borderRadius: 10,
        width: 38,
        height: 38,
        justifyContent: "center",
        alignItems: "center",
    },
    nameConfig: {
        fontSize: 15,
    }
})