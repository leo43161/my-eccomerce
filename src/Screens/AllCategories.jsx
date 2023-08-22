import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'
import ProductItem from '../Components/ProductItem'
import { useGetCategoriesWithProductsQuery } from '../Services/shopServices'
import ProductHighlight from '../Components/ProductHighlight'

const AllCategories = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesWithProductsQuery();
  return (
    <ScrollView style={styles.container}>
      <ProductHighlight></ProductHighlight>
      {
        isLoading ?
          <ActivityIndicator size={55} color={colors.secondary} /> :
          !isError ?
            <> {
              categories.map((category) =>
                <View key={category.id} style={styles.categoryContainer}>
                  <View style={styles.titleCategoryContainer}>
                    <Text style={styles.titleCategory}>{category.title}</Text>
                    <Text style={styles.verMas}>Ver todo</Text>
                  </View>
                  <View style={styles.cardsContainer}>
                    {category.products.map(product => <ProductItem key={product.id} product={product}></ProductItem>)}
                  </View>
                </View>)
            }
            </>
            : null
      }
    </ScrollView>

  )
}

export default AllCategories

const styles = StyleSheet.create({
  /* Containers */
  container: {
    width: "100%",
    paddingHorizontal: 5,
    flex: 1,
    paddingVertical: 10
  },
  categoryContainer: {
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
    fontWeight: "900",
    fontSize: 20
  },
  verMas: {
    fontWeight: "500",
    fontSize: 14,
    color: colors.primary
  },
})