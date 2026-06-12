import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//import Profile from '../../screens/Profile';

import { Tabs } from 'react-native-screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AntDesign} from '@expo/vector-icons';
import Home from '../screens/Home';
import NuevoPost from '../screens/NuevoPost';

const Tab = createBottomTabNavigator()

function HomeMenu() {
    return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home}
                    options={{ headerShown: false }, { tabBarIcon: () => <AntDesign name="android" size={24} color="black" /> }}>
                </Tab.Screen>

                <Tab.Screen name="NuevoPost" component={NuevoPost}
                    options={{ headerShown: false }, { tabBarIcon: () => <AntDesign name="android" size={24} color="black" /> }}>
                </Tab.Screen>
            </Tab.Navigator>
    )
};

export default HomeMenu;