import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

function Comentarios(props) {
    const { id } = props.route.params;
    const [comentario, setComentario] = useState('');
    const [comentarios, setComentarios] = useState([]);
    useEffect(() => {
        db.collection('posts').doc(id).onSnapshot(doc => {
            const data = doc.data();
            if (data && data.comentarios) {
                setComentarios(data.comentarios);
            }
        });

    }, []);

    function agregarComentario() {
        if (comentario.trim() === '') return;
        const usuarioActual = auth.currentUser ? auth.currentUser.email : 'anonimo';
        db.collection('posts')
            .doc(id)
            .update({
                comentarios: firebase.firestore.FieldValue.arrayUnion({
                    email: usuarioActual,
                    texto: comentario,
                    createdAt: Date.now()
                })
            })
            .then(() => {
                setComentario('');
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={comentarios}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.comentarioCard}>
                        <Text style={styles.emailTexto}>{item.email}</Text>
                        <Text>{item.texto}</Text>
                    </View>
                )}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Escribí un comentario..."
                    value={comentario}
                    onChangeText={texto => setComentario(texto)}
                />
                <Pressable onPress={agregarComentario} style={styles.boton}>
                    <Text style={styles.botonTexto}>Enviar</Text>
                </Pressable>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
    },
    comentarioCard: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        margin: 10,
        borderRadius: 8,
    },
    emailTexto: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginRight: 8,
    },
    boton: {
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    botonTexto: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Comentarios;