import React, { useState } from "react";
import { Pressable, Text, View, TextInput, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";
import Camara from "../components/Camara";


function NuevoPost(props) {
  const [description, setDescription] = useState("");
  const [photouri , setPhotouri] = useState(null)


  function onSubmit() {
    db.collection("posts").add({
      email: auth.currentUser.email,
      description: description,
      createdAt: Date.now(),
      likes: [],
      comentarios: [],
      photo: photouri
    })
    .then(() => {
      setDescription("");
      props.navigation.navigate("Home");
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crear un nuevo posteo</Text>
      {
        photouri === null ?
        <Camara setPhotouri={(uri) => setPhotouri(uri)}/>
        :
        <>
          <TextInput
            style={styles.input}
            placeholder="Descripción del posteo"
            onChangeText={(text) => setDescription(text)}
            value={description}
            multiline={true}/>
          <Pressable onPress={onSubmit} style={styles.boton}>
            <Text style={styles.textoBoton}>Postear</Text>
          </Pressable>
        </>
}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 4,
    marginBottom: 15,
    textAlignVertical: "top"
  },
  boton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 4,
    alignItems: "center"
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold"
  }
});

export default NuevoPost;