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
                    <TextInput
                        style={[styles.input]}
                        placeholder='Search...'
                        value={keyword}
                        onChangeText={setKeyword}
                        placeholderTextColor={colors.dark}
                        />
                </View>
                <Pressable style={styles.buttonContainer} onPress={() => onSearch(keyword)}>
                        {!keyword.trim() ?
                            <Pressable>
                                <FontAwesome name="search" size={24} color={colors.dark} />
                            </Pressable>
                            :
                            <Pressable onPress={deleteSearch}>
                                <FontAwesome name="close" size={24} color={colors.dark} />
                            </Pressable>
                        }
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
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: "white",
    },
    inputContainer: {
        width: '80%',
        borderWidth: 1,
        borderRadius: 15,
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