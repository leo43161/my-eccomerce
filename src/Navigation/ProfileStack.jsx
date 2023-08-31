import React from 'react'
import Header from '../Components/Header'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyProfile from '../Screens/MyProfile'
import ImageSelector from '../Screens/ImageSelector'
import ListLocationScreen from '../Screens/ListLocationScreen'
import LocationSelector from '../Screens/LocationSelector'

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Profile"
            screenOptions={({ route, navigation }) => ({
                header: () => {
                    return <Header route={route} navigation={navigation} />;
                },
            })}
        >
            <Stack.Screen name="ImageChange" component={ImageSelector} />
            <Stack.Screen name="Profile" component={MyProfile} />
            <Stack.Screen name="List Location" component={ListLocationScreen} />
            <Stack.Screen name="Location Selector" component={LocationSelector} />
        </Stack.Navigator>
    )
}

export default ProfileStack