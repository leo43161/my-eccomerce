import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartItem from '../Components/CartItem';
import { colors } from '../Global/Colors';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const dispatch = useDispatch();
  const { items: CartData, total, updatedAt, user } = useSelector(state => state.cartReducer.value);
  console.log(CartData);
  return (
    <View style={styles.container}>
      <FlatList
        data={CartData}
        keyExtractor={cartItem => cartItem.id}
        renderItem={({ item }) => {
          return (
            <CartItem
              cartItem={item}
            />
          )
        }}
      />
      <View style={styles.buyContainer}>
        <View style={styles.buysContainer}>
          <FlatList
            data={CartData}
            keyExtractor={cartItem => cartItem.id}
            renderItem={({ item }) => {
              return (
                <View style={styles.priceContainer}>
                  <Text style={styles.productBuy}>{item.title} x{item.quantity}: </Text>
                  <Text style={styles.productBuy}>${item.price}</Text>
                </View>
              )
            }}
          />
        </View>
        <View style={styles.totalContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.productBuy}>Total: </Text>
            <Text style={styles.priceTotal}>${total}</Text>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          {
            CartData.length > 0 &&
            <Pressable style={styles.buttonBuy}>
              <Text style={[styles.buttonText, styles.buttonTextBuy]}>Comprar</Text>
            </Pressable>
          }

        </View>
      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: colors.lightOcean
  },
  totalContainer: {
    borderTopColor: "#F3F3F3",
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  buysContainer: {
    maxHeight: 200,
    paddingVertical: 4
  },
  priceContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5
  },
  buyContainer: {
    paddingHorizontal: 13,
    paddingVertical: 15,
    backgroundColor: "white"
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  buttonBuy: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.ocean,
    borderRadius: 15,
    paddingVertical: 12,
  },
  buttonCart: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 15,
    paddingVertical: 15,
    paddingVertical: 10,
    gap: 5
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productBuy: {
    fontSize: 18,
  },
  priceTotal: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.ocean,
  },
  buttonTextBuy: {
    color: "white",
  }
})