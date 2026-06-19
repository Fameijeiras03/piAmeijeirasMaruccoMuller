
import react, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { auth, db} from '../firebase/config';


function Home(props) {

    function logout() {
        auth.signOut()
        console.log('se deslogueo el user')
        props.navigation.navigate('Login')
    }

    return(
        <View style={styles.container}>
            <Pressable onPress={logout} style={styles.botonLogout}>
                <Text style={styles.botonTexto}>Cerrar sesión</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f4f8',
    },
    botonLogout: {
        backgroundColor: '#e03e3e',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 12,
    },
    botonTexto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default Home;