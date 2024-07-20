
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmFvpHI0f87fCqPB6KGU8RdVdQsE7nJpk",
  authDomain: "chatting-app-ce924.firebaseapp.com",
  projectId: "chatting-app-ce924",
  storageBucket: "chatting-app-ce924.appspot.com",
  messagingSenderId: "433067102735",
  appId: "1:433067102735:web:56a6c55ca0e0c57fb3897a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');
