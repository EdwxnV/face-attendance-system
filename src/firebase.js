import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB7Xy9XZkRD4B-U6KfePlPzTi5RlApxabA",
  authDomain: "face-app-d201d.firebaseapp.com",
  projectId: "face-app-d201d",
  storageBucket: "face-app-d201d.appspot.com",
  messagingSenderId: "601636105561",
  appId: "1:601636105561:web:679065d3d7edd2b739f048",
  measurementId: "G-MT3V6DQ54K"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
