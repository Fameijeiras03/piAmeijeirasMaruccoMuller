import react, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable,TextInput } from 'react-native';
import { auth,db } from '../firebase/config.js';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    //Funcion de "recordarme"
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                props.navigation.navigate('HomeMenu')
            }
        })
    }, [])

    function loguearse() {
        if (!email.includes('@')) {
            setLoginError('Email invalido');
            return
        } 
        
        if (password.length < 6) {
            setLoginError('La contraseña debe tener al menos 6 caracteres');
            return
        } 
        auth.signInWithEmailAndPassword(email,password)
        .catch(error => {
            setLoginError('Credenciales Invalidas')
        })
        }
    return(
    <View style={styles.container}>
            <Text style={styles.titulo}>Login page</Text>
            <Pressable style={styles.botonAzul} onPress={() => props.navigation.navigate('Register')}>
                <Text style={styles.botonTexto}>Ir a Register</Text>
            </Pressable>
            <Pressable style={styles.botonNaranja} onPress={() => props.navigation.navigate('HomeMenu')}>
                <Text style={styles.botonTexto}>Ir a la App</Text>
            </Pressable>
        <Text>Logueate</Text>
            <TextInput
                style={styles.input}
                keyboardType='email-address'
                placeholder='Email'
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='Password'
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />
            <Pressable style={styles.botonSubmit} onPress={()=>loguearse()}>
                <Text style={styles.botonSubmitTexto}>Iniciar Sesión</Text>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate('Register')}>
                <Text>Registrarse</Text>
            </Pressable>
            <Text style={styles.error}>{loginError}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        justifyContent: 'center',
        paddingHorizontal: 28,
    },
    titulo: {
        fontSize: 26,
        fontWeight: '700',
        color: '#1a1a2e',
        textAlign: 'center',
        marginBottom: 28,
    },
    input: {
        height: 50,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#d0d7e3',
        borderRadius: 12,
        marginVertical: 8,
        fontSize: 15,
        color: '#222',
        backgroundColor: '#ffffff',
    },
    botonSubmit: {
        backgroundColor: '#6bc5f5',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 16,
        shadowColor: '#6bc5f5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 6,
        elevation: 4,
    },
    botonSubmitTexto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
    botonAzul: {
        display: 'none',
    },
    botonNaranja: {
        display: 'none',
    },
    botonTexto: {
        display: 'none',
    },
    error: {
        color: '#e03e3e',
        fontSize: 13,
        marginTop: 6,
        paddingHorizontal: 4,
    },
    preview: {},
});


export default Login;


/**
import react, { useState } from 'react';
import { View, Text, StyleSheet, Pressable,TextInput } from 'react-native';
import { auth,db } from '../firebase/config.js';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    
    function loguearse() {
        if (!email.includes('@')) {
            setLoginError('Email invalido');
            return
        } 
        
        if (password.length < 6) {
            setLoginError('La contraseña debe tener al menos 6 caracteres');
            return
        } 
        auth.signInWithEmailAndPassword(email,password)
        .then((response) => {
            props.navigation.navigate('HomeMenu')
        })
        .catch(error => {
            setLoginError('Credenciales Invalidas')
        })
        }
    return(
    <View style={styles.container}>
            <Text style={styles.titulo}>Login page</Text>
            <Pressable style={styles.botonAzul} onPress={() => props.navigation.navigate('Register')}>
                <Text style={styles.botonTexto}>Ir a Register</Text>
            </Pressable>
            <Pressable style={styles.botonNaranja} onPress={() => props.navigation.navigate('HomeMenu')}>
                <Text style={styles.botonTexto}>Ir a la App</Text>
            </Pressable>
        <Text>Logueate</Text>
            <TextInput
                style={styles.input}
                keyboardType='email-address'
                placeholder='Email'
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='Password'
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />
            <Pressable style={styles.botonSubmit} onPress={()=>loguearse()}>
                <Text style={styles.botonSubmitTexto}>Iniciar Sesión</Text>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate('Register')}>
                <Text>Registrarse</Text>
            </Pressable>
            <Text style={styles.error}>{loginError}</Text>
        </View>
    )
}

 */