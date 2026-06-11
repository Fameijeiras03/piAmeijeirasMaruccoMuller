import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAPbPk7jUTAtEiQXROAeR4qEr5HjUEy040",
    authDomain: "pi-a-m-m.firebaseapp.com",
    projectId: "pi-a-m-m",
    storageBucket: "pi-a-m-m.firebasestorage.app",
    messagingSenderId: "719276315848",
    appId: "1:719276315848:web:9b8f2bd49c9965523881fd"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();
