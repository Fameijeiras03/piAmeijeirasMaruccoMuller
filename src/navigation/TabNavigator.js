import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import NuevoPost from '../screens/NuevoPost';
import Perfil from '../screens/Perfil';
import HomeStack from './StackNavigator';

const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    headerShown: false,
                    tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />
                }}
            />
            <Tab.Screen
                name="NuevoPost"
                component={NuevoPost}
                options={{
                    headerShown: false,
                    tabBarIcon: () => <FontAwesome name="plus" size={24} color="black" />
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    headerShown: false,
                    tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />
                }}
            />
        </Tab.Navigator>
    );
}

export default TabNavigator;