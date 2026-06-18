import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/Post';

function Perfil(props) {


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [posteos, setPosteos] = useState([]);


    useEffect(() => {


        const emailUsuario = auth.currentUser ? auth.currentUser.email : null;
        setEmail(emailUsuario);


        db.collection('users').where('email', '==', emailUsuario).onSnapshot(docs => {
            let usersDocs = [];
            docs.forEach(doc => {
                usersDocs.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            if (usersDocs.length > 0) {
                setUsername(usersDocs[0].data.username);
            }
        });


        db.collection('posts').where('email', '==', emailUsuario).onSnapshot(docs => {
            let posts = [];
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                });
            });

            setPosteos(posts);
        });

    }, []);

    function logout() {
        auth.signOut()
            .then(() => {
                props.navigation.navigate('Login');
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    return (
        <View style={styles.container}>

            <View style={styles.perfilSeccion}>
                <Text style={styles.titulo}>Mi Perfil</Text>

                <View style={styles.infoContainer}>
                    <Text>Nombre de usuario:</Text>
                    <Text style={styles.valor}>{username}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text>Email:</Text>
                    <Text style={styles.valor}>{email}</Text>
                </View>

                <Text style={styles.subtitulo}>Mis posteos</Text>
            </View>

            <FlatList
                data={posteos}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Post
                        data={item.data}
                        id={item.id}
                        navigation={props.navigation}
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.sinPosteos}>No tenés posteos aún</Text>
                }
            />
            
            <Pressable style={styles.botonLogout} onPress={() => logout()}>
                <Text style={styles.botonTexto}>Cerrar sesión</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
    },
    perfilSeccion: {
        padding: 20,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    infoContainer: {
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    valor: {
        fontSize: 16,
        fontWeight: '500',
    },
    subtitulo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    sinPosteos: {
        textAlign: 'center',
        marginTop: 20,
        color: '#999',
    },
    botonLogout: {
        backgroundColor: '#e03e3e',
        padding: 14,
        margin: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    botonTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Perfil;