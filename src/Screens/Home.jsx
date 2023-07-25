import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import CategoryItem from '../Components/CategoryItem'
import { colors } from '../Global/Colors'
import { useSelector } from 'react-redux'

const Home = ({ navigation }) => {
  const categories = useSelector(state => state.shopReducer.value.categories);
  return (
    <View style={styles.container}>
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
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightOcean,
    alignItems: 'center',
    paddingTop: 10
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  }
})