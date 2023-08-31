import { ActivityIndicator, FlatList, StyleSheet, View, Text } from 'react-native'
import React, { useEffect } from 'react'
import OrderItem from '../Components/OrderItem'
import { colors } from '../Global/Colors'
import { useSelector } from 'react-redux'
import { useGetOrdersQuery } from '../Services/shopServices'

const OrderScreen = ({ navigation }) => {
  const { localId } = useSelector(state => state.userReducer.value);
  const { data: orders, isLoading, isError, refetch, error } = useGetOrdersQuery(localId);
  useEffect(() => {
    const reloadOrders = navigation.addListener('focus', () => {
      refetch();
    });
    return reloadOrders;
  }, [navigation, refetch]);
  return (
    <View style={styles.container}>
      {isLoading ?
        <ActivityIndicator size={55} color={colors.secondary} />
        : isError ?
          <Text>Ocurrio un error</Text> :
          <FlatList
            data={orders}
            keyExtractor={orderItem => orderItem.id}
            renderItem={({ item }) => {
              return (
                <OrderItem
                  order={item}
                />
              )
            }}
          />}
    </View>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFF",
    flex: 1
  }
})