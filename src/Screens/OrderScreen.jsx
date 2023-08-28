import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import OrderItem from '../Components/OrderItem'
import { colors } from '../Global/Colors'
import { useSelector } from 'react-redux'
import { useGetOrdersQuery } from '../Services/shopServices'

const OrderScreen = () => {
  const { allOrders: OrderData, total } = useSelector(state => state.ordersReducer.value);
  const { localId } = useSelector(state => state.userReducer.value);
  const { data: orders, isLoading, isError } = useGetOrdersQuery(localId);
  console.log(orders, isLoading, isError)
  return (
    <View style={styles.container}>
      {isLoading ?
        <ActivityIndicator size={55} color={colors.secondary} />
        : isError ?
          <Text>Ocurrio un error</Text> :
          <FlatList
            data={orders}
            keyExtractor={orderItem => orderItem.updatedAt}
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