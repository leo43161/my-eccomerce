import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import InputForm from "../Components/InputForm";
import SubmitButton from "../Components/SubmitButton";
import { colors } from "../Global/Colors";
import { useSignInMutation } from "../Services/authServices";
import { isAtLeastSixCharacters, isValidEmail } from "../Validations/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../Features/user/userSlice";
import { insertSession, dropTableSessions } from "../SQLite";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const dispatch = useDispatch()

    const [triggerSignIn, resultSignIn] = useSignInMutation();
    const deleteSession = async () => {
        await dropTableSessions()
    }
    const onSubmit = () => {

        //Submit logic with validations
        const isValidVariableEmail = isValidEmail(email)
        const isCorrectPassword = isAtLeastSixCharacters(password)

        if (isValidVariableEmail && isCorrectPassword) {
            triggerSignIn({
                email,
                password,
                returnSecureToken: true,
            });
        }

        if (!isValidVariableEmail) setErrorEmail('Email is not correct')
        else setErrorEmail('')
        if (!isCorrectPassword) setErrorPassword('Password must be at least 6 characters')
        else setErrorPassword('')
    };

    useEffect(() => {
        (async () => {
            try {
                if (resultSignIn.isSuccess) {
                    //Insert session in SQLite database
                    const response = await insertSession({
                        idToken: resultSignIn.data.idToken,
                        localId: resultSignIn.data.localId,
                        email: resultSignIn.data.email,
                    })
                    dispatch(setUser({
                        email: resultSignIn.data.email,
                        idToken: resultSignIn.data.idToken,
                        localId: resultSignIn.data.localId,
                        profileImage: "",
                        location: {
                            latitude: "",
                            longitude: "",
                        }
                    }))
                }
            } catch (error) {
                console.log(error.message);
            }

        })()
    }, [resultSignIn])

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <Text style={styles.title}>Hello Again!</Text>
                    <Text style={styles.subTitle}>Welcome back you've been missed!</Text>
                </View>
                <InputForm
                    label={"email"}
                    onChange={(email) => setEmail(email)}
                    error={errorEmail}
                />
                <InputForm
                    label={"password"}
                    onChange={(password) => setPassword(password)}
                    error={errorPassword}
                    isSecure={true}
                />
                <SubmitButton onPress={onSubmit} title="Sing in" />
                <Text style={styles.sub}>Not have an account?</Text>
                <Pressable onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.subLink}>Sign up</Text>
                </Pressable>
                <Pressable onPress={deleteSession}>
                    <Text style={styles.subLink}>Borrar Session</Text>
                </Pressable>
            </View>

        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    container: {
        width: '100%',
        height: '90%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    containerHeader: {
        alignItems: 'center',
        gap: 10
    },
    title: {
        fontSize: 25,
        fontFamily: 'BROmega'
    },
    subTitle: {
        fontSize: 20,
        fontFamily: 'BROmega',
        textAlign: 'center'
    },
    sub: {
        fontSize: 14,
        color: 'black',
    },
    subLink: {
        fontSize: 14,
        color: 'blue',
    }
})