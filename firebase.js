import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8rcvtTEGH6o0YKsjwJRnNEgZloc4odS0",
  authDomain: "whatsapp2-3fb82.firebaseapp.com",
  projectId: "whatsapp2-3fb82",
  storageBucket: "whatsapp2-3fb82.appspot.com",
  messagingSenderId: "168667417576",
  appId: "1:168667417576:web:6ea0d9f129b5e2290a725d",
  measurementId: "G-RD7PZJHDL7"
};

  //Initialize the app if not already done
  const app = !firebase.apps.length 
    ? firebase.initializeApp(firebaseConfig) 
    : firebase.app();

 const db = app.firestore();

 const auth = app.auth();

 const provider = new firebase.auth.GoogleAuthProvider();

 export {db, auth, provider};