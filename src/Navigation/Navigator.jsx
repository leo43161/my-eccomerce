import { StyleSheet, SafeAreaView, StatusBar, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStack from './ShopStack';
import { FontAwesome } from '@expo/vector-icons';
import CartStack from './CartStack';
import OrderStack from './OrdersStack';

const Tab = createBottomTabNavigator();

const Navigator = () => {
    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName='Shop'
                    screenOptions={{
                        headerShown: false,
                        tabBarShown: false,
                        tabBarStyle: styles.tabBar,
                    }}
                >
                    <Tab.Screen
                        name='Shop'
                        component={ShopStack}
                        options={{
                            tabBarIcon: ({ focused }) => {
                                return (
                                    <View>
                                        <FontAwesome name="shopping-bag" size={24} color="black" />
                                    </View>
                                )
                            }
                        }}
                    />
                    <Tab.Screen
                        name='Cart'
                        component={CartStack}
                        options={{
                            tabBarIcon: ({ focused }) => {
                                return (
                                    <View>
                                        <FontAwesome name="shopping-cart" size={24} color="black" />
                                    </View>
                                )
                            }
                        }}
                    />
                    <Tab.Screen
                        name='Orders'
                        component={OrderStack}
                        options={{
                            tabBarIcon: ({ focused }) => {
                                return (
                                    <View>
                                        <FontAwesome name="th-list" size={24} color="black" />
                                    </View>
                                )
                            }
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )
}

export default Navigator

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    tabBar: {

    }
})