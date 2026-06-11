import { StatusBar } from 'expo-status-bar';
import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import { auth } from './src/firebase/config';

const Stack = createNativeStackNavigator();


export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(usuarioLogueado => {
      setUser(usuarioLogueado)
      console.log(usuarioLogueado)
    })
  }, [])
//fijarse como se hace el recordarme de thiago
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ?
          <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
          :
          <>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name='Register' component={Register} options={{ headerShown: false }}/>
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**
import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name='Register' component={Register} options={{ headerShown: false }}/>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

 */