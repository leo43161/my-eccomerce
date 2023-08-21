import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'
import Card from '../Components/Card'

const AllCategories = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleCategoryContainer}>
        <Text style={styles.titleCategory}>Sofas</Text>
        <Text style={styles.verMas}>Ver todo</Text>
      </View>
      <View style={styles.cardsContainer}>
        <Card additionalStyle={styles.card}>
          <View style={styles.imgContainer}>
            <Image
              resizeMode='contain'
              style={styles.image}
              source={require('../Assets/Img/mueble2.png')}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.titleProduct}>
              Silla de Oficina
            </Text>
            <Text style={styles.descriptionProduct}>
              Lorem ipsum dolor, sit amet consectetur
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>$750.00</Text>
              <Text style={styles.offer}>$750.00</Text>
            </View>
          </View>
        </Card>
        <Card additionalStyle={styles.card}>
          <View style={styles.imgContainer}>
            <Image
              resizeMode='contain'
              style={styles.image}
              source={require('../Assets/Img/mueble1.png')}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.titleProduct}>
              Silla de Oficina
            </Text>
            <Text style={styles.descriptionProduct}>
              Lorem ipsum dolor, sit amet consectetur
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>$750.00</Text>
              <Text style={styles.offer}>$750.00</Text>
            </View>
          </View>
        </Card>
      </View>
    </View>
  )
}

export default AllCategories

const styles = StyleSheet.create({
  /* Containers */
  container: {
    width: "100%",
    paddingHorizontal: 5,
    flex: 1
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  infoContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15
  },
  imgContainer: {
    paddingTop: 15
  },
  cardsContainer: {
    flexDirection: "row",
    gap: 15
  },
  titleCategoryContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  /* Text */
  titleProduct: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 3
  },
  descriptionProduct: {
    fontSize: 12,
    color: colors.gray300,
    marginBottom: 5
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
  offer: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.gray300,
    textDecorationLine: "line-through"
  },
  titleCategory: {
    fontWeight: "900",
    fontSize: 20
  },
  verMas: {
    fontWeight: "500",
    fontSize: 14,
    color: colors.primary
  },
  /* Others */
  card: {
    flex: 2
  },
  image: {
    width: "100%",
    height: 140,
    /* borderWidth: 1 */
  }
})