import { dataBase } from "./dataBase";
const firebaseConfig = {
  apiKey: "AIzaSyDlGBEgP9QJ8F1MDo7YjzFR8ntxx4gP4d4",
  authDomain: "instagram-clone-7f31c.firebaseapp.com",
  projectId: "instagram-clone-7f31c",
  storageBucket: "instagram-clone-7f31c.appspot.com",
  messagingSenderId: "270439362230",
  appId: "1:270439362230:web:046b984c5bb13000740017",
  measurementId: "G-CYFTZ5W2S7"
};

const firebase = window.firebase.initializeApp(firebaseConfig);
const {FieldValue} = window.firebase.firestore

export {firebase, FieldValue}

