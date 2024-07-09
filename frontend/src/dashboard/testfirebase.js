// Importa las funciones necesarias de Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBILM8v8uWL_d9l-2Umm6vvT9af6N0wdUw",
  authDomain: "uninotedb.firebaseapp.com",
  databaseURL: "https://uninotedb-default-rtdb.firebaseio.com/",
  projectId: "uninotedb",
  storageBucket: "uninotedb.appspot.com",
  messagingSenderId: "130416240969",
  appId: "1:130416240969:web:1ae6699b9cb26d82399298",
  measurementId: "G-EJ070RY97Y"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Ejemplo de escritura en la base de datos
const messagesRef = ref(db, 'messages'); // Referencia al nodo 'messages'
set(messagesRef, {
  text: "Hola, mundo!",
  timestamp: Date.now(),
  userId: "usuario1"
}).then(() => {
  console.log("Mensaje enviado correctamente.");
}).catch((error) => {
  console.error("Error al enviar mensaje:", error);
});

// Ejemplo de lectura desde la base de datos
get(messagesRef).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error("Error al obtener datos:", error);
});
