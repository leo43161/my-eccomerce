import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Search from '../Components/Search';
import productsRaw from '../Data/products.json';
import { colors } from '../Global/Colors';
import ProductItem from '../Components/ProductItem';

const ItemListCategory = ({
    navigation,
    route
}) => {
    const { category } = route.params;
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [keywordError, setKeywordError] = useState("");
    useEffect(() => {
        //Lógica de manejo de category
        const productsFiltered = productsRaw.filter(product => product.category === category && product.title.toLocaleLowerCase().includes(keyword.toLowerCase()));
        setProducts(productsFiltered);
    }, [category, keyword]);
    const onSearch = (input) => {
        setKeyword(input);
    }
    return (
        <View style={styles.container}>
            <Search
                onSearch={onSearch}
            />
            <FlatList
                style={styles.itemContainer}
                data={products}
                keyExtractor={product => product.id}
                renderItem={({ item }) => (ProductItem({ item, navigation }))}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default ItemListCategory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightOcean,
        alignItems: 'center',
    },
    itemContainer: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15
    }
})