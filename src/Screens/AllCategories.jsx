import { ActivityIndicator, ScrollView, StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'
import ProductItem from '../Components/ProductItem'
import { useGetCategoriesWithProductsQuery, useGetProductsQuery } from '../Services/shopServices'
import ProductHighlight from '../Components/ProductHighlight'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCategorySelected } from '../Features/shop/shopSlice'

const AllCategories = ({ keyword, navigation }) => {
  const dispatch = useDispatch()
  const { data: categories, isLoading, isError } = useGetCategoriesWithProductsQuery();
  const { data: products } = useGetProductsQuery();

  const [productsSearch, setProductsSearch] = useState([]);

  useEffect(() => {
    if (products) {
      const productsFiltered = products.filter(product => product.title.toLocaleLowerCase().includes(keyword.toLowerCase()));
      setProductsSearch(productsFiltered);
    }
  }, [keyword]);

  const setCategories = (categoryWithProducts) => {
    const { products, ...category } = categoryWithProducts;
    dispatch(setCategorySelected(category));
  }

  return (
    isLoading ?
      <ActivityIndicator size={55} color={colors.secondary} /> :
      !isError ?
        keyword !== "" ?
          <View style={styles.container}>
            <FlatList
              style={styles.itemContainer}
              numColumns={2}
              columnWrapperStyle={styles.row}
              data={productsSearch}
              keyExtractor={product => product.id}
              renderItem={({ item }) =>
                <View style={{ width: "50%" }}>
                  <ProductItem item={item} navigation={navigation} />
                </View>
              }
              showsVerticalScrollIndicator={false}
            />
          </View>
          :
          <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            {keyword === "" && <ProductHighlight></ProductHighlight>}
            {
              categories.map((category) =>
                <View key={category.id} style={styles.categoryContainer}>
                  <View style={styles.titleCategoryContainer}>
                    <Text style={styles.titleCategory}>{category.title}</Text>
                    <Pressable onPress={() => setCategories(category)}>
                      <Text style={styles.verMas}>Ver todo</Text>
                    </Pressable>
                  </View>
                  <View style={styles.cardsContainer}>
                    {category.products.map(product => <ProductItem key={product.id} item={product} navigation={navigation}></ProductItem>)}
                  </View>
                </View>)
            }
          </ScrollView>
        : null
  )
}

export default AllCategories

const styles = StyleSheet.create({
  /* Containers */
  container: {
    width: "100%",
    paddingHorizontal: 5,
    flex: 1,
    overflow: "hidden"
  },
  categoryContainer: {
    paddingVertical: 10,
    marginBottom: 13
  },
  cardsContainer: {
    flexDirection: "row",
    gap: 15
  },
  titleCategoryContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  titleCategory: {
    fontWeight: "700",
    fontSize: 19
  },
  verMas: {
    fontWeight: "500",
    fontSize: 14,
    color: colors.primary
  },
  itemContainer: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  row: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 10,
    marginBottom: 10
  }
})