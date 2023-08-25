import React from 'react'
import Header from '../Components/HeaderShop'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OrderScreen from '../Screens/OrderScreen';

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
            <Stack.Screen name="OrdersScreen" component={OrderScreen} />
        </Stack.Navigator>
    )
}

export default OrderStack