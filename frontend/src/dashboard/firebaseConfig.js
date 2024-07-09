// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
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

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, storage };
