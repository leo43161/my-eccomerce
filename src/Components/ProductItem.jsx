import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import Card from './Card'

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
                        <Text style={styles.textCategory}>{item.rating}</Text>
                        <Text style={styles.textCategory}>{item.brand}</Text>
                    </View>
                    <View style={[styles.cardContainMid]}>
                        <Text style={styles.textCategory}>{item.title}</Text>
                    </View>
                    <View style={styles.cardContainBott}>
                        <Text style={styles.textCategory}>{item.price}</Text>
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