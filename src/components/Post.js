import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { db, auth } from "../../firebase/config";
import firebase from "firebase/app";


function Post(props) {
  const { email, description, likes, comentarios } = props.data;

  function darLike() {
    db.collection("posts")
      .doc(props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function quitarLike() {
    db.collection("posts")
      .doc(props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <View style={styles.card}>
      <Text>Creado por: {email}</Text>
      <Text>{description}</Text>
      
      <Text>Likes: {likes ? likes.length : 0}</Text>
      <Text>Comentarios: {comentarios ? comentarios.length : 0}</Text>

      {likes && likes.includes(auth.currentUser.email) ? (
        <Pressable onPress={quitarLike}>
          <Text style={styles.textoBoton}>Me gusta (Quitar)</Text>
        </Pressable>
      ) : (
        <Pressable onPress={darLike}>
          <Text style={styles.textoBoton}>Me gusta</Text>
        </Pressable>
      )}
      <Pressable onPress={() => props.navigation.navigate("Comentarios", { id: props.id })}>
        <Text style={styles.textoBoton}>Comentar</Text>
      </Pressable>
    </View>
  );
}
// falta agregar la screen de comentarios, se va a tener que traer el posteo por props asi el comenatrio queda vinculado al posteo,
// se va a tener que cargar en la db como una colection de comentarios
const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 10,
  },
  textoBoton: {
    color: "blue",
    fontWeight: "bold",
    marginTop: 10,
  }
});

export default Post;