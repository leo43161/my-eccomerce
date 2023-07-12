import { StyleSheet, TextInput, View, Pressable, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../Global/Colors';
import React, { useState } from 'react'

const Search = ({
    onSearch
}) => {
    const [keyword, setKeyword] = useState("");
    return (
        <View style={styles.searchContainer}>
            <View style={styles.inputContainer}>
                <Pressable onPress={() => onSearch(keyword)}>
                    <FontAwesome name="search" size={24} color="white" />
                </Pressable>
                <TextInput
                    style={[styles.input, styles.textWhite]}
                    placeholder='Search...'
                    value={keyword}
                    onChangeText={setKeyword}
                    placeholderTextColor="#fff"
                />
            </View>
            <Pressable style={styles.buttonContainer} onPress={() => onSearch(keyword)}>
                <Text style={styles.buttonText}>Buscar</Text>
            </Pressable>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    textWhite: {
        color: 'white',
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: colors.darkBlue,
        color: "white"
    },
    inputContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 10,
        alignItems: 'center',
        color: "white"
    },
    buttonText: {
        color: "white"
    },
    input: {
        flex: 1,
        padding: 8,
        fontSize: 18,
        backgroundColor: colors.pink,
    },
})