import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {  
    AuthErrorCodes, 
    getAuth, 
    signInWithEmailAndPassword 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACgQ0oR386Qy44r0AQsO2KmgIqMwK5xYI",
  authDomain: "dropar-40582.firebaseapp.com",
  projectId: "dropar-40582",
  storageBucket: "dropar-40582.appspot.com",
  messagingSenderId: "646928778563",
  appId: "1:646928778563:web:56850ecbf8bf87ead1dbf6",
  measurementId: "G-YPHSTNGDXP"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);

export {
    firebaseApp,
    analytics,
    auth
}