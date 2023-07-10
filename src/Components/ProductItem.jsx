import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ProductItem = ({ item }) => {
    return (
        <View>
            <Text style={styles.textCategory}>{item.title}</Text>
            <Image
                resizeMode='cover'
                style={styles.image}
                source={{ uri: item.images[0] }}
            />
        </View>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    image: {
        height: 120,
        width: 100,
        borderRadius: 8
    },
    additionalStylesCard: {
        flexDirection: 'row',
        height: 120,
        justifyContent: 'space-between'
    }
})