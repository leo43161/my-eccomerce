import { StyleSheet, SafeAreaView, StatusBar, View, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStack from './ShopStack';
import { FontAwesome } from '@expo/vector-icons';
import CartStack from './CartStack';
import OrderStack from './OrdersStack';
import { colors } from '../Global/Colors';
import AuthStack from './AuthStack';
import { useDispatch, useSelector } from 'react-redux';
import ProfileStack from './ProfileStack';
import { getSession } from '../SQLite';
import { setUser } from '../Features/user/userSlice';

const Tab = createBottomTabNavigator();

const Navigator = () => {
    const { email } = useSelector(state => state.userReducer.value);

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const session = await getSession()
                console.log(session)
                if (session?.rows.length) {
                    const user = session.rows._array[0]
                    dispatch(setUser(user))
                }
            } catch (error) {
                console.log('Error getting session');
                console.log(error.message);
            }
        })()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer>
                {email ? <>
                    <Tab.Navigator
                        initialRouteName='Shop'
                        screenOptions={{
                            headerShown: false,
                            tabBarShown: false,
                            tabBarStyle: styles.tabBar,
                            tabBarLabelStyle: styles.tabsText,
                            tabBarShowLabel: false,
                            tabBarItemStyle: styles.tabsContainer
                        }}
                    >
                        <Tab.Screen
                            name='Shop'
                            component={ShopStack}
                            options={{
                                tabBarIcon: ({ focused }) => {
                                    return (
                                        <View>
                                            <FontAwesome name="shopping-bag" size={24} color={focused ? colors.light : colors.secondary} />
                                        </View>
                                    )
                                },
                                tabBarActiveTintColor: colors.light,
                                tabBarInactiveTintColor: colors.secondary
                            }}
                        />
                        <Tab.Screen
                            name='Cart'
                            component={CartStack}
                            options={{
                                tabBarIcon: ({ focused }) => {
                                    return (
                                        <View>
                                            <FontAwesome name="shopping-cart" size={24} color={focused ? colors.light : colors.secondary} />
                                        </View>
                                    )
                                },
                                tabBarActiveTintColor: colors.light,
                                tabBarInactiveTintColor: colors.secondary
                            }}
                        />
                        <Tab.Screen
                            name='Orders'
                            component={OrderStack}
                            options={{
                                tabBarIcon: ({ focused }) => {
                                    return (
                                        <View>
                                            <FontAwesome name="th-list" size={24} color={focused ? colors.light : colors.secondary} />
                                        </View>
                                    )
                                },
                                tabBarActiveTintColor: colors.light,
                                tabBarInactiveTintColor: colors.secondary
                            }}
                        />
                        <Tab.Screen
                            name='My Profile'
                            component={ProfileStack}
                            options={{
                                tabBarIcon: ({ focused }) => {
                                    return (
                                        <View>
                                            <FontAwesome name="user" size={24} color={focused ? colors.light : colors.secondary} />
                                        </View>
                                    )
                                },
                                tabBarActiveTintColor: colors.light,
                                tabBarInactiveTintColor: colors.secondary
                            }}
                        />
                    </Tab.Navigator>
                </> :
                    <AuthStack />
                }

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
        height: 58,
        justifyContent: 'center',
        backgroundColor: "black",
    },
    tabsContainer: {
        paddingVertical: 8
    },
    tabsText: {
        fontSize: 12
    },
    border: {
        borderWidth: 1,
        borderColor: "red"
    }
})