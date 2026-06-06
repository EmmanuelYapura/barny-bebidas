import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuracion de tu proyecto de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCLZqHHVrmjB0xB9Bfo4o6MYMBxMQ0ruvs",
  authDomain: "barny-bebidas.firebaseapp.com",
  projectId: "barny-bebidas",
  storageBucket: "barny-bebidas.firebasestorage.app",
  messagingSenderId: "253083897276",
  appId: "1:253083897276:web:d0281d7b1dab8dda41afb9"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios listos para usar 
export const auth = getAuth(app);
export const db = getFirestore(app);
