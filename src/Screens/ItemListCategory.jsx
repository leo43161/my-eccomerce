import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import Search from '../Components/Search';
import { colors } from '../Global/Colors';
import ProductItem from '../Components/ProductItem';
import { useSelector } from 'react-redux';
import { useGetProductsByCategoryQuery } from '../Services/shopServices';

const ItemListCategory = ({
    navigation
}) => {
    const categorySelected = useSelector(state => state.shopReducer.value.categorySelected)
    const { data: productsSelected, isLoading, isError } = useGetProductsByCategoryQuery(categorySelected.name)
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState("");
    useEffect(() => {
        //Lógica de manejo de category
        if (productsSelected) {
            const productsFiltered = productsSelected.filter(product => product.title.toLocaleLowerCase().includes(keyword.toLowerCase()));
            setProducts(productsFiltered);
        }
    }, [productsSelected, keyword]);
    const onSearch = (input) => {
        setKeyword(input.trim());
    }
    return (
        <View style={styles.container}>
            {
                isLoading ?
                    <ActivityIndicator size={55} color={colors.blue} /> :
                    !isError ?
                        <>
                            <Search
                                onSearch={onSearch}
                            />
                            <FlatList
                                style={styles.itemContainer}
                                data={products}
                                keyExtractor={product => product.id}
                                renderItem={({ item }) => <ProductItem item={item} navigation={navigation} />}
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
        flex: 1,
        backgroundColor: colors.lightOcean,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15
    }
})