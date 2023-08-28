import React from 'react'
import Header from '../Components/HeaderShop'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Cart from '../Screens/Cart';

const Stack = createNativeStackNavigator();

const CartStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="CartScreen"
            screenOptions={{
                headerShown: false
              }}
        >
            <Stack.Screen name="CartScreen" component={Cart} />
        </Stack.Navigator>
    )
}

export default CartStack