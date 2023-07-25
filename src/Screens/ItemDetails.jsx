import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../Global/Colors';
import { useSelector } from 'react-redux';

const ItemDetails = () => {
  const productSelected = useSelector(state => state.shopReducer.value.productSelected);
  const [product, setProduct] = useState(null);
  const [imageProduct, setImageProduct] = useState("");
  const [imageGalery, setImageGalery] = useState([]);
  useEffect(() => {
    //Encontrar el producto por su id
    const galleryFiltered = productSelected.images.filter((image) => image !== productSelected.images[0]);
    setImageGalery(galleryFiltered);
    setImageProduct(productSelected.images[0]);
    setProduct(productSelected);
  }, [productSelected]);

  const galleryHandler = (imgSelected) => {
    const galleryFiltered = product.images.filter((image) => image !== imgSelected);
    setImageGalery(galleryFiltered);
    setImageProduct(imgSelected);
  }
  return (
    <View style={styles.container}>
      {product ?
        <View>
          <View style={styles.imageContainer}>
            <Image
              resizeMode='cover'
              style={styles.image}
              source={{ uri: imageProduct }}
            />
            <View style={styles.galeryContainer}>
              {imageGalery.map((image, idx) => <>
                <Pressable key={idx} onPress={() => galleryHandler(image)} style={styles.imageGaleryContainer}>
                  <Image
                    resizeMode='cover'
                    style={styles.imageGalery}
                    source={{ uri: image }}
                  />
                </Pressable>
              </>)}
            </View>
          </View>
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
    textTransform: "capitalize",
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
  imageContainer: {
    width: "100%",
    position: "relative",
  },
  galeryContainer: {
    position: "absolute",
    right: 0,
    paddingRight: 15,
    paddingTop: 15
  },
  imageGalery: {
    width: 60,
    height: 60,
  },
  imageGaleryContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
  buttonTextBuy: {
    color: "white",
  }
})