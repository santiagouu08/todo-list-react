import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDW0YZ2xoiUTg8lJfO0BFYOTZK8DN5U1uw",
  authDomain: "todo-list-react-47eda.firebaseapp.com",
  projectId: "todo-list-react-47eda",
  storageBucket: "todo-list-react-47eda.firebasestorage.app",
  messagingSenderId: "926797318218",
  appId: "1:926797318218:web:f808500da10e20865cbeb3",
  measurementId: "G-DNZGMBT5BH"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);  // ← ESTA LÍNEA ES LA QUE TE FALTA
