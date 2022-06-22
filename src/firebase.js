// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from  'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAGW5pBCZNFNPVF1PU3kSeunmElXR9OnLI",
    authDomain: "reels-85f07.firebaseapp.com",
    projectId: "reels-85f07",
    storageBucket: "reels-85f07.appspot.com",
    messagingSenderId: "23887954522",
    appId: "1:23887954522:web:90beb4ac6a6d85f4420e63"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//auth object is present inside firebase

export const auth = firebase.auth();

const firestore=firebase.firestore();
export const database={
  users: firestore.collection('users'),
  posts: firestore.collection('posts'),
  comments: firestore.collection('comments'),
  getTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}

export const storage= firebase.storage();