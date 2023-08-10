import { FlatList, Pressable, StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'
import LocationItem from '../Components/LocationItem'
import { useSelector } from 'react-redux'
import { useGetUserLocationQuery } from '../Services/shopServices'
import Card from '../Components/Card'

const ListLocationScreen = ({ navigation }) => {
  const { localId, location } = useSelector((state) => state.userReducer.value)
  const { data: userLocationQuery, isError, isLoading } = useGetUserLocationQuery(localId)
  console.log(location)
  console.log(userLocationQuery)

  return location?.latitude || userLocationQuery ? (
    <View style={styles.container}>
      <FlatList
        data={[location?.longitude || userLocationQuery]}
        keyExtractor={orderItem => orderItem}
        renderItem={({ item }) => {
          return (
            <LocationItem
            location={item}
            navigation={navigation}
            />
          )
        }}
      />
    </View>
  ) : (<View style={styles.container}>
    <Text style={styles.text}>No location set</Text>
    <Pressable onPress={() => navigation.navigate("Location Selector")}>
      <Card>
        <Text style={styles.text}>Set location</Text>
      </Card>
    </Pressable>
  </View>)
}

export default ListLocationScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightOcean,
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 18
  },
  text: {
    paddingVertical: 20,
    fontFamily: 'BROmega',
    fontSize: 18
  }
})