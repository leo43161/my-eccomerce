import React from 'react'
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native'
import CategoryItem from '../Components/CategoryItem'
import { colors } from '../Global/Colors'
import { useGetCategoriesQuery } from '../Services/shopServices'

const Home = ({ navigation }) => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  return (
    <View style={styles.container}>
      {
        isLoading ?
          <ActivityIndicator size={55} color={colors.secondary} /> :
          !isError ?
            <>
              <FlatList style={{
                paddingHorizontal: 10,
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

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    paddingTop: 10
  },
})