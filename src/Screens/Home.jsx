import React from 'react'
import { FlatList, StyleSheet, View, ActivityIndicator, ScrollView, Image } from 'react-native'
import CategoryItem from '../Components/CategoryItem'
import { colors } from '../Global/Colors'
import { useGetCategoriesQuery, useGetCategoriesWithProductsQuery } from '../Services/shopServices'
import Search from '../Components/Search'
import AllCategories from './AllCategories'
import { useSelector } from 'react-redux'
import ItemListCategory from './ItemListCategory'
import { useState } from 'react'

const Home = ({ navigation }) => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const categorySelected = useSelector(state => state.shopReducer.value.categorySelected)
  const [keyword, setKeyword] = useState("");
  const onSearch = (input) => {
    setKeyword(input.trim());
  }
  return (
    <View style={styles.container}>
      <Search onSearch={onSearch}></Search>
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
                renderItem={({ item }) => <CategoryItem categorySelected={categorySelected} item={item}></CategoryItem>}
                showsHorizontalScrollIndicator={false}
              />
            </>
            :
            null
      }
      {categorySelected.id === 0 ? <AllCategories keyword={keyword} navigation={navigation}></AllCategories> : <ItemListCategory navigation={navigation} keyword={keyword}></ItemListCategory>}
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