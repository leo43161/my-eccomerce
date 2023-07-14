import { StyleSheet, SafeAreaView, View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Screens/Home';
import ItemListCategory from '../Screens/ItemListCategory';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    return (
        <SafeAreaView>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='Home'
                >
                    <Stack.Screen
                        name='Home'
                        component={Home}
                    />
                    <Stack.Screen
                        name='Home'
                        component={ItemListCategory}
                    />
                    <Stack.Screen
                        name='Home'
                        component={() => <View><Text>ItemList</Text></View>}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )
}

export default Navigator

const styles = StyleSheet.create({})