import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../Global/Colors';
import { Ionicons } from '@expo/vector-icons';

const InputForm = ({
    label,
    onChange,
    error = "",
    isSecure = false
}) => {
    const [input, setInput] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const onChangeText = (text) => {
        setInput(text)
        onChange(text)
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={onChangeText}
                    secureTextEntry={!showPassword && isSecure}
                    placeholder={label}
                />
                {isSecure && (
                    <TouchableOpacity style={styles.eyeWrapper} onPress={togglePasswordVisibility}>
                        <Ionicons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color={colors.gray300}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error ?
                <Text style={styles.error}>
                    {error}
                </Text>
                :
                null
            }
        </View>
    )
}

export default InputForm

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        gap: 4
    },
    subtitle: {
        width: '90%',
        fontSize: 16,
        fontFamily: 'BROmega'
    },
    error: {
        fontSize: 13,
        color: 'red',
        fontFamily: 'BROmega',
    },
    input: {
        width: '100%',
        backgroundColor: colors.gray200,
        padding: 10,
        fontFamily: 'BROmega',
        fontSize: 14,
        borderRadius: 8
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderColor: colors.gray200,
        borderWidth: 1,
        borderRadius: 8,
    },
    iconContainer: {
        padding: 10,
    },
    eyeWrapper: {
        position: "absolute",
        right: 15,
    }
})