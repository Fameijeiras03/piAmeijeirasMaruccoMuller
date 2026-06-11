import react, { useState } from 'react';
import { View, Text, StyleSheet, Pressable,TextInput } from 'react-native';
import { auth,db } from '../firebase/config.js';

function Register(props) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    function register(){
        if (!email.includes('@')) {
            setLoginError('Ingresar un mail valido');
            return
        }
        if (password.length < 6) {
            setLoginError('La contraseña debe tener al menos 6 caracteres');
            return
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then(response => {
                db.collection('users').add({
                    email: email,
                    username: username,
                })
                props.navigation.navigate('Login')
            })
            .catch(error => {
                console.log(error)
                
            })

    }
    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Register page</Text>
            <Pressable style={styles.botonAzul} onPress={() => props.navigation.navigate('Login')}>
                <Text style={styles.botonTexto}>Ir a Login</Text>
            </Pressable>
            <Text>Crea tu cuenta</Text>  
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
                placeholder='Username'
                onChangeText={text => setUsername(text)}
                value={username}
            />
            <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='Password'
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />
            <Pressable style={styles.botonSubmit} onPress={()=>register()}>
                <Text style={styles.botonSubmitTexto}>Registrarse</Text>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate('Login')}>
                <Text>Ya tengo cuenta</Text>
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

export default Register;