import { Camera, CameraView } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Image} from "react-native";
import {manipulateAsync} from "expo-image-manipulator"


function Camara(props) {
    const [permisos, setpermisos] = useState(false)
    const [uri , seturi] =useState(null)
    let metodosCamara = useRef(null)

    useEffect(() => {
        console.log("me estoy renderizando");
        
        Camera.requestCameraPermissionsAsync()
            .then(() => setpermisos(true))
            .catch(error => console.log("error:",error))
    }, [])

    function tomarFoto() {
        metodosCamara.current.takePictureAsync()
        .then((imgTemp) => {
            return manipulateAsync(imgTemp.uri , [{resize : {width : 200} }] , {
                compress: 0.7 , base64 : true });
        })
        .then((imgManipulated) => {
            console.log('va el seturi')
            seturi(imgManipulated.base64);
        })
        .catch(error => console.log(error))
    }

    function savePhoto() {
        props.setPhotouri(uri)
    }

    function clearPhoto() {
        setUri(null)
    }

    return (
        <View style={styles.container}>
            {
                !permisos ?
                    <View>
                        <Text>Necesitas dar permisos para poder usar la camara</Text>
                    </View>
                    :
                    uri ?
                    <>
                    <Image style={styles.preview}
                    source ={{uri: `data:image/png;base64, ${uri}`} }
                    />

                    <View>
                        <Pressable onPress={() => savePhoto()}>
                            <Text>Aceptar</Text>
                        </Pressable>
                        <Pressable onPress={() => clearPhoto()}>
                            <Text>Rechazar</Text>
                        </Pressable>
                    </View>
                    </>
                    :
                    <>
                        <CameraView
                            style={styles.camera}
                            facing="front"
                            ref={metodosCamara} />

                        <Pressable
                            style={styles.boton}
                            onPress={() => tomarFoto()}>
                            <Text>Tomar foto</Text>
                        </Pressable>
                    </>
            }
        </View>
    )
}

const styles = StyleSheet.create({ 
    preview : {
        width : 400,
        height : 400
    },
    container:{
        flex:1
    },
    camera : {
        width : 400,
        height : 400
    }
})

export default Camara;