import { StyleSheet, TextInput, View, Pressable, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../Global/Colors';
import React, { useState } from 'react'
const Search = ({
    onSearch
}) => {
    const [keyword, setKeyword] = useState("");
    const deleteSearch = () => {
        setKeyword("");
        onSearch("");
    }
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.inputContainer}>
                    {!keyword.trim() ?
                        <Pressable>
                            <FontAwesome name="search" size={24} color={colors.dark} />
                        </Pressable>
                        :
                        <Pressable onPress={deleteSearch}>
                            <FontAwesome name="close" size={24} color={colors.dark} />
                        </Pressable>
                    }
                    <TextInput
                        style={[styles.input]}
                        placeholder='Search...'
                        value={keyword}
                        onChangeText={setKeyword}
                        placeholderTextColor={colors.dark}
                    />
                </View>
                <Pressable style={styles.buttonContainer} onPress={() => onSearch(keyword)}>
                    <Text style={styles.buttonText}>Buscar</Text>
                </Pressable>
            </View>
        </View>

    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        paddingTop: 15,
        paddingBottom: 5,
        paddingHorizontal: 20
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 35,
        backgroundColor: "white",
    },
    inputContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 13,
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
        color: colors.dark
    },
    input: {
        flex: 1,
        padding: 8,
        fontSize: 18,
        color: colors.dark
    },
})