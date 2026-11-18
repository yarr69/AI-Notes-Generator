import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamnotes-eade5.firebaseapp.com",
  projectId: "authexamnotes-eade5",
  storageBucket: "authexamnotes-eade5.firebasestorage.app",
  messagingSenderId: "442140539722",
  appId: "1:442140539722:web:86fc837146c1836e69dfb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth, provider}