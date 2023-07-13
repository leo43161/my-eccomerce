import { StyleSheet, Text, Pressable, View } from 'react-native'
import React from 'react'
import Card from './Card'
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../Global/Colors';

const CategoryItem = ({ item, setCategorySelected }) => {
    return (
        <Pressable onPress={() => setCategorySelected(item.name)} style={styles.cardContainer}>
            <Card additionalStyle={styles.card}>
                <View style={styles.icon}>
                    <FontAwesome5 name={item.icon} size={60} color={colors.blue} />
                </View>
                <Text style={styles.textCategory}>{item.title}</Text>
            </Card>
        </Pressable>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
    cardContainer: {
        width: "50%",
        padding: 10
    },
    card: {
        width: "100%",
        height: 150,
        justifyContent: "center",
        paddingHorizontal: 15
    },
    textCategory: {
        fontSize: 21,
        fontFamily: "BROmega",
        textAlign: "center",
        fontWeight: "bold",
    },
    icon: {
        marginBottom: 10,
    }
})