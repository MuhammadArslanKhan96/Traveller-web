import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

let configs = {
  apiKey: "AIzaSyC9CnfIRuIbiRui5Vcg2cVtSy0pawFjvho",
  authDomain: "travel-agency-1d720.firebaseapp.com",
  projectId: "travel-agency-1d720",
  storageBucket: "travel-agency-1d720.appspot.com",
  messagingSenderId: "537931051971",
  appId: "1:537931051971:web:32f9a024018d431c57c376",
  measurementId: "G-4Q6Q5FW7Y0",
};

if (process.env.FIREBASE_CONFIGS) {
  configs = JSON.parse(process.env.FIREBASE_CONFIGS as string);
}

// Check if the Firebase configuration is available
// Initialize Firebase
const app = initializeApp(configs);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
