import { StyleSheet, Text, View, Image, ActivityIndicator, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'
import { useGetProductHighlightQuery } from '../Services/shopServices';
import { useDispatch } from 'react-redux';
import { setProductSelected } from '../Features/shop/shopSlice';

const ProductHighlight = ({ additionalStyle = [], navigation }) => {
    const dispatch = useDispatch();
    const { data: product, isLoading, isError } = useGetProductHighlightQuery();
    const onSelectProduct = () => {
        dispatch(setProductSelected(product));
        navigation.navigate('Product');
    }
    return (
        isLoading ? <ActivityIndicator size={55} color={colors.secondary} /> :
            !isError ?
                <Pressable onPress={onSelectProduct} style={[styles.containerCardHeader, additionalStyle]}>
                    <View style={styles.cardHeader}>
                        <View style={styles.containerContainCard}>
                            <View style={{
                                flexDirection: "row"
                            }}>
                                <View style={styles.pill}>
                                    <Text style={styles.textOff}>{product.discountPercentage}% Off</Text>
                                </View>
                            </View>
                            <Text style={styles.textTitle}>{product.title}</Text>
                            <Text style={styles.textDescription} numberOfLines={2}>{product.description}</Text>
                            <Text style={styles.textMore}>Mas...</Text>
                        </View>
                        <View style={styles.containerImgCard}>
                            <View style={styles.imageWrapper}>
                                <Image
                                    resizeMode='cover'
                                    style={styles.image}
                                    source={{ uri: product.images[0] }}
                                />
                            </View>
                        </View>
                    </View>
                </Pressable>
                : null
    )
}

export default ProductHighlight

const styles = StyleSheet.create({
    containerCardHeader: {
        width: "100%",
        marginBottom: 10,
        paddingTop: 5
    },
    cardHeader: {
        backgroundColor: colors.gray100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        padding: 8,
        flexDirection: "row"
    },
    containerContainCard: {
        flex: 3,
        padding: 10,
        justifyContent: 'space-around',
    },
    containerImgCard: {
        flex: 2,
        position: "relative",
        left: 3,
        bottom: 8
    },
    pill: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 7,
        marginBottom: 3
    },
    textDescription: {
        fontSize: 12,
        color: colors.gray300,
        marginVertical: 3
    },
    textTitle: {
        fontWeight: "bold",
        fontSize: 18,
    },
    textOff: {
        fontSize: 11,
        color: "white",
    },
    textMore: {
        fontWeight: "bold",
        fontSize: 12,
    },
    imageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 150,
        width: 150,
        position: "absolute",
        zIndex: 1000
    },
})