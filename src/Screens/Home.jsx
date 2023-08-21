import React from 'react'
import { FlatList, StyleSheet, View, ActivityIndicator, Text, Image } from 'react-native'
import CategoryItem from '../Components/CategoryItem'
import { colors } from '../Global/Colors'
import { useGetCategoriesQuery } from '../Services/shopServices'
import ProductHighlight from '../Components/ProductHighlight'
import Search from '../Components/Search'
import AllCategories from './AllCategories'

const Home = ({ navigation }) => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  return (
    <View style={styles.container}>
      <Search></Search>
      <ProductHighlight additionalStyle={{ marginBottom: 20 }} />
      {
        isLoading ?
          <ActivityIndicator size={55} color={colors.secondary} /> :
          !isError ?
            <>
              <FlatList style={{
                width: "100%",
                maxHeight: 60,
              }}
                horizontal={true}
                data={categories}
                keyExtractor={category => category.id}
                renderItem={({ item }) => <CategoryItem item={item} navigation={navigation}></CategoryItem>}
                showsHorizontalScrollIndicator={false}
              />
            </>
            :
            null
      }
      <AllCategories></AllCategories>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
    overflow: "visible"
  },
})