import { StyleSheet, Text, Pressable, View } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors';
import { setCategorySelected } from '../Features/shop/shopSlice';
import { useDispatch } from 'react-redux';

const CategoryItem = ({
    item,
    categorySelected
}) => {

    const dispatch = useDispatch();
    const onSelectCategory = () => {
        dispatch(setCategorySelected(item));
    }

    return (
        <Pressable
            onPress={onSelectCategory}
            style={[styles.cardContainer]}>
            <View style={[styles.card, item.id === categorySelected.id ? styles.categorySelected : null]}>
                <Text style={[styles.textCategory, item.id === categorySelected.id ? styles.categorySelectedText : null]}>{item.title}</Text>
            </View>
        </Pressable>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
    cardContainer: {
        paddingHorizontal: 4,
    },
    card: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 6,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: colors.gray100,
        backgroundColor: colors.gray100,
    },
    categorySelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    categorySelectedText: {
        color: "white"
    },
    textCategory: {
        fontSize: 13,
        fontFamily: "BROmega",
        textAlign: "center",
        fontWeight: "200",
        color: colors.gray300
    },
})