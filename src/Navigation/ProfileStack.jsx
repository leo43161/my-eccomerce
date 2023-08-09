import React from 'react'
import Header from '../Components/Header'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyProfile from '../Screens/MyProfile'
import ImageSelector from '../Screens/ImageSelector'
import ListLocationScreen from '../Screens/ListLocationScreen'

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="ListLocation"
            screenOptions={({ route, navigation }) => ({
                header: () => {
                    return <Header route={route} navigation={navigation} />;
                },
            })}
        >
            <Stack.Screen name="ImageChange" component={ImageSelector} />
            <Stack.Screen name="Profile" component={MyProfile} />
            <Stack.Screen name="ListLocation" component={ListLocationScreen} />
        </Stack.Navigator>
    )
}

export default ProfileStack