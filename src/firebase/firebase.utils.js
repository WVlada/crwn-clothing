import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBw6T2D-mR9J_xieJVgjKpAHo8ukBJjR8c",
  authDomain: "crwn-db-4dc61.firebaseapp.com",
  databaseURL: "https://crwn-db-4dc61.firebaseio.com",
  projectId: "crwn-db-4dc61",
  storageBucket: "crwn-db-4dc61.appspot.com",
  messagingSenderId: "652349296079",
  appId: "1:652349296079:web:b160174fc2d8168e1596ba",
  measurementId: "G-RQ7VP67KWB"
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
