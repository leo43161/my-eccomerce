import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import Search from '../Components/Search';
import { colors } from '../Global/Colors';
import ProductItem from '../Components/ProductItem';
import { useSelector } from 'react-redux';
import { useGetProductsByCategoryQuery } from '../Services/shopServices';

const ItemListCategory = ({
    navigation,
    keyword
}) => {
    const categorySelected = useSelector(state => state.shopReducer.value.categorySelected)
    const { data: productsSelected, isLoading, isError } = useGetProductsByCategoryQuery(categorySelected.name)
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if (productsSelected) {
            const productsFiltered = productsSelected.filter(product => product.title.toLocaleLowerCase().includes(keyword.toLowerCase()));
            setProducts(productsFiltered);
        }
    }, [productsSelected, keyword]);
    return (
        <View style={styles.container}>
            {
                isLoading ?
                    <ActivityIndicator size={55} color={colors.secondary} /> :
                    !isError ?
                        <>
                            <FlatList
                                style={styles.itemContainer}
                                numColumns={2}
                                columnWrapperStyle={styles.row}
                                data={products}
                                keyExtractor={product => product.id}
                                renderItem={({ item }) =>
                                    <View style={{ flex: 1 }}>
                                        <ProductItem item={item} navigation={navigation} />
                                    </View>
                                }
                                showsVerticalScrollIndicator={false}
                            />
                        </>
                        : null
            }

        </View>
    )
}

export default ItemListCategory

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
    },
    itemContainer: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    row: {
        flex: 1,
        justifyContent: "flex-start",
        gap: 10,
        marginBottom: 10
    }
})