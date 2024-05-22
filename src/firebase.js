import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, query, where } from "firebase/firestore"; 
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "react-app-f7ed5.firebaseapp.com",
  projectId: "react-app-f7ed5",
  storageBucket: "react-app-f7ed5.appspot.com",
  messagingSenderId: "341868454529",
  appId: "1:341868454529:web:4b9c7e16889a29a818a380"
};
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app); 
const storage = getStorage(app);

export { app, auth, firestore, storage, query, where }; 
