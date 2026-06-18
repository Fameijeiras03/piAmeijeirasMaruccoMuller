import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

function Post(props) {
  const { email, description, likes, comentarios } = props.data;
  const usuarioActual = auth.currentUser ? auth.currentUser.email : null;

  function darLike() {
    db.collection("posts")
      .doc(props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(usuarioActual)
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function quitarLike() {
    db.collection("posts")
      .doc(props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(usuarioActual)
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const yaLikeo = likes && usuarioActual && likes.includes(usuarioActual);

  return (
    <View style={styles.card}>
      <Text>Creado por: {email}</Text>
      <Text>{description}</Text>

      <Text>Likes: {likes ? likes.length : 0}</Text>
      <Text>Comentarios: {comentarios ? comentarios.length : 0}</Text>
      {yaLikeo ? (
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