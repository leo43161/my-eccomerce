import { StyleSheet, Text, Pressable, View } from 'react-native'
import React from 'react'
import Card from './Card'
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../Global/Colors';

const CategoryItem = ({ item, setCategorySelected }) => {
    return (
        <Pressable onPress={() => setCategorySelected(item.name)} style={styles.cardContainer}>
            <Card additionalStyle={styles.card}>
                <View style={styles.icon}>
                    <FontAwesome name={item.icon} size={60} color={colors.blue} />
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
    },
    textCategory: {
        fontSize: 20
    },
    icon: {
        marginBottom: 10
    }
})