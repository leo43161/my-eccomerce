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
        navigation.navigate('Product');
    }
    return (
        <Pressable onPress={onSelectProduct} style={[styles.cardContainer]}>
            <Card>
                <View style={styles.imgContainer}>
                    <Image
                        resizeMode='contain'
                        style={styles.image}
                        source={{ uri: item.images[0] }}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <Text numberOfLines={1} style={styles.titleProduct}>
                        Silla de Oficina
                    </Text>
                    <Text numberOfLines={2} style={styles.descriptionProduct}>
                        Lorem ipsum dolor, sit amet consectetur
                    </Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>$750.00</Text>
                        <Text style={styles.offer}>$750.00</Text>
                    </View>
                </View>
            </Card>
        </Pressable>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1
    },
    image: {
        width: "100%",
        height: 140,
        /* borderWidth: 1 */
    },
    priceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    infoContainer: {
        paddingHorizontal: 15,
        paddingBottom: 15
    },
    imgContainer: {
        paddingTop: 15
    },
    titleProduct: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 3
    },
    descriptionProduct: {
        fontSize: 12,
        color: colors.gray300,
        marginBottom: 5
    },
    price: {
        fontSize: 15,
        fontWeight: "bold",
        color: colors.primary,
    },
    offer: {
        fontSize: 13,
        fontWeight: "500",
        color: colors.gray300,
        textDecorationLine: "line-through"
    },
})