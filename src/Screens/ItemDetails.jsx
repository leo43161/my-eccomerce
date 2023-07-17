import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react'
import allProducts from '../Data/products.json'
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../Global/Colors';

const ItemDetails = ({
  route
}) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [orientation, setOrientation] = useState(null);
  useEffect(() => {
    //Encontrar el producto por su id
    const productSelected = allProducts.find(
      (product) => product.id === productId
    );
    setProduct(productSelected);
  }, [productId]);
  return (
    <View style={styles.container}>
      {product ?
        <View>
          <Image
            resizeMode='cover'
            style={styles.image}
            source={{ uri: product.images[0] }}
          />
          <View style={styles.productContainer}>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>{product.category}</Text>
              <View style={[styles.like]}>
                <FontAwesome name="heart" size={17} color={colors.ocean} />
              </View>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{product.title}</Text>
              <View style={[styles.rating]}>
                <FontAwesome name="star" size={17} color="black" />
                <Text>{product.rating}</Text>
              </View>
            </View>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <View style={styles.buttonsContainer}>
              <Pressable style={styles.buttonBuy}>
                <Text style={[styles.buttonText, styles.buttonTextBuy]}>Comprar</Text>
              </Pressable>
              <Pressable style={styles.buttonCart}>
                <FontAwesome name="shopping-cart" size={17} color="black" />
                <Text style={styles.buttonText}>Carrito</Text>
              </Pressable>
            </View>
          </View>
        </View>
        : null
      }
    </View>
  )
}

export default ItemDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 340
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    maxWidth: "75%",
    fontFamily: "BROmega",
    flexShrink: 1
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: colors.ocean,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
    color: "white"
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    marginBottom: 10
  },
  productContainer: {
    padding: 20
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3
  },
  like: {
    borderRadius: 100,
    borderWidth: 1,
    padding: 9,
    borderColor: colors.ocean
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
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
    paddingVertical: 15,
    paddingVertical: 10
  },
  buttonCart: {
    flex: 1,
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 15,
    paddingVertical: 15,
    paddingVertical: 10
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonTextBuy: {
    color: "white",
  }
})