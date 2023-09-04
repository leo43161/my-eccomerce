import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../Global/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../Features/cart/cartSlice';

const ItemDetails = () => {
  const dispatch = useDispatch()
  const productSelected = useSelector(state => state.shopReducer.value.productSelected);
  const [product, setProduct] = useState(null);
  const [imageProduct, setImageProduct] = useState("");
  const [imageGalery, setImageGalery] = useState([]);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    //Encontrar el producto por su id
    const galleryFiltered = productSelected.images.filter((image) => image !== productSelected.images[0]);
    setImageGalery(galleryFiltered);
    setImageProduct(productSelected.images[0]);
    setProduct(productSelected);
  }, [productSelected]);

  const onCart = () => {
    dispatch(addCartItem({
      ...product,
      quantity
    }))
  }

  const galleryHandler = (imgSelected) => {
    const galleryFiltered = product.images.filter((image) => image !== imgSelected);
    setImageGalery(galleryFiltered);
    setImageProduct(imgSelected);
  }
  return product ? (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode='contain'
          style={styles.image}
          source={{ uri: imageProduct }}
        />
        <View style={styles.galeryContainer}>
          {imageGalery.map((image, idx) =>
            <Pressable key={idx} onPress={() => galleryHandler(image)} style={styles.imageGaleryContainer}>
              <Image
                resizeMode='cover'
                style={styles.imageGalery}
                source={{ uri: image }}
              />
            </Pressable>
          )}
        </View>
      </View>
      <View style={styles.containerMain}>
        <View style={styles.productContainer}>
          <View>
            <Text style={styles.title}>{product.title}</Text>
            <View style={styles.titleContainer}>
              <View style={[styles.rating]}>
                <FontAwesome name="star" size={17} color="#FFA14B" />
                <Text style={styles.textBold}>{product.rating}</Text>
              </View>
              <Text style={styles.price}>$ {product.price}</Text>
            </View>
          </View>
          <Text style={styles.textBold}>Description</Text>
          <View>
            <Text numberOfLines={3} style={styles.description}>
              {product.description}
            </Text>
          </View>

          <View style={styles.containerBrandCart}>
            <View style={styles.quantityContainer}>
              <View style={styles.quantityCol}>
                {quantity > 1 ?
                  <Pressable style={[styles.buttonQuantity, styles.buttonMine]} onPress={() => { setQuantity(quantity - 1) }}>
                    <FontAwesome name="minus" size={14} color="black" />
                  </Pressable>
                  : null
                }
              </View>
              <View style={styles.quantityCol}>
                <Text>{quantity}</Text>
              </View>
              <View style={styles.quantityCol}>
                <Pressable style={[styles.buttonQuantity, styles.buttonPlus]} onPress={() => { setQuantity(quantity + 1) }}>
                  <FontAwesome name="plus" size={14} color="black" />
                </Pressable>
              </View>
            </View>
            <View>
              <Text style={styles.brand}>{product.brand}</Text>
              <Text style={styles.textBrand}>brand</Text>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <Pressable onPress={onCart} style={styles.buttonCart}>
              <FontAwesome name="shopping-cart" size={17} color="#FFFFFF" />
              <Text style={styles.buttonText}>Add to Cart</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  ) : <></>
}

export default ItemDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMain: {
    flex: 4,
  },
  imageContainer: {
    width: "100%",
    position: "relative",
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  containerBrandCart: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: "row",
    backgroundColor: colors.gray200,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 3,
    paddingHorizontal: 1,
    width: "25%",
    borderRadius: 15,
  },
  image: {
    width: "80%",
    height: "90%",
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    maxWidth: "75%",
    fontFamily: "BROmega",
    flexShrink: 1,
    marginBottom: 5
  },
  textBold: {
    fontWeight: "bold",
    fontSize: 18
  },
  brand: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 16
  },
  textBrand: {
    fontSize: 12
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: colors.primary,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
    textTransform: "capitalize",
    color: "white"
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
    color: colors.gray300
  },
  productContainer: {
    paddingVertical: 25,
    paddingHorizontal: 30,
    flex: 1,
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    backgroundColor: "white",
    justifyContent: "space-between"
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
    gap: 5
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  buttonCart: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    gap: 5,
    backgroundColor: colors.primary
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF"
  },
  quantityCol: {
    flex: 1,
    alignItems: "center"
  },
  buttonQuantity: {
    backgroundColor: colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonPlus: {
    backgroundColor: colors.primary,
  },
  buttonMine: {
    borderColor: colors.primary,
    backgroundColor: "transparent",
  },
})