import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import Card from './Card'
import { colors } from '../Global/Colors'
import { FontAwesome } from '@expo/vector-icons';

const ProductItem = ({ item }) => {
    return (
        <Pressable style={[styles.cardContainer]}>
            <Card additionalStyle={styles.card}>
                <Image
                    resizeMode='cover'
                    style={styles.image}
                    source={{ uri: item.images[0] }}
                />
                <View style={[styles.cardContain]}>
                    <View style={[styles.cardContainTop]}>
                        <View style={[styles.rating]}>
                            <FontAwesome name="star" size={17} color="black" />
                            <Text style={styles.textCategory}>{item.rating}</Text>
                        </View>
                        <Text style={styles.textCategory}>{item.brand}</Text>
                    </View>
                    <View>
                        <Text style={styles.textTitle}>{item.title}</Text>
                    </View>
                    <View>
                        <Text style={styles.textPrice}>${item.price}</Text>
                    </View>
                </View>
            </Card>
        </Pressable>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        height: 110,
        overflow: "hidden"
    },
    border: {
        borderWidth: 1,
        borderColor: "red"
    },
    cardContainer: {
        marginBottom: 7,
        padding: 7
    },
    cardContain: {
        padding: 10,
        flex: 1,
        height: "100%",
        justifyContent: "space-between"
    },
    cardContainTop: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rating: {
        flexDirection: "row",
        alignItems:"center",
        gap:3
    },
    textTitle: {
        fontSize: 18,
        color: colors.darkBlue,
        fontFamily: "BROmega",
    },
    textPrice: {
        fontSize: 20,
        color: colors.darkBlue,
        fontFamily: "BROmega",
        fontWeight: "bold",
    },
    image: {
        height: 120,
        width: 100,
    },
    additionalStylesCard: {
        flexDirection: 'row',
        height: 120,
        justifyContent: 'space-between'
    },
})