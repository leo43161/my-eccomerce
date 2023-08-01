import React from 'react'
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native'
import CategoryItem from '../Components/CategoryItem'
import { colors } from '../Global/Colors'
import { useGetCategoriesQuery } from '../Services/shopServices'

const Home = ({ navigation }) => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  console.log(categories);
  console.log(isLoading);
  console.log(isError);
  return (
    <View style={styles.container}>
      {
        isLoading ?
          <ActivityIndicator size={55} color={colors.blue} /> :
          !isError ?
            <FlatList style={{
              paddingHorizontal: 10,
              width: "100%"
            }}
              numColumns={2}
              columnWrapperStyle={styles.row}

              data={categories}
              keyExtractor={category => category.id}
              renderItem={({ item }) => <CategoryItem item={item} navigation={navigation}></CategoryItem>}
              showsVerticalScrollIndicator={false}
            /> :
            null
      }

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightOcean,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  }
})