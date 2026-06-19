import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../firebase/config';
import Post from '../components/Post';

function Home(props) {

    function logout() {
        auth.signOut()
        console.log('se deslogueo el user')
        props.navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
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
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
    },
});

export default Home;