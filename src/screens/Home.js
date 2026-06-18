import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../firebase/config';
import Post from '../components/Post';

function Home(props) {


    const [posteos, setPosteos] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {


        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs => {
            let posts = [];
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                });
            });

            setPosteos(posts);
            setLoading(false);
        });

    }, []); 

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
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