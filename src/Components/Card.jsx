import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors'

const Card = ({ children, additionalStyle = [] }) => {
  return (
    <View style={[styles.cardContainer, additionalStyle]}>
      {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 9,
    borderWidth: 1.3,
    borderColor: colors.gray200,
  }
})