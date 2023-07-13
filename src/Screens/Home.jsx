import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import categories from '../Data/categories.json'
import CategoryItem from '../Components/CategoryItem'
import { colors } from '../Global/Colors'

const Home = ({ setCategorySelected }) => {
  return (
    <View style={styles.container}>
      <FlatList style={{
        paddingHorizontal: 10,
        width: "100%"
      }}
        numColumns={2}                  // set number of columns 
        columnWrapperStyle={styles.row}

        data={categories}
        keyExtractor={category => category.id}
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
    backgroundColor: colors.lightOcean,
    alignItems: 'center',
    paddingTop:10
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  }
})