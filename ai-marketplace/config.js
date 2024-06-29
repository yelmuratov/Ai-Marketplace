import { initializeApp } from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDEcKY1jMtLadIT4NB8xhJpK97bcBg-y3s",
    authDomain: "marketplace-auth-c64b5.firebaseapp.com",
    projectId: "marketplace-auth-c64b5",
    storageBucket: "marketplace-auth-c64b5.appspot.com",
    messagingSenderId: "518764783489",
    appId: "1:518764783489:web:1f7246ce9f6060435d6a80",
    measurementId: "G-L2FZF3RFYN"
};

const app = initializeApp(firebaseConfig);

export default app;