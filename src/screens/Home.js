import react, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { auth, db} from '../firebase/config';


function Home(props) {

    return(
        <View style={styles.container}>
            <Pressable onPress={() => auth.signOut()}>
                <Text>Cerrar sesión</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Home;



/**
import react, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { auth, db} from '../firebase/config';


function Home(props) {

    return(
        <View style={styles.container}>
            <Pressable onPress={() => props.navigation.navigate('Register')}>
                <Text>Register</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Home;

 */