import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSmuewZiD0PSV7h__1X7AoEQXN878KqPs",
  authDomain: "fooddelivery-2915e.firebaseapp.com",
  databaseURL: "https://fooddelivery-2915e.firebaseio.com",
  projectId: "fooddelivery-2915e",
  storageBucket: "fooddelivery-2915e.appspot.com",
  messagingSenderId: "607885765793",
  appId: "1:607885765793:web:cf5ba83c16fb3e6c9e94e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };