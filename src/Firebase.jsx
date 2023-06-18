// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAo03T9FSXVmdMCtAKStDNrrNtmZCMW-pM",
  authDomain: "recipe-app-60b30.firebaseapp.com",
  projectId: "recipe-app-60b30",
  storageBucket: "recipe-app-60b30.appspot.com",
  messagingSenderId: "403042512075",
  appId: "1:403042512075:web:a01dc65f604d8fffddff4e"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig); 

//   init services
const db = getFirestore(app)
const auth = getAuth()

export {auth, db}