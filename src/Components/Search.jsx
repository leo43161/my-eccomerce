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
                    {keyword.trim() &&
                        <Pressable onPress={deleteSearch}>
                            <FontAwesome name="close" size={19} color={colors.light} />
                        </Pressable>
                    }
                    <TextInput
                        style={[styles.input]}
                        placeholder='Search...'
                        value={keyword}
                        onChangeText={setKeyword}
                        placeholderTextColor={colors.gray300}
                    />
                </View>
                <Pressable style={styles.buttonContainer} onPress={() => onSearch(keyword)}>
                    <FontAwesome name="search" size={19} color={colors.light} />
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
        marginBottom: 20
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: "white",
        gap: 7
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: colors.gray200,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 13,
        alignItems: 'center',
        flex: 9
    },
    buttonContainer: {
        height: "100%",
        borderRadius: 10,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 10,
        alignItems: 'center',
        color: "white",
        flex: 1
    },
    buttonText: {
        color: colors.dark
    },
    input: {
        flex: 1,
        padding: 7,
        fontSize: 13,
        color: colors.dark,
    },
})