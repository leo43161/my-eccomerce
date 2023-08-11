import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import Card from './Card'
import { colors } from '../Global/Colors'
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setProductSelected } from '../Features/shop/shopSlice';

const ProductItem = ({ item, navigation }) => {
    const dispatch = useDispatch();
    const onSelectProduct = () => {
        dispatch(setProductSelected(item));
        navigation.navigate('Product', { title: item.title });
    }

    return (
        <Pressable onPress={onSelectProduct} style={[styles.cardContainer]}>
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
                            <Text>{item.rating}</Text>
                        </View>
                        <Text numberOfLines={1} style={styles.textCategory}>{item.brand}</Text>
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
        minHeight: 110,
        maxHeight: 120,
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
        alignItems: "center",
        gap: 3
    },
    textTitle: {
        fontSize: 18,
        color: colors.dark,
        fontFamily: "BROmega",
    },
    textCategory: {
        maxWidth: "75%",
        fontFamily: "BROmega",
        flexShrink: 1
    },
    textPrice: {
        fontSize: 20,
        color: colors.dark,
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