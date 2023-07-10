import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import categories from '../Data/categories.json'
import CategoryItem from '../Components/CategoryItem'

const Home = ({ setCategorySelected }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={category => category}
        renderItem={({ item }) => CategoryItem({ item, setCategorySelected })}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    height: '90%',
    backgroundColor: "white",
    alignItems: 'center'
  }
})