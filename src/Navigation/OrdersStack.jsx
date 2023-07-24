import React from 'react'
import Header from '../Components/Header'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Orders from '../Screens/Orders';

const Stack = createNativeStackNavigator();

const OrderStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="OrdersScreen"
            screenOptions={({ route, navigation }) => ({
                header: () => {
                    return <Header route={route} navigation={navigation} />;
                },
            })}
        >
            <Stack.Screen name="OrdersScreen" component={Orders} />
        </Stack.Navigator>
    )
}

export default OrderStack