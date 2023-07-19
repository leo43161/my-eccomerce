import { StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Screens/Home';
import ItemListCategory from '../Screens/ItemListCategory';
import ItemDetails from '../Screens/ItemDetails';
import Header from '../Components/Header';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='Home'
                    screenOptions={
                        ({ route, navigation }) => (
                            {
                                header: () => {
                                    return <Header
                                        route={route}
                                        navigation={navigation}
                                    />
                                }
                            }
                        )
                    }
                >
                    <Stack.Screen
                        name='Home'
                        component={Home}
                    />
                    <Stack.Screen
                        name='Category'
                        component={ItemListCategory}
                    />
                    <Stack.Screen
                        name='Product'
                        component={ItemDetails}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )
}

export default Navigator

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }
})