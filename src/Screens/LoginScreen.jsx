import { Pressable, StyleSheet, Text, View, Image } from "react-native";
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
                    <View style={styles.imageContainer}>
                        <Image
                            resizeMode='center'
                            style={styles.image}
                            source={require('../Assets/Img/mueble2.png')}
                        ></Image>
                    </View>
                    <Text style={styles.title}>Login Now</Text>
                    <Text style={styles.subTitle}>Welcome back you've been missed!</Text>
                </View>
                <View style={styles.containerInputs}>
                    <InputForm
                        label={"Email"}
                        onChange={(email) => setEmail(email)}
                        error={errorEmail}
                    />
                    <InputForm
                        label={"Password"}
                        onChange={(password) => setPassword(password)}
                        error={errorPassword}
                        isSecure={true}
                    />
                    <Pressable onPress={() => navigation.navigate("Signup")}>
                        <Text style={styles.subLink}>Forgon Password?</Text>
                    </Pressable>
                </View>
                <SubmitButton onPress={onSubmit} title="Sing in" />
                <View style={styles.registerText}>
                    <Text style={styles.sub}>Not have an account?</Text>
                    <Pressable onPress={() => navigation.navigate("Signup")}>
                        <Text style={styles.subLink}>Sign up</Text>
                    </Pressable>
                </View>
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
        paddingHorizontal: 20,
        backgroundColor: "white"
    },
    container: {
        width: '100%',
        height: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 0
    },
    containerHeader: {
        alignItems: 'center',
        gap: 10
    },
    title: {
        fontSize: 25,
        fontFamily: 'BROmega',
    },
    subTitle: {
        fontSize: 15,
        fontFamily: 'BROmega',
        textAlign: 'center',
        color: colors.gray300
    },
    sub: {
        fontSize: 14,
        color: 'black',
    },
    subLink: {
        fontSize: 14,
        color: colors.primary,
        textAlign: "right"
    },
    image: {
        height: 180,
        width: 300
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerText: {
        flexDirection: "row",
        gap: 4
    },
    containerInputs: {
        width: "100%",
        gap: 12
    }
})