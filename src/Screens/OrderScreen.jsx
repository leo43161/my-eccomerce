import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import OrderItem from '../Components/OrderItem'
import { colors } from '../Global/Colors'
import { useSelector } from 'react-redux'

const OrderScreen = () => {
  const { allOrders: OrderData, total } = useSelector(state => state.ordersReducer.value);

  return (
    <View style={styles.container}>
      <FlatList
        data={OrderData}
        keyExtractor={orderItem => orderItem.id}
        renderItem={({ item }) => {
          return (
            <OrderItem
              order={item}
            />
          )
        }}
      />
    </View>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightOcean,
    flex: 1
  }
})