import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import Card from './Card'

const CategoryItem = ({ item, setCategorySelected }) => {
    return (
        <Pressable>
            <Card>
                <Text>{item}</Text>
            </Card>
        </Pressable>
    )
}

export default CategoryItem

const styles = StyleSheet.create({})