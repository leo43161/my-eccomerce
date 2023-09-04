import { FlatList, Pressable, StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'
import { FontAwesome } from '@expo/vector-icons';
import LocationItem from '../Components/LocationItem'
import { useSelector } from 'react-redux'
import { useGetUserLocationQuery } from '../Services/shopServices'
import Card from '../Components/Card'

const ListLocationScreen = ({ navigation }) => {
  const { localId, location } = useSelector((state) => state.userReducer.value)
  const { data: userLocationQuery } = useGetUserLocationQuery(localId)

  return location?.latitude || userLocationQuery ? (
    <View style={styles.container}>
      <FlatList
        data={[location || userLocationQuery]}
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
    <Text style={styles.textNoLocation}>No location set</Text>
    <Pressable onPress={() => navigation.navigate("Location Selector")}>
      <Card additionalStyle={styles.card}>
        <Text style={styles.text}>Set location</Text>
        <View style={styles.changeContainer}>
          <FontAwesome name="map-marker" size={30} color="black" />
          <Text>Change</Text>
        </View>
      </Card>
    </Pressable>
  </View>)
}

export default ListLocationScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 18
  },
  text: {
    fontFamily: "BROmega",
    fontSize: 19,
    color: colors.dark,
    fontWeight: "bold",
  },
  textNoLocation: {
    fontFamily: "BROmega",
    fontSize: 19,
    color: colors.dark,
    fontWeight: "bold",
    marginBottom: 18
  },
  card: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  changeContainer: {
    alignItems: "center",
    gap: 5
}
})