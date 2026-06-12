import { StatusBar } from 'expo-status-bar';
import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import { auth } from './src/firebase/config';
import HomeMenu from './src/components/HomeMenu';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name='HomeMenu' component={HomeMenu} options={{ headerShown: false }}/>
        <Stack.Screen name='Register' component={Register} options={{ headerShown: false }}/>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

