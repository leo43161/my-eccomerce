import React from 'react'
import Header from '../Components/Header'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack